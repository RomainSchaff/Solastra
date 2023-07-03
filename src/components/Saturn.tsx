import * as THREE from "three";
import { TextureLoader } from "three";
import { useRef, useState, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";

function Saturn() {
  const mesh = useRef<THREE.Group>(null!);
  const ringMesh = useRef<THREE.Group>(null!);
  const [active, setActive] = useState(false);
  const texture = useLoader(TextureLoader, "./texture/2k_saturn.jpg");

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x = 27 * (Math.PI / 180);
      mesh.current.rotation.y += 0.2 / 10;
      ringMesh.current.rotation.x = 90 * (Math.PI / 180);
      const time = state.clock.getElapsedTime();
      const angle = (time * 0.1) / 5;
      const x = 700 * Math.cos(angle);
      const z = 700 * Math.sin(angle);
      mesh.current.position.set(x, 0, z);
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
      <group
        ref={mesh}
        position={[700, 0, 0]}
        scale={active ? 1.3 : 1}
        onClick={() => setActive(!active)}
      >
        <mesh>
          <sphereGeometry args={[25, 32, 32]} />
          <meshStandardMaterial
            metalness={0.6}
            roughness={1}
            map={texture}
            color={active ? "rgb(165, 165, 165)" : "gray"}
          />
          <axesHelper args={[25 + 10]} />
        </mesh>
        <group ref={ringMesh}>
          <mesh>
            <ringGeometry args={[30.5, 36, 30]} />
            <meshStandardMaterial
              color="rgb(95, 90, 78)"
              side={THREE.DoubleSide}
              transparent
              opacity={0.75}
            />
          </mesh>
          <mesh>
            <ringGeometry args={[36.6, 50, 30]} />
            <meshStandardMaterial
              color="rgb(139, 122, 80)"
              side={THREE.DoubleSide}
              transparent
              opacity={0.9}
            />
          </mesh>
          <mesh>
            <ringGeometry args={[51.5, 65, 30]} />
            <meshStandardMaterial
              color="rgb(139, 122, 80)"
              side={THREE.DoubleSide}
              transparent
              opacity={0.8}
            />
          </mesh>
        </group>
      </group>
    </>
  );
}

export default Saturn;
