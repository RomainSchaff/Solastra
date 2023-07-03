// import { useFrame, useThree } from "@react-three/fiber";
// import React, { useRef, useState, useMemo, useEffect } from "react";

// function Camera() {
//     const cameraRef = useRef<THREE.Camera>(null!);
//     const { setDefaultCamera } = useThree();

//     // Make the camera known to the system
//     useEffect(() => void setDefaultCamera(cameraRef.current), []);

//     // Update it every frame
//     useFrame(() => cameraRef.current.updateMatrixWorld());

//   return <perspectiveCamera ref={cameraRef}>Camera</perspectiveCamera>;
// }

// export default Camera;
