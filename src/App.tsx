import "./App.css";
import { Canvas, useLoader } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { BackSide, TextureLoader } from "three";
import Planets from "./components/Planets";
import Sun from "./components/Sun";
import Moon from "./components/Moon";

function App() {
  // Load the texture
  const texture = useLoader(TextureLoader, "./texture/nightsky.png");

  return (
    <div id="scene">
      <Canvas>
        <ambientLight args={[0xffffff, 0.1]} />
        <Sun />
        <Planets size={4} distance={100} y={0} z={0} speed={1} children />
        <Planets size={6} distance={150} y={0} z={0} speed={0.8} children />
        <Planets size={7} distance={-200} y={0} z={0} speed={0.7}>
          <Moon size={2} distance={15} speed={2} />
        </Planets>
        <Planets size={5} distance={300} y={0} z={0} speed={0.6}>
          <Moon size={1} distance={15} speed={2.5} />
          <Moon size={0.6} distance={10} speed={2.2} />
        </Planets>
        <Planets size={29} distance={-500} y={0} z={0} speed={0.5}>
          {/* <Moon size={2} distance={35} speed={2} />
          <Moon size={2} distance={40} speed={3} />
          <Moon size={2} distance={45} speed={4} />
          <Moon size={2} distance={50} speed={3.5} /> */}
        </Planets>
        <Planets size={25} distance={-700} y={0} z={0} speed={0.4}>
          {/* <Moon size={1} distance={30} speed={1} />
          <Moon size={2} distance={35} speed={2} />
          <Moon size={2.2} distance={42} speed={2.3} />
          <Moon size={1.6} distance={50} speed={1.2} /> */}
        </Planets>
        <Planets size={20} distance={900} y={0} z={0} speed={0.3} children />
        <Planets size={19} distance={-1200} y={0} z={0} speed={0.2} children />
        <PerspectiveCamera
          makeDefault
          position={[0, 100, 700]}
          aspect={window.innerWidth / window.innerHeight}
          near={0.1}
          far={100000}
        />
        <axesHelper args={[1500]} />
        <OrbitControls
          rotateSpeed={0.4}
          zoomSpeed={0.5}
          minDistance={50}
          maxDistance={2500}
          enablePan={false}
        />
        <mesh>
          <sphereGeometry args={[5000, 64, 64]} />
          <meshBasicMaterial map={texture} side={BackSide} />
        </mesh>
      </Canvas>
    </div>
  );
}

export default App;
