import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import { OrbitControls } from "@react-three/drei";
import { SketchPicker } from "react-color";
import gsap from 'gsap';
import {useGSAP} from '@gsap/react'

const Cube = ({ position, size, color }) => {
  const ref = useRef();
  const [isHovered, setIsHovered] = useState(false);

  useFrame((state,delta)=>{
    ref.current.rotation.x += delta
  })

  return (
    <mesh
      position={position}
      ref={ref}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <boxGeometry args={isHovered ? [2.02, 2.02, 2.02] : size} />
      <meshStandardMaterial color={isHovered ? "lightblue" : color} />
    </mesh>
  );
};

const Scene = ({ cubeColor }) => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[0, 1, 3]} intensity={1} />
      <Cube position={[0, 1, 0]} size={[2, 2, 2]} color={cubeColor} />
      <OrbitControls enableZoom={false} />
    </>
  );
};

function App() {
  const [color, setColor] = useState("orange");
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef();
  const headRef = useRef();
  const cubeRef = useRef();
  const buttonRef = useRef();

  const tl = gsap.timeline()

  useGSAP(()=>{
    tl.from(headRef.current,{
      opacity:0,
      y:-40
    }),
    tl.from(".para",{
      opacity:0,
      x:-30
    })
    tl.from(buttonRef.current,{
      opacity:0,
      x:30
    }),
    tl.from(cubeRef.current,{
      opacity:0,
      duration:2
    })
  })

  const handleChangeComplete = (color) => {
    setColor(color.hex);
  };

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const handleClickOutside = (event) => {
    if (pickerRef.current && !pickerRef.current.contains(event.target)) {
      setShowPicker(false);
    }
  };

  useEffect(() => {
    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPicker]);

  return (
    <>
      <div className="canvas-container relative" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1 ref={headRef} className="text-[40px] py-5  text-center md:text-[70px] font-bold text-white">Spinning Cube</h1>
        <p className="para text-white font-semibold">Pick a Color</p>
        <Canvas ref={cubeRef}>
          <Scene cubeColor={color} />
        </Canvas>
        <button ref={buttonRef} className="absolute bottom-[20%] hover:bg-yellow-600 text-[20px] hover:text-[22px] bg-yellow-500 rounded-md text-white font-bold px-[14px] py-[7px]" onClick={togglePicker}>Pick Color</button>
        {showPicker && (
          <div ref={pickerRef}>
            <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
