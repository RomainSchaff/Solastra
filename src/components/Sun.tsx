import React, { useRef, useState, useMemo, useEffect } from "react";
// import { folder, useControls } from "leva";
import { extend, useFrame, useLoader, useThree } from "@react-three/fiber";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { TextureLoader, Vector2 } from "three";

// Ensure EffectComposer, RenderPass, UnrealBloomPass are available within r3f
extend({ EffectComposer, RenderPass, UnrealBloomPass });

const Effects: React.FC = () => {
  const { gl, scene, camera, size } = useThree();
  const bloomPass = useRef<UnrealBloomPass>();
  const composer = useRef<EffectComposer>();

  useMemo(() => {
    const renderScene = new RenderPass(scene, camera);

    bloomPass.current = new UnrealBloomPass(
      new Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );
    bloomPass.current.threshold = 0;
    bloomPass.current.strength = 0.7;
    bloomPass.current.radius = 1;

    composer.current = new EffectComposer(gl);
    composer.current.addPass(renderScene);
    composer.current.addPass(bloomPass.current!);
  }, [gl, scene, camera]);

  useEffect(() => {
    if (composer.current) {
      composer.current.setSize(size.width, size.height);
    }
  }, [size]);

  useFrame(() => {
    if (composer.current) {
      composer.current.render();
    }
  }, 1);

  return null;
};

// function ControlBox() {
//   // Load the texture
//   const texture = useLoader(TextureLoader, "./texture/2k_sun.jpg");

//   const { scale, widthSegments, heightSegments, color, wireframe } =
//     useControls("Box", {
//       transform: folder({
//         scale: {
//           value: 50,
//           min: 10,
//           max: 100,
//           step: 2,
//         },
//         widthSegments: {
//           value: 32,
//           min: 3,
//           max: 64,
//           step: 1,
//         },
//         heightSegments: {
//           value: 16,
//           min: 2,
//           max: 32,
//           step: 1,
//         },
//       }),
//       material: folder({
//         color: "#ff7c00",
//         wireframe: true,
//       }),
//     });

//   return (
//     <>
//       <sphereGeometry args={[scale, widthSegments, heightSegments]} />
//       <meshBasicMaterial
//         color={hovered ? color : "white"}
//         wireframe={wireframe}
//         map={texture}
//       />
//     </>
//   );
// }

const Sun: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const [hovered, setHover] = useState(false);
  const texture = useLoader(TextureLoader, "./texture/2k_sun.jpg");

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001; // Changez cette valeur pour ajuster la vitesse de rotation
    }
  });

  return (
    <>
      <Effects />
      <pointLight
        ref={lightRef}
        position={[0, 0, 0]}
        color="white"
        intensity={2.8}
      />
      <mesh
        ref={meshRef}
        position={[0, 0, 0]}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <sphereGeometry args={[30, 32, 16]} />
        <meshBasicMaterial
          color={hovered ? "white" : "yellow"}
          map={texture}
          wireframe
        />
      </mesh>
    </>
  );
};

export default Sun;
