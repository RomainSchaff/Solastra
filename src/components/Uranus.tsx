import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
type UranusProps = {
  setNewTarget: (value: [number, number, number]) => void;
  planetActive: number;
  setPlanetActive: (value: number) => void;
};

const Uranus: React.FC<UranusProps> = ({
  setNewTarget,
  planetActive,
  setPlanetActive,
}) => {
  const mesh = useRef<THREE.Group>(null!);
  const ringMesh = useRef<THREE.Group>(null!);
  const uranus = useTexture("./Solastra/texture/2k_uranus.jpg");

  useFrame((state, delta) => {
    mesh.current.rotation.y += delta * 1.2;
    const time = state.clock.getElapsedTime();
    const angle = (time * 0.05) / 5;
    const x = 900 * Math.cos(angle);
    const z = 900 * Math.sin(angle);
    mesh.current.position.set(x, 0, z);
    if (planetActive === 7) {
      setNewTarget([x, 0, z]);
    } else if (planetActive === 0) {
      setNewTarget([0, 0, 0]);
    }
  });

  function handleClick() {
    if (planetActive !== 7) {
      setPlanetActive(7);
    } else if (planetActive === 7) {
      setPlanetActive(0);
    }
  }

  return (
    <>
      <group
        ref={mesh}
        scale={planetActive === 7 ? 1.3 : 1}
        position={[900, 0, 0]}
        onClick={handleClick}
        rotation-x={98 * (Math.PI / 180)}
      >
        <mesh>
          <sphereGeometry args={[20, 32, 32]} />
          <meshStandardMaterial
            metalness={0}
            roughness={1}
            map={uranus}
            color="white"
          />
          <axesHelper args={[20 + 10]} />
        </mesh>
        <group ref={ringMesh} rotation-x={90 * (Math.PI / 180)}>
          <mesh>
            <ringGeometry args={[30, 30.2, 60]} />
            <meshStandardMaterial
              metalness={0}
              roughness={1}
              color="white"
              side={THREE.DoubleSide}
              transparent
              opacity={0.7}
            />
          </mesh>
          <mesh>
            <ringGeometry args={[30.6, 31.8, 60]} />
            <meshStandardMaterial
              metalness={0}
              roughness={1}
              color="gray"
              side={THREE.DoubleSide}
              transparent
              opacity={0.6}
            />
          </mesh>
          <mesh>
            <ringGeometry args={[31.9, 34, 60]} />
            <meshStandardMaterial
              metalness={0}
              roughness={1}
              color="white"
              side={THREE.DoubleSide}
              transparent
              opacity={0.7}
            />
          </mesh>
        </group>
      </group>
    </>
  );
};

export default Uranus;
