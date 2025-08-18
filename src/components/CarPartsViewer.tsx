import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Html, useGLTF } from '@react-three/drei';
import { useState, useRef, useEffect, Suspense } from 'react';
import { Mesh, MeshStandardMaterial } from 'three';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import { Navbar } from './Navbar';

interface CarPartInfo {
  label: string;
  type: string;
  reason: string;
  file: string;
  material: string;
}

const carParts: CarPartInfo[] = [
  {
    label: 'B-pillars',
    type: 'Martensitic',
    reason: 'Very high crash protection',
    file: '/models/bpillar.glb',
    material: 'metal',
  },
  {
    label: 'Roof rails',
    type: 'Dual Phase / CP',
    reason: 'Lightweight and strong',
    file: '/models/roofrails.glb',
    material: 'carbon',
  },
  {
    label: 'Roof structure',
    type: 'High Strength Steel',
    reason: 'Structural integrity and weight optimization',
    file: '/models/roof.glb',
    material: 'steel',
  },
  {
    label: 'Structural frame',
    type: 'Advanced High Strength Steel',
    reason: 'Maximum strength and crash safety',
    file: '/models/structure.glb',
    material: 'steel',
  },
];

function CarPartModel({ url, isHovered }: { url: string; isHovered: boolean }) {
  const { scene } = useGLTF(url);
  const modelRef = useRef<any>(null);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh;
        mesh.material = new MeshStandardMaterial({
          color: isHovered ? '#38bdf8' : '#94a3b8',
          metalness: 0.7,
          roughness: 0.25,
          emissive: isHovered ? '#0ea5e9' : '#000000',
          emissiveIntensity: isHovered ? 0.3 : 0,
        });
      }
    });

    if (modelRef.current?.rotation) {
      gsap.to(modelRef.current.rotation, {
        y: isHovered ? Math.PI * 2 : 0,
        duration: 1.5,
        ease: 'power2.out',
      });
    }
  }, [scene, isHovered]);

  return <primitive ref={modelRef} object={scene} scale={1} />;
}

const Loader = () => (
  <Html center>
    <div className="text-sm text-cyan-400 bg-slate-800 px-3 py-2 rounded shadow">
      Loading model...
    </div>
  </Html>
);

export default function CarPartsViewer() {
  const [hoveredPart, setHoveredPart] = useState<CarPartInfo | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  // ✅ preload models inside a component
  useEffect(() => {
    carParts.forEach((part) => useGLTF.preload(part.file));
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);

  const handlePartClick = (part: CarPartInfo) => {
    try {
      // Use exactly the format displayed in the info box
      const query = `Part: ${part.label} Material: ${part.type} Use: ${part.reason}`;
      navigate(`/steel-advisor?query=${encodeURIComponent(query)}`);
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback: navigate without query
      navigate('/steel-advisor');
    }
  };

  const handleMouseEnter = (part: CarPartInfo) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setHoveredPart(part);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setHoveredPart(null);
    }, 300); // Small delay to prevent flickering
    setHoverTimeout(timeout);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-10">
      <Navbar />
      <br />
      <br />
      <h1 className="text-3xl font-semibold text-cyan-400 mb-4 text-center">
        Structural Component Matrix
      </h1>
      <p className="text-center text-slate-300 mb-8 text-sm">
        💡 Hover over any component to see details, then click the "Get Steel Recommendations" button below each model
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {carParts.map((part) => (
                     <div
             key={part.label}
             className="bg-slate-800 border border-slate-600 rounded-md p-4 transition duration-300 hover:shadow-md hover:shadow-cyan-500/20"
             onMouseEnter={() => handleMouseEnter(part)}
             onMouseLeave={handleMouseLeave}
           >
                         <div className="h-80 rounded overflow-hidden relative">
               <Canvas 
                 camera={{ position: [0, 0, 5], fov: 45 }}
               >
                <Suspense fallback={<Loader />}>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[5, 5, 5]} intensity={1.2} />
                  <OrbitControls enableZoom enablePan={false} />
                  <Environment preset="warehouse" />
                  <CarPartModel
                    url={part.file}
                    isHovered={hoveredPart?.label === part.label}
                  />
                </Suspense>
              </Canvas>
                                                           {/* Info Text Box */}
               {hoveredPart?.label === part.label && (
                 <div 
                   className="absolute top-3 left-3 p-2 text-xs bg-slate-950/95 border-2 border-cyan-400 text-white rounded-lg shadow-xl animate-fadeIn z-50 transition-all duration-300"
                 >
                   <div className="mb-1">
                     <span className="text-cyan-400 font-bold">Part:</span>{' '}
                     <span className="text-white font-semibold">{part.label}</span>
                   </div>
                   <div className="mb-1">
                     <span className="text-blue-400 font-bold">Material:</span>{' '}
                     <span className="text-white">{part.type}</span>
                   </div>
                   <div className="mb-1">
                     <span className="text-pink-400 font-bold">Use:</span>{' '}
                     <span className="text-white">{part.reason}</span>
                   </div>
                 
                 </div>
               )}
            </div>
                         <div className="mt-3 text-center text-cyan-300 font-medium tracking-wide">
               {part.label}
             </div>
             <div className="mt-3 text-center">
               <button
                 className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-sm font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                 onClick={() => handlePartClick(part)}
               >
                 🔧 Get Steel Recommendations
               </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
