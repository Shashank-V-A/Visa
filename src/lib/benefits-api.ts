import { supabase } from "@/integrations/supabase/client";
import type { Benefit, BenefitCategory } from "@/data/benefits";

export interface Country {
  id: string;
  code: string;
  name_en: string;
}

export interface Issuer {
  id: string;
  name: string;
  country_id: string;
}

export interface CardProduct {
  id: string;
  name: string;
  visa_tier: string;
  issuer_id: string;
  issuer?: { name: string };
}

function mapBenefitRow(row: {
  id: string;
  category: string;
  title_en: string;
  title_ta: string | null;
  description_en: string;
  description_ta: string | null;
  value_en: string;
  value_ta: string | null;
  terms_url: string | null;
  icon: string;
  is_active: boolean;
  priority: number;
  valid_until: string | null;
  merchants: unknown;
  location_restriction: string | null;
}): Benefit {
  const merchants = Array.isArray(row.merchants) ? (row.merchants as string[]) : [];
  return {
    id: row.id,
    title: row.title_en,
    titleTa: row.title_ta || row.title_en,
    description: row.description_en,
    descriptionTa: row.description_ta || row.description_en,
    category: row.category as BenefitCategory,
    icon: row.icon || "Gift",
    value: row.value_en,
    valueTa: row.value_ta || row.value_en,
    termsUrl: row.terms_url || "#",
    expiresAt: row.valid_until || undefined,
    isActive: row.is_active,
    merchants: merchants.length ? merchants : undefined,
    locationRestriction: row.location_restriction || undefined,
    priority: row.priority,
  };
}

export async function fetchCountries(): Promise<Country[]> {
  const { data, error } = await supabase
    .from("countries")
    .select("id, code, name_en")
    .order("name_en");
  if (error) throw error;
  return (data || []) as Country[];
}

export async function fetchIssuers(countryCode: string): Promise<Issuer[]> {
  const { data: country } = await supabase.from("countries").select("id").eq("code", countryCode).single();
  if (!country?.id) return [];
  const { data: issuerRows, error: err } = await supabase
    .from("issuers")
    .select("id, name, country_id")
    .eq("country_id", country.id)
    .order("name");
  if (err) throw err;
  return (issuerRows || []) as Issuer[];
}

export async function fetchCardProducts(issuerId: string): Promise<CardProduct[]> {
  const { data, error } = await supabase
    .from("card_products")
    .select("id, name, visa_tier, issuer_id")
    .eq("issuer_id", issuerId)
    .eq("is_active", true)
    .order("name");
  if (error) throw error;
  return (data || []).map((r: { id: string; name: string; visa_tier: string; issuer_id: string }) => ({
    id: r.id,
    name: r.name,
    visa_tier: r.visa_tier,
    issuer_id: r.issuer_id,
    issuer: undefined, // use selectedIssuer from parent when building selectedCardProduct
  })) as CardProduct[];
}

export async function fetchBenefitsForCardProduct(cardProductId: string): Promise<Benefit[]> {
  const { data, error } = await supabase
    .from("card_product_benefits")
    .select(`
      display_order,
      benefits (
        id, category, title_en, title_ta, description_en, description_ta,
        value_en, value_ta, terms_url, icon, is_active, priority,
        valid_until, merchants, location_restriction
      )
    `)
    .eq("card_product_id", cardProductId)
    .order("display_order");
  if (error) throw error;
  const rows = (data || []) as { display_order: number; benefits: unknown }[];
  const benefits: Benefit[] = [];
  for (const r of rows) {
    const b = r.benefits as Record<string, unknown> | null;
    if (b && typeof b === "object" && b.id) {
      benefits.push(
        mapBenefitRow({
          id: b.id as string,
          category: (b.category as string) || "rewards",
          title_en: (b.title_en as string) || "",
          title_ta: (b.title_ta as string) || null,
          description_en: (b.description_en as string) || "",
          description_ta: (b.description_ta as string) || null,
          value_en: (b.value_en as string) || "",
          value_ta: (b.value_ta as string) || null,
          terms_url: (b.terms_url as string) || null,
          icon: (b.icon as string) || "Gift",
          is_active: (b.is_active as boolean) ?? true,
          priority: (b.priority as number) ?? 50,
          valid_until: (b.valid_until as string) || null,
          merchants: b.merchants ?? [],
          location_restriction: (b.location_restriction as string) || null,
        })
      );
    }
  }
  return benefits.sort((a, b) => b.priority - a.priority);
}
