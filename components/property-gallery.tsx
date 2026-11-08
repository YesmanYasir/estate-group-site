"use client";
import Image from "next/image";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";

export function PropertyGallery({ images, alt, title, locale = "en" }: { images: string[]; alt: string; title: string; locale?: Locale }) {
  const list = images.length ? images : [];
  const [active, setActive] = useState(0);
  if (!list.length) return <div className="detail-image gallery-empty" role="img" aria-label={title}>{title}</div>;
  const change = (step: number) => setActive((current) => (current + step + list.length) % list.length);
  return <section className="property-gallery" aria-label={t(locale,"gallery")} aria-roledescription="carousel">
    <div className="gallery-main">
      <Image key={list[active]} src={list[active]} alt={alt} fill priority sizes="(max-width: 700px) 100vw, 88vw" unoptimized />
      {list.length > 1 && <>
        <button type="button" className="gallery-control gallery-prev" onClick={() => change(-1)} aria-label={t(locale,"photoPrevious")}>‹</button>
        <button type="button" className="gallery-control gallery-next" onClick={() => change(1)} aria-label={t(locale,"photoNext")}>›</button>
        <span className="gallery-counter" aria-live="polite">{active + 1} / {list.length}</span>
      </>}
    </div>
    {list.length > 1 && <div className="gallery-thumbnails" role="group" aria-label={t(locale,"gallery")}>{list.map((photo,index)=><button type="button" key={photo} onClick={()=>setActive(index)} aria-label={t(locale,"photoNext")+" "+(index+1)} aria-pressed={active===index}><Image src={photo} alt="" fill sizes="110px" unoptimized /></button>)}</div>}
  </section>;
}
