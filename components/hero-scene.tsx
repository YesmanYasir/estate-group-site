"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const VillaScene = dynamic(() => import("@/components/villa-scene"), { ssr: false, loading: () => <Fallback/> });
function Fallback(){return <div className="scene-fallback" aria-hidden="true"><div className="fallback-house"><i/><b/><span/></div><span>ARCHITECTURE IN LIGHT</span></div>;}
export function HeroScene() { const [webglEnabled,setWebglEnabled]=useState(false); useEffect(()=>{const media=window.matchMedia("(min-width: 641px) and (prefers-reduced-motion: no-preference)");const sync=()=>setWebglEnabled(media.matches);sync();media.addEventListener("change",sync);return()=>media.removeEventListener("change",sync);},[]);return <div className="hero-scene">{webglEnabled?<VillaScene/>:<Fallback/>}</div>; }
