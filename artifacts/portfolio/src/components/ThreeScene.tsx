import { useRef, useEffect, useState } from 'react';
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  IcosahedronGeometry,
  MeshStandardMaterial,
  Mesh,
  AmbientLight,
  DirectionalLight,
  PointLight,
  BufferGeometry,
  BufferAttribute,
  PointsMaterial,
  Points
} from 'three';

// Micro-task yielder to unblock the main thread
const yieldToMain = () => new Promise((resolve) => setTimeout(resolve, 0));

export default function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    let renderer: WebGLRenderer | null = null;
    let animId: number;
    let isDisposed = false;

    async function init() {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('webgl2') || canvas.getContext('webgl');
        if (!ctx) { setWebglFailed(true); return; }

        await yieldToMain(); // Yield before scene creation
        if (isDisposed) return;

        const scene = new Scene();
        const camera = new PerspectiveCamera(45, mountRef.current!.clientWidth / mountRef.current!.clientHeight, 0.1, 100);
        camera.position.z = 5;

        renderer = new WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(mountRef.current!.clientWidth, mountRef.current!.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        
        await yieldToMain(); // Yield before adding to DOM
        if (isDisposed) return;

        mountRef.current!.appendChild(renderer.domElement);

        const geo = new IcosahedronGeometry(1.5, 1);
        const mat = new MeshStandardMaterial({ color: 0xff4500, wireframe: true, transparent: true, opacity: 0.6 });
        const mesh = new Mesh(geo, mat);
        scene.add(mesh);

        await yieldToMain(); // Yield before lighting
        if (isDisposed) return;

        const ambLight = new AmbientLight(0xffffff, 0.5);
        scene.add(ambLight);
        const dirLight = new DirectionalLight(0xff4500, 1.5);
        dirLight.position.set(10, 10, 5);
        scene.add(dirLight);
        const ptLight = new PointLight(0xff8c00, 1);
        ptLight.position.set(-10, -10, -5);
        scene.add(ptLight);

        await yieldToMain(); // Yield before particle generation
        if (isDisposed) return;

        const count = 1000;
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
          pos[i * 3] = (Math.random() - 0.5) * 12;
          pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
          pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
        }
        const pgeo = new BufferGeometry();
        pgeo.setAttribute('position', new BufferAttribute(pos, 3));
        const pmat = new PointsMaterial({ size: 0.025, color: 0xffcc00, transparent: true, opacity: 0.5 });
        const particles = new Points(pgeo, pmat);
        scene.add(particles);

        let mouseX = 0, mouseY = 0;
        const onMouseMove = (e: MouseEvent) => {
          mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
          mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener('mousemove', onMouseMove);

        const animate = () => {
          if (isDisposed) return;
          animId = requestAnimationFrame(animate);
          const t = Date.now() * 0.001;
          mesh.rotation.x = t * 0.1;
          mesh.rotation.y = t * 0.15;
          particles.rotation.y = t * 0.05 + mouseX * 0.2;
          particles.rotation.x = mouseY * 0.1;
          if (renderer) renderer.render(scene, camera);
        };
        
        await yieldToMain(); // Yield before starting animation loop
        if (isDisposed) return;
        
        animate();

        const onResize = () => {
          if (!mountRef.current || isDisposed) return;
          camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
          camera.updateProjectionMatrix();
          if (renderer) renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        };
        window.addEventListener('resize', onResize);

        return () => {
          window.removeEventListener('mousemove', onMouseMove);
          window.removeEventListener('resize', onResize);
        };
      } catch {
        setWebglFailed(true);
        return;
      }
    }

    const cleanupPromise = init();
    
    return () => { 
      isDisposed = true;
      cancelAnimationFrame(animId);
      
      cleanupPromise.then(cleanup => {
        if (cleanup) cleanup();
        if (renderer) {
          renderer.dispose();
          if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
            mountRef.current.removeChild(renderer.domElement);
          }
        }
      });
    };
  }, []);

  if (webglFailed) return null; // Fallback will be handled by Suspense/ErrorBoundary
  return <div ref={mountRef} className="w-full h-full" />;
}
