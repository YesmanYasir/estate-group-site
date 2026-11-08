"use client";
import { useState, type FormEvent } from "react";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
export function GoldenVisaEnquiry({ locale = "en" }: { locale?: Locale }) {
  const [busy,setBusy]=useState(false),[message,setMessage]=useState(""),[done,setDone]=useState(false);
  async function submit(event:FormEvent<HTMLFormElement>){event.preventDefault();setBusy(true);setMessage("");const form=new FormData(event.currentTarget);const payload={name:form.get("name"),email:form.get("email"),phone:form.get("phone"),message:form.get("message"),consent:form.get("consent")==="on"};try{const response=await fetch("/api/golden-visa/enquiry",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(payload)});const result=await response.json();if(!response.ok)throw new Error(result.error);setDone(true);setMessage(t(locale,"sent"));event.currentTarget.reset();}catch{setMessage(t(locale,"formError"));}finally{setBusy(false);}}
  return <form className="visa-enquiry-form" onSubmit={submit} aria-label={t(locale,"start")}>
    <div className="form-pair"><label>{t(locale,"formName")}<input required name="name" autoComplete="name" maxLength={120}/></label><label>{t(locale,"formEmail")}<input required type="email" name="email" autoComplete="email" maxLength={254}/></label></div>
    <label>{t(locale,"formPhone")}<input required type="tel" name="phone" autoComplete="tel" maxLength={40}/></label>
    <label>{t(locale,"formMessage")}<textarea required name="message" rows={4} maxLength={2000}/></label>
    <label className="consent-field"><input required type="checkbox" name="consent"/><span>{t(locale,"askConsent")}</span></label>
    {message&&<p className={done?"form-success":"form-error"} role="status">{message}</p>}
    <button className="button button-dark" disabled={busy}>{busy?t(locale,"sending"):t(locale,"send")} <span aria-hidden="true">↗</span></button>
  </form>;
}
