import * as THREE from "three";
import { TextureLoader } from "three";
import { useRef, useState, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";

function Mars() {
  const mesh = useRef<THREE.Mesh>(null!);
  const [active, setActive] = useState(false);
  const texture = useLoader(TextureLoader, "./texture/2k_mars.jpg");

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x = 25 * (Math.PI / 180);
      mesh.current.rotation.y += 0.1 / 10;
      const time = state.clock.getElapsedTime();
      const angle = (time * 0.3) / 5;
      const x = 300 * Math.cos(angle);
      const z = 300 * Math.sin(angle);
      mesh.current.position.set(x, 0, z);
    }
  });

  // Géométrie pour la trajectoire orbitale
  const orbitGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      vertices.push(300 * Math.cos(theta), 0, 300 * Math.sin(theta));
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
        position={[300, 0, 0]}
        onClick={() => setActive(!active)}
      >
        <sphereGeometry args={[7, 32, 32]} />
        <meshStandardMaterial
          metalness={0.3}
          roughness={1}
          map={texture}
          color={active ? "rgb(165, 165, 165)" : "gray"}
        />
        <axesHelper args={[7 + 10]} />
      </mesh>
    </>
  );
}

export default Mars;
