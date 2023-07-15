import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";

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
  const group = useRef<THREE.Group>(null!);
  const jupiterMesh = useRef<THREE.Mesh>(null!);
  const ioMesh = useRef<THREE.Mesh>(null!);
  const europaMesh = useRef<THREE.Mesh>(null!);
  const ganymedeMesh = useRef<THREE.Mesh>(null!);
  const callistoMesh = useRef<THREE.Mesh>(null!);
  const jupiter = useTexture("./Solastra/texture/2k_jupiter.jpg");
  const [io, europa, ganymede, callisto] = useGLTF([
    "./Solastra/io.glb",
    "./Solastra/europa.glb",
    "./Solastra/ganymede.glb",
    "./Solastra/callisto.glb",
  ]);

  useFrame((state, delta) => {
    jupiterMesh.current.rotation.y += delta * 2;
    const time = state.clock.getElapsedTime();
    const angle = (time * 0.2) / 5;
    const x = 500 * Math.cos(angle);
    const z = 500 * Math.sin(angle);
    group.current.position.set(x, 0, z);
    // Io rotation
    const ioAngle = time;
    const ioX = 45 * Math.cos(-ioAngle);
    const ioZ = 45 * Math.sin(-ioAngle);
    ioMesh.current.position.set(ioX, 0, ioZ);
    // Europa rotation
    const europaAngle = time / 2;
    const europaX = 60 * Math.cos(-europaAngle);
    const europaZ = 60 * Math.sin(-europaAngle);
    europaMesh.current.position.set(europaX, 0, europaZ);
    // Io rotation
    const ganymedeAngle = time / 4;
    const ganymedeX = 80 * Math.cos(-ganymedeAngle);
    const ganymedeZ = 80 * Math.sin(-ganymedeAngle);
    ganymedeMesh.current.position.set(ganymedeX, 0, ganymedeZ);
    // Io rotation
    const callistoAngle = time / 8;
    const callistoX = 115 * Math.cos(-callistoAngle);
    const callistoZ = 115 * Math.sin(-callistoAngle);
    callistoMesh.current.position.set(callistoX, 0, callistoZ);
    if (planetActive === 5) {
      setNewTarget([x, 0, z]);
    } else if (planetActive === 0) {
      setNewTarget([0, 0, 0]);
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
      <group
        ref={group}
        scale={planetActive === 5 ? 1.3 : 1}
        position={[-500, 0, 0]}
        onClick={handleClick}
        rotation-x={3 * (Math.PI / 180)}
      >
        <mesh ref={jupiterMesh}>
          <sphereGeometry args={[29, 32, 32]} />
          <meshStandardMaterial map={jupiter} color="rgb(229, 229, 229)" />
          <axesHelper args={[29 + 10]} />
        </mesh>
        <primitive ref={ioMesh} object={io.scene} scale={0.0045} />
        <primitive ref={europaMesh} object={europa.scene} scale={0.005} />
        <primitive ref={ganymedeMesh} object={ganymede.scene} scale={0.0055} />
        <primitive ref={callistoMesh} object={callisto.scene} scale={0.005} />
      </group>
    </>
  );
};

export default Jupiter;
