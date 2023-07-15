import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

type EarthProps = {
  setNewTarget: (value: [number, number, number]) => void;
  planetActive: number;
  setPlanetActive: (value: number) => void;
};

const Earth: React.FC<EarthProps> = ({
  setNewTarget,
  planetActive,
  setPlanetActive,
}) => {
  const mesh = useRef<THREE.Group>(null!);
  const earthMesh = useRef<THREE.Group>(null!);
  const moonMesh = useRef<THREE.Mesh>(null!);
  const [surface, atmosphere, moon] = useTexture([
    "./Solastra/texture/2k_earth_surface_daymap.jpg",
    "./Solastra/texture/2k_earth_atmosphere.jpg",
    "./Solastra/texture/2k_moon.jpg",
  ]);

  useFrame((state, delta) => {
    earthMesh.current.rotation.y += delta;
    const time = state.clock.getElapsedTime();
    const angle = (time * 0.5) / 5;
    const x = 200 * Math.cos(angle);
    const z = 200 * Math.sin(angle);
    mesh.current.position.set(x, 0, z);
    // Moon rotation
    const moonAngle = time / 1;
    const moonX = 25 * Math.cos(-moonAngle);
    const moonY = 5 * Math.sin(moonAngle);
    const moonZ = 25 * Math.sin(-moonAngle);
    moonMesh.current.position.set(moonX, moonY, moonZ);
    if (planetActive === 3) {
      setNewTarget([x, 0, z]);
    }
    // if (planetActive !== 3) {
    //   mesh.current.position.set(x, 0, z);
    if (planetActive === 0) {
      setNewTarget([0, 0, 0]);
    }
  });

  function handleClick() {
    if (planetActive !== 3) {
      setPlanetActive(3);
    } else if (planetActive === 3) {
      setPlanetActive(0);
    }
  }

  return (
    <>
      <group
        ref={mesh}
        position={[-200, 0, 0]}
        rotation-x={23 * (Math.PI / 180)}
        onClick={handleClick}
      >
        <group ref={earthMesh} scale={planetActive === 3 ? 1.3 : 1}>
          <mesh receiveShadow>
            <sphereGeometry args={[11, 32, 32]} />
            <meshStandardMaterial map={surface} color="white" />
            <axesHelper args={[11 + 10]} />
          </mesh>
          <mesh>
            <sphereGeometry args={[12, 32, 32]} />
            <meshStandardMaterial
              map={atmosphere}
              color="white"
              transparent
              opacity={0.4}
              depthWrite={false}
            />
          </mesh>
        </group>
        <mesh ref={moonMesh} castShadow>
          <sphereGeometry args={[3, 16, 16]} />
          <meshStandardMaterial map={moon} color="white" />
        </mesh>
      </group>
    </>
  );
};

export default Earth;
