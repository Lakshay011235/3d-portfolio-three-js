import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
    Decal,
    Float,
    OrbitControls,
    Preload,
    useTexture,
} from "@react-three/drei";

import CanvasLoader from "../Loader";

const Ball = (props) => {
    const [decal] = useTexture([props.imgUrl]);
    return (
        <Float speed={7} rotationIntensity={0.2} floatIntensity={3}>
            <ambientLight intensity={0.25} />
            <directionalLight position={[0, 0, 0.05]} />
            <mesh castShadow receiveShadow scale={2.75}>
              <icosahedronGeometry args={[1,1]} />
              <meshStandardMaterial color="#fff8eb" polygonOffset polygonOffsetFactor={-5} flatShading/>
              <Decal position={[0,0,1]} rotation={[2*Math.PI, 0, 6.25]} map={decal}/>
            </mesh>
        </Float>
    );
};

const BallCanvas = ({ icon }) => {
    return (
        <Canvas frameloop="demand" gl={{ preserveDrawingBuffer: true }}>
            <Suspense fallback={<CanvasLoader />}>
                <OrbitControls
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                    // autoRotate={true}
                    // autoRotateSpeed={500}
                    // rotateSpeed={5}
                />
                {/* <hemisphereLight intensity={0.25} /> */}
                {/* <directionalLight position={[0, 0, 0.05]} intensity={0.5}/> */}
                <Ball imgUrl={icon} />
            </Suspense>

            <Preload all />
        </Canvas>
    );
};
export default BallCanvas;
