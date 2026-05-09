import { useRef, useEffect, useState } from 'react';

export default function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    let renderer: import("three").WebGLRenderer;

    let animId: number;

    async function init() {
      try {
        const THREE = await import('three');

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('webgl2') || canvas.getContext('webgl');
        if (!ctx) { setWebglFailed(true); return; }

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, mountRef.current!.clientWidth / mountRef.current!.clientHeight, 0.1, 100);
        camera.position.z = 5;

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(mountRef.current!.clientWidth, mountRef.current!.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        mountRef.current!.appendChild(renderer.domElement);

        const geo = new THREE.IcosahedronGeometry(1.5, 1);
        const mat = new THREE.MeshStandardMaterial({ color: 0xff4500, wireframe: true, transparent: true, opacity: 0.6 });
        const mesh = new THREE.Mesh(geo, mat);
        scene.add(mesh);

        const ambLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambLight);
        const dirLight = new THREE.DirectionalLight(0xff4500, 1.5);
        dirLight.position.set(10, 10, 5);
        scene.add(dirLight);
        const ptLight = new THREE.PointLight(0xff8c00, 1);
        ptLight.position.set(-10, -10, -5);
        scene.add(ptLight);

        const count = 1000;
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
          pos[i * 3] = (Math.random() - 0.5) * 12;
          pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
          pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
        }
        const pgeo = new THREE.BufferGeometry();
        pgeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        const pmat = new THREE.PointsMaterial({ size: 0.025, color: 0xffcc00, transparent: true, opacity: 0.5 });
        const particles = new THREE.Points(pgeo, pmat);
        scene.add(particles);

        let mouseX = 0, mouseY = 0;
        const onMouseMove = (e: MouseEvent) => {
          mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
          mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener('mousemove', onMouseMove);

        const animate = () => {
          animId = requestAnimationFrame(animate);
          const t = Date.now() * 0.001;
          mesh.rotation.x = t * 0.1;
          mesh.rotation.y = t * 0.15;
          particles.rotation.y = t * 0.05 + mouseX * 0.2;
          particles.rotation.x = mouseY * 0.1;
          renderer.render(scene, camera);
        };
        animate();

        const onResize = () => {
          if (!mountRef.current) return;
          camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        };
        window.addEventListener('resize', onResize);

        return () => {
          window.removeEventListener('mousemove', onMouseMove);
          window.removeEventListener('resize', onResize);
          cancelAnimationFrame(animId);
          renderer.dispose();
          if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
            mountRef.current.removeChild(renderer.domElement);
          }
        };
        return;
      } catch {
        setWebglFailed(true);
        return;
      }
    }

    const cleanup = init();
    return () => { cleanup.then(fn => fn && fn()); };
  }, []);

  if (webglFailed) return null; // Fallback will be handled by Suspense/ErrorBoundary
  return <div ref={mountRef} className="w-full h-full" />;
}
