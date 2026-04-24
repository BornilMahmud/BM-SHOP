import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabaseConfigured = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = supabaseConfigured
  ? createClient(url!, anonKey!, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  : null;

export type Role = "admin" | "user" | "vendor" | "staff";

const TABLE = "user_roles";
const RPC_ASSIGN_ROLE = "assign_role_on_signup";

export async function fetchRole(uid: string): Promise<Role | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from(TABLE)
    .select("role")
    .eq("uid", uid)
    .maybeSingle();
  if (error) throw error;
  return (data?.role as Role | undefined) ?? null;
}

/**
 * Assigns (or returns the existing) role for a Firebase UID.
 *
 * Calls the SECURITY DEFINER Postgres function defined in
 * `supabase/schema.sql`. New users always receive the `user` role;
 * admin / vendor / staff must be promoted out-of-band (see schema
 * comments). The call is idempotent for UIDs that already have a row.
 */
export async function assignRoleOnSignup(
  uid: string,
  email: string | null
): Promise<Role> {
  if (!supabase) throw new Error("Supabase not configured");
  const { data, error } = await supabase.rpc(RPC_ASSIGN_ROLE, {
    p_uid: uid,
    p_email: email,
  });
  if (error) throw error;
  return (data as Role) ?? "user";
}
