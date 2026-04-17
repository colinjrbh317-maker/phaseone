"use client";

import { createBrowserClient } from "@supabase/ssr";
import { useSession } from "@clerk/nextjs";
import type { Database } from "./types";

/**
 * Browser Supabase client authenticated via Clerk's native third-party auth.
 * The session token is fetched fresh on each request and sent as the bearer
 * token — Supabase RLS reads `auth.jwt()->>'sub'` to identify the user.
 */
export function useSupabaseClient() {
  const { session } = useSession();

  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      global: {
        fetch: async (input, init) => {
          const token = await session?.getToken();
          const headers = new Headers(init?.headers);
          if (token) headers.set("Authorization", `Bearer ${token}`);
          return fetch(input, { ...init, headers });
        },
      },
    },
  );
}
