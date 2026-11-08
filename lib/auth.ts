import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { getEnv } from "@/lib/db";
const COOKIE = "estate_admin";
function signature(value: string, secret: string) { return createHmac("sha256", secret).update(value).digest("base64url"); }
export async function login(password: string) {
  const env = await getEnv();
  if (!env.ADMIN_PASSWORD || !env.SESSION_SECRET || password.length === 0) return false;
  const expected = Buffer.from(env.ADMIN_PASSWORD); const actual = Buffer.from(password);
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return false;
  const payload = `${Date.now() + 1000 * 60 * 60 * 24 * 7}`;
  const jar = await cookies(); jar.set(COOKIE, `${payload}.${signature(payload, env.SESSION_SECRET)}`, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 60 * 60 * 24 * 7 });
  return true;
}
export async function isAdmin() {
  const env = await getEnv(); if (!env.SESSION_SECRET) return false;
  const value = (await cookies()).get(COOKIE)?.value || ""; const [payload, sig] = value.split(".");
  if (!payload || !sig || Number(payload) < Date.now()) return false;
  const expected = Buffer.from(signature(payload, env.SESSION_SECRET)); const actual = Buffer.from(sig);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}
export async function logout() { (await cookies()).delete(COOKIE); }
