import * as THREE from "three";
import { TextureLoader } from "three";
import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";

type VenusProps = {
  setNewTarget: (value: [number, number, number]) => void;
  planetActive: number;
  setPlanetActive: (value: number) => void;
};

const Venus: React.FC<VenusProps> = ({
  setNewTarget,
  planetActive,
  setPlanetActive,
}) => {
  const mesh = useRef<THREE.Group>(null!);
  const texture = useLoader(TextureLoader, "./texture/2k_venus_surface.jpg");
  const atmosphere = useLoader(TextureLoader, "./texture/2k_venus_surface.jpg");

  useFrame((state, delta) => {
    mesh.current.rotation.y += delta / 100;
    const time = state.clock.getElapsedTime();
    const angle = (time * 1.2) / 5;
    const x = 150 * Math.cos(angle);
    const z = 150 * Math.sin(angle);
    mesh.current.position.set(x, 0, z);
    if (planetActive === 2) {
      setNewTarget([x, 0, z]);
    } else if (planetActive === 0) {
      setNewTarget([0, 0, 0]);
    }
  });

  function handleClick() {
    if (planetActive !== 2) {
      setPlanetActive(2);
    } else if (planetActive === 2) {
      setPlanetActive(0);
    }
  }

  return (
    <>
      <group
        ref={mesh}
        scale={planetActive === 2 ? 1.3 : 1}
        position={[150, 0, 0]}
        onClick={handleClick}
        rotation-x={177 * (Math.PI / 180)}
      >
        <mesh>
          <sphereGeometry args={[8, 16, 16]} />
          <meshStandardMaterial
            metalness={0.4}
            roughness={1}
            map={texture}
            color={planetActive === 2 ? "rgb(165, 165, 165)" : "gray"}
          />
          <axesHelper args={[6 + 10]} />
        </mesh>
        <mesh>
          <sphereGeometry args={[9, 16, 16]} />
          <meshStandardMaterial
            map={atmosphere}
            color={planetActive === 2 ? "rgb(165, 165, 165)" : "gray"}
            transparent={true}
            opacity={0.6}
            depthWrite={false}
          />
        </mesh>
      </group>
    </>
  );
};

export default Venus;
