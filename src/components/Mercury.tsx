import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";

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
  const model = useGLTF("./Solastra/mercury.glb");
  // const mercury = useTexture("./Solastra/texture/2k_mercury.jpg");

  useFrame((state, delta) => {
    mesh.current.rotation.y += delta / 10;
    const time = state.clock.getElapsedTime();
    const angle = (time * 1.5) / 5;
    const x = 100 * Math.cos(angle);
    const z = 100 * Math.sin(angle);
    mesh.current.position.set(x, 0, z);
    if (planetActive === 1) {
      setNewTarget([x, 0, z]);
    } else if (planetActive === 0) {
      setNewTarget([0, 0, 0]);
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
        rotation-x={0.03 * (Math.PI / 180)}
      >
        <primitive object={model.scene} scale={0.013} />
        {/* <sphereGeometry args={[6, 16, 16]} />
        <meshStandardMaterial
          metalness={0.2}
          roughness={1}
          map={mercury}
          color="white"
        /> */}
        <axesHelper args={[6 + 10]} />
      </mesh>
    </>
  );
};

export default Mercury;
