import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, Line, Stars } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import { Location } from '../types';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

// Types
type SpaceMapProps = {
  from: Location;
  to: Location;
};

interface LocationPositions extends Record<Location, [number, number, number]> {}
interface ModelScales extends Record<Location, number> {}

// Constants
const LOCATION_POSITIONS: LocationPositions = {
  'Earth': [-4.5, 0, 0],
  'Moon': [-2.5, 2, 0],
  'Mars': [4.5, 0, 0],
  'ISS': [0, 4, 0],
  'Space Hotel': [0, -4, 0],
};

const MODEL_SCALES: ModelScales = {
  'Earth': 4.0,
  'Moon': 0.6,
  'Mars': 0.9,
  'ISS': 0.15,
  'Space Hotel': 1.0,
};

// Preload models
const MODEL_PATHS = [
  '/models/earth.glb',
  '/models/mars.glb',
  '/models/moon.glb',
  '/models/iss.glb',
  '/models/space-hotel.glb',
];
MODEL_PATHS.forEach((path) => useGLTF.preload(path));

// Components
interface SpaceObjectProps {
  position: [number, number, number];
  name: Location;
}

function SpaceObject({ position, name }: SpaceObjectProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(`/models/${name.toLowerCase().replace(' ', '-')}.glb`);
  const scale = MODEL_SCALES[name] || 0.3;

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group position={new THREE.Vector3(...position)} ref={groupRef}>
      <primitive object={scene.clone()} scale={[scale, scale, scale]} dispose={null} />
      <Html center distanceFactor={10} zIndexRange={[1000, 0]}>
        <div className="text-white text-sm bg-black bg-opacity-75 px-3 py-1.5 rounded-full whitespace-nowrap border border-purple-500 shadow-lg backdrop-blur-sm">
          {name}
        </div>
      </Html>
      {name === 'Earth' && <pointLight position={[0, 0, 0]} intensity={1} color="#4B91F1" />}
    </group>
  );
}

interface ConnectionLineProps {
  start: [number, number, number];
  end: [number, number, number];
}

function ConnectionLine({ start, end }: ConnectionLineProps) {
  if (!start || !end) return null;

  const curve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(...start),
    new THREE.Vector3(...start).add(new THREE.Vector3(0, 1.5, 0)),
    new THREE.Vector3(...end).add(new THREE.Vector3(0, 1.5, 0)),
    new THREE.Vector3(...end),
  );

  const points = curve.getPoints(50);

  return (
    <>
      <Line points={points} color="#8B5CF6" lineWidth={3} transparent opacity={0.8} />
      <Line points={points} color="#EC4899" lineWidth={1} transparent opacity={0.5} />
    </>
  );
}

interface SceneProps {
  from: Location;
  to: Location;
}

function Scene({ from, to }: SceneProps) {
  return (
    <>
      {Object.entries(LOCATION_POSITIONS).map(([name, position]) => (
        <SpaceObject key={name} position={position as [number, number, number]} name={name as Location} />
      ))}
      {LOCATION_POSITIONS[from] && LOCATION_POSITIONS[to] && (
        <ConnectionLine start={LOCATION_POSITIONS[from]} end={LOCATION_POSITIONS[to]} />
      )}
    </>
  );
}

function LoadingScreen() {
  return (
    <Html center>
      <div className="text-white text-lg">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <span>Loading Space Map...</span>
        </div>
      </div>
    </Html>
  );
}

export default function SpaceMap({ from, to }: SpaceMapProps) {
  return (
    <div className="w-full h-[calc(100vh-12rem)] rounded-lg overflow-hidden bg-[#070714]">
      <Canvas camera={{ position: [0, 0, 8] }}>
        <color attach="background" args={['#070714']} />
        <fog attach="fog" args={['#070714', 8, 30]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <Suspense fallback={<LoadingScreen />}>
          <Scene from={from} to={to} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <OrbitControls enableZoom enablePan maxDistance={15} minDistance={4} autoRotate autoRotateSpeed={0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
}