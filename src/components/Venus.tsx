import * as THREE from "three";
import { TextureLoader } from "three";
import React, { useRef, useState, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";

function Venus() {
  const mesh = useRef<THREE.Mesh>(null!);
  const atmosphereMesh = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const texture = useLoader(TextureLoader, "./texture/2k_venus_surface.jpg");
  const atmosphere = useLoader(TextureLoader, "./texture/2k_venus_surface.jpg");

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x = 177 * (Math.PI / 180);
      mesh.current.rotation.y += 0.001 / 10;
      const time = state.clock.getElapsedTime();
      const angle = (time * 1.5) / 5;
      const x = 150 * Math.cos(angle);
      const z = 150 * Math.sin(angle);
      mesh.current.position.set(x, 0, z);
      atmosphereMesh.current.position.set(x, 0, z);
    }
  });

  // Géométrie pour la trajectoire orbitale
  const orbitGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      vertices.push(150 * Math.cos(theta), 0, 150 * Math.sin(theta));
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
        position={[150, 0, 0]}
        onClick={() => setActive(!active)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <sphereGeometry args={[8, 32, 32]} />
        <meshStandardMaterial
          metalness={0.4}
          roughness={1}
          map={texture}
          color="gray"
        />
        <axesHelper args={[6 + 10]} />
      </mesh>
      <mesh
        ref={atmosphereMesh}
        scale={active ? 1.3 : 1}
        position={[150, 0, 0]}
      >
        <sphereGeometry args={[8.5, 32, 32]} />
        <meshStandardMaterial
          map={atmosphere}
          color="white"
          transparent={true}
          opacity={0.8}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

export default Venus;
