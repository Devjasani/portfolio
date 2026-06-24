import { useRef, useEffect, useState, Component, ReactNode, lazy, Suspense } from 'react';

import { Link } from 'wouter';

const ThreeScene = lazy(() => import('./ThreeScene'));

class CanvasErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

// --- Typing animation hook ---
const roles = [
  "Passionate Full-Stack Developer",
  "Creative Problem Solver",
  "AI Integration Specialist",
  "Building Things That Matter",
];

function useTypingAnimation(words: string[], speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx));
        setCharIdx((c) => c + 1);
      }, speed);
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx));
        setCharIdx((c) => c - 1);
      }, speed / 2);
    } else {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
}



function CSSFallbackBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Deep ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,_#ff45001a_0%,_transparent_70%)]" />

      {/* Animated wireframe-like sphere using layered CSS rings */}
      <div className="sphere-container absolute top-1/2 left-1/2" style={{ transform: 'translate(-50%, -50%)' }}>

        {/* Horizontal elliptical rings */}
        {[
          { w: 340, h: 340, dur: '20s', dir: 'normal',  op: 0.55, col: '#ff4500' },
          { w: 260, h: 110, dur: '18s', dir: 'reverse', op: 0.45, col: '#ff6a00' },
          { w: 340, h: 130, dur: '22s', dir: 'normal',  op: 0.40, col: '#ff8c00' },
          { w: 200, h: 80,  dur: '14s', dir: 'reverse', op: 0.35, col: '#ff4500' },
          { w: 160, h: 60,  dur: '10s', dir: 'normal',  op: 0.30, col: '#ffcc00' },
          { w: 300, h: 100, dur: '16s', dir: 'reverse', op: 0.35, col: '#ff6a00' },
        ].map((ring, i) => (
          <div key={i} className="absolute" style={{ width: ring.w, height: ring.h, top: '50%', left: '50%', marginTop: -ring.h/2, marginLeft: -ring.w/2 }}>
            <div
              className="w-full h-full rounded-full border"
              style={{
                borderColor: ring.col,
                opacity: ring.op,
                borderWidth: '1px',
                animation: `spinRing ${ring.dur} linear infinite ${ring.dir}`,
              }}
            />
          </div>
        ))}

        {/* Vertical / tilted rings */}
        {[
          { w: 340, h: 340, dur: '25s', rotX: 80, op: 0.50, col: '#ff4500' },
          { w: 280, h: 280, dur: '19s', rotX: 60, op: 0.40, col: '#ff8c00' },
          { w: 220, h: 220, dur: '15s', rotX: 40, op: 0.35, col: '#ffcc00' },
        ].map((ring, i) => (
          <div key={`v-${i}`} className="absolute" style={{ width: ring.w, height: ring.h, top: '50%', left: '50%', marginTop: -ring.h/2, marginLeft: -ring.w/2, transform: `rotateX(${ring.rotX}deg)` }}>
            <div
              className="w-full h-full rounded-full border"
              style={{
                borderColor: ring.col,
                opacity: ring.op,
                borderWidth: '1px',
                animation: `spinRing ${ring.dur} linear infinite`,
              }}
            />
          </div>
        ))}

        {/* Inner glowing core */}
        <div
          className="absolute rounded-full"
          style={{
            width: 18, height: 18,
            top: '50%', left: '50%',
            marginTop: -9, marginLeft: -9,
            background: 'radial-gradient(circle, #ff8c00 0%, #ff450080 60%, transparent 100%)',
            boxShadow: '0 0 30px 10px #ff450055',
            animation: 'glowPulse 3s ease-in-out infinite',
          }}
        />

        {/* Scattered orbit particles */}
        {Array.from({ length: 28 }).map((_, i) => {
          const angle = (i / 28) * 360;
          const radius = 130 + (i % 5) * 22;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;
          return (
            <div
              key={`p-${i}`}
              className="absolute rounded-full"
              style={{
                width: i % 3 === 0 ? 3 : 2,
                height: i % 3 === 0 ? 3 : 2,
                background: i % 4 === 0 ? '#ffcc00' : '#ff4500',
                top: '50%', left: '50%',
                marginTop: i % 3 === 0 ? -1.5 : -1,
                marginLeft: i % 3 === 0 ? -1.5 : -1,
                transform: `translate(${x}px, ${y}px)`,
                opacity: 0.6 + (i % 4) * 0.1,
                boxShadow: `0 0 4px ${i % 4 === 0 ? '#ffcc00' : '#ff4500'}`,
                animation: `glowPulse ${2 + (i % 3)}s ease-in-out infinite ${(i * 0.12).toFixed(1)}s`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}


export function Hero() {
  const typedText = useTypingAnimation(roles);
  const containerRef = useRef<HTMLElement>(null);
  const [load3D, setLoad3D] = useState(false);

  useEffect(() => {
    // Import on Interaction to eliminate unused JS penalty for Three.js
    const handleInteraction = () => {
      setLoad3D(true);
      ['mousemove', 'touchstart', 'scroll', 'keydown', 'click'].forEach((event) => {
        window.removeEventListener(event, handleInteraction);
      });
    };

    ['mousemove', 'touchstart', 'scroll', 'keydown', 'click'].forEach((event) => {
      window.addEventListener(event, handleInteraction, { once: true, passive: true });
    });

    return () => {
      ['mousemove', 'touchstart', 'scroll', 'keydown', 'click'].forEach((event) => {
        window.removeEventListener(event, handleInteraction);
      });
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 z-0" style={{
        background: 'linear-gradient(135deg, #000000 0%, #100500 40%, #080400 70%, #000000 100%)'
      }} />

      {/* Ambient glow */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 80% 60% at 20% 80%, rgba(255,69,0,0.18) 0%, transparent 60%),
          radial-gradient(ellipse 70% 50% at 80% 20%, rgba(255,204,0,0.12) 0%, transparent 55%),
          radial-gradient(ellipse 90% 70% at 50% 50%, rgba(255,140,0,0.07) 0%, transparent 70%)
        `
      }} />

      {/* 3D Scene - All viewports */}
      <div className="absolute inset-0 z-0">
        <CanvasErrorBoundary fallback={<CSSFallbackBackground />}>
          <Suspense fallback={null}>
            {load3D ? <ThreeScene /> : null}
          </Suspense>
        </CanvasErrorBoundary>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-x-0 top-0 h-32 z-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(5,5,16,0.6) 0%, transparent 100%)' }} />
      <div className="absolute inset-x-0 bottom-0 h-48 z-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(255,140,0,0.06) 0%, transparent 100%)' }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center mt-20 pointer-events-none">
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
          <span
            className="text-xs uppercase tracking-[0.3em] text-primary mb-6 block font-mono animate-in fade-in duration-1000 fill-mode-both delay-[200ms]"
          >
            Available for freelance work
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-4 tracking-tight drop-shadow-2xl leading-[1.1]">
            Building <span className="gradient-text">Exceptional</span>
            <br />
            Digital Experiences
          </h1>

          {/* Typing animation */}
          <div className="h-12 flex items-center justify-center mb-8">
            <p className="text-xl md:text-2xl font-mono text-muted-foreground">
              <span className="gradient-text font-bold">{typedText}</span>
              <span className="animate-pulse text-[#ff4500] ml-0.5">|</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pointer-events-auto">
            <a
              href="#work"
              className="px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:shadow-[0_0_30px_rgba(255,140,0,0.5)] transition-all duration-300 hover:scale-105 active:scale-95"
              data-testid="button-view-work"
            >
              View Work
            </a>
            <div className="hover:scale-105 active:scale-95 transition-transform duration-300">
              <Link
                href="/contact"
                className="px-6 py-3 sm:px-8 sm:py-4 rounded-full glass border border-primary/30 text-foreground font-semibold hover:bg-primary/10 transition-colors duration-300 glow-border block"
                data-testid="button-start-project"
              >
                Start a Project
              </Link>
            </div>
          </div>

          {/* Social proof */}
          <div
            className="mt-10 flex items-center justify-center gap-3 pointer-events-none animate-in fade-in duration-1000 delay-[1200ms] fill-mode-both"
          >
            <div className="flex -space-x-2">
              {["JD", "AM", "PR", "KS"].map((initials, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-background flex items-center justify-center text-[9px] font-bold text-black"
                  style={{ background: `linear-gradient(135deg, ${["#ff4500","#ff8c00","#ffcc00","#ff4500"][i]}, #ff8c00)` }}
                >
                  {initials}
                </div>
              ))}
            </div>
            <span className="text-xs text-muted-foreground font-mono">
              Trusted by <span className="text-[#ffcc00] font-bold">50+</span> clients worldwide
            </span>
          </div>
        </div>
      </div>

      {/* Scroll indicator - Hidden on mobile to prevent overlap on short screens */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center z-10 pointer-events-none animate-in fade-in duration-1000 delay-[1500ms] fill-mode-both"
      >
        <span className="text-xs text-muted-foreground mb-2 uppercase tracking-widest font-mono">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
}
