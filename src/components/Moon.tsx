import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export interface MoonProps {
  size: number;
  distance: number;
  speed: number;
  planetPosition?: THREE.Vector3;
}

const Moon: React.FC<MoonProps> = ({
  size,
  distance,
  speed,
  planetPosition,
}) => {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (mesh.current && planetPosition) {
      const time = state.clock.getElapsedTime();
      const angle = time * speed;
      const x = planetPosition.x + distance * Math.cos(angle);
      const z = planetPosition.z + distance * Math.sin(angle);
      mesh.current.position.set(x, 0, z);
    }
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
};

export default Moon;
