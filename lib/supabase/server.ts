import { createServerClient } from "@supabase/ssr";
import { auth } from "@clerk/nextjs/server";
import type { Database } from "./types";

/**
 * Server Supabase client for Server Components, Route Handlers, and Server Actions.
 * Pulls the current Clerk session token and forwards it to Supabase so RLS policies
 * resolve `auth.jwt()->>'sub'` to the authenticated Clerk user id.
 *
 * Use for reads that should respect RLS. For privileged writes (webhooks, cron),
 * use `lib/supabase/admin.ts` which bypasses RLS with the service role key.
 */
export async function createClerkSupabaseServerClient() {
  const { getToken } = await auth();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => [],
        setAll: () => {},
      },
      global: {
        fetch: async (input, init) => {
          const token = await getToken();
          const headers = new Headers(init?.headers);
          if (token) headers.set("Authorization", `Bearer ${token}`);
          return fetch(input, { ...init, headers });
        },
      },
    },
  );
}
