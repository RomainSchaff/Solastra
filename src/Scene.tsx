import Sun from "./components/Sun";
import Mercury from "./components/Mercury";
import Venus from "./components/Venus";
import Earth from "./components/Earth";
import Mars from "./components/Mars";
import Jupiter from "./components/Jupiter";
import Saturn from "./components/Saturn";
import Uranus from "./components/Uranus";
import Neptune from "./components/Neptune";
import { useState, useRef } from "react";
import {
  SoftShadows,
  PerspectiveCamera,
  OrbitControls,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Scene() {
  // const orbitRef = useRef<THREE.PerspectiveCamera>(null!);
  const [planetActive, setPlanetActive] = useState<number>(0);
  const [target, setTarget] = useState<[number, number, number]>([0, 0, 0]);
  const [newTarget, setNewTarget] = useState<[number, number, number]>([
    0, 0, 0,
  ]);
  const sunPos = new THREE.Vector3(0, 0, 0);
  const cameraDistance = 100;

  useFrame((state, delta) => {
    const t = 0.005;
    const x = (1 - t) * target[0] + t * newTarget[0];
    const y = (1 - t) * target[1] + t * newTarget[1];
    const z = (1 - t) * target[2] + t * newTarget[2];
    setTarget([x, y, z]);
    state.camera.lookAt(x, y, z);
    if (!(newTarget[0] === 0 && newTarget[1] === 0 && newTarget[2] === 0)) {
      const planetPos = new THREE.Vector3(x, y + 30, z);
      const direction = new THREE.Vector3()
        .subVectors(planetPos, sunPos)
        .normalize();
      const up = new THREE.Vector3(0, -1, 0); // Vecteur "haut"
      const right = new THREE.Vector3().crossVectors(direction, up).normalize();
      // Calculez la position de la caméra sur le côté opposé de la planète par rapport au soleil
      const cameraPosition = new THREE.Vector3().addVectors(
        planetPos,
        right.multiplyScalar(cameraDistance)
      );
      state.camera.position.lerp(cameraPosition, 0.005);
    }
  });

  return (
    <>
      <Sun />
      <Mercury
        setNewTarget={setNewTarget}
        planetActive={planetActive}
        setPlanetActive={setPlanetActive}
      ></Mercury>
      <Venus
        setNewTarget={setNewTarget}
        planetActive={planetActive}
        setPlanetActive={setPlanetActive}
      ></Venus>
      <Earth
        setNewTarget={setNewTarget}
        planetActive={planetActive}
        setPlanetActive={setPlanetActive}
      ></Earth>
      <Mars
        setNewTarget={setNewTarget}
        planetActive={planetActive}
        setPlanetActive={setPlanetActive}
      ></Mars>
      <Jupiter
        setNewTarget={setNewTarget}
        planetActive={planetActive}
        setPlanetActive={setPlanetActive}
      ></Jupiter>
      <Saturn
        setNewTarget={setNewTarget}
        planetActive={planetActive}
        setPlanetActive={setPlanetActive}
      ></Saturn>
      <Uranus
        setNewTarget={setNewTarget}
        planetActive={planetActive}
        setPlanetActive={setPlanetActive}
      ></Uranus>
      <Neptune
        setNewTarget={setNewTarget}
        planetActive={planetActive}
        setPlanetActive={setPlanetActive}
      ></Neptune>
      <PerspectiveCamera
        makeDefault
        position={[0, 100, 700]}
        aspect={window.innerWidth / window.innerHeight}
        near={0.1}
        far={100000}
      />
      <axesHelper args={[55]} />
      <SoftShadows size={50} samples={17} />
      <OrbitControls
        enabled={true}
        enableRotate={true}
        rotateSpeed={0.4}
        zoomSpeed={0.5}
        minDistance={50}
        maxDistance={2500}
        enablePan={false}
        enableZoom={true}
        target={target}
        // onStart={() => console.log("Oui")}
        // onEnd={() => console.log("Non")}
        onChange={() => console.log("Moving")}
      />
    </>
  );
}

export default Scene;
