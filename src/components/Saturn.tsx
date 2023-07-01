import * as THREE from "three";
import { TextureLoader } from "three";
import React, { useRef, useState, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { MoonProps } from "./Moon";

function Saturn() {
  const mesh = useRef<THREE.Mesh>(null!);
  const ringMesh = useRef<THREE.Mesh>(null!);
  const ringMesh2 = useRef<THREE.Mesh>(null!);
  const ringMesh3 = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const texture = useLoader(TextureLoader, "./texture/2k_saturn.jpg");
  const ring = useLoader(TextureLoader, "./texture/saturn_ring2.png");

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x = 27 * (Math.PI / 180);
      mesh.current.rotation.y += 0.2 / 10;
      ringMesh.current.rotation.x = 117 * (Math.PI / 180);
      ringMesh.current.rotation.z -= 0.1;
      ringMesh2.current.rotation.x = 117 * (Math.PI / 180);
      ringMesh2.current.rotation.z -= 0.1;
      ringMesh3.current.rotation.x = 117 * (Math.PI / 180);
      ringMesh3.current.rotation.z -= 0.1;
      const time = state.clock.getElapsedTime();
      const angle = (time * 0.1) / 5;
      const x = 700 * Math.cos(angle);
      const z = 700 * Math.sin(angle);
      mesh.current.position.set(x, 0, z);
      ringMesh.current.position.set(x, 0, z);
      ringMesh2.current.position.set(x, 0, z);
      ringMesh3.current.position.set(x, 0, z);
    }
  });

  // Géométrie pour la trajectoire orbitale
  const orbitGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      vertices.push(700 * Math.cos(theta), 0, 700 * Math.sin(theta));
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
        scale={active ? 1.1 : 1}
        position={[700, 0, 0]}
        onClick={() => setActive(!active)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <sphereGeometry args={[25, 32, 32]} />
        <meshStandardMaterial
          metalness={0.2}
          roughness={0.6}
          map={texture}
          color="gray"
        />
        <axesHelper args={[25 + 10]} />
      </mesh>
      <mesh ref={ringMesh} position={[700, 0, 0]}>
        <ringGeometry args={[30.5, 36, 30]} />
        <meshStandardMaterial
          color="rgb(95, 90, 78)"
          side={THREE.DoubleSide}
          transparent
          opacity={0.75}
        />
      </mesh>
      <mesh ref={ringMesh2} position={[700, 0, 0]}>
        <ringGeometry args={[36.6, 50, 30]} />
        <meshStandardMaterial
          color="rgb(139, 122, 80)"
          side={THREE.DoubleSide}
          transparent
          opacity={0.9}
        />
      </mesh>
      <mesh ref={ringMesh3} position={[700, 0, 0]}>
        <ringGeometry args={[52, 65, 30]} />
        <meshStandardMaterial
          color="rgb(139, 122, 80)"
          side={THREE.DoubleSide}
          transparent
          opacity={0.8}
        />
      </mesh>
    </>
  );
}

export default Saturn;
