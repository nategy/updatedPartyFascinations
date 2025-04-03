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
import { useTexture } from "@react-three/drei";
//import { Router } from 'react-router-dom'
import { BrowserRouter as Router } from "react-router-dom";
import TextureSelector from "./components/common/texturehandler/TextureSelector";

import Selector from "./components/common/selector/Selector";
import Cloth from "./components/common/selector/ClothColor";
import Fabrics from "./components/common/fabrics/Fabrics";
import purple from "./components/common/images/purple.jpg";
import charcol from "./components/common/images/charcoal.png";
import ClothColor from "./components/common/selector/ClothColor";
import ChairRunnerSelector from "./components/common/texturehandler/ChairRunnerSelector";
import TableRunnerSelector from "./components/common/texturehandler/TableRunner";

function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("TableScene.gltf");
  const texture = useTexture(props.texture.selectedTexture);

  return (
    <group ref={group} {...props} dispose={null} scale={1.5}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group
            position={[0, 70, 0]}
            rotation={[-Math.PI / -12, 0, 0]}
            scale={[200, 200, 200]}
          >
            <mesh geometry={nodes.TableCloth.geometry}>
              <meshStandardMaterial map={texture} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}

function App() {
  const [Cloth, setCloth] = useState("#ffffff");

  const [selectedTexture, setSelectedTexture] = useState("/testtexture.jpg"); // Initial texture
  const handleTextureSelect = (texturePath) => {
    setSelectedTexture(texturePath);
  };

  const [selectedTableRunnerTexture, setSelectedTableRunnerTexture] =
    useState("/testtexture.jpg"); // Initial texture
  const handleTableRunnerTextureSelect = (tablerunnertexturePath) => {
    setSelectedTableRunnerTexture(tablerunnertexturePath);
  };

  const texturePaths = [
    "/tablecloths/pexels-anni-roenkae-4175070.jpg",
    "/tablecloths/pexels-laura-james-6101966.jpg",
    "/tablecloths/pexels-maryann-kariuki-4303015.jpg",
    // Add more texture paths as needed
  ];

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

                <Model texture={{ selectedTexture: selectedTexture }} />
                <OrbitControls
                  enablePan={true}
                  enableZoom={false}
                  enableRotate={true}
                />
              </Suspense>
            </Canvas>
          </div>
          <div className='tcselector-wrapper'>
            <TextureSelector
              textures={texturePaths}
              selectedTexture={selectedTexture}
              onSelectTexture={handleTextureSelect}
            />
          </div>
          <div className='trselector-wrapper'>
            <TableRunnerSelector
              textures={texturePaths}
              selectedTableRunnerTexture={selectedTableRunnerTexture}
              onSelectTexture={handleTableRunnerTextureSelect}
            />
          </div>
          <div className='crselector-wrapper'>
            <ChairRunnerSelector
              textures={texturePaths}
              selectedTexture={selectedTexture}
              onSelectTexture={handleTextureSelect}
            />
          </div>
        </div>
        <Subtotal />
      </div>
      <Footer />
    </div>
  );
}

export default App;

{
  /* 
//pertaining to model  
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

//in main function
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


  //original model element
      <Model customColors={{ Cloth: Cloth }} />


//color section
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
*/
}

/* 
//pertaining to model  
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

//in main function
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


  //original model element
      <Model customColors={{ Cloth: Cloth }} />


//color section
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

          ///// start of 3-31 table cloth and table runner

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
import { useTexture } from "@react-three/drei";
//import { Router } from 'react-router-dom'
import { BrowserRouter as Router } from "react-router-dom";
import TextureSelector from "./components/common/texturehandler/TextureSelector";

import Selector from "./components/common/selector/Selector";
import Cloth from "./components/common/selector/ClothColor";
import Fabrics from "./components/common/fabrics/Fabrics";
import purple from "./components/common/images/purple.jpg";
import charcol from "./components/common/images/charcoal.png";
import ClothColor from "./components/common/selector/ClothColor";
import ChairRunnerSelector from "./components/common/texturehandler/ChairRunnerSelector";
import TableRunnerSelector from "./components/common/texturehandler/TableRunner";
import ChairCoverSelector from "./components/common/texturehandler/ChairCoverSelector";

function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/TableScene.gltf");
  const tableTexture = useTexture(props.tableTexture.selectedTableTexture);
  // const tableRunnerTexture = useTexture(
  //   props.tableRunnerTexture.selectedTableRunnerTexture
  // );

  return (
    <group ref={group} {...props} dispose={null} scale={3}>
      <group rotation={[-Math.PI / 20, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group
            position={[0, 0, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[100, 100, 100]}
          >
            <mesh geometry={nodes.TableCloth.geometry}>
              <meshStandardMaterial map={tableTexture} />
            </mesh>
          </group>
          {/* <group
            position={[0, 6, -5]}
            rotation={[Math.PI / 1.85, 0, 0]}
            scale={[40, 50, 15]}
          >
            <mesh geometry={nodes.TableRunner.geometry}>
              <meshStandardMaterial map={tableRunnerTexture} />
            </mesh>
          </group>
        </group>
        </group>
      </group>
    );
  }
  
  function App() {
    const [Cloth, setCloth] = useState("#ffffff");
    const [selectedTableTexture, setSelectedTableTexture] =
      useState("/testtexture.jpg"); // Initial texture
    const [selectedTableRunnerTexture, setSelectedTableRunnerTexture] = useState(
      "/tablecloths/pexels-anni-roenkae-4175070.jpg"
    ); // Initial texture
    const handleTextureSelect = (texturePath) => {
      setSelectedTableTexture(tableTexturePaths);
    };
    // const handleTableRunnerTextureSelect = (texturePath) => {
    //   setSelectedTableRunnerTexture(tableRunnerTexturePaths);
    //   console.log(texturePath);
    // };
  
    const tableTexturePaths = [
      "/tablecloths/pexels-anni-roenkae-4175070.jpg",
      "/tablecloths/pexels-laura-james-6101966.jpg",
      "/tablecloths/pexels-maryann-kariuki-4303015.jpg",
      // Add more texture paths as needed
    ];
  
    const tableRunnerTexturePaths = [
      "/tablecloths/pexels-anni-roenkae-4175070.jpg",
      "/tablecloths/pexels-laura-james-6101966.jpg",
      "/tablecloths/pexels-maryann-kariuki-4303015.jpg",
      // Add more texture paths as needed
    ];
  
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
  
                  <Model
                    tableTexture={{ selectedTableTexture: selectedTableTexture }}
                    // tableRunnerTexture={{
                    //   selectedTableRunnerTexture: selectedTableRunnerTexture,
                    // }}
                  />
                  <OrbitControls
                    enablePan={true}
                    enableZoom={false}
                    enableRotate={true}
                  />
                </Suspense>
              </Canvas>
            </div>
            <div className='tcselector-wrapper'>
              <TextureSelector
                textures={tableTexturePaths}
                selectedTexture={selectedTableTexture}
                onSelectTexture={handleTextureSelect}
              />
            </div>
            {/* <div className='trselector-wrapper'>
              <TableRunnerSelector
                textures={tableRunnerTexturePaths}
                selectedTexture={selectedTableRunnerTexture}
                onSelectTexture={handleTableRunnerTextureSelect}
              />
            </div> 
            {/* <div className='ccselector-wrapper'>
              <ChairCoverSelector
                textures={tableTexturePaths}
                selectedTexture={selectedTableTexture}
                onSelectTexture={handleTextureSelect}
              />
            </div>
            <div className='crselector-wrapper'>
              <ChairRunnerSelector
                textures={tableTexturePaths}
                selectedTexture={selectedTableTexture}
                onSelectTexture={handleTextureSelect}
              />
            </div> 
          </div>
          <Subtotal />
        </div>
        <Footer />
      </div>
    );
  }
  
  export default App;
  
  {
    /* 
  //pertaining to model  
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
  
  //in main function
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
  
  
    //original model element
        <Model customColors={{ Cloth: Cloth }} />
  
  
  //color section
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
  */
