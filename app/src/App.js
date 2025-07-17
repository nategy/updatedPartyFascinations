import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { BrowserRouter as Router } from "react-router-dom";

import LoginPage from "./components/common/login/LoginPage";
import Navbar from "./components/common/navbar/Navbar";
import Header from "./components/common/header/Header";
import Footer from "./components/common/footer/Footer";
import TabbedTexturePanel from "./components/common/texturehandler/TabbedTexturePanel";
import SubtotalPanel from "./components/common/subtotal/SubtotalPanel";
import Model from "./components/model/Model";

import textureMetadata from "./components/common/textures/textureMetaData.json";
import "./index.css";

// Package tiers
const packages = {
  silver: ["tableCloth", "tableRunner"],
  bronze: ["tableCloth", "chairCover", "chairRunner"],
  gold: ["tableCloth", "tableRunner", "chairCover", "chairRunner", "plates"],
};

// Default selections
const initialTextures = {
  tableCloth: "/pf_textures/tablecloths/soft-white.jpg",
  tableRunner: "/pf_textures/tablerunners/pink-solid.jpg",
  plates: "/pf_textures/plates/soft-white.jpg",
  chairCover: "/pf_textures/chaircovers/blue-confetti.jpg",
  chairRunner: "/pf_textures/chairrunners/brown-striped.jpg",
};

const initialPrices = {
  tableCloth: 350,
  tableRunner: 200,
  plates: 200,
  chairCover: 600,
  chairRunner: 300,
};

const typesList = [
  "tableCloth",
  "tableRunner",
  "plates",
  "chairCover",
  "chairRunner",
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("silver");
  const [selectedTextures, setSelectedTextures] = useState(initialTextures);
  const [prices, setPrices] = useState(initialPrices);
  const [tags, setTags] = useState(
    typesList.reduce((acc, type) => {
      acc[type] = [];
      return acc;
    }, {})
  );

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [cameraPosition, setCameraPosition] = useState(
    window.innerWidth <= 768 ? [0, 2, 5] : [0, 3, 5]
  );

  // Responsive camera
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setCameraPosition(mobile ? [0, 5, 5] : [0, 2, 5]);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Categorize textures by type
  const textureTypes = typesList.reduce((acc, type) => {
    acc[type] = textureMetadata.filter((tex) => tex.type.includes(type));
    return acc;
  }, {});

  // Handle texture selection
  const handleSelectTexture = (type, textureObj) => {
    setSelectedTextures((prev) => ({ ...prev, [type]: textureObj.src }));
    setPrices((prev) => ({ ...prev, [type]: textureObj.price }));
  };

  // Panel configuration
  const textureConfig = typesList.reduce((acc, type) => {
    acc[type] = {
      textures: textureTypes[type],
      selectedTexture: selectedTextures[type],
      onSelectTexture: (textureObj) => handleSelectTexture(type, textureObj),
      selectedTags: tags[type],
      setSelectedTags: (newTags) =>
        setTags((prev) => ({ ...prev, [type]: newTags })),
    };
    return acc;
  }, {});

  // Create readable list for subtotal
  const getTextureName = (path) => path?.split("/")?.pop() || "None";

  const itemizedItems = typesList.map((type) => ({
    name: type.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()),
    key: type,
    textureName: getTextureName(selectedTextures[type]),
    price: prices[type],
  }));

  const allowedKeys = packages[selectedPackage] || [];
  const filteredItems = itemizedItems.filter((item) =>
    allowedKeys.includes(item.key)
  );

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
                  <ambientLight intensity={0.3} />
                  <spotLight
                    intensity={0.8}
                    angle={0.25}
                    penumbra={1}
                    position={[0, 20, 10]}
                    castShadow
                  />
                  {/* Floor and Backdrop */}
                  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
                    <planeGeometry args={[30, 30]} />
                    <meshStandardMaterial color='#eeeeee' />
                  </mesh>
                  <mesh position={[0, 5, -7.5]}>
                    <planeGeometry args={[30, 20]} />
                    <meshStandardMaterial color='#fafafa' />
                  </mesh>
                  {!isMobile && (
                    <mesh
                      rotation={[-Math.PI / 2, 0, 0]}
                      position={[0, -0.5, 0]}
                    >
                      <planeGeometry args={[30, 30]} />
                      <shadowMaterial opacity={0.5} />
                    </mesh>
                  )}
                  {/* Main Model */}
                  <Model
                    tableClothTexture={{
                      selectedTableClothTexture: selectedTextures.tableCloth,
                    }}
                    tableRunnerTexture={{
                      selectedTableRunnerTexture: selectedTextures.tableRunner,
                    }}
                    plateTexture={{
                      selectedPlateTexture: selectedTextures.plates,
                    }}
                    chairCoverTexture={{
                      selectedChairCoverTexture: selectedTextures.chairCover,
                    }}
                    chairRunnerTexture={{
                      selectedChairRunnerTexture: selectedTextures.chairRunner,
                    }}
                    packages={packages}
                    selectedPackage={selectedPackage}
                  />
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

            <div className='texture-scroll-area'>
              <TabbedTexturePanel
                navOpen={navOpen}
                selectedPackage={selectedPackage}
                setSelectedPackage={setSelectedPackage}
                textureConfig={textureConfig}
              />
            </div>
          </div>

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
