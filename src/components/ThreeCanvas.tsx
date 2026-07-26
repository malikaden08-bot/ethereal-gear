import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useApp } from '../context/AppContext';

// Floating Glass Cylinder Group (Inspired by Image 1 glass cylinders on circular tray)
function GlassCylindersGroup() {
  const groupRef = useRef<THREE.Group>(null);
  const { sceneConfig } = useApp();

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2 * sceneConfig.speed;
    }
  });

  if (!sceneConfig.glassCylindersVisible) return null;

  return (
    <group ref={groupRef} position={[2.5, -0.5, 0]} scale={[0.9, 0.9, 0.9]}>
      {/* Outer Circular Glass Tray */}
      <mesh position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 2.2, 64]} />
        <meshPhysicalMaterial
          color="#a78bfa"
          transparent
          opacity={0.4}
          roughness={0.1}
          metalness={0.2}
          transmission={0.85}
          ior={1.4}
        />
      </mesh>

      {/* Tall Main Purple Glass Cylinder */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 2.4, 32]} />
        <MeshTransmissionMaterial
          backside
          samples={8}
          resolution={512}
          transmission={0.92}
          roughness={0.08}
          clearcoat={1}
          clearcoatRoughness={0.1}
          ior={1.45}
          color="#8b5cf6"
          thickness={0.8}
        />
      </mesh>

      {/* Medium Blue Glass Cylinder */}
      <mesh position={[-0.7, -0.2, 0.4]}>
        <cylinderGeometry args={[0.32, 0.32, 1.6, 32]} />
        <MeshTransmissionMaterial
          backside
          samples={8}
          resolution={512}
          transmission={0.9}
          roughness={0.05}
          clearcoat={1}
          ior={1.42}
          color="#3b82f6"
          thickness={0.7}
        />
      </mesh>

      {/* Short Magenta/Violet Glass Cylinder */}
      <mesh position={[0.7, -0.5, -0.3]}>
        <cylinderGeometry args={[0.28, 0.28, 1.0, 32]} />
        <MeshTransmissionMaterial
          backside
          samples={8}
          resolution={512}
          transmission={0.88}
          roughness={0.1}
          clearcoat={1}
          ior={1.4}
          color="#d946ef"
          thickness={0.6}
        />
      </mesh>
    </group>
  );
}

// Floating Rounded Glass Cubes & Bubbles (Inspired by Image 1 top right & floating elements)
function FloatingGlassShapes() {
  const { sceneConfig } = useApp();

  return (
    <>
      {/* Top Floating Glass Cube with Emerald Shapes inside */}
      <Float speed={2 * sceneConfig.speed} rotationIntensity={1.5} floatIntensity={1.8}>
        <mesh position={[3.2, 2.2, -1]} rotation={[0.4, 0.6, 0]}>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <MeshTransmissionMaterial
            backside
            samples={8}
            resolution={256}
            transmission={0.95}
            roughness={0.05}
            thickness={0.5}
            ior={1.5}
            color="#e9d5ff"
          />
        </mesh>
      </Float>

      {/* Second Floating Glass Cube with Soft Gold */}
      <Float speed={1.5 * sceneConfig.speed} rotationIntensity={1.2} floatIntensity={1.4}>
        <mesh position={[-3.5, 1.8, -2]} rotation={[-0.3, 0.8, 0.2]}>
          <boxGeometry args={[1.4, 1.4, 0.4]} />
          <MeshTransmissionMaterial
            backside
            samples={8}
            transmission={0.92}
            roughness={0.1}
            thickness={0.4}
            ior={1.38}
            color="#60a5fa"
          />
        </mesh>
      </Float>

      {/* Glass Sphere / Droplet */}
      <Float speed={2.5 * sceneConfig.speed} floatIntensity={2}>
        <mesh position={[3.8, -1.8, 1]}>
          <sphereGeometry args={[0.45, 32, 32]} />
          <MeshTransmissionMaterial
            backside
            samples={8}
            transmission={0.98}
            roughness={0.02}
            ior={1.5}
            color="#c084fc"
          />
        </mesh>
      </Float>

      {/* Small Ambient Droplet Left */}
      <Float speed={1.8 * sceneConfig.speed} floatIntensity={1.2}>
        <mesh position={[-3.8, -1.2, 0.5]}>
          <sphereGeometry args={[0.35, 32, 32]} />
          <MeshTransmissionMaterial
            backside
            samples={8}
            transmission={0.95}
            roughness={0.04}
            ior={1.4}
            color="#a7f3d0"
          />
        </mesh>
      </Float>
    </>
  );
}

// Background Particle Starfield
function ParticleBackground() {
  const { sceneConfig } = useApp();
  const count = sceneConfig.particleDensity * 3;

  const pointsRef = useRef<THREE.Points>(null);

  const particles = React.useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 20;
      p[i * 3 + 1] = (Math.random() - 0.5) * 20;
      p[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return p;
  }, [count]);

  useFrame((_state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03 * sceneConfig.speed;
      pointsRef.current.rotation.x += delta * 0.015 * sceneConfig.speed;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color={sceneConfig.ambientLightingColor || "#c084fc"}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function CameraRig() {
  useFrame((state) => {
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    const maxScroll = typeof document !== 'undefined'
      ? (document.documentElement.scrollHeight - window.innerHeight) || 1
      : 1;
    const scrollProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

    // Smoothly lerp camera position & rotation based on scroll depth
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, -scrollProgress * 2.2, 0.08);
    state.camera.rotation.x = THREE.MathUtils.lerp(state.camera.rotation.x, scrollProgress * 0.12, 0.08);
  });

  return null;
}

export const ThreeCanvas: React.FC = () => {
  const { sceneConfig } = useApp();

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={1} color={sceneConfig.ambientLightingColor} />
        <spotLight position={[0, 15, 10]} angle={0.3} penumbra={1} intensity={2} color="#c084fc" />

        <CameraRig />
        <GlassCylindersGroup />
        <FloatingGlassShapes />
        <ParticleBackground />

        {sceneConfig.enableMouseParallax && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={false}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 2.2}
            maxAzimuthAngle={Math.PI / 8}
            minAzimuthAngle={-Math.PI / 8}
          />
        )}
      </Canvas>
    </div>
  );
};
