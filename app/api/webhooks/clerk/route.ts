import { Webhook } from "svix";
import { headers } from "next/headers";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

type ClerkUserEvent = {
  type: "user.created" | "user.updated" | "user.deleted";
  data: {
    id: string;
    email_addresses?: Array<{ email_address: string; id: string }>;
    primary_email_address_id?: string | null;
    unsafe_metadata?: {
      age_verified?: boolean;
      dob?: string;
      research_use_accepted_at?: string;
    };
  };
};

export async function POST(req: Request) {
  const secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret) {
    return new Response("CLERK_WEBHOOK_SECRET not configured", { status: 500 });
  }

  const headerList = await headers();
  const svixId = headerList.get("svix-id");
  const svixTimestamp = headerList.get("svix-timestamp");
  const svixSignature = headerList.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  const body = await req.text();
  const wh = new Webhook(secret);

  let event: ClerkUserEvent;
  try {
    event = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as ClerkUserEvent;
  } catch {
    return new Response("Invalid signature", { status: 401 });
  }

  const supabase = createSupabaseAdminClient();

  if (event.type === "user.created" || event.type === "user.updated") {
    const { id, email_addresses, primary_email_address_id, unsafe_metadata } = event.data;
    const primary = email_addresses?.find((e) => e.id === primary_email_address_id);
    const email = primary?.email_address ?? email_addresses?.[0]?.email_address;

    if (!email || !unsafe_metadata?.dob || !unsafe_metadata?.age_verified) {
      return Response.json({ skipped: "missing required fields" });
    }

    const { error } = await supabase.from("users_ext").upsert({
      clerk_user_id: id,
      email,
      dob: unsafe_metadata.dob,
      age_verified_at: new Date().toISOString(),
      research_use_accepted_at:
        unsafe_metadata.research_use_accepted_at ?? new Date().toISOString(),
    });

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }
  }

  if (event.type === "user.deleted") {
    await supabase.from("users_ext").delete().eq("clerk_user_id", event.data.id);
  }

  return Response.json({ ok: true });
}
