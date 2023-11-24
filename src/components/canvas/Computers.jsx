import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, meshBounds, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
    const computer = useGLTF("./desktop_pc/scene.gltf");

    return (
        <mesh>
            <hemisphereLight intensity={0.15} groundColor="black" />
            <pointLight intensity={2} />
            {/* <pointLight intensity={100} position={[1, 1, 4]} decay={2.2} /> */}
            {/* <pointLight intensity={10} position={[0, -0.75, 0.75]} decay={2} distance={10}/> */}
            <pointLight
                intensity={10}
                position={[0, -1.5, -4.2]}
                color="red"
                decay={4}
            />
            <pointLight
                intensity={10}
                position={[0, -1.3, -4]}
                color="blue"
                decay={4}
            />
            <pointLight
                intensity={10}
                position={[0, -1.7, -3.8]}
                color="green"
                decay={4}
            />
            <pointLight
                intensity={0.5}
                position={[0.8, -3, -1.55]}
                color="red"
                decay={2}
            />
            {/* <pointLight intensity={10} position={[2.5,-2.8, 1]} decay={2} distance={100}/> */}
            {/* <pointLight intensity={10} position={[3,-2, 1]} decay={2} distance={10}/> */}
            {/* <directionalLight color="white" intensity={100} position={[0, 0, 1]} /> */}
            {/* <ambientLight intensity={2} /> */}
            <spotLight
                position={[-10, 40, 5]}
                angle={0.18}
                penumbra={1}
                intensity={10000}
                castShadow
                shadow-mapSize={1024}
            />
            <primitive
                object={computer.scene}
                scale={isMobile ? 0.5 : 0.75}
                position={isMobile ? [-3, -3, -1.2] : [0, -3.25, -1.5]}
                rotation={[-0.01, -0.2, -0.1]}
            />
        </mesh>
    );
};

const ComputersCanvas = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 500px)");
        setIsMobile(mediaQuery.matches);
        const handleMediaQueryChange = (e) => {
            setIsMobile(e.matches);
        };

        mediaQuery.addEventListener("change", handleMediaQueryChange);

        return () => {
            mediaQuery.removeEventListener("change", handleMediaQueryChange);
        };
    }, []);

    return (
        <Canvas
            frameloop="demand"
            shadows
            camera={{ position: [20, 3, 5], fov: 25 }}
            gl={{ preserveDrawingBuffer: true }}
        >
            <Suspense fallback={<CanvasLoader />}>
                <OrbitControls
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
                <Computers isMobile={isMobile} />
            </Suspense>

            <Preload all />
        </Canvas>
    );
};

export default ComputersCanvas;
