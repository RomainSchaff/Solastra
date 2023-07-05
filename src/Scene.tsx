import Sun from "./components/Sun";
import Mercury from "./components/Mercury";
import Venus from "./components/Venus";
import Earth from "./components/Earth";
import Mars from "./components/Mars";
import Jupiter from "./components/Jupiter";
import Saturn from "./components/Saturn";
import Uranus from "./components/Uranus";
import Neptune from "./components/Neptune";
import { useState } from "react";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function Scene() {
  const [planetActive, setPlanetActive] = useState<number>(0);
  const [target, setTarget] = useState<[number, number, number]>([0, 0, 0]);
  const [newTarget, setNewTarget] = useState<[number, number, number]>([
    0, 0, 0,
  ]);
  const targetPosition = new THREE.Vector3();
  const { camera } = useThree();

  useFrame(() => {
    const t = 0.01;
    const x = (1 - t) * target[0] + t * newTarget[0];
    const y = (1 - t) * target[1] + t * newTarget[1];
    const z = (1 - t) * target[2] + t * newTarget[2];
    if (!(newTarget[0] === 0 && newTarget[1] === 0 && newTarget[2] === 0)) {
      targetPosition.set(x, y + 20, z + 200);
      camera.position.lerp(targetPosition, 0.01);
    }
    setTarget([x, y, z]);
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
      <axesHelper args={[100]} />
      <OrbitControls
        rotateSpeed={0.4}
        zoomSpeed={0.5}
        minDistance={50}
        maxDistance={2500}
        enablePan={false}
        target={target}
        // onStart={() => console.log("Oui")}
        // onEnd={() => console.log("Non")}
        onChange={() => console.log("Moving")}
      />
    </>
  );
}

export default Scene;
