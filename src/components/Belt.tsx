import * as THREE from "three";
import { TextureLoader } from "three";
import React, { useRef, useState, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";

function Belt() {
  const mesh = useRef<THREE.Mesh>(null!);
  const texture = useLoader(TextureLoader, "./texture/2k_uranus.jpg");
  return <div>Belt</div>;
}

export default Belt;
