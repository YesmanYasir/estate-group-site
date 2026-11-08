export function isConfiguredAdmin(email: string | null | undefined, allowedEmail: string | null | undefined, emailVerified: boolean | undefined) {
  if (!email || !allowedEmail || emailVerified !== true) return false;
  const allowedEmails = allowedEmail
    .split(",")
    .map((address) => address.trim().toLocaleLowerCase())
    .filter(Boolean);
  return allowedEmails.includes(email.trim().toLocaleLowerCase());
}
