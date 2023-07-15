import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

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
  const model = useGLTF("./Solastra/saturn.glb");

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
        <primitive object={model.scene} scale={0.05} />
      </group>
    </>
  );
};

export default Saturn;
