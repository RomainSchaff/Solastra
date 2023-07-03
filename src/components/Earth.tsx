import * as THREE from "three";
import { TextureLoader } from "three";
import React, { useRef, useState, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";

function Earth() {
  const camera = useRef<THREE.Camera>(null!);
  const mesh = useRef<THREE.Group>(null!);
  const earthMesh = useRef<THREE.Group>(null!);
  const moonMesh = useRef<THREE.Group>(null!);
  const [active, setActive] = useState(false);
  const texture = useLoader(TextureLoader, "./texture/2k_earth_daymap.jpg");
  const atmosphere = useLoader(TextureLoader, "./texture/2k_earth_clouds.jpg");
  const moonTexture = useLoader(TextureLoader, "./texture/2k_moon.jpg");

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x = 23 * (Math.PI / 180);
      earthMesh.current.rotation.y += 0.1 / 10;
      const time = state.clock.getElapsedTime();
      const angle = (time * 0.5) / 5;
      const x = 200 * Math.cos(angle);
      const z = 200 * Math.sin(angle);
      mesh.current.position.set(x, 0, z);
      // Make the moon rotate around the earth
      const moonAngle = time / 2;
      const moonX = 30 * Math.cos(moonAngle);
      const moonY = 30 * Math.sin(moonAngle);
      const moonZ = 30 * Math.cos(moonAngle);
      moonMesh.current.position.set(moonX, moonY, moonZ);
      // Handle camera movement
      if (camera.current && active) {
        // camera.current.position.set(50, 50, 50);
        camera.current.lookAt(mesh.current.position);
      }
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
      <group
        ref={mesh}
        position={[-200, 0, 0]}
        onClick={() => setActive(!active)}
      >
        <group ref={earthMesh} scale={active ? 1.3 : 1}>
          <mesh>
            <sphereGeometry args={[11, 32, 32]} />
            <meshStandardMaterial
              metalness={0.2}
              roughness={0.9}
              map={texture}
              color={active ? "rgb(165, 165, 165)" : "gray"}
            />
            <axesHelper args={[11 + 10]} />
          </mesh>
          <mesh>
            <sphereGeometry args={[12, 32, 32]} />
            <meshStandardMaterial
              map={atmosphere}
              color={active ? "rgb(165, 165, 165)" : "gray"}
              transparent={true}
              opacity={0.5}
              depthWrite={false}
            />
          </mesh>
        </group>
        <group ref={moonMesh}>
          <mesh>
            <sphereGeometry args={[3, 16, 16]} />
            <meshStandardMaterial
              metalness={0.2}
              roughness={0.9}
              map={moonTexture}
              color={active ? "rgb(165, 165, 165)" : "gray"}
            />
          </mesh>
        </group>
      </group>
    </>
  );
}

export default Earth;
