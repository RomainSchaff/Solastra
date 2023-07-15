import React from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const Asteroids = () => {
  const asteroids = useTexture("./Solastra/texture/asteroids-belt.jpg");
  asteroids.wrapS = asteroids.wrapT = THREE.RepeatWrapping;
  asteroids.repeat.set(50, 50);

  return (
    <>
      <mesh position={[0, 0, 0]}>
        <ringGeometry args={[350, 450, 30, 1]} />
        <meshStandardMaterial
          map={asteroids}
          side={THREE.DoubleSide}
          color="black"
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>
    </>
  );
};

export default Asteroids;
