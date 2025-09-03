import React, { useState, useEffect, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { BrowserRouter as Router } from "react-router-dom";

import LoginPage from "./components/common/login/LoginPage";
import Navbar from "./components/common/navbar/Navbar";
import Header from "./components/common/header/Header";
import Footer from "./components/common/footer/Footer";
import TabbedTexturePanel from "./components/common/texturehandler/TabbedTexturePanel";
import SubtotalPanel from "./components/common/subtotal/SubtotalPanel";
import Model from "./components/model/Model";

//use when testing
// import textureMetadata from "./data/textureMetaData.json";
import "./index.css";

// Package tiers
const packages = {
  silver: [
    "tableCloth",
    "tableRunner",
    "tableOverlay",
    "chiavari",
    "innerCurtains",
    "outerCurtains",
    "drape",
  ],
  bronze: [
    "tableCloth",
    "tableOverlay",
    "chiavari",
    "chairCover",
    "chairRunner",
    "chairClip",
    "innerCurtains",
    "outerCurtains",
    "drape",
    "centerpiece",
  ],
  gold: [
    "tableCloth",
    "tableRunner",
    "tableOverlay",
    "chiavari",
    "chairCover",
    "chairRunner",
    "chairClip",
    "plates",
    "innerCurtains",
    "outerCurtains",
    "drape",
    "centerpiece",
  ],
};

// Default selections
const initialTextures = {
  tableCloth: "/pf_textures/multi/pf-babyblue.png",
  tableRunner: "/pf_textures/multi/pf-coral.png",
  tableOverlay: "/pf_textures/overlays/pf-navyblue.png",
  chiavari: "/pf_textures/chiavaris/pf-black.png",
  chairCover: "/pf_textures/chaircovers/pf-ivory.png",
  chairRunner: "/pf_textures/chairrunners/pf-royalblue.png",
  chairClip: "/pf_textures/chairclips/pf-goldclip.jpg",
  plates: "/pf_textures/plates/pf-white.png",
  innerCurtains: "/pf_textures/multi/pf-white.png",
  outerCurtains: "/pf_textures/multi/pf-navyblue.png",
  drape: "/pf_textures/multi/pf-navyblue.png",
  centerpiece: "none",
};

const initialPrices = {
  tableCloth: 350,
  tableRunner: 200,
  tableOverlay: 120,
  chiavari: 300,
  chairCover: 600,
  chairRunner: 300,
  chairClip: 50,
  plates: 200,
  innerCurtains: 200,
  outerCurtains: 200,
  drape: 100,
  centerpiece: 0,
};

const typesList = [
  "tableCloth",
  "tableRunner",
  "tableOverlay",
  "chiavari",
  "chairCover",
  "chairRunner",
  "chairClip",
  "plates",
  "innerCurtains",
  "outerCurtains",
  "drape",
  "centerpiece",
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [textureMetadata, setTextureMetadata] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState("silver");
  const [chairType, setChairType] = useState("chiavari");
  const [selectedTextures, setSelectedTextures] = useState(initialTextures);
  const [prices, setPrices] = useState(initialPrices);
  const [tags, setTags] = useState(
    typesList.reduce((acc, type) => {
      acc[type] = [];
      return acc;
    }, {})
  );

  // Keep isMobile and use it in Canvas
  const [isMobile, setIsMobile] = useState(
    typeof window != "undefined" ? window.innerWidth <= 768 : false
  );

  // Fetch texture data from API on mount
  useEffect(() => {
    fetch("/api/getTexture")
      .then((res) => res.json())
      .then((data) => setTextureMetadata(data))
      .catch((err) => console.error("Error fetching textures:", err));
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
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

    if (type === "chairCover") setChairType("cover");
    if (type === "chiavari") setChairType("chiavari");
  };

  // Panel configuration
  const textureConfig = useMemo(() => {
    return Object.fromEntries(
      typesList.map((type) => [
        type,
        {
          textures: textureTypes[type],
          selectedTexture: selectedTextures[type],
          onSelectTexture: (textureObj) =>
            handleSelectTexture(type, textureObj),
          selectedTags: tags[type],
          setSelectedTags: (newTags) =>
            setTags((prev) => ({ ...prev, [type]: newTags })),
        },
      ])
    );
  }, [textureTypes, selectedTextures, tags]);

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
                camera={{
                  position: isMobile ? [0, 2.5, 6] : [0, 3, 7],
                  fov: 30,
                }}
                frameloop='demand'
              >
                <Model
                  tableClothTexture={{
                    selectedTableClothTexture: selectedTextures.tableCloth,
                  }}
                  tableRunnerTexture={{
                    selectedTableRunnerTexture: selectedTextures.tableRunner,
                  }}
                  tableOverlayTexture={{
                    selectedTableOverlayTexture: selectedTextures.tableOverlay,
                  }}
                  chiavariTexture={{
                    selectedChiavariTexture: selectedTextures.chiavari,
                  }}
                  chairCoverTexture={{
                    selectedChairCoverTexture: selectedTextures.chairCover,
                  }}
                  chairRunnerTexture={{
                    selectedChairRunnerTexture: selectedTextures.chairRunner,
                  }}
                  plateTexture={{
                    selectedPlateTexture: selectedTextures.plates,
                  }}
                  chairClipTexture={{
                    selectedChairClipTexture: selectedTextures.chairClip,
                  }}
                  innerCurtainsTexture={{
                    selectedInnerCurtainsTexture:
                      selectedTextures.innerCurtains,
                  }}
                  outerCurtainsTexture={{
                    selectedOuterCurtainsTexture:
                      selectedTextures.outerCurtains,
                  }}
                  drapesTexture={{
                    selectedDrapesTexture: selectedTextures.drape,
                  }}
                  centerpieceTexture={{
                    selectedCenterpieceTexture: selectedTextures.centerpiece,
                  }}
                  packages={packages}
                  selectedPackage={selectedPackage}
                  chairType={chairType}
                />
              </Canvas>
            </div>
            <div className='texture-scroll-area'>
              {!textureMetadata.length ? (
                <div className='loading'>Loading textures...</div>
              ) : (
                <TabbedTexturePanel
                  navOpen={navOpen}
                  selectedPackage={selectedPackage}
                  setSelectedPackage={setSelectedPackage}
                  textureConfig={textureConfig}
                />
              )}
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
