import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

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

  const [surface, atmosphere] = useTexture([
    "./Solastra/texture/2k_venus_surface.jpg",
    "./Solastra/texture/2k_venus_atmosphere.jpg",
  ]);

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
            map={surface}
            color="white"
          />
          <axesHelper args={[6 + 10]} />
        </mesh>
        <mesh>
          <sphereGeometry args={[9, 16, 16]} />
          <meshStandardMaterial
            map={atmosphere}
            color="white"
            transparent={true}
            opacity={0.8}
            depthWrite={false}
          />
        </mesh>
      </group>
    </>
  );
};

export default Venus;
