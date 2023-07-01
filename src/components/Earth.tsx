import * as THREE from "three";
import { TextureLoader } from "three";
import React, { useRef, useState, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";

function Earth() {
  const mesh = useRef<THREE.Mesh>(null!);
  const atmosphereMesh = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const texture = useLoader(TextureLoader, "./texture/2k_earth_daymap.jpg");
  const atmosphere = useLoader(TextureLoader, "./texture/2k_earth_clouds.jpg");

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x = 23 * (Math.PI / 180);
      mesh.current.rotation.y += 0.1 / 10;
      atmosphereMesh.current.rotation.y += 0.1 / 10;
      const time = state.clock.getElapsedTime();
      const angle = (time * 0.5) / 5;
      const x = 200 * Math.cos(angle);
      const z = 200 * Math.sin(angle);
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
      vertices.push(200 * Math.cos(theta), 0, 200 * Math.sin(theta));
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
        position={[-200, 0, 0]}
        onClick={() => setActive(!active)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <sphereGeometry args={[11, 32, 32]} />
        <meshStandardMaterial
          metalness={0.2}
          roughness={0.9}
          map={texture}
          color="gray"
        />
        <axesHelper args={[11 + 10]} />
      </mesh>
      <mesh
        ref={atmosphereMesh}
        scale={active ? 1.3 : 1}
        position={[150, 0, 0]}
      >
        <sphereGeometry args={[11.5, 32, 32]} />
        <meshStandardMaterial
          map={atmosphere}
          color="white"
          transparent={true}
          opacity={0.5}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

export default Earth;
