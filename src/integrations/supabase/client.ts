import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL as string | undefined) || "";
const SUPABASE_PUBLISHABLE_KEY = (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined) || "";

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  console.warn(
    "[Visa Benefits] Missing Supabase env. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to .env (see .env.example)."
  );
}

export const supabase: SupabaseClient<Database> = createClient<Database>(
  SUPABASE_URL || "https://placeholder.supabase.co",
  SUPABASE_PUBLISHABLE_KEY || "placeholder-key",
  {
    auth: {
      storage: typeof window !== "undefined" ? localStorage : undefined,
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);