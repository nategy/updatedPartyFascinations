import React, { Suspense, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import { BrowserRouter as Router } from "react-router-dom";

import LoginPage from "./components/common/login/LoginPage";
import Navbar from "./components/common/navbar/Navbar";
import Header from "./components/common/header/Header";
import Footer from "./components/common/footer/Footer";
import TabbedTexturePanel from "./components/common/texturehandler/TabbedTexturePanel";
import SubtotalPanel from "./components/common/subtotal/SubtotalPanel";

import textureMetadata from "./components/common/textures/textureMetaData.json";
import "./index.css";

// Preload GLTF model outside component to optimize loading
useGLTF.preload("/PFScene10.gltf");

// BasicChair component: simple chair without cover/runner
const BasicChair = ({ position, rotation, geometry }) => (
  <group position={position} rotation={rotation} scale={[1, 1, 1]}>
    <mesh geometry={geometry}>
      <meshStandardMaterial color='#2b2b2b' />
    </mesh>
  </group>
);

// Chair component: chair with cover and optional runner
const Chair = ({
  position,
  rotation,
  coverTexture,
  runnerTexture,
  coverGeometry,
  runnerGeometry,
}) => (
  <group position={position} rotation={rotation} scale={[1, 1, 1]}>
    <mesh geometry={coverGeometry}>
      <meshStandardMaterial map={coverTexture} side={THREE.DoubleSide} />
    </mesh>

    {runnerGeometry && (
      <group scale={[1, 1, 1]} position={[0, -1, 0]}>
        <mesh geometry={runnerGeometry}>
          <meshStandardMaterial map={runnerTexture} side={THREE.DoubleSide} />
        </mesh>
      </group>
    )}
  </group>
);

function Model({
  packages,
  selectedPackage,
  tableClothTexture,
  tableRunnerTexture,
  plateTexture,
  chairCoverTexture,
  chairRunnerTexture,
}) {
  const group = useRef();
  const { nodes } = useGLTF("PFScene10.gltf");

  // Determine which items allowed for the selected package
  const allowedKeys = packages[selectedPackage] || [];

  // Load textures
  const tableClothMap = useTexture(tableClothTexture.selectedTableClothTexture);

  const rawTableRunner = useTexture(
    tableRunnerTexture.selectedTableRunnerTexture
  );
  const tableRunnerMap = rawTableRunner.clone();
  tableRunnerMap.wrapS = tableRunnerMap.wrapT = THREE.RepeatWrapping;
  tableRunnerMap.repeat.set(1, 6);

  const plateMap = useTexture(plateTexture.selectedPlateTexture);
  const chairCoverMap = useTexture(chairCoverTexture.selectedChairCoverTexture);

  const rawChairRunner = useTexture(
    chairRunnerTexture.selectedChairRunnerTexture
  );
  const chairRunnerMap = rawChairRunner.clone();

  // Hardcoded plate positions
  const platePositions = [
    [2, -8, 15],
    [0, -8, -15.5],
    [-24, -8, -32],
    [-62, -8, -12],
    [-57, -8, 15.5],
    [-35, -8, 35],
  ];

  // Generate chair positions evenly spaced in a circle
  const chairRadius = 1.3; // meters
  const positions = Array.from({ length: 6 }, (_, i) => {
    const angle = (i * Math.PI * 2) / 6;
    return [chairRadius * Math.cos(angle), 0, chairRadius * Math.sin(angle)];
  });

  // Hardcoded chair rotations corresponding to positions
  const rotations = [
    [0, Math.PI, 0],
    [0, (8 * Math.PI) / 6, 0],
    [0, (4 * Math.PI) / 6, 0],
    [0, 0, 0],
    [0, (10 * Math.PI) / 6, 0],
    [0, Math.PI / 3, 0],
  ];

  return (
    <group ref={group} scale={[0.01, 0.01, 0.01]} rotation={[0, -0.5, 0]}>
      {allowedKeys.includes("tableCloth") && (
        <mesh geometry={nodes.TableCloth.geometry} scale={[1.25, 1.25, 1.25]}>
          <meshStandardMaterial map={tableClothMap} />
        </mesh>
      )}

      {allowedKeys.includes("tableRunner") && (
        <mesh
          geometry={nodes.TableRunner.geometry}
          position={[0, 0, 0]}
          rotation={[0, 0.525, 0]}
          scale={[1, 1.4, 1.23]}
        >
          <meshStandardMaterial map={tableRunnerMap} />
        </mesh>
      )}

      {allowedKeys.includes("plates") &&
        platePositions.map((pos, i) => (
          <mesh
            key={i}
            geometry={nodes.Plate.geometry}
            position={pos}
            scale={[1.5, 1.5, 1.5]}
          >
            <meshStandardMaterial map={plateMap} side={THREE.DoubleSide} />
          </mesh>
        ))}

      {(selectedPackage === "silver" || allowedKeys.includes("chairCover")) &&
        positions.map((pos, i) =>
          selectedPackage === "silver" ? (
            <BasicChair
              key={i}
              position={pos}
              rotation={rotations[i]}
              geometry={nodes.BasicChair.geometry}
            />
          ) : (
            <Chair
              key={i}
              position={pos}
              rotation={rotations[i]}
              coverTexture={chairCoverMap}
              runnerTexture={chairRunnerMap}
              coverGeometry={nodes.Chair001.geometry}
              runnerGeometry={nodes.ChairRunner.geometry}
            />
          )
        )}
    </group>
  );
}

function App() {
  // Login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Responsive camera setup - mobile first
  const isInitiallyMobile = window.innerWidth <= 768;
  const initialCameraPos = isInitiallyMobile ? [0, 2, 5] : [0, 3, 5];

  const [cameraPosition, setCameraPosition] = useState(initialCameraPos);
  const [isMobile, setIsMobile] = useState(isInitiallyMobile);

  useEffect(() => {
    const updateView = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setCameraPosition(mobile ? [0, 5, 5] : [0, 2, 5]);
    };

    updateView();
    window.addEventListener("resize", updateView);
    return () => window.removeEventListener("resize", updateView);
  }, []);

  // Navbar state
  const [navOpen, setNavOpen] = useState(false);

  // Package selection state
  const [selectedPackage, setSelectedPackage] = useState("silver");

  // Texture states with default images
  const [selectedTableClothTexture, setSelectedTableClothTexture] = useState(
    "/tablecloths/soft-white.jpg"
  );
  const [selectedTableRunnerTexture, setSelectedTableRunnerTexture] = useState(
    "/tablecloths/brown-flowers.jpg"
  );
  const [selectedPlateTexture, setSelectedPlateTexture] = useState(
    "/tablecloths/soft-white.jpg"
  );
  const [selectedChairCoverTexture, setSelectedChairCoverTexture] = useState(
    "/tablecloths/green-flannel.jpg"
  );
  const [selectedChairRunnerTexture, setSelectedChairRunnerTexture] = useState(
    "/tablecloths/brown-striped.jpg"
  );

  // Pricing states
  const [tableClothPrice, setTableClothPrice] = useState(350);
  const [tableRunnerPrice, setTableRunnerPrice] = useState(200);
  const [platePrice, setPlatePrice] = useState(200);
  const [chairCoverPrice, setChairCoverPrice] = useState(600);
  const [chairRunnerPrice, setChairRunnerPrice] = useState(300);

  // Package contents mapping
  const packages = {
    silver: ["tableCloth", "tableRunner"],
    bronze: ["tableCloth", "chairCover", "chairRunner"],
    gold: ["tableCloth", "tableRunner", "chairCover", "chairRunner", "plates"],
  };

  // Prepare textures grouped by type from metadata
  const textureTypes = {};
  const typesList = [
    "tableCloth",
    "tableRunner",
    "plates",
    "chairCover",
    "chairRunner",
  ];

  typesList.forEach((type) => {
    textureTypes[type] = textureMetadata.filter(
      (tex) =>
        (Array.isArray(tex.type) && tex.type.includes(type)) ||
        tex.type === type
    );
  });

  // Tag state for filtering textures by tags
  const [tableClothTags, setTableClothTags] = useState([]);
  const [tableRunnerTags, setTableRunnerTags] = useState([]);
  const [plateTags, setPlateTags] = useState([]);
  const [chairCoverTags, setChairCoverTags] = useState([]);
  const [chairRunnerTags, setChairRunnerTags] = useState([]);

  // Helper to get texture filename for display
  const getTextureName = (texturePath) =>
    texturePath.split("/").pop() || "None";

  // Pricing update handlers for texture selection
  const handleSelectTableCloth = (textureObj) => {
    setSelectedTableClothTexture(textureObj.src);
    setTableClothPrice(textureObj.price);
  };
  const handleSelectTableRunner = (textureObj) => {
    setSelectedTableRunnerTexture(textureObj.src);
    setTableRunnerPrice(textureObj.price);
  };
  const handleSelectPlate = (textureObj) => {
    setSelectedPlateTexture(textureObj.src);
    setPlatePrice(textureObj.price);
  };
  const handleSelectChairCover = (textureObj) => {
    setSelectedChairCoverTexture(textureObj.src);
    setChairCoverPrice(textureObj.price);
  };
  const handleSelectChairRunner = (textureObj) => {
    setSelectedChairRunnerTexture(textureObj.src);
    setChairRunnerPrice(textureObj.price);
  };

  // Texture config passed to child components for managing selection and tags
  const textureConfig = {
    tableCloth: {
      textures: textureTypes.tableCloth,
      selectedTexture: selectedTableClothTexture,
      onSelectTexture: setSelectedTableClothTexture,
      selectedTags: tableClothTags,
      setSelectedTags: setTableClothTags,
    },
    tableRunner: {
      textures: textureTypes.tableRunner,
      selectedTexture: selectedTableRunnerTexture,
      onSelectTexture: setSelectedTableRunnerTexture,
      selectedTags: tableRunnerTags,
      setSelectedTags: setTableRunnerTags,
    },
    plates: {
      textures: textureTypes.plates,
      selectedTexture: selectedPlateTexture,
      onSelectTexture: setSelectedPlateTexture,
      selectedTags: plateTags,
      setSelectedTags: setPlateTags,
    },
    chairCover: {
      textures: textureTypes.chairCover,
      selectedTexture: selectedChairCoverTexture,
      onSelectTexture: setSelectedChairCoverTexture,
      selectedTags: chairCoverTags,
      setSelectedTags: setChairCoverTags,
    },
    chairRunner: {
      textures: textureTypes.chairRunner,
      selectedTexture: selectedChairRunnerTexture,
      onSelectTexture: setSelectedChairRunnerTexture,
      selectedTags: chairRunnerTags,
      setSelectedTags: setChairRunnerTags,
    },
  };

  // Compose items for subtotal panel
  const itemizedItems = [
    {
      name: "Table Cloth",
      key: "tableCloth",
      textureName: getTextureName(selectedTableClothTexture),
      price: tableClothPrice,
    },
    {
      name: "Table Runner",
      key: "tableRunner",
      textureName: getTextureName(selectedTableRunnerTexture),
      price: tableRunnerPrice,
    },
    {
      name: "Plate",
      key: "plates",
      textureName: getTextureName(selectedPlateTexture),
      price: platePrice,
    },
    {
      name: "Chair Cover",
      key: "chairCover",
      textureName: getTextureName(selectedChairCoverTexture),
      price: chairCoverPrice,
    },
    {
      name: "Chair Runner",
      key: "chairRunner",
      textureName: getTextureName(selectedChairRunnerTexture),
      price: chairRunnerPrice,
    },
  ];

  // Filter items based on selected package
  const allowedKeys = packages[selectedPackage] || [];
  const filteredItems = itemizedItems.filter((item) =>
    allowedKeys.includes(item.key)
  );

  // Calculate subtotal price
  const subtotal = filteredItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className='app'>
      <Header />
      <Router>
        <Navbar navOpen={navOpen} setNavOpen={setNavOpen} />
      </Router>

      {!isLoggedIn ? (
        <LoginPage onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <div className='wrapper'>
          <div className='card'>
            <div className='product-canvas'>
              <Canvas
                camera={{ position: cameraPosition, fov: 24 }}
                frameloop='demand'
              >
                <color attach='background' args={["#fcfcfc"]} />
                <Suspense fallback={null}>
                  <color />

                  <ambientLight intensity={0.3} />
                  <spotLight
                    intensity={0.8}
                    angle={0.25}
                    penumbra={1}
                    position={[0, 20, 10]}
                    castShadow
                  />

                  {/* Floor plane */}
                  <mesh
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[0, -0.5, 0]}
                    receiveShadow
                  >
                    <planeGeometry args={[30, 30]} />
                    <meshStandardMaterial color='#eeeeee' />
                  </mesh>

                  {/* Back wall */}
                  <mesh position={[0, 5, -7.5]} receiveShadow>
                    <planeGeometry args={[30, 20]} />
                    <meshStandardMaterial color='#fafafa' />
                  </mesh>

                  {/* Shadow plane for desktop */}
                  {!isMobile && (
                    <mesh
                      rotation={[-Math.PI / 2, 0, 0]}
                      position={[0, -0.5, 0]}
                      receiveShadow
                    >
                      <planeGeometry args={[30, 30]} />
                      <shadowMaterial opacity={0.5} />
                    </mesh>
                  )}

                  {/* 3D Model */}
                  <Model
                    tableClothTexture={{ selectedTableClothTexture }}
                    tableRunnerTexture={{ selectedTableRunnerTexture }}
                    plateTexture={{ selectedPlateTexture }}
                    chairCoverTexture={{ selectedChairCoverTexture }}
                    chairRunnerTexture={{ selectedChairRunnerTexture }}
                    packages={packages}
                    selectedPackage={selectedPackage}
                  />

                  {/* Controls */}
                  <OrbitControls
                    enablePan
                    enableZoom
                    enableRotate
                    enableDamping
                    maxPolarAngle={Math.PI / 2.2}
                    minDistance={2}
                    maxDistance={7}
                  />
                </Suspense>
              </Canvas>
            </div>

            {/* Texture selection panel */}
            <div className='texture-scroll-area'>
              <TabbedTexturePanel
                navOpen={navOpen}
                selectedPackage={selectedPackage}
                setSelectedPackage={setSelectedPackage}
                textureConfig={textureConfig}
              />
            </div>
          </div>

          {/* Subtotal panel */}
          <SubtotalPanel
            items={filteredItems}
            subtotal={subtotal}
            selectedPackage={selectedPackage}
          />
        </div>
      )}

      <Footer />
    </div>
  );
}

export default App;
