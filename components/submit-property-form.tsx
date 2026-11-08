"use client";
import { useState, type FormEvent } from "react";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { signIn } from "next-auth/react";
import { StyledSelect } from "@/components/styled-select";
const types=["Apartment","House","Villa","Penthouse","Land","Development"];
export function SubmitPropertyForm({locale,email}:{locale:Locale;email:string}){
  const [photos,setPhotos]=useState<string[]>([]),[busy,setBusy]=useState(false),[uploading,setUploading]=useState(false),[message,setMessage]=useState(""),[sent,setSent]=useState(false),[propertyType,setPropertyType]=useState(types[0]),[listingType,setListingType]=useState("sale");
  async function upload(files:FileList|null){
    if(!files?.length)return; const chosen=Array.from(files).slice(0,Math.max(0,8-photos.length)); if(!chosen.length){setMessage(t(locale,"photos"));return;}
    setUploading(true);setMessage("");
    try{for(const file of chosen){const data=new FormData();data.set("file",file);const response=await fetch("/api/properties/upload",{method:"POST",body:data});const result=await response.json();if(!response.ok)throw new Error(result.error||"Upload failed.");setPhotos(current=>[...current,result.url]);}}
    catch(error){setMessage(error instanceof Error?error.message:t(locale,"formError"));}
    finally{setUploading(false);}
  }
  async function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();const form=event.currentTarget; if(!photos.length){setMessage(t(locale,"photos"));return;}setBusy(true);setMessage("");
    const data=new FormData(form);const body={title:data.get("title"),city:data.get("city"),listingType:data.get("listingType"),propertyType:data.get("propertyType"),price:Number(data.get("price")),bedrooms:Number(data.get("bedrooms")||0),bathrooms:Number(data.get("bathrooms")||0),area:Number(data.get("area")||0),coverUrl:photos[0],images:photos,alt:String(data.get("title"))+" in "+String(data.get("city")),description:data.get("description"),submitterName:data.get("submitterName"),submitterPhone:data.get("submitterPhone")};
    try{const response=await fetch("/api/properties",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(body)});const result=await response.json();if(!response.ok)throw new Error(result.error||t(locale,"formError"));setSent(true);setMessage(t(locale,"submitted"));form.reset();setPhotos([]);setPropertyType(types[0]);setListingType("sale");}
    catch(error){setMessage(error instanceof Error?error.message:t(locale,"formError"));}finally{setBusy(false);}
  }
  return <form className="public-submit-form" onSubmit={submit}>
    <div className="form-pair"><label>{t(locale,"formName")}<input required name="submitterName" autoComplete="name" maxLength={120}/></label><label>{t(locale,"formEmail")}<input readOnly value={email} aria-label={t(locale,"formEmail")}/></label></div>
    <label>{t(locale,"formPhone")}<input required type="tel" name="submitterPhone" autoComplete="tel" maxLength={40}/></label>
    <label>{t(locale,"title")}<input required name="title" maxLength={120}/></label>
    <div className="form-pair"><label>{t(locale,"location")}<input required name="city" maxLength={120}/></label><label>{t(locale,"propertyType")}<StyledSelect name="propertyType" ariaLabel={t(locale,"propertyType")} value={propertyType} onChange={setPropertyType} options={types.map(type=>({value:type,label:type}))}/></label></div>
    <div className="form-pair"><label>{t(locale,"offer")}<StyledSelect name="listingType" ariaLabel={t(locale,"offer")} value={listingType} onChange={setListingType} options={[{value:"sale",label:t(locale,"sale")},{value:"rent",label:t(locale,"rent")},{value:"golden_visa",label:t(locale,"golden")}]}/></label><label>{t(locale,"price")}<input required type="number" min="0" step="1" name="price"/></label></div>
    <label>{t(locale,"photos")}<input type="file" accept="image/jpeg,image/png,image/webp,image/avif" multiple onChange={event=>void upload(event.target.files)} disabled={uploading||photos.length>=8}/><small>{uploading?"Uploading…":photos.length+" / 8"}</small></label>
    {photos.length>0&&<div className="uploaded-photo-list" aria-live="polite">{photos.map((photo,index)=><div key={photo}><span>{t(locale,"gallery")} {index+1}</span><button type="button" onClick={()=>setPhotos(current=>current.filter((item)=>item!==photo))} aria-label={"Remove photo "+(index+1)}>×</button></div>)}</div>}
    <details className="admin-optional"><summary>{t(locale,"detailsOptional")}</summary><div className="form-pair"><label>{t(locale,"beds")}<input type="number" min="0" name="bedrooms"/></label><label>{t(locale,"baths")}<input type="number" min="0" name="bathrooms"/></label></div><label>{t(locale,"area")} ({t(locale,"areaSuffix")})<input type="number" min="0" name="area"/></label></details>
    <label>{t(locale,"description")}<textarea required name="description" rows={5} maxLength={3000}/></label>
    {message&&<p role="status" className={sent?"form-success":"form-error"}>{message}</p>}
    <p className="submit-private-note">{t(locale,"submitHint")}</p>
    <button className="button button-dark" disabled={busy||uploading}>{busy?t(locale,"sending"):t(locale,"submitForReview")} <span>↗</span></button>
  </form>;
}
export function SubmitPropertyGoogleSignIn({locale}:{locale:Locale}){return <div className="submit-signin"><p>{t(locale,"loginToSubmit")}</p><button className="google-signin" type="button" onClick={()=>void signIn("google",{redirectTo:"/submit-property"})}><span className="google-dot">G</span>{t(locale,"continueGoogle")}</button></div>;}
