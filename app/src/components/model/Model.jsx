import React, { useRef } from "react";
import * as THREE from "three";
import { useGLTF, useTexture, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";

// Preload model
useGLTF.preload("/resources/PFScene11.gltf");

const BasicChair = ({ position, rotation, geometry }) => (
  <group position={position} rotation={rotation} scale={[1, 1, 1]}>
    <mesh geometry={geometry}>
      <meshStandardMaterial color='#2b2b2b' />
    </mesh>
  </group>
);

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
  innerCurtainsTexture,
  outerCurtainsTexture,
  centerpieceTexture,
}) {
  const group = useRef();
  const { nodes } = useGLTF("/resources/PFScene11.gltf");

  const allowedKeys = packages[selectedPackage] || [];

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

  const innerCurtainsMap = useTexture(
    innerCurtainsTexture.selectedInnerCurtainsTexture
  );
  const outerCurtainsMap = useTexture(
    outerCurtainsTexture.selectedOuterCurtainsTexture
  );

  const platePositions = [
    [-8, -8, 30],
    [0, -8, 0],
    [-7, -8, -31],
    [-50, -8, -32],
    [-60, -8, 0],
    [-52, -8, 30],
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
    selectedPackage === "bronze" || selectedPackage === "gold";

  // Always call useTexture with a valid path (use transparent placeholder if none selected)
  const safeCenterpiecePath =
    centerpieceTexture.selectedCenterpieceTexture &&
    centerpieceTexture.selectedCenterpieceTexture !== "none"
      ? centerpieceTexture.selectedCenterpieceTexture
      : "/pf_textures/centerpieces/transparent.jpg"; // 1x1 transparent image

  const selectedCenterpieceMap = useTexture(safeCenterpiecePath);

  let centerpieceElement = null;

  if (
    showCenterpiece &&
    centerpieceTexture.selectedCenterpieceTexture &&
    centerpieceTexture.selectedCenterpieceTexture !== "none"
  ) {
    switch (centerpieceTexture.selectedCenterpieceTexture) {
      case "/pf_textures/centerpieces/centerpiece1.jpg":
        centerpieceElement = (
          <group position={[0, 10, 0]} scale={[1.5, 1, 1.5]}>
            <mesh geometry={nodes.Centerpiece1.geometry}>
              <meshStandardMaterial
                map={selectedCenterpieceMap}
                side={THREE.DoubleSide}
              />
            </mesh>
            <mesh geometry={nodes.Centerpiece1legs.geometry}>
              <meshStandardMaterial side={THREE.DoubleSide} />
            </mesh>
          </group>
        );
        break;

      case "/pf_textures/centerpieces/centerpiece2.jpg":
        centerpieceElement = (
          // <group position={[0, -22, 0]} scale={[2, 2, 2]}>
          <group position={[0, -26.5, 0]} scale={[2, 2, 2]}>
            <mesh geometry={nodes.Centerpiece2.geometry}>
              <meshStandardMaterial
                map={selectedCenterpieceMap}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        );
        break;

      case "/pf_textures/centerpieces/centerpiece3.jpg":
        centerpieceElement = (
          <group position={[0, 0, 0]} scale={[1.5, 1, 1.5]}>
            <mesh geometry={nodes.Centerpiece3.geometry}>
              <meshStandardMaterial map={selectedCenterpieceMap} />
            </mesh>
          </group>
        );
        break;

      case "/pf_textures/centerpieces/centerpiece4.jpg":
        centerpieceElement = (
          <group position={[0, 10, 0]} scale={[1.5, 1, 1.5]}>
            <mesh geometry={nodes.Centerpiece4.geometry}>
              <meshStandardMaterial map={selectedCenterpieceMap} />
            </mesh>
          </group>
        );
        break;

      default:
        break;
    }
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
        {/* Floor and Backdrop */}
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
        {allowedKeys.includes("tableCloth") && (
          <mesh geometry={nodes.TableCloth.geometry} scale={[1.25, 1.25, 1.25]}>
            <meshStandardMaterial map={tableClothMap} />
          </mesh>
        )}

        {allowedKeys.includes("tableRunner") && (
          <mesh
            geometry={nodes.TableRunner.geometry}
            position={[0, 0, 0]}
            rotation={[0, -0.02, 0]}
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
        {/* Outer Curtains */}
        <mesh
          geometry={nodes.Outercurtains.geometry}
          position={[0, 10, 0]}
          rotation={[0, 0, 0]}
          scale={[1, 1, 1]}
        >
          <meshStandardMaterial
            map={outerCurtainsMap}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Inner Curtains */}
        <mesh
          geometry={nodes.innercurtains.geometry}
          position={[0, 1, 0]}
          rotation={[0, 0, 0]}
          scale={[-1, 1, 1]}
        >
          <meshStandardMaterial
            map={innerCurtainsMap}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* centerpieces */}
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
