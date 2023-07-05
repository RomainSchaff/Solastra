import * as THREE from "three";
import { TextureLoader } from "three";
import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";

type JupiterProps = {
  setNewTarget: (value: [number, number, number]) => void;
  planetActive: number;
  setPlanetActive: (value: number) => void;
};

const Jupiter: React.FC<JupiterProps> = ({
  setNewTarget,
  planetActive,
  setPlanetActive,
}) => {
  const mesh = useRef<THREE.Mesh>(null!);
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
      if (planetActive === 5) {
        setNewTarget([x, 0, z]);
      } else if (planetActive === 0) {
        setNewTarget([0, 0, 0]);
      }
    }
  });

  function handleClick() {
    if (planetActive !== 5) {
      setPlanetActive(5);
    } else if (planetActive === 5) {
      setPlanetActive(0);
    }
  }

  return (
    <>
      <mesh
        ref={mesh}
        scale={planetActive === 5 ? 1.3 : 1}
        position={[-500, 0, 0]}
        onClick={handleClick}
      >
        <sphereGeometry args={[29, 32, 32]} />
        <meshStandardMaterial
          metalness={0.65}
          roughness={1}
          map={texture}
          color={planetActive === 5 ? "rgb(135, 135, 135)" : "gray"}
        />
        <axesHelper args={[29 + 10]} />
      </mesh>
    </>
  );
};

export default Jupiter;
