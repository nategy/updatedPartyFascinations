import "./index.css";

import Navbar from "./components/common/navbar/Navbar";
import Header from "./components/common/header/Header";
import Footer from "./components/common/footer/Footer";
import TabbedTexturePanel from "./components/common/texturehandler/TabbedTexturePanel";
import SubtotalPanel from "./components/common/subtotal/SubtotalPanel";

import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useTexture } from "@react-three/drei";
import { BrowserRouter as Router } from "react-router-dom";

useGLTF.preload("/PFScene5.gltf");

function Chair({
  position,
  rotation,
  coverTexture,
  runnerTexture,
  coverGeometry,
  runnerGeometry,
}) {
  return (
    <group position={position} rotation={rotation} scale={[1, 1, 1]}>
      {/* Chair Cover */}
      <mesh geometry={coverGeometry}>
        <meshStandardMaterial map={coverTexture} side={2} />
      </mesh>

      {/* Chair Runner */}
      {runnerGeometry && (
        <group scale={[1, 1, 1]} position={[0, -1, 0]}>
          {/* Adjust this scale as needed */}
          <mesh geometry={runnerGeometry}>
            <meshStandardMaterial map={runnerTexture} side={2} />
          </mesh>
        </group>
      )}
    </group>
  );
}

function Model({ ...props }) {
  const group = useRef();
  const { nodes } = useGLTF("PFScene5.gltf");

  const tableClothTexture = useTexture(
    props.tableClothTexture.selectedTableClothTexture
  );
  const tableRunnerTexture = useTexture(
    props.tableRunnerTexture.selectedTableRunnerTexture
  );
  const plateTexture = useTexture(props.plateTexture.selectedPlateTexture);
  const chairClothTexture = useTexture(
    props.chairCoverTexture.selectedChairCoverTexture
  );
  const chairRunnerTexture = useTexture(
    props.chairRunnerTexture.selectedChairRunnerTexture
  );

  const platePositions = [
    [2, -8, 15],
    [0, -8, -15.5],
    [-24, -8, -32],
    [-62, -8, -12],
    [-57, -8, 15.5],
    [-35, -8, 35],
  ];

  const chairRadius = 1.3; // meters
  const positions = Array.from({ length: 6 }, (_, i) => {
    const angle = (i * Math.PI * 2) / 6;
    return [chairRadius * Math.cos(angle), 0, chairRadius * Math.sin(angle)];
  });
  const rotations = [
    [0, Math.PI, 0],
    [0, (8 * Math.PI) / 6, 0],
    [0, (4 * Math.PI) / 6, 0],
    [0, 0, 0],
    [0, (10 * Math.PI) / 6, 0],
    [0, Math.PI / 3, 0],
  ];

  const packages = props.packages;
  const selectedPackage = props.selectedPackage;
  const allowedKeys = packages[selectedPackage] || [];

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      position={[0, 0, 0]}
      scale={[0.01, 0.01, 0.01]}
      rotation={[0, -0.5, 0]}
    >
      {/* Tablecloth */}
      {allowedKeys.includes("tableCloth") && (
        <group
          name='Tablecloth'
          position={[0, 0, 0]}
          scale={[1.25, 1.25, 1.25]}
        >
          <mesh geometry={nodes.TableCloth.geometry}>
            <meshStandardMaterial map={tableClothTexture} />
          </mesh>
        </group>
      )}

      {/* TableRunner */}
      {allowedKeys.includes("tableRunner") && (
        <group
          name='TableRunner'
          position={[0, -5, 1]}
          rotation={[0, 0.525, 0]}
          scale={[1, 1.35, 1.35]}
        >
          <mesh geometry={nodes.TableRunner.geometry}>
            <meshStandardMaterial map={tableRunnerTexture} />
          </mesh>
        </group>
      )}

      {/* Plates */}
      {allowedKeys.includes("plate") &&
        platePositions.map((pos, i) => (
          <group key={`Plate${i}`} position={pos} scale={[1.5, 1.5, 1.5]}>
            <mesh geometry={nodes.Plate.geometry}>
              <meshStandardMaterial map={plateTexture} side={2} />
            </mesh>
          </group>
        ))}

      {/* Chairs + Chair Runners */}
      {allowedKeys.includes("chairCover") &&
        positions.map((pos, i) => (
          <Chair
            key={`Chair${i}`}
            position={pos}
            rotation={rotations[i]}
            coverTexture={chairClothTexture}
            runnerTexture={chairRunnerTexture}
            coverGeometry={nodes["Chair001"].geometry}
            runnerGeometry={nodes["ChairRunner"].geometry}
          />
        ))}
    </group>
  );
}

function App() {
  // Login
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username.toLowerCase() === "admin" && password === "1234") {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Invalid username or password.");
    }
  };

  // Camera Positioning
  const isInitiallyMobile = window.innerWidth <= 768;
  const initialCameraPos = isInitiallyMobile ? [0, 2, 5] : [0, 3, 5];

  const [cameraPosition, setCameraPosition] = useState(initialCameraPos); // default (mobile)
  const [isMobile, setIsMobile] = useState(isInitiallyMobile);

  useEffect(() => {
    const updateView = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setCameraPosition(mobile ? [0, 5, 5] : [0, 2, 5]); // top-down angled view for desktop
    };

    updateView(); // run once on mount
    window.addEventListener("resize", updateView); // update on resize

    return () => window.removeEventListener("resize", updateView); // cleanup
  }, []);

  // Navbar
  const [navOpen, setNavOpen] = useState(false);

  // States + Textures
  const [selectedPackage, setSelectedPackage] = useState("silver");
  const [selectedTableClothTexture, setSelectedTableClothTexture] =
    useState("/testtexture.jpg");
  const [selectedTableRunnerTexture, setSelectedTableRunnerTexture] =
    useState("/testtexture.jpg");
  const [selectedPlateTexture, setSelectedPlateTexture] =
    useState("/testtexture.jpg");
  const [selectedChairCoverTexture, setSelectedChairCoverTexture] =
    useState("/testtexture.jpg");
  const [selectedChairRunnerTexture, setSelectedChairRunnerTexture] =
    useState("/testtexture.jpg");

  // Packages
  const packages = {
    silver: ["tableCloth", "tableRunner"],
    bronze: ["tableCloth", "chairCover", "chairRunner"],
    gold: ["tableCloth", "tableRunner", "chairCover", "chairRunner", "plate"],
  };

  // Pricing
  const [tableClothPrice, setTableClothPrice] = useState(100);
  const [tableRunnerPrice, setTableRunnerPrice] = useState(35);
  const [platePrice, setPlatePrice] = useState(60);
  const [chairCoverPrice, setChairCoverPrice] = useState(300);
  const [chairRunnerPrice, setChairRunnerPrice] = useState(150);

  // Textures and Prices ***** Convert to seperate JSON FILE WITH ALL The Textures
  const texturePaths = [
    { src: "/tablecloths/pexels-anni-roenkae-4175070.jpg", price: 5 },
    { src: "/tablecloths/pexels-maryann-kariuki-4303015.jpg", price: 10 },
    { src: "/tablecloths/pexels-laura-james-6101966.jpg", price: 8 },
  ];

  const getTextureName = (texturePath) =>
    texturePath.split("/").pop() || "None";
  // Pricing Handler
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

  // Items Array
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
      key: "plate",
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

  const allowedKeys = packages[[selectedPackage] || []];
  const filteredItems = itemizedItems.filter((item) =>
    allowedKeys.includes(item.key)
  );
  const subtotal = filteredItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className='App'>
      <Header />
      <Router>
        <Navbar navOpen={navOpen} setNavOpen={setNavOpen} />
      </Router>
      {!isLoggedIn ? (
        <div className='login-page'>
          <div className='login-container'>
            <div className='login-box'>
              <h2>Login</h2>
              <input
                type='text'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleLogin}>Log In</button>
              {error && <p className='error'>{error}</p>}
            </div>
          </div>
        </div>
      ) : (
        <div className='wrapper'>
          <div className='card'>
            <div className='product-canvas'>
              <Canvas
                camera={{ position: cameraPosition, fov: 24 }}
                frameloop='demand'
              >
                <color attach='background' args={["#f0f0f0"]} />
                <Suspense fallback={null}>
                  <ambientLight intensity={0.2} />
                  <spotLight
                    intensity={0.8}
                    angle={0.25}
                    penumbra={1}
                    position={[10, 20, 10]}
                  />

                  {/* <mesh position={[0, 0, -5]} scale={[20, 10, 1]}>
                    <planeGeometry args={[30, 20]} />
                    <meshBasicMaterial map={useTexture("")} />
                  </mesh> */}

                  {/* Plane */}
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

                  {/* Model */}
                  <Model
                    tableClothTexture={{
                      selectedTableClothTexture,
                    }}
                    tableRunnerTexture={{
                      selectedTableRunnerTexture,
                    }}
                    plateTexture={{
                      selectedPlateTexture,
                    }}
                    chairCoverTexture={{
                      selectedChairCoverTexture,
                    }}
                    chairRunnerTexture={{
                      selectedChairRunnerTexture,
                    }}
                    packages={packages}
                    selectedPackage={selectedPackage}
                  />

                  {/* Controls */}
                  <OrbitControls
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    enableDamping={true}
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
                textureConfig={{
                  tableCloth: {
                    textures: texturePaths,
                    selectedTexture: selectedTableClothTexture,
                    onSelectTexture: handleSelectTableCloth,
                  },
                  tableRunner: {
                    textures: texturePaths,
                    selectedTexture: selectedTableRunnerTexture,
                    onSelectTexture: handleSelectTableRunner,
                  },
                  plate: {
                    textures: texturePaths,
                    selectedTexture: selectedPlateTexture,
                    onSelectTexture: handleSelectPlate,
                  },
                  chairCover: {
                    textures: texturePaths,
                    selectedTexture: selectedChairCoverTexture,
                    onSelectTexture: handleSelectChairCover,
                  },
                  chairRunner: {
                    textures: texturePaths,
                    selectedTexture: selectedChairRunnerTexture,
                    onSelectTexture: handleSelectChairRunner,
                  },
                }}
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
