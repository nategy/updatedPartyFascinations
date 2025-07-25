import React, { useRef } from "react";
import * as THREE from "three";
import { useGLTF, useTexture } from "@react-three/drei";

// Preload model
useGLTF.preload("/resources/PFScene10.gltf");

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
}) {
  const group = useRef();
  const { nodes } = useGLTF("/resources/PFScene10.gltf");

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

  const platePositions = [
    [2, -8, 15],
    [0, -8, -15.5],
    [-24, -8, -32],
    [-62, -8, -12],
    [-57, -8, 15.5],
    [-35, -8, 35],
  ];

  const chairRadius = 1.3;
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

export default Model;
