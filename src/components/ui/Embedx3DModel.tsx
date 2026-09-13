import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Stage, PresentationControls, Float } from '@react-three/drei';

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const ref = useRef<any>(null);
  
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.005; // Slow spin
    }
  });

  return (
    <primitive 
      ref={ref} 
      object={scene} 
      scale={1} 
      position={[0, 0, 0]} 
    />
  );
}

export default function Embedx3DModel({ url = '/robo_dog_low_poly.glb' }: { url?: string }) {
  return (
    <div className="w-full h-[300px] md:h-[400px] relative rounded-xl border border-blue-500/20 bg-blue-900/5 shadow-[0_0_30px_rgba(59,130,246,0.1)] overflow-hidden">
      {/* Background glow for the model box */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-500/5 to-transparent pointer-events-none" />
      
      <Canvas camera={{ fov: 45 }} className="w-full h-full cursor-grab active:cursor-grabbing">
        <Suspense fallback={null}>
          <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <PresentationControls 
              speed={1.5} 
              global 
              zoom={0.8} 
              polar={[-0.2, Math.PI / 4]}
              azimuth={[-Math.PI / 4, Math.PI / 4]}
            >
              <Stage environment="city" intensity={0.4} adjustCamera={1.2}>
                <Model url={url} />
              </Stage>
            </PresentationControls>
          </Float>
        </Suspense>
      </Canvas>
      
      <div className="absolute bottom-3 left-0 w-full text-center pointer-events-none">
        <p className="text-[10px] uppercase font-mono tracking-widest text-blue-500/60 font-bold">Interactive Model - Drag to Rotate</p>
      </div>
    </div>
  );
}

// Preload the model
useGLTF.preload('/robo_dog_low_poly.glb');


