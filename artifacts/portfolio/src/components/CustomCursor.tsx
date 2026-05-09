import { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      const isClickable =
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button";
      setIsHovering(isClickable);
    };

    window.addEventListener("mousemove", updatePosition);
    return () => window.removeEventListener("mousemove", updatePosition);
  }, []);

  return (
    <>
      <div
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9999] mix-blend-screen transition-transform duration-75"
        style={{
          background: "radial-gradient(circle, #ff4500, #ff8c00)",
          transform: `translate(${position.x - 8}px, ${position.y - 8}px) scale(${isHovering ? 1.6 : 1})`,
          boxShadow: "0 0 10px #ff4500, 0 0 22px #ff450066",
        }}
      />
      <div
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9998] transition-all duration-250 ease-out"
        style={{
          border: "1px solid rgba(255,69,0,0.5)",
          transform: `translate(${position.x - 20}px, ${position.y - 20}px) scale(${isHovering ? 1.5 : 1})`,
          boxShadow: isHovering ? "0 0 12px rgba(255,69,0,0.3)" : "none",
        }}
      />
    </>
  );
}
