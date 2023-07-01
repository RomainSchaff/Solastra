import * as THREE from "three";
import { TextureLoader } from "three";
import React, { useRef, useState, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { MoonProps } from "./Moon";

function Jupiter() {
  const mesh = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const texture = useLoader(TextureLoader, "./texture/2k_jupiter.jpg");

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x = 3 * (Math.PI / 180);
      mesh.current.rotation.y += 0.22 / 10;
      const time = state.clock.getElapsedTime();
      const angle = (time * 0.2) / 5;
      const x = 500 * Math.cos(angle);
      const z = 500 * Math.sin(angle);
      mesh.current.position.set(x, 0, z);
    }
  });

  // Géométrie pour la trajectoire orbitale
  const orbitGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      vertices.push(500 * Math.cos(theta), 0, 500 * Math.sin(theta));
    }
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    return geometry;
  }, []);

  return (
    <>
      <lineLoop>
        <bufferGeometry attach="geometry" {...orbitGeometry} />
        <lineBasicMaterial attach="material" color="rgb(50, 50, 50)" />
      </lineLoop>
      <mesh
        ref={mesh}
        scale={active ? 1.3 : 1}
        position={[-500, 0, 0]}
        onClick={() => setActive(!active)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <sphereGeometry args={[29, 32, 32]} />
        <meshStandardMaterial
          metalness={0.65}
          roughness={1}
          map={texture}
          color="gray"
        />
        <axesHelper args={[29 + 10]} />
      </mesh>
    </>
  );
}

export default Jupiter;
