import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, useGLTF } from "@react-three/drei";
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
  const meshMars = useRef<THREE.Mesh>(null!);
  const group = useRef<THREE.Group>(null!);
  const meshPhobos = useRef<THREE.Mesh>(null!);
  const meshDeimos = useRef<THREE.Mesh>(null!);
  const mars = useTexture("./Solastra/texture/2k_mars.jpg");
  const phobos = useGLTF("./Solastra/phobos.glb");
  const deimos = useGLTF("./Solastra/deimos.glb");

  useFrame((state, delta) => {
    meshMars.current.rotation.y += delta;
    const time = state.clock.getElapsedTime();
    const angle = (time * 0.3) / 5;
    const x = 300 * Math.cos(angle);
    const z = 300 * Math.sin(angle);
    group.current.position.set(x, 0, z);
    // Phobos rotation
    const phobosAngle = time * 3;
    const phobosX = 10 * Math.cos(-phobosAngle);
    const phobosZ = 10 * Math.sin(-phobosAngle);
    meshPhobos.current.position.set(phobosX, 0, phobosZ);
    // Deimos rotation
    const deimosAngle = time / 2;
    const deimosX = 20 * Math.cos(-deimosAngle);
    const deimosZ = 20 * Math.sin(-deimosAngle);
    meshDeimos.current.position.set(deimosX, 0, deimosZ);
    if (planetActive === 4) {
      setNewTarget([x, 0, z]);
    } else if (planetActive === 0) {
      setNewTarget([0, 0, 0]);
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
      <group
        ref={group}
        scale={planetActive === 4 ? 1.3 : 1}
        position={[300, 0, 0]}
        onClick={handleClick}
        rotation-x={25 * (Math.PI / 180)}
      >
        <mesh ref={meshMars}>
          <sphereGeometry args={[7, 32, 32]} />
          <meshStandardMaterial
            metalness={0.3}
            roughness={1}
            map={mars}
            color="white"
          />
          <axesHelper args={[7 + 10]} />
        </mesh>
        <primitive ref={meshPhobos} object={phobos.scene} scale={0.1} />
        <primitive ref={meshDeimos} object={deimos.scene} scale={0.1} />
      </group>
    </>
  );
};

export default Mars;
