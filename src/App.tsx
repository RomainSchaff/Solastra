import "./App.css";
import { Canvas, useLoader } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { BackSide, TextureLoader } from "three";
import Planets from "./components/Planets";
import Sun from "./components/Sun";
import Moon from "./components/Moon";
import Mercury from "./components/Mercury";
import Venus from "./components/Venus";
import Earth from "./components/Earth";
import Mars from "./components/Mars";
import Jupiter from "./components/Jupiter";
import Saturn from "./components/Saturn";
import Uranus from "./components/Uranus";
import Neptune from "./components/Neptune";

function App() {
  // Load the texture
  const texture = useLoader(TextureLoader, "./texture/8k_stars_milky_way.jpg");

  return (
    <div id="scene">
      <Canvas>
        <ambientLight args={[0xffffff, 0.1]} />
        <Sun />
        <Mercury></Mercury>
        <Venus></Venus>
        <Earth></Earth>
        <Mars></Mars>
        <Jupiter></Jupiter>
        <Saturn></Saturn>
        <Uranus></Uranus>
        <Neptune></Neptune>
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
