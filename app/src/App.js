import "./index.css";
import Navbar from "./components/common/Navbar";
import Header from "./components/common/header/header";
import Footer from "./components/common/footer/Footer";
import { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useTexture } from "@react-three/drei";
import { BrowserRouter as Router } from "react-router-dom";

import TextureSelector from "./components/common/texturehandler/TextureSelector";

function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("TableScene.gltf");

  const tableClothTexture = useTexture(
    props.tableClothTexture.selectedTableClothTexture
  );
  const tableRunnerTexture = useTexture(
    props.tableRunnerTexture.selectedTableRunnerTexture
  );
  const chairClothTexture = useTexture(
    props.chairCoverTexture.selectedChairCoverTexture
  );

  return (
    <group ref={group} {...props} dispose={null} scale={1.5}>
      {/* Root rotation for GLTF import alignment */}
      <group rotation={[0, 0, 0]} scale={0.01}>
        {/* Tablecloth */}
        <group name='Tablecloth' position={[0, 0, 0]} scale={[200, 200, 200]}>
          <mesh geometry={nodes.TableCloth.geometry}>
            <meshStandardMaterial map={tableClothTexture} />
          </mesh>
        </group>

        {/* Table Runner */}
        <group
          name='TableRunner'
          position={[0, 5.5, 0]}
          rotation={[0, 0, Math.PI]}
          scale={[100, 2, 25]}
        >
          <mesh geometry={nodes.TableRunner.geometry}>
            <meshStandardMaterial map={tableRunnerTexture} />
          </mesh>
        </group>

        {/* Chair */}
        <group
          name='Chair1'
          position={[0, 0, -300]}
          rotation={[0, Math.PI, 0]} // 300 deg ≈ 5.24 rad ≈ 1.66π
          scale={[80, 80, 80]}
        >
          <mesh geometry={nodes.Chair.geometry}>
            <meshStandardMaterial map={chairClothTexture} />
          </mesh>
        </group>

        {/* Chair 2*/}
        <group
          name='Chair2'
          position={[-250, 0, -170]}
          rotation={[0, (8 * Math.PI) / 6, 0]} // 300 deg ≈ 5.24 rad ≈ 1.66π
          scale={[80, 80, 80]}
        >
          <mesh geometry={nodes.Chair.geometry}>
            <meshStandardMaterial map={chairClothTexture} />
          </mesh>
        </group>

        {/* Chair 3*/}
        <group
          name='Chair3'
          position={[250, 0, -170]}
          rotation={[0, (4 * Math.PI) / 6, 0]} // 300 deg ≈ 5.24 rad ≈ 1.66π
          scale={[80, 80, 80]}
        >
          <mesh geometry={nodes.Chair.geometry}>
            <meshStandardMaterial map={chairClothTexture} />
          </mesh>
        </group>

        {/* Chair 4*/}
        <group
          name='Chair4'
          position={[0, 0, 300]}
          rotation={[0, 0, 0]} // 300 deg ≈ 5.24 rad ≈ 1.66π
          scale={[80, 80, 80]}
        >
          <mesh geometry={nodes.Chair.geometry}>
            <meshStandardMaterial map={chairClothTexture} />
          </mesh>
        </group>

        {/* Chair 5*/}
        <group
          name='Chair5'
          position={[-250, 0, 150]}
          rotation={[0, (10 * Math.PI) / 6, 0]} // 300 deg ≈ 5.24 rad ≈ 1.66π
          scale={[80, 80, 80]}
        >
          <mesh geometry={nodes.Chair.geometry}>
            <meshStandardMaterial map={chairClothTexture} />
          </mesh>
        </group>

        {/* Chair 6*/}
        <group
          name='Chair6'
          position={[250, 0, 150]}
          rotation={[0, Math.PI / 3, 0]} // 300 deg ≈ 5.24 rad ≈ 1.66π
          scale={[80, 80, 80]}
        >
          <mesh geometry={nodes.Chair.geometry}>
            <meshStandardMaterial map={chairClothTexture} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

function App() {
  const [selectedTableClothTexture, setSelectedTableClothTexture] = useState(
    "/pexels-maryann-kariuki-4303015.jpg"
  ); // Initial texture
  const handleTableClothTextureSelect = (tableClothTexturePath) => {
    setSelectedTableClothTexture(tableClothTexturePath);
  };

  const [selectedTableRunnerTexture, setSelectedTableRunnerTexture] = useState(
    "/pexels-maryann-kariuki-4303015.jpg"
  ); // Initial texture
  const handleTableRunnerTextureSelect = (tablerunnertexturePath) => {
    setSelectedTableRunnerTexture(tablerunnertexturePath);
  };

  const [selectedChairCoverTexture, setSelectedChairCoverTexture] =
    useState("/testtexture.jpg"); // Initial texture
  const handleChairCoverTextureSelect = (chairCoverTexturePath) => {
    setSelectedChairCoverTexture(chairCoverTexturePath);
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
            <Canvas camera={{ position: [0, 5, 15], fov: 35 }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.5} />
                <spotLight
                  intensity={0.9}
                  angle={0.15}
                  penumbra={1}
                  position={[10, 15, 10]}
                  castShadow
                />
                <Model
                  tableClothTexture={{
                    selectedTableClothTexture: selectedTableClothTexture,
                  }}
                  tableRunnerTexture={{
                    selectedTableRunnerTexture: selectedTableRunnerTexture,
                  }}
                  chairCoverTexture={{
                    selectedChairCoverTexture: selectedChairCoverTexture,
                  }}
                />
                <OrbitControls
                  enablePan={true}
                  enableZoom={true}
                  enableRotate={true}
                  maxPolarAngle={Math.PI / 2.2}
                  minDistance={5}
                  maxDistance={25}
                />
              </Suspense>
            </Canvas>
          </div>
          <div className='tcselector-wrapper'>
            <TextureSelector
              selector='Table Cloths'
              textures={texturePaths}
              selectedTableClothTexture={selectedTableClothTexture}
              onSelectTexture={handleTableClothTextureSelect}
            />
          </div>
          <div className='trselector-wrapper'>
            <TextureSelector
              selector='Table Runners'
              textures={texturePaths}
              selectedTableRunnerTexture={selectedTableRunnerTexture}
              onSelectTexture={handleTableRunnerTextureSelect}
            />
          </div>
          <div className='ccselector-wrapper'>
            <TextureSelector
              selector='Chair Covers'
              textures={texturePaths}
              selectedTexture={selectedChairCoverTexture}
              onSelectTexture={handleChairCoverTextureSelect}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
