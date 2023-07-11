import * as THREE from "three";
import { TextureLoader } from "three";
import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";

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
  const texture = useLoader(TextureLoader, "./texture/2k_earth_daymap.jpg");
  const atmosphere = useLoader(TextureLoader, "./texture/2k_earth_clouds.jpg");
  const moonTexture = useLoader(TextureLoader, "./texture/2k_moon.jpg");

  useFrame((state, delta) => {
    earthMesh.current.rotation.y += delta;
    const time = state.clock.getElapsedTime();
    const angle = (time * 0.5) / 5;
    const x = 200 * Math.cos(angle);
    const z = 200 * Math.sin(angle);
    mesh.current.position.set(x, 0, z);
    // Moon rotation
    const moonAngle = time / 1;
    const moonX = 30 * Math.cos(moonAngle);
    const moonY = 10 * Math.sin(moonAngle);
    const moonZ = 30 * Math.sin(moonAngle);
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
        <group
          ref={earthMesh}
          scale={planetActive === 3 ? 1.3 : 1}
          receiveShadow
        >
          <mesh receiveShadow>
            <sphereGeometry args={[11, 32, 32]} />
            <meshStandardMaterial
              metalness={0.2}
              roughness={0.9}
              map={texture}
              color={planetActive === 3 ? "rgb(165, 165, 165)" : "gray"}
            />
            <axesHelper args={[11 + 10]} />
          </mesh>
          <mesh receiveShadow>
            <sphereGeometry args={[12, 32, 32]} />
            <meshStandardMaterial
              map={atmosphere}
              color={planetActive === 3 ? "rgb(165, 165, 165)" : "gray"}
              transparent={true}
              opacity={0.5}
              depthWrite={false}
            />
          </mesh>
        </group>
        <mesh ref={moonMesh} castShadow>
          <sphereGeometry args={[3, 16, 16]} />
          <meshStandardMaterial
            metalness={0.2}
            roughness={0.9}
            map={moonTexture}
            color={planetActive === 3 ? "rgb(165, 165, 165)" : "gray"}
          />
        </mesh>
      </group>
    </>
  );
};

export default Earth;
