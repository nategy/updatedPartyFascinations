import "./index.css";
import Navbar from "./components/common/navbar/Navbar";
import Header from "./components/common/header/Header";
import Footer from "./components/common/footer/Footer";
import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useTexture } from "@react-three/drei";
import { BrowserRouter as Router } from "react-router-dom";

import TabbedTexturePanel from "./components/common/texturehandler/TabbedTexturePanel";

useGLTF.preload("/PfScene.gltf");

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
        <meshStandardMaterial map={coverTexture} />
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
  const { nodes } = useGLTF("PfScene.gltf");

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

  const chairRadius = 1.2; // meters
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
  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      position={[0, -0.2, 0]}
      scale={[0.01, 0.01, 0.01]}
    >
      {/* Tablecloth */}
      <group name='Tablecloth' position={[0, 0, 0]} scale={[1, 1, 1]}>
        <mesh geometry={nodes.TableCloth.geometry}>
          <meshStandardMaterial map={tableClothTexture} />
        </mesh>
      </group>

      {/* TableRunner */}
      <group
        name='TableRunner'
        position={[0, 0.05, 0]}
        rotation={[0, 0, 0]}
        scale={[1, 1, 1]}
      >
        <mesh geometry={nodes.TableRunner.geometry}>
          <meshStandardMaterial map={tableRunnerTexture} />
        </mesh>
      </group>

      {/* Plates */}
      <group name='Plate' position={[0, 40, 0]} scale={[0.1, 0.02, 0.1]}>
        <mesh geometry={nodes.Plate.geometry}>
          <meshStandardMaterial map={plateTexture} side={2} />
        </mesh>
      </group>

      {/* Chairs + Chair Runners */}
      {positions.map((pos, i) => (
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

  const [navOpen, setNavOpen] = useState(false);

  const [selectedTableClothTexture, setSelectedTableClothTexture] = useState(
    "/pexels-maryann-kariuki-4303015.jpg"
  );
  const [selectedTableRunnerTexture, setSelectedTableRunnerTexture] = useState(
    "/pexels-maryann-kariuki-4303015.jpg"
  );
  const [selectedPlateTexture, setPlateTexture] = useState("/testtexture.jpg");
  const [selectedChairCoverTexture, setSelectedChairCoverTexture] =
    useState("/testtexture.jpg");
  const [selectedChairRunnerTexture, setSelectedChairRunnerTexture] =
    useState("/testtexture.jpg");

  const texturePaths = [
    "/tablecloths/pexels-anni-roenkae-4175070.jpg",
    "/tablecloths/pexels-laura-james-6101966.jpg",
    "/tablecloths/pexels-maryann-kariuki-4303015.jpg",
  ];

  const [cameraPosition, setCameraPosition] = useState([0, 5, 15]); // default (mobile)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const updateView = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setCameraPosition(mobile ? [0, 5, 5] : [0, 5, 5]); // top-down angled view for desktop
    };

    updateView(); // run once on mount
    window.addEventListener("resize", updateView); // update on resize

    return () => window.removeEventListener("resize", updateView); // cleanup
  }, []);

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
                camera={{ position: cameraPosition, fov: 35 }}
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
                  />

                  {/* Controls */}
                  <OrbitControls
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    enableDamping={true}
                    maxPolarAngle={Math.PI / 2.2}
                    minDistance={5}
                    maxDistance={25}
                  />
                </Suspense>
              </Canvas>
            </div>
            <div className='texture-scroll-area'>
              <TabbedTexturePanel
                navOpen={navOpen}
                textureConfig={{
                  tableCloth: {
                    textures: texturePaths,
                    selectedTexture: selectedTableClothTexture,
                    onSelectTexture: setSelectedTableClothTexture,
                  },
                  tableRunner: {
                    textures: texturePaths,
                    selectedTexture: selectedTableRunnerTexture,
                    onSelectTexture: setSelectedTableRunnerTexture,
                  },
                  plate: {
                    textures: texturePaths,
                    selectedTexture: selectedPlateTexture,
                    onSelectTexture: setPlateTexture,
                  },
                  chairCover: {
                    textures: texturePaths,
                    selectedTexture: selectedChairCoverTexture,
                    onSelectTexture: setSelectedChairCoverTexture,
                  },
                  chairRunner: {
                    textures: texturePaths,
                    selectedTexture: selectedChairRunnerTexture,
                    onSelectTexture: setSelectedChairRunnerTexture,
                  },
                }}
              />
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;
