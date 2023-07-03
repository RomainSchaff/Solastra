import * as THREE from "three";
import { TextureLoader } from "three";
import { useRef, useState, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";

function Uranus() {
  const mesh = useRef<THREE.Group>(null!);
  const ringMesh = useRef<THREE.Group>(null!);
  const [active, setActive] = useState(false);
  const texture = useLoader(TextureLoader, "./texture/2k_uranus.jpg");

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x = 98 * (Math.PI / 180);
      mesh.current.rotation.y += 0.12 / 10;
      ringMesh.current.rotation.x = 90 * (Math.PI / 180);
      const time = state.clock.getElapsedTime();
      const angle = (time * 0.05) / 5;
      const x = 900 * Math.cos(angle);
      const z = 900 * Math.sin(angle);
      mesh.current.position.set(x, 0, z);
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
      <group
        ref={mesh}
        scale={active ? 1.3 : 1}
        position={[900, 0, 0]}
        onClick={() => setActive(!active)}
      >
        <mesh>
          <sphereGeometry args={[20, 32, 32]} />
          <meshStandardMaterial
            metalness={0.7}
            roughness={1}
            map={texture}
            color={active ? "rgb(165, 165, 165)" : "gray"}
          />
          <axesHelper args={[20 + 10]} />
        </mesh>
        <group ref={ringMesh}>
          <mesh>
            <ringGeometry args={[30, 31, 30]} />
            <meshStandardMaterial
              metalness={0.2}
              roughness={1}
              color="rgb(50, 50, 50)"
              side={THREE.DoubleSide}
              transparent
              opacity={0.6}
            />
          </mesh>
          <mesh>
            <ringGeometry args={[35, 36.5, 30]} />
            <meshStandardMaterial
              metalness={0.2}
              roughness={1}
              color="rgb(50, 50, 50)"
              side={THREE.DoubleSide}
              transparent
              opacity={0.9}
            />
          </mesh>
        </group>
      </group>
    </>
  );
}

export default Uranus;
