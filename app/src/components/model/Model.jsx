// Model.jsx
import React, { useRef, Suspense } from "react";
import * as THREE from "three";
import { useGLTF, useTexture, OrbitControls } from "@react-three/drei";

// Preload model
useGLTF.preload("/resources/PFScene23.gltf");

// Use an existing tiny transparent image in your project.
// Update path if you keep a different placeholder.
const TRANSPARENT_PLACEHOLDER = "/pf_textures/centerpieces/transparent.jpg";

const BasicChair = ({
  position,
  rotation,
  geometry,
  texture,
  runnerGeometry,
  runnerTexture,
  runnerEnabled,
  clipGeometry,
  clipTexture,
  clipEnabled,
}) => (
  <group position={position} rotation={rotation} scale={[1, 1, 1]}>
    <mesh geometry={geometry}>
      <meshStandardMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>

    {/* Runner applied to Chiavari if enabled */}
    {runnerGeometry && runnerEnabled && (
      <group position={[0, -1, 0]}>
        <mesh geometry={runnerGeometry}>
          <meshStandardMaterial map={runnerTexture} side={THREE.DoubleSide} />
        </mesh>
      </group>
    )}

    {/* Clip applied to Chiavari if enabled */}
    {clipGeometry && clipEnabled && (
      <group position={[0, -1, 0]}>
        <mesh geometry={clipGeometry}>
          <meshStandardMaterial map={clipTexture} side={THREE.DoubleSide} />
        </mesh>
      </group>
    )}
  </group>
);

const Chair = ({
  position,
  rotation,
  coverTexture,
  runnerTexture,
  clipTexture,
  coverGeometry,
  runnerGeometry,
  clipGeometry,
  runnerEnabled,
  clipEnabled,
}) => (
  <group position={position} rotation={rotation} scale={[1, 1, 1]}>
    <mesh geometry={coverGeometry}>
      <meshStandardMaterial map={coverTexture} side={THREE.DoubleSide} />
    </mesh>

    {/* Runner */}
    {runnerGeometry && runnerEnabled && (
      <group position={[0, -1, 0]}>
        <mesh geometry={runnerGeometry}>
          <meshStandardMaterial map={runnerTexture} side={THREE.DoubleSide} />
        </mesh>
      </group>
    )}

    {/* Clip */}
    {clipGeometry && clipEnabled && (
      <group position={[0, -1, 0]}>
        <mesh geometry={clipGeometry}>
          <meshStandardMaterial map={clipTexture} side={THREE.DoubleSide} />
        </mesh>
      </group>
    )}
  </group>
);

function Model({
  packages,
  selectedPackage,
  chairType,
  tableClothTexture,
  tableRunnerTexture,
  tableOverlayTexture,
  chiavariTexture,
  chairCoverTexture,
  chairClipTexture,
  chairRunnerTexture,
  plateTexture,
  innerCurtainsTexture,
  outerCurtainsTexture,
  drapesTexture,
  centerpieceTexture,
}) {
  const group = useRef();
  const { nodes } = useGLTF("/resources/PFScene23.gltf");
  // console.log(nodes);

  const allowedKeys = packages[selectedPackage] || [];

  // safe helper: return a valid path (placeholder when 'none' or falsy)
  const safePath = (p) =>
    p && typeof p === "string" && p !== "none" ? p : TRANSPARENT_PLACEHOLDER;

  // Load textures (using safePath to avoid passing "none" which throws)
  const tableClothMap = useTexture(
    safePath(tableClothTexture?.selectedTableClothTexture)
  );

  const rawTableRunner = useTexture(
    safePath(tableRunnerTexture?.selectedTableRunnerTexture)
  );
  // repeat wrapping only if texture exists (we always have placeholder so okay to set)
  const tableRunnerMap = rawTableRunner.clone();
  tableRunnerMap.wrapS = tableRunnerMap.wrapT = THREE.RepeatWrapping;
  tableRunnerMap.repeat.set(1, 6);

  const tableOverlayMap = useTexture(
    safePath(tableOverlayTexture?.selectedTableOverlayTexture)
  );

  const plateMap = useTexture(safePath(plateTexture?.selectedPlateTexture));
  const chiavariMap = useTexture(
    safePath(chiavariTexture?.selectedChiavariTexture)
  );
  const chairCoverMap = useTexture(
    safePath(chairCoverTexture?.selectedChairCoverTexture)
  );

  const rawChairRunner = useTexture(
    safePath(chairRunnerTexture?.selectedChairRunnerTexture)
  );
  const chairRunnerMap = rawChairRunner.clone();

  const rawChairClip = useTexture(
    safePath(chairClipTexture?.selectedChairClipTexture)
  );
  const chairClipMap = rawChairClip.clone();

  const innerCurtainsMap = useTexture(
    safePath(innerCurtainsTexture?.selectedInnerCurtainsTexture)
  );
  const outerCurtainsMap = useTexture(
    safePath(outerCurtainsTexture?.selectedOuterCurtainsTexture)
  );

  const drapesMap = useTexture(safePath(drapesTexture?.selectedDrapeTexture));

  // Enabled only if package allows AND user selected a runner/clip that's not "none"
  const runnerEnabled =
    allowedKeys.includes("chairRunner") &&
    !!chairRunnerTexture?.selectedChairRunnerTexture &&
    chairRunnerTexture.selectedChairRunnerTexture !== "none";

  const clipEnabled =
    allowedKeys.includes("chairClip") &&
    !!chairClipTexture?.selectedChairClipTexture &&
    chairClipTexture.selectedChairClipTexture !== "none";

  const platePositions = [
    [0, -9, 35],
    [15, -9, 2],
    [2, -9, -32],
    [-60, -9, -32],
    [-75, -9, 2],
    [-62, -9, 35],
  ];

  const chairRadius = 1.3;
  const positions = Array.from({ length: 6 }, (_, i) => {
    const angle = (i * Math.PI * 2) / 6;
    return [chairRadius * Math.cos(angle), 0, chairRadius * Math.sin(angle)];
  });

  const rotations = [
    [0, Math.PI - 0.01, 0],
    [0, (8 * Math.PI) / 6, 0],
    [0, (4 * Math.PI) / 6, 0],
    [0, 0, 0],
    [0, (10 * Math.PI) / 6, 0],
    [0, Math.PI / 3, 0],
  ];

  // centerpiece logic
  const showCenterpiece =
    (selectedPackage === "bronze" || selectedPackage === "gold") &&
    !!centerpieceTexture?.selectedCenterpieceTexture &&
    centerpieceTexture.selectedCenterpieceTexture !== "none";

  const selectedCenterpieceMap = useTexture(
    safePath(centerpieceTexture?.selectedCenterpieceTexture)
  );

  let centerpieceElement = null;
  if (showCenterpiece) {
    // keep selection logic similar to your original switch if you want different centerpiece models
    centerpieceElement = (
      <group position={[0, -8.5, 0]} scale={[2, 1.5, 2]}>
        <mesh geometry={nodes.Centerpiece1.geometry}>
          <meshStandardMaterial
            map={selectedCenterpieceMap}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    );
  }

  return (
    <Suspense fallback={null}>
      <color attach='background' args={["#ffffff"]} />
      <ambientLight intensity={0.3} />
      <spotLight
        intensity={0.8}
        angle={0.25}
        penumbra={1}
        position={[0, 10, 7]}
        castShadow
      />

      <group
        ref={group}
        position={[0, 0, 0.75]}
        rotation={[0, 3.15, 0]}
        scale={[0.01, 0.01, 0.01]}
      >
        {/* Floor + Backdrop */}
        <mesh
          geometry={nodes.Wall.geometry}
          position={[0, 0, 0]}
          scale={[1.5, 1, 1]}
        >
          <meshStandardMaterial color='#ffffff' side={THREE.DoubleSide} />
        </mesh>

        <mesh
          geometry={nodes.Floor.geometry}
          position={[0, 0, 0]}
          scale={[1.5, 1, 1]}
        >
          <meshStandardMaterial color='#ffffff' side={THREE.DoubleSide} />
        </mesh>

        {/* Table Cloth */}
        {allowedKeys.includes("tableCloth") && (
          <mesh
            geometry={nodes.NewTableCloth.geometry}
            scale={[1.25, 1.25, 1.25]}
          >
            <meshStandardMaterial map={tableClothMap} />
          </mesh>
        )}

        {/* Table Runner (package-controlled) */}
        {allowedKeys.includes("tableRunner") && (
          <mesh
            geometry={nodes.TableRunner.geometry}
            position={[0, -4.5, 0]}
            rotation={[0, -0.02, 0]}
            scale={[1.35, 1.4, 1.285]}
          >
            <meshStandardMaterial map={tableRunnerMap} />
          </mesh>
        )}

        {/* Table Overlay */}
        {allowedKeys.includes("tableOverlay") && (
          <mesh
            geometry={nodes.TableOverlay.geometry}
            position={[0, -5, 0]}
            rotation={[0, -0.02, 0]}
            scale={[1.35, 1.4, 1.285]}
          >
            <meshStandardMaterial map={tableOverlayMap} />
          </mesh>
        )}

        {/* Plates */}
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

        {/* Chairs: show when package allows (silver shows base chiavari; others show covers) */}
        {(selectedPackage === "silver" || allowedKeys.includes("chairCover")) &&
          positions.map((pos, i) => (
            <group key={i}>
              {chairType === "chiavari" ? (
                <BasicChair
                  position={pos}
                  rotation={rotations[i]}
                  geometry={nodes.ChiavariChair.geometry}
                  texture={chiavariMap}
                  // pass runner/clip to BasicChair to allow runner on chiavari
                  runnerGeometry={nodes.ChairRunner.geometry}
                  runnerTexture={chairRunnerMap}
                  runnerEnabled={runnerEnabled}
                  clipGeometry={nodes.ChairClip.geometry}
                  clipTexture={chairClipMap}
                  clipEnabled={clipEnabled}
                />
              ) : (
                <Chair
                  position={pos}
                  rotation={rotations[i]}
                  coverTexture={chairCoverMap}
                  runnerTexture={chairRunnerMap}
                  clipTexture={chairClipMap}
                  coverGeometry={nodes.Chair001.geometry}
                  runnerGeometry={nodes.ChairRunner.geometry}
                  clipGeometry={nodes.ChairClip.geometry}
                  runnerEnabled={runnerEnabled}
                  clipEnabled={clipEnabled}
                />
              )}
            </group>
          ))}

        {/* Outer Curtains */}
        {["Сurtain", "Сurtain001", "Сurtain002", "Сurtain003"].map(
          (name, idx) => (
            <mesh
              key={idx}
              geometry={nodes[name].geometry}
              position={[0, 0, -0.2]}
              rotation={[0, 0, 0]}
              scale={[1, 1, 1]}
            >
              <meshStandardMaterial
                map={outerCurtainsMap}
                side={THREE.DoubleSide}
              />
            </mesh>
          )
        )}

        {/* Inner Curtains */}
        {["TiedCurtain", "TiedCurtain2"].map((name, idx) => (
          <mesh
            key={idx}
            geometry={nodes[name].geometry}
            position={[0, 1, 0]}
            rotation={[0, 0, 0]}
            scale={[-1, 1, 1]}
          >
            <meshStandardMaterial
              map={innerCurtainsMap}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}

        {/* Drapes */}
        {["Drape", "Drape001"].map((name, idx) => (
          <mesh
            key={idx}
            geometry={nodes[name].geometry}
            position={[0, 1, 0]}
            rotation={[0, 0, 0]}
            scale={[-1, 1, 1]}
          >
            <meshStandardMaterial map={drapesMap} side={THREE.DoubleSide} />
          </mesh>
        ))}

        {/* Centerpiece */}
        {centerpieceElement}
      </group>

      <OrbitControls
        enablePan
        enableZoom
        enableRotate
        enableDamping
        maxPolarAngle={Math.PI / 2.2}
        minDistance={2}
        maxDistance={8}
      />
    </Suspense>
  );
}

export default Model;
