"use client";
import { useState, type FormEvent } from "react";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
export function GoldenVisaEnquiry({ locale = "en" }: { locale?: Locale }) {
  const [message,setMessage]=useState("");
  function submit(event:FormEvent<HTMLFormElement>){event.preventDefault();const form=new FormData(event.currentTarget);const name=String(form.get("name")||"").trim(),email=String(form.get("email")||"").trim(),phone=String(form.get("phone")||"").trim(),enquiry=String(form.get("message")||"").trim();const subject=encodeURIComponent(`Golden Visa enquiry — ${name}`);const body=encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nEnquiry:\n${enquiry}`);window.location.href=`mailto:bluegreentouring@gmail.com?subject=${subject}&body=${body}`;setMessage(locale==="tr"?"E-posta uygulamanızda hazır bir taslak açılmalı. Talebin gönderilmesi için e-postadaki Gönder düğmesine basın.":locale==="el"?"Θα ανοίξει ένα έτοιμο μήνυμα στην εφαρμογή email σας. Πατήστε Αποστολή για να σταλεί το αίτημα.":"A prepared email should open in your email app. Press Send there to deliver your enquiry.");}
  return <form className="visa-enquiry-form" onSubmit={submit} aria-label={t(locale,"start")}>
    <div className="form-pair"><label>{t(locale,"formName")}<input required name="name" autoComplete="name" maxLength={120}/></label><label>{t(locale,"formEmail")}<input required type="email" name="email" autoComplete="email" maxLength={254}/></label></div>
    <label>{t(locale,"formPhone")}<input required type="tel" name="phone" autoComplete="tel" maxLength={40}/></label>
    <label>{t(locale,"formMessage")}<textarea required name="message" rows={4} maxLength={2000}/></label>
    <label className="consent-field"><input required type="checkbox" name="consent"/><span>{t(locale,"askConsent")}</span></label>
    {message&&<p className="email-draft-notice" role="status">{message} <a href="mailto:bluegreentouring@gmail.com">bluegreentouring@gmail.com</a></p>}
    <button className="button button-dark">{locale==="tr"?"E-posta taslağını aç":locale==="el"?"Άνοιγμα email":"Open email draft"} <span aria-hidden="true">↗</span></button>
  </form>;
}
