
import { Download, MapPin, Briefcase, Coffee, Star } from "lucide-react";

const stats = [
  { value: "50+", label: "Projects Delivered", icon: <Briefcase size={18} className="text-[#ff4500]" /> },
  { value: "5+", label: "Years Experience", icon: <Star size={18} className="text-[#ff8c00]" /> },
  { value: "98%", label: "Client Satisfaction", icon: <Star size={18} className="text-[#ffcc00]" /> },
  { value: "∞", label: "Cups of Coffee", icon: <Coffee size={18} className="text-[#ff4500]" /> },
];

const valueProps = [
  { emoji: "⚡", label: "Blazing Fast", desc: "Your site loads in under 1 second" },
  { emoji: "🤖", label: "AI-Powered", desc: "Smart features built right in" },
  { emoji: "📈", label: "Built to Scale", desc: "Handles growth without rewrites" },
];

export function About() {
  return (
    <section id="about" className="py-32 relative z-10 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#ff4500]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#ff8c00]/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Label */}
        <div
          className="text-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both"
        >
          <span className="text-xs font-mono tracking-[0.5em] text-[#ff4500] uppercase mb-4 block font-bold">
            // IDENTITY_MODULE
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tighter">
            About <span className="gradient-text">Me</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Left — Avatar + Decorative */}
          <div
            className="relative flex justify-center animate-in fade-in slide-in-from-left-8 duration-700 fill-mode-both"
          >
            {/* Outer ring decoration */}
            <div className="relative w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80">
              {/* Animated ring - hidden on mobile for cleaner look */}
              <div
                className="absolute inset-0 rounded-full border-2 border-dashed border-[#ff4500]/30 animate-spin"
                style={{ animationDuration: "20s" }}
              />
              <div
                className="absolute inset-4 rounded-full border border-[#ff8c00]/20 animate-spin"
                style={{ animationDuration: "15s", animationDirection: "reverse" }}
              />
              {/* Avatar container */}
              <div className="absolute inset-2 md:inset-8 rounded-full overflow-hidden glass glow-border">
                <img
                  src="/dev-hero.webp"
                  alt="Dev Jasani"
                  loading="eager"
                  fetchPriority="high"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Status badge */}
              <div className="absolute bottom-6 right-0 flex items-center gap-2 glass glow-border px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-mono text-green-400 font-bold">Available for work</span>
              </div>
            </div>

            {/* Floating location chip */}
            <div
              className="absolute top-4 left-0 glass glow-border px-3 py-1.5 rounded-full flex items-center gap-2 animate-[bounce_3s_infinite]"
            >
              <MapPin size={12} className="text-[#ff4500]" />
              <span className="text-xs font-mono text-foreground/70">India, Remote Worldwide</span>
            </div>
          </div>

          {/* Right — Bio + Tags */}
          <div
            className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-700 delay-[150ms] fill-mode-both"
          >
            <div className="space-y-4">
              <p className="text-xl md:text-2xl font-heading font-semibold leading-relaxed text-foreground/90">
                Hi, I'm <span className="gradient-text font-bold">Dev Jasani</span>. A Passionate Full-Stack Developer who designs and builds futuristic, high-performance digital products.
              </p>
              <p className="text-muted-foreground leading-relaxed text-base hidden md:block">
                With 5+ years of experience shipping production apps, I specialise in combining cutting-edge frontend engineering with intelligent AI systems. I obsess over scalability, performance, and delivering robust architectures that drive actual business value.
              </p>
              <p className="text-muted-foreground leading-relaxed text-base md:hidden">
                With 5+ years of experience, I specialise in high-performance frontend engineering, AI integration, and scalable system architecture.
              </p>
              <p className="text-muted-foreground leading-relaxed text-base hidden md:block">
                When I'm not coding, I'm researching LLMs, contributing to open-source, or leading technical teams to success.
              </p>
            </div>


            {/* Value props — human-readable benefit chips */}
            <div className="flex flex-col gap-3">
              {valueProps.map((vp) => (
                <div
                  key={vp.label}
                  className="flex items-center gap-3 glass rounded-xl px-4 py-3 border border-white/8 hover:border-primary/30 transition-all duration-300 group"
                >
                  <span className="text-xl select-none group-hover:scale-110 transition-transform duration-200">{vp.emoji}</span>
                  <div>
                    <div className="text-sm font-bold text-foreground">{vp.label}</div>
                    <div className="text-xs text-muted-foreground font-mono">{vp.desc}</div>
                  </div>
                </div>
              ))}
            </div>


          </div>
        </div>

        {/* Stats bar */}
        <div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-[300ms] fill-mode-both"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="glass glow-border rounded-2xl p-6 text-center group hover:bg-white/5 transition-colors animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both"
            >
              <div className="flex justify-center mb-2">{stat.icon}</div>
              <div className="text-3xl font-heading font-bold gradient-text mb-1">{stat.value}</div>
              <div className="text-xs text-muted-foreground font-mono tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
