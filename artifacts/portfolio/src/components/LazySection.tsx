import { useState, useEffect, useRef, ReactNode } from "react";

interface LazySectionProps {
  children: ReactNode;
  height?: string;
  rootMargin?: string;
}

export function LazySection({ children, height = "100vh", rootMargin = "600px" }: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible) return; // Once visible, keep it rendered

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible, rootMargin]);

  // Before it's visible, render a placeholder div of roughly the expected height
  // to prevent layout shifts.
  if (!isVisible) {
    return <div ref={containerRef} style={{ height }} aria-hidden="true" className="w-full bg-background" />;
  }

  return <div ref={containerRef}>{children}</div>;
}
