import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Float, ContactShadows, Html } from '@react-three/drei';
import * as THREE from 'three';

// Generic male avatar from Ready Player Me (Stable 2024 - Verified)
const AVATAR_URL = "https://models.readyplayer.me/64e3055495439dfcf3f0b665.glb";

const AvatarModel = ({ isSpeaking }) => {
  const { scene } = useGLTF(AVATAR_URL);
  const headMeshRef = useRef();
  
  // Clone scene to avoid shared state issues
  const clone = React.useMemo(() => scene.clone(), [scene]);

  useEffect(() => {
    // Find the mesh with morph targets for the mouth
    clone.traverse((child) => {
      if (child.isMesh && child.morphTargetDictionary) {
        if (child.name.includes('Head') || child.name.includes('Teeth') || child.name.includes('Wolf3D_Avatar')) {
            headMeshRef.current = child;
        }
      }
    });
  }, [clone]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Slight natural head movement (idle)
    const headRotationX = Math.sin(t * 1) * 0.02;
    const headRotationY = Math.sin(t * 0.5) * 0.05;
    
    clone.rotation.y = headRotationY;
    clone.rotation.x = headRotationX;

    // Talking Animation (Simple Sine Wave)
    if (headMeshRef.current && headMeshRef.current.morphTargetDictionary && headMeshRef.current.morphTargetInfluences) {
        // Try to find the correct morph target for mouth opening
        const mouthOpenIndex = headMeshRef.current.morphTargetDictionary['mouthOpen'] || 
                               headMeshRef.current.morphTargetDictionary['viseme_aa'] ||
                               headMeshRef.current.morphTargetDictionary['jawOpen'];
        
        if (mouthOpenIndex !== undefined) {
             const targetOpen = isSpeaking ? (Math.sin(t * 20) * 0.6 + 0.2) : 0;
             headMeshRef.current.morphTargetInfluences[mouthOpenIndex] = THREE.MathUtils.lerp(
                headMeshRef.current.morphTargetInfluences[mouthOpenIndex],
                targetOpen,
                0.2
             );
        }
    }
  });

  // Scale smaller, position so face is at camera level
  // Scale 0.6 -> head at ~1.0m. Push down by -0.95 -> head at Y=0.05
  return <primitive object={clone} scale={0.6} position={[0, -0.95, 0]} />;
};

export const AvatarView = ({ isSpeaking }) => {
  return (
    <div className="w-full h-full absolute inset-0 bg-gradient-to-b from-blue-50 to-purple-100">
      <Canvas
        camera={{ position: [0, 0.05, 0.35], fov: 30 }}
        onCreated={({ gl }) => {
          // Disable shader error checking logs to avoid noisy X4122/X4008 warnings
          if (gl && gl.debug) {
            gl.debug.checkShaderErrors = false;
          }
        }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-3, 3, 2]} intensity={0.5} />
        
        <Suspense fallback={
            <Html center>
                <div className="text-slate-600 font-bold">Loading...</div>
            </Html>
        }>
            <AvatarModel isSpeaking={isSpeaking} />
        </Suspense>
        
        <Environment preset="apartment" />
      </Canvas>
    </div>
  );
};

// Preload to ensure smooth texture loading
useGLTF.preload(AVATAR_URL);
