import { cookies } from "next/headers";
import type { Locale } from "@/lib/i18n";

export async function getSiteLocale(): Promise<Locale> {
  const saved=(await cookies()).get("spitogo-locale")?.value;
  return saved==="tr"||saved==="el"?saved:"en";
}
