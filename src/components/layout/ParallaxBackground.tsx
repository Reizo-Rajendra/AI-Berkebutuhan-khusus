"use client";

export function ParallaxBackground() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none">
      {/* Subtle Background Mesh / Dots */}
      <div 
        className="absolute w-[200vw] h-[200vh] bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:24px_24px] left-[-50vw] top-[-50vh] opacity-40"
      />

      {/* Gentle Warm Lavender Glows (No Neon) */}
      <div className="absolute top-[10%] left-[-5%] w-[45vw] h-[45vw] rounded-full bg-violet-200/30 blur-[100px]" />
      <div className="absolute bottom-[10%] right-[-5%] w-[45vw] h-[45vw] rounded-full bg-indigo-200/25 blur-[100px]" />
    </div>
  );
}
