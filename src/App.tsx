import "./App.css";
import { Canvas, useLoader } from "@react-three/fiber";
import { BackSide, TextureLoader } from "three";
import Scene from "./Scene";

function App() {
  const texture = useLoader(TextureLoader, "./texture/8k_stars_milky_way.jpg");

  return (
    <div id="scene">
      <Canvas>
        <ambientLight args={[0xffffff, 0.2]} />
        <Scene />
        <mesh>
          <sphereGeometry args={[5000, 64, 64]} />
          <meshBasicMaterial map={texture} side={BackSide} />
        </mesh>
      </Canvas>
    </div>
  );
}

export default App;
