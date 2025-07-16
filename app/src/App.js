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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("silver");

  const isInitiallyMobile = window.innerWidth <= 768;
  const [cameraPosition, setCameraPosition] = useState(
    isInitiallyMobile ? [0, 2, 5] : [0, 3, 5]
  );
  const [isMobile, setIsMobile] = useState(isInitiallyMobile);

  useEffect(() => {
    const updateView = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setCameraPosition(mobile ? [0, 5, 5] : [0, 2, 5]);
    };
    window.addEventListener("resize", updateView);
    return () => window.removeEventListener("resize", updateView);
  }, []);

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

  const [tableClothPrice, setTableClothPrice] = useState(350);
  const [tableRunnerPrice, setTableRunnerPrice] = useState(200);
  const [platePrice, setPlatePrice] = useState(200);
  const [chairCoverPrice, setChairCoverPrice] = useState(600);
  const [chairRunnerPrice, setChairRunnerPrice] = useState(300);

  const packages = {
    silver: ["tableCloth", "tableRunner"],
    bronze: ["tableCloth", "chairCover", "chairRunner"],
    gold: ["tableCloth", "tableRunner", "chairCover", "chairRunner", "plates"],
  };

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

  const [tableClothTags, setTableClothTags] = useState([]);
  const [tableRunnerTags, setTableRunnerTags] = useState([]);
  const [plateTags, setPlateTags] = useState([]);
  const [chairCoverTags, setChairCoverTags] = useState([]);
  const [chairRunnerTags, setChairRunnerTags] = useState([]);

  const getTextureName = (texturePath) =>
    texturePath.split("/").pop() || "None";

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

  const textureConfig = {
    tableCloth: {
      textures: textureTypes.tableCloth,
      selectedTexture: selectedTableClothTexture,
      onSelectTexture: handleSelectTableCloth,
      selectedTags: tableClothTags,
      setSelectedTags: setTableClothTags,
    },
    tableRunner: {
      textures: textureTypes.tableRunner,
      selectedTexture: selectedTableRunnerTexture,
      onSelectTexture: handleSelectTableRunner,
      selectedTags: tableRunnerTags,
      setSelectedTags: setTableRunnerTags,
    },
    plates: {
      textures: textureTypes.plates,
      selectedTexture: selectedPlateTexture,
      onSelectTexture: handleSelectPlate,
      selectedTags: plateTags,
      setSelectedTags: setPlateTags,
    },
    chairCover: {
      textures: textureTypes.chairCover,
      selectedTexture: selectedChairCoverTexture,
      onSelectTexture: handleSelectChairCover,
      selectedTags: chairCoverTags,
      setSelectedTags: setChairCoverTags,
    },
    chairRunner: {
      textures: textureTypes.chairRunner,
      selectedTexture: selectedChairRunnerTexture,
      onSelectTexture: handleSelectChairRunner,
      selectedTags: chairRunnerTags,
      setSelectedTags: setChairRunnerTags,
    },
  };

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
                  <mesh
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[0, -0.5, 0]}
                    receiveShadow
                  >
                    <planeGeometry args={[30, 30]} />
                    <meshStandardMaterial color='#eeeeee' />
                  </mesh>
                  <mesh position={[0, 5, -7.5]} receiveShadow>
                    <planeGeometry args={[30, 20]} />
                    <meshStandardMaterial color='#fafafa' />
                  </mesh>
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
                  <Model
                    tableClothTexture={{ selectedTableClothTexture }}
                    tableRunnerTexture={{ selectedTableRunnerTexture }}
                    plateTexture={{ selectedPlateTexture }}
                    chairCoverTexture={{ selectedChairCoverTexture }}
                    chairRunnerTexture={{ selectedChairRunnerTexture }}
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
