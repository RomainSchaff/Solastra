import * as THREE from "three";
import { TextureLoader } from "three";
import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";

type MercuryProps = {
  setNewTarget: (value: [number, number, number]) => void;
  planetActive: number;
  setPlanetActive: (value: number) => void;
};

const Mercury: React.FC<MercuryProps> = ({
  setNewTarget,
  planetActive,
  setPlanetActive,
}) => {
  const mesh = useRef<THREE.Mesh>(null!);
  const texture = useLoader(TextureLoader, "./texture/2k_mercury.jpg");

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x = 0.03 * (Math.PI / 180);
      mesh.current.rotation.y += 0.01 / 10;
      const time = state.clock.getElapsedTime();
      const angle = (time * 2) / 5;
      const x = 100 * Math.cos(angle);
      const z = 100 * Math.sin(angle);
      mesh.current.position.set(x, 0, z);
      if (planetActive === 1) {
        setNewTarget([x, 0, z]);
      } else if (planetActive === 0) {
        setNewTarget([0, 0, 0]);
      }
    }
  });

  function handleClick() {
    if (planetActive !== 1) {
      setPlanetActive(1);
    } else if (planetActive === 1) {
      setPlanetActive(0);
    }
  }

  return (
    <>
      <mesh
        ref={mesh}
        scale={planetActive === 1 ? 1.3 : 1}
        position={[100, 0, 0]}
        onClick={handleClick}
      >
        <sphereGeometry args={[6, 16, 16]} />
        <meshStandardMaterial
          metalness={0.2}
          roughness={1}
          map={texture}
          color={planetActive === 1 ? "rgb(165, 165, 165)" : "gray"}
        />
        <axesHelper args={[6 + 10]} />
      </mesh>
    </>
  );
};

export default Mercury;
