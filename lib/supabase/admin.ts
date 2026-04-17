import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

/**
 * Privileged Supabase client for trusted server-only contexts:
 * - Webhook handlers (Clerk user.created, Tagadapay order.paid)
 * - Vercel cron jobs (inventory sync)
 * - Admin route handlers
 *
 * Uses the service role key which bypasses RLS. Never import this in code
 * that runs in the browser — the service role key is strictly server-side.
 */
export function createSupabaseAdminClient() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  }

  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}
