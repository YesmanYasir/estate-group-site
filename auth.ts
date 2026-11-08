import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { getEnv } from "@/lib/db";
import { isConfiguredAdmin } from "@/lib/admin-authorization";

export const { handlers, auth } = NextAuth({
  providers: [Google],
  session: { strategy: "jwt" },
  trustHost: true,
  pages: { signIn: "/admin" },
  callbacks: {
    async signIn({ user, profile }) {
      const verified = (profile as { email_verified?: boolean } | undefined)?.email_verified;
      const allowedEmail = (await getEnv()).ADMIN_EMAIL;
      return isConfiguredAdmin(user.email, allowedEmail, verified);
    },
  },
});
