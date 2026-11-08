import { auth } from "@/auth";
import { getEnv } from "@/lib/db";
import { isConfiguredAdmin } from "@/lib/admin-authorization";

export async function isAdmin() {
  const [session, env] = await Promise.all([auth(), getEnv()]);
  return isConfiguredAdmin(session?.user?.email, env.ADMIN_EMAIL, true);
}
