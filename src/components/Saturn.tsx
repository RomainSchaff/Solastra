import * as THREE from "three";
import { TextureLoader } from "three";
import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";

type SaturnProps = {
  setNewTarget: (value: [number, number, number]) => void;
  planetActive: number;
  setPlanetActive: (value: number) => void;
};

const Saturn: React.FC<SaturnProps> = ({
  setNewTarget,
  planetActive,
  setPlanetActive,
}) => {
  const mesh = useRef<THREE.Group>(null!);
  const ringMesh = useRef<THREE.Group>(null!);
  const texture = useLoader(TextureLoader, "./texture/2k_saturn.jpg");

  useFrame((state, delta) => {
    mesh.current.rotation.y += delta * 2;
    const time = state.clock.getElapsedTime();
    const angle = (time * 0.1) / 5;
    const x = 700 * Math.cos(angle);
    const z = 700 * Math.sin(angle);
    mesh.current.position.set(x, 0, z);
    if (planetActive === 6) {
      setNewTarget([x, 0, z]);
    } else if (planetActive === 0) {
      setNewTarget([0, 0, 0]);
    }
  });

  function handleClick() {
    if (planetActive !== 6) {
      setPlanetActive(6);
    } else if (planetActive === 6) {
      setPlanetActive(0);
    }
  }

  return (
    <>
      <group
        ref={mesh}
        position={[700, 0, 0]}
        scale={planetActive === 6 ? 1.3 : 1}
        onClick={handleClick}
        rotation-x={27 * (Math.PI / 180)}
      >
        <mesh>
          <sphereGeometry args={[25, 32, 32]} />
          <meshStandardMaterial
            metalness={0.6}
            roughness={1}
            map={texture}
            color={planetActive === 6 ? "rgb(165, 165, 165)" : "gray"}
          />
          <axesHelper args={[25 + 10]} />
        </mesh>
        <group ref={ringMesh} rotation-x={90 * (Math.PI / 180)}>
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
};

export default Saturn;
