import "./index.css";
import Navbar from "./components/common/Navbar";
import Header from "./components/common/header/header";
import Footer from "./components/common/footer/Footer";
import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useTexture } from "@react-three/drei";
import { BrowserRouter as Router } from "react-router-dom";

import TabbedTexturePanel from "./components/common/texturehandler/TabbedTexturePanel";

function Model({ ...props }) {
  const group = useRef();
  const { nodes } = useGLTF("TableScene.gltf");

  const tableClothTexture = useTexture(
    props.tableClothTexture.selectedTableClothTexture
  );
  const tableRunnerTexture = useTexture(
    props.tableRunnerTexture.selectedTableRunnerTexture
  );
  const chairClothTexture = useTexture(
    props.chairCoverTexture.selectedChairCoverTexture
  );
  const chairRunnerTexture = useTexture(
    props.chairRunnerTexture.selectedChairRunnerTexture
  );

  return (
    <group ref={group} {...props} dispose={null} scale={2}>
      <group rotation={[0, 0, 0]} scale={0.01}>
        <group name='Tablecloth' position={[0, 0, 0]} scale={[200, 200, 200]}>
          <mesh geometry={nodes.TableCloth.geometry}>
            <meshStandardMaterial map={tableClothTexture} />
          </mesh>
        </group>
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
        {[...Array(6)].map((_, i) => {
          const positions = [
            [0, 0, -300],
            [-250, 0, -170],
            [250, 0, -170],
            [0, 0, 300],
            [-250, 0, 150],
            [250, 0, 150],
          ];
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
              key={`Chair${i}`}
              name={`Chair${i}`}
              position={positions[i]}
              rotation={rotations[i]}
              scale={[80, 80, 80]}
            >
              <mesh geometry={nodes.Chair.geometry}>
                <meshStandardMaterial map={chairClothTexture} />
              </mesh>
            </group>
          );
        })}
      </group>
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

  useEffect(() => {
    const updateCamera = () => {
      const isMobile = window.innerWidth <= 768;
      setCameraPosition(isMobile ? [0, 5, 15] : [0, 12, 25]); // top-down angled view for desktop
    };

    updateCamera(); // run once on mount
    window.addEventListener("resize", updateCamera); // update on resize

    return () => window.removeEventListener("resize", updateCamera); // cleanup
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
              <Canvas camera={{ position: cameraPosition, fov: 35 }}>
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
                      selectedTableClothTexture,
                    }}
                    tableRunnerTexture={{
                      selectedTableRunnerTexture,
                    }}
                    chairCoverTexture={{
                      selectedChairCoverTexture,
                    }}
                    chairRunnerTexture={{
                      selectedChairRunnerTexture,
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
