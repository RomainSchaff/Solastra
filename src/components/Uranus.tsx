import * as THREE from "three";
import { TextureLoader } from "three";
import React, { useRef, useState, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { MoonProps } from "./Moon";

function Uranus() {
  const mesh = useRef<THREE.Mesh>(null!);
  const ringMesh = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const texture = useLoader(TextureLoader, "./texture/2k_uranus.jpg");

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x = 98 * (Math.PI / 180);
      mesh.current.rotation.y += 0.12 / 10;
      ringMesh.current.rotation.x = 188 * (Math.PI / 180);
      ringMesh.current.rotation.z += 0.12 / 10;
      const time = state.clock.getElapsedTime();
      const angle = (time * 0.05) / 5;
      const x = 900 * Math.cos(angle);
      const z = 900 * Math.sin(angle);
      mesh.current.position.set(x, 0, z);
      ringMesh.current.position.set(x, 0, z);
    }
  });

  // Géométrie pour la trajectoire orbitale
  const orbitGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      vertices.push(900 * Math.cos(theta), 0, 900 * Math.sin(theta));
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
        position={[900, 0, 0]}
        onClick={() => setActive(!active)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <sphereGeometry args={[20, 32, 32]} />
        <meshStandardMaterial
          metalness={0.5}
          roughness={0.58}
          map={texture}
          color="gray"
        />
        <axesHelper args={[20 + 10]} />
      </mesh>
      <mesh ref={ringMesh} position={[700, 0, 0]}>
        <ringGeometry args={[25, 35, 30]} />
        <meshStandardMaterial
          color="grey"
          side={THREE.DoubleSide}
          transparent
          opacity={0.8}
        />
      </mesh>
    </>
  );
}

export default Uranus;
