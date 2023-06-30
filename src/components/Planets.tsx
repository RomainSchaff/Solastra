import * as THREE from "three";
import React, { useRef, useState, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { MoonProps } from "./Moon";

interface PlanetProps {
  size: number;
  distance: number;
  y: number;
  z: number;
  speed: number;
  children: React.ReactNode;
}

const Planets: React.FC<PlanetProps> = ({
  size,
  distance,
  y,
  z,
  speed,
  children,
}) => {
  const mesh = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((state, delta) => {
    if (mesh.current) {
      // rotation orbitale
      mesh.current.rotation.x += delta;
      const time = state.clock.getElapsedTime();
      const angle = time * speed;
      // Calculez les coordonnées x et z pour une orbite circulaire
      const x = distance * Math.cos(angle);
      const z = distance * Math.sin(angle);
      // Mettre à jour la position de la planète
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
      {/* Trajectoire orbitale */}
      <lineLoop>
        <bufferGeometry attach="geometry" {...orbitGeometry} />
        <lineBasicMaterial attach="material" color="grey" />
      </lineLoop>
      <mesh
        ref={mesh}
        scale={active ? 1.3 : 1}
        position={[distance, y, z]}
        onClick={() => setActive(!active)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial color={hovered ? "orange" : "brown"} />
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
