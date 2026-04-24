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

export interface UserRoleRow {
  uid: string;
  email: string | null;
  role: Role;
  created_at?: string;
}

const TABLE = "user_roles";

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

export async function upsertRole(row: UserRoleRow): Promise<void> {
  if (!supabase) throw new Error("Supabase not configured");
  const { error } = await supabase
    .from(TABLE)
    .upsert({ uid: row.uid, email: row.email, role: row.role });
  if (error) throw error;
}

export async function countRoles(): Promise<number> {
  if (!supabase) return 0;
  const { count, error } = await supabase
    .from(TABLE)
    .select("*", { count: "exact", head: true });
  if (error) throw error;
  return count ?? 0;
}
