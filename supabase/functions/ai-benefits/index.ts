import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { benefits, location, language } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("AI service not configured");
    }

    const systemPrompt = `You are a helpful Visa card benefits advisor. Analyze the provided benefits and recommend the best one for the user based on their location and potential value.

Respond in JSON format with:
- recommendedBenefitId: The ID of the best benefit
- summary: A brief, friendly explanation (2-3 sentences) of why this benefit is recommended. ${language === "ta" ? "Respond in Tamil language." : "Respond in English."}

Consider:
- Location relevance (user is in ${location})
- Current date and expiring offers
- Potential monetary value
- Ease of use`;

    const userPrompt = `Here are the available benefits:
${JSON.stringify(benefits, null, 2)}

Based on the user being in ${location}, which benefit would you recommend and why?`;

    console.log("Calling Lovable AI Gateway...");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.error("Rate limit exceeded");
        return new Response(
          JSON.stringify({ 
            error: "Rate limits exceeded, please try again later.",
            recommendedBenefitId: benefits[0]?.id || "1",
            summary: "Based on your card type, this benefit offers excellent value for frequent travelers."
          }),
          { 
            status: 200, // Return 200 with fallback data
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
      }
      if (response.status === 402) {
        console.error("Payment required");
        return new Response(
          JSON.stringify({ 
            error: "AI service temporarily unavailable.",
            recommendedBenefitId: benefits[0]?.id || "1",
            summary: "This benefit provides great value based on your card tier and spending patterns."
          }),
          { 
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI service error");
    }

    const data = await response.json();
    console.log("AI response received:", data);

    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      throw new Error("No content in AI response");
    }

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch {
      console.error("Failed to parse AI response:", content);
      // Return a fallback
      parsed = {
        recommendedBenefitId: benefits[0]?.id || "1",
        summary: "Based on your location and card type, this benefit offers the best value for you right now.",
      };
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("AI benefits error:", error);
    
    // Return fallback recommendation
    return new Response(
      JSON.stringify({
        recommendedBenefitId: "1",
        summary: "Based on your card type and spending patterns, this benefit offers excellent value.",
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
