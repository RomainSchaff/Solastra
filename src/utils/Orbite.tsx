import React from "react";
import { useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useFrame, extend } from "@react-three/fiber";

extend({ OrbitControls });

function OrbiteControls() {
  const orbitControls = useRef<OrbitControlsImpl>(null!);
  useFrame((state) => orbitControls.current.update());

  return (
    <OrbitControls
      ref={orbitControls}
      target={[0, 0, 0]}
      rotateSpeed={0.4}
      zoomSpeed={0.5}
      minDistance={50}
      maxDistance={2500}
      enablePan={false}
    />
  );
}

export default OrbiteControls;
