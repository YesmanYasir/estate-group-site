export function isConfiguredAdmin(email: string | null | undefined, allowedEmail: string | null | undefined, emailVerified: boolean | undefined) {
  if (!email || !allowedEmail || emailVerified !== true) return false;
  return email.trim().toLocaleLowerCase() === allowedEmail.trim().toLocaleLowerCase();
}
