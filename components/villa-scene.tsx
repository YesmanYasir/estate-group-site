"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";
function Model() {
  const group = useRef<Group>(null);
  useFrame((state) => { if (group.current) { group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.18) * 0.045 - 0.2; } });
  return <Float speed={0.65} rotationIntensity={0.025} floatIntensity={0.18}><group ref={group} position={[0, -0.55, 0]} rotation={[0.08, -0.2, 0]}>
    <mesh position={[0,-0.25,0]} receiveShadow><boxGeometry args={[4.8,.28,3.2]}/><meshStandardMaterial color="#c6bda9" roughness={.93}/></mesh>
    <mesh position={[-.35,.55,-.12]} castShadow receiveShadow><boxGeometry args={[2.8,1.35,2.25]}/><meshStandardMaterial color="#e9e4d8" roughness={.82}/></mesh>
    <mesh position={[.98,.37,.48]} castShadow><boxGeometry args={[1.35,1,1.2]}/><meshStandardMaterial color="#d8d0c0" roughness={.86}/></mesh>
    <mesh position={[-.28,1.32,-.12]} castShadow><boxGeometry args={[2.88,.12,2.32]}/><meshStandardMaterial color="#7b8174" roughness={.8}/></mesh>
    <mesh position={[.54,.35,1.03]}><boxGeometry args={[.62,.8,.045]}/><meshStandardMaterial color="#82968a" metalness={.25} roughness={.26}/></mesh>
    <mesh position={[-1.2,.35,1.03]}><boxGeometry args={[.52,.7,.045]}/><meshStandardMaterial color="#82968a" metalness={.25} roughness={.26}/></mesh>
    <mesh position={[1.02,.18,1.1]}><boxGeometry args={[.34,.67,.055]}/><meshStandardMaterial color="#b77d58" metalness={.48} roughness={.34}/></mesh>
    <mesh position={[1.14,.27,1.13]}><boxGeometry args={[.06,.14,.03]}/><meshStandardMaterial color="#e9e4d8" metalness={.55}/></mesh>
    <mesh position={[-1.0,-.02,2.15]} rotation={[-.2,0,0]}><boxGeometry args={[1.5,.08,1.1]}/><meshStandardMaterial color="#b77d58" roughness={.6}/></mesh>
    {[-2.15,-1.8,1.95,2.25].map((x,i)=><mesh key={i} position={[x,-.01,i<2?.5:1.5]} castShadow><sphereGeometry args={[.2+i%2*.08,12,10]}/><meshStandardMaterial color={i%2?"#87937e":"#697b67"} roughness={1}/></mesh>)}
  </group></Float>;
}
export default function VillaScene() { return <div className="scene-wrap" aria-label="A floating architectural model of a Mediterranean home" role="img"><Canvas camera={{position:[5,3.4,6.2],fov:36}} dpr={[1,1.5]} gl={{alpha:true,antialias:true}} fallback={<div className="scene-fallback" aria-hidden="true"><div className="fallback-house"><i/><b/><span/></div><span>ARCHITECTURE IN LIGHT</span></div>}><ambientLight intensity={1.4}/><directionalLight position={[5,8,5]} intensity={3.2} castShadow/><Model/><ContactShadows position={[0,-.75,0]} opacity={.32} scale={8} blur={2.7}/><OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI/2.6} maxPolarAngle={Math.PI/2.15} autoRotate autoRotateSpeed={.16}/></Canvas><span className="scene-coordinate">37° 58′ 12.6″ N<br/>23° 43′ 44.1″ E</span></div>; }
