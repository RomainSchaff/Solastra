import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

type NeptuneProps = {
  setNewTarget: (value: [number, number, number]) => void;
  planetActive: number;
  setPlanetActive: (value: number) => void;
};

const Neptune: React.FC<NeptuneProps> = ({
  setNewTarget,
  planetActive,
  setPlanetActive,
}) => {
  const mesh = useRef<THREE.Group>(null!);
  const ringMesh = useRef<THREE.Group>(null!);
  const neptune = useTexture("./Solastra/texture/2k_neptune.jpg");

  useFrame((state, delta) => {
    mesh.current.rotation.y += delta * 1.2;
    const time = state.clock.getElapsedTime();
    const angle = (time * 0.03) / 5;
    const x = 1200 * Math.cos(angle);
    const z = 1200 * Math.sin(angle);
    mesh.current.position.set(x, 0, z);
    if (planetActive === 8) {
      setNewTarget([x, 0, z]);
    } else if (planetActive === 0) {
      setNewTarget([0, 0, 0]);
    }
  });

  function handleClick() {
    if (planetActive !== 8) {
      setPlanetActive(8);
    } else if (planetActive === 8) {
      setPlanetActive(0);
    }
  }

  return (
    <>
      <group
        ref={mesh}
        scale={planetActive === 8 ? 1.3 : 1}
        position={[-1200, 0, 0]}
        onClick={handleClick}
        rotation-x={28 * (Math.PI / 180)}
      >
        <mesh>
          <sphereGeometry args={[19, 32, 32]} />
          <meshStandardMaterial map={neptune} color="white" />
          <axesHelper args={[19 + 10]} />
        </mesh>
        <group ref={ringMesh} rotation-x={90 * (Math.PI / 180)}>
          <mesh>
            <ringGeometry args={[27, 27.5, 60]} />
            <meshStandardMaterial
              color="rgb(159, 159, 159)"
              side={THREE.DoubleSide}
              transparent
              opacity={0.7}
            />
          </mesh>
          <mesh>
            <ringGeometry args={[33, 33.5, 60]} />
            <meshStandardMaterial
              color="rgb(200, 200, 200)"
              side={THREE.DoubleSide}
              transparent
              opacity={0.8}
            />
          </mesh>
          <mesh>
            <ringGeometry args={[33.6, 37, 60]} />
            <meshStandardMaterial
              color="rgb(159, 159, 159)"
              side={THREE.DoubleSide}
              transparent
              opacity={0.6}
            />
          </mesh>
          <mesh>
            <ringGeometry args={[41, 41.3, 60]} />
            <meshStandardMaterial
              color="rgb(159, 159, 159)"
              side={THREE.DoubleSide}
              transparent
              opacity={0.6}
            />
          </mesh>
        </group>
      </group>
    </>
  );
};

export default Neptune;
