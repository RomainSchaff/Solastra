import React, { useCallback } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";

function App() {
  const handleDoubleClick = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(console.error);
    } else if (document.exitFullscreen) {
      document.exitFullscreen().catch(console.error);
    }
  }, []);

  return (
    <div id="scene">
      <nav id="navbar">
        <h1>
          S<span>o</span>lastra
        </h1>
        <div>
          <button className="navbar_button">Mercury</button>
          <button className="navbar_button">Venus</button>
          <button className="navbar_button">Earth</button>
          <button className="navbar_button">Mars</button>
          <button className="navbar_button">Jupiter</button>
          <button className="navbar_button">Saturn</button>
          <button className="navbar_button">Uranus</button>
          <button className="navbar_button">Neptune</button>
          <button className="navbar_button_toggle">+</button>
        </div>
      </nav>
      <Canvas shadows onDoubleClick={handleDoubleClick}>
        <ambientLight args={[0xffffff, 0.1]} />
        <Scene />
      </Canvas>
    </div>
  );
}

export default App;
