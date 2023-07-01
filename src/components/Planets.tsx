import * as THREE from "three";
import { TextureLoader } from "three";
import React, { useRef, useState, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { MoonProps } from "./Moon";

interface PlanetProps {
  size: number;
  distance: number;
  y: number;
  z: number;
  orbitalSpeed: number;
  axialTilt: number;
  axialSpeed: number;
  name: string;
  color: string;
  children: React.ReactNode;
}

const Planets: React.FC<PlanetProps> = ({
  size,
  distance,
  y,
  z,
  orbitalSpeed,
  axialTilt,
  axialSpeed,
  name,
  color,
  children,
}) => {
  const mesh = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const texture = useLoader(
    TextureLoader,
    "./texture/rock_surface_diff_2k.jpg"
  );

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x = axialTilt * (Math.PI / 180);
      mesh.current.rotation.y += axialSpeed / 10;
      const time = state.clock.getElapsedTime();
      const angle = (time * orbitalSpeed) / 5;
      const x = distance * Math.cos(angle);
      const z = distance * Math.sin(angle);
      mesh.current.position.set(x, 0, z);
    }
  });

  // Géométrie pour la trajectoire orbitale
  const orbitGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      vertices.push(distance * Math.cos(theta), y, distance * Math.sin(theta));
    }
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    return geometry;
  }, [distance, y]);

  return (
    <>
      <lineLoop>
        <bufferGeometry attach="geometry" {...orbitGeometry} />
        <lineBasicMaterial attach="material" color="rgb(50, 50, 50)" />
      </lineLoop>
      <mesh
        ref={mesh}
        scale={active ? 1.3 : 1}
        position={[distance, y, z]}
        onClick={() => setActive(!active)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          metalness={0.5}
          roughness={0.58}
          map={texture}
          color={hovered ? "white" : color}
        />
        <axesHelper args={[size + 10]} />
      </mesh>
      {React.Children.map(children, (child) => {
        if (React.isValidElement<MoonProps>(child)) {
          return React.cloneElement(child, {
            planetPosition: mesh.current?.position,
          });
        }
        return child;
      })}
    </>
  );
};

export default Planets;
