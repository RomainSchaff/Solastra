import * as THREE from "three";
import { TextureLoader } from "three";
import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";

type MarsProps = {
  setNewTarget: (value: [number, number, number]) => void;
  planetActive: number;
  setPlanetActive: (value: number) => void;
};

const Mars: React.FC<MarsProps> = ({
  setNewTarget,
  planetActive,
  setPlanetActive,
}) => {
  const mesh = useRef<THREE.Mesh>(null!);
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
      if (planetActive === 4) {
        setNewTarget([x, 0, z]);
      } else if (planetActive === 0) {
        setNewTarget([0, 0, 0]);
      }
    }
  });

  function handleClick() {
    if (planetActive !== 4) {
      setPlanetActive(4);
    } else if (planetActive === 4) {
      setPlanetActive(0);
    }
  }

  return (
    <>
      <mesh
        ref={mesh}
        scale={planetActive === 4 ? 1.3 : 1}
        position={[300, 0, 0]}
        onClick={handleClick}
      >
        <sphereGeometry args={[7, 32, 32]} />
        <meshStandardMaterial
          metalness={0.3}
          roughness={1}
          map={texture}
          color={planetActive === 4 ? "rgb(165, 165, 165)" : "gray"}
        />
        <axesHelper args={[7 + 10]} />
      </mesh>
    </>
  );
};

export default Mars;
