"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export function AdminLogin({ denied = false }: { denied?: boolean }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(denied ? "This Google account is not authorized for the property desk." : "");

  async function continueWithGoogle() {
    setBusy(true);
    setError("");
    try {
      await signIn("google", { redirectTo: "/admin" });
    } catch {
      setError("Google sign-in could not start. Please try again.");
      setBusy(false);
    }
  }

  return <div className="admin-login">
    <div className="google-login-copy"><div><strong>Private property desk</strong><p>Sign in with the Google account authorized by the site owner.</p></div></div>
    {error && <p role="alert" className="form-error">{error}</p>}
    <button className="google-signin" type="button" onClick={() => void continueWithGoogle()} disabled={busy}>
      <GoogleMark />{busy ? "Connecting to Google…" : "Continue with Google"}
    </button>
    <small>Only the configured admin email can manage listings.</small>
  </div>;
}

function GoogleMark() {
  return <svg aria-hidden="true" viewBox="0 0 48 48" className="google-mark"><path fill="#4285F4" d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.7h11a9.5 9.5 0 0 1-4 6.2v5h6.5c3.8-3.5 6.1-8.7 6.1-14.8Z"/><path fill="#34A853" d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.5-5c-1.8 1.2-4.1 2-7 2-5.3 0-9.8-3.6-11.4-8.4H5.9v5.2A20 20 0 0 0 24 44Z"/><path fill="#FBBC05" d="M12.6 27.8a12 12 0 0 1 0-7.6V15H5.9a20 20 0 0 0 0 18l6.7-5.2Z"/><path fill="#EA4335" d="M24 11.8c3 0 5.7 1 7.8 3.1l5.9-5.8C34.1 5.8 29.5 4 24 4A20 20 0 0 0 5.9 15l6.7 5.2c1.6-4.8 6.1-8.4 11.4-8.4Z"/></svg>;
}
