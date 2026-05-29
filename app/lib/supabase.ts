import { createClient } from "@supabase/supabase-js";

export function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is missing");
  }

  if (!supabaseServiceKey) {
    throw new Error("SUPABASE_SERVICE_KEY is missing");
  }

  return createClient(supabaseUrl, supabaseServiceKey);
}
