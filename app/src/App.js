import "./index.css";
import Navbar from "./components/common/Navbar";
import Header from "./components/common/header/header";
import Footer from "./components/common/footer/Footer";
import Subtotal from "./components/common/subtotal/Subtotal";
//import ImageSlider from './components/common/ImageSlider'
//import { SliderData } from './components/common/SliderData'
import { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
//import { Router } from 'react-router-dom'
import { BrowserRouter as Router } from "react-router-dom";
import Selector from "./components/common/selector/Selector";
import Cloth from "./components/common/selector/ClothColor";
import Fabrics from "./components/common/fabrics/Fabrics";
import purple from "./components/common/images/purple.jpg";
import charcol from "./components/common/images/charcoal.png";
import ClothColor from "./components/common/selector/ClothColor";

function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/scene.gltf");
  return (
    <group ref={group} {...props} dispose={null} scale={1.5}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group
            position={[0, 100, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              geometry={nodes.Cylinder_Body_0.geometry}
              material={materials.Body}
              material-color={"white"}
            />
          </group>
          <group
            position={[0, -115, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              geometry={nodes.Cylinder001_Body_0.geometry}
              material={materials.Body}
              material-color={"gray"}
            />
          </group>
          <group
            position={[0, 177.69, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[155, 155, 100]}
          >
            <mesh
              geometry={nodes.Plane_Cloth_0.geometry}
              material={materials.Cloth}
              material-color={props.customColors.Cloth}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

function App() {
  const [Cloth, setCloth] = useState("#ffffff");

  const setTablecloth = (cloth) => {
    document.documentElement.style.setProperty("--bg-cloth", cloth);
  };

  const getTableCloth = (event) => {
    const currentCloth = event.target.style.getPropertyValue("--bg-cloth");
    setCloth = currentCloth;
    setTablecloth(currentCloth);

    console.log(currentCloth);
  };

  const cloths = ["#4834d4", "#f9ca24", "#30336b"];

  return (
    <div className='App'>
      <Header />
      <Router>
        <Navbar />
      </Router>
      <div className='wrapper'>
        <div className='card'>
          <div className='product-canvas'>
            <Canvas>
              <Suspense fallback={null}>
                <ambientLight />
                <spotLight
                  intensity={0.9}
                  angle={0.1}
                  penumbra={1}
                  position={[10, 15, 10]}
                  castShadow
                />

                <Model customColors={{ Cloth: Cloth }} />
                <OrbitControls
                  enablePan={true}
                  enableZoom={false}
                  enableRotate={true}
                />
              </Suspense>
            </Canvas>
          </div>

          <h2>Table Linens</h2>
          <div className='colors'>
            <div>
              <input
                type='color'
                id='TableCloth'
                name='TableCloth'
                value={Cloth}
                onChange={(e) => setCloth(e.target.value)}
              />
              <label htmlFor='head' className='color-tab'>
                Color
              </label>
              <div className='color-section'>
                {cloths.map((cloth, idx) => (
                  <ClothColor
                    key={idx}
                    Value={Cloth}
                    onClick={(e) => setCloth(e.target.value)}
                    cloth={cloth}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <Subtotal />
      </div>
      <Footer />
    </div>
  );
}

export default App;
