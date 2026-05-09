import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";

// ─── Data ────────────────────────────────────────────────────────────────────

const PILLARS = [
  {
    id: "web",
    emoji: "🌐",
    title: "Web Apps",
    subtitle: "Fast. Beautiful. Scalable.",
    color: "#ff4500",
    glow: "rgba(255,69,0,0.25)",
    description:
      "I craft web applications that load in under a second and feel premium at every scroll. From interactive landing pages to complex dashboards — built to convert.",
    tools: ["React", "Next.js", "TypeScript", "Three.js", "Tailwind"],
    metric: { value: "50+", label: "Sites Shipped" },
  },
  {
    id: "ai",
    emoji: "🤖",
    title: "AI Products",
    subtitle: "Smart. Automated. Autonomous.",
    color: "#ff8c00",
    glow: "rgba(255,140,0,0.25)",
    description:
      "I build intelligent products that think for your users. Chatbots that actually understand context, automation that saves your team hours, and AI that learns your business.",
    tools: ["OpenAI", "Claude", "AI Agents", "LangChain", "Python"],
    metric: { value: "15+", label: "AI Systems Built" },
  },
  {
    id: "backend",
    emoji: "⚙️",
    title: "Backends & APIs",
    subtitle: "Reliable. Fast. Always on.",
    color: "#ffcc00",
    glow: "rgba(255,204,0,0.25)",
    description:
      "The engine behind great products. I engineer the secure, high-speed servers and databases that make your app run flawlessly for thousands of users simultaneously.",
    tools: ["Python", "FastAPI", "PostgreSQL", "MongoDB", "Docker"],
    metric: { value: "99.9%", label: "Uptime Delivered" },
  },
  {
    id: "mobile",
    emoji: "📱",
    title: "Mobile Apps",
    subtitle: "Native feel. Cross-platform.",
    color: "#a855f7",
    glow: "rgba(168,85,247,0.25)",
    description:
      "One codebase, two platforms. I deliver polished iOS and Android apps with buttery smooth animations and offline-first capabilities that users love.",
    tools: ["React Native", "Expo", "iOS", "Android"],
    metric: { value: "5★", label: "Store Rating" },
  },
  {
    id: "cloud",
    emoji: "☁️",
    title: "Cloud & DevOps",
    subtitle: "Deploy. Scale. Repeat.",
    color: "#38bdf8",
    glow: "rgba(56,189,248,0.25)",
    description:
      "Your product deserves infrastructure that never breaks. I set up automated pipelines, global CDNs, and cloud architectures that scale to millions without intervention.",
    tools: ["AWS", "Vercel", "Cloudflare", "Docker", "CI/CD"],
    metric: { value: "10×", label: "Faster Deployments" },
  },
];

// ─── PillarCard ───────────────────────────────────────────────────────────────

function PillarCard({ pillar, index }: { pillar: typeof PILLARS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <m.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative group cursor-default"
    >
      {/* Animated glow */}
      <m.div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ boxShadow: `0 0 60px ${pillar.glow}` }}
      />

      <div
        className="relative glass rounded-3xl border border-white/8 overflow-hidden p-7 flex flex-col gap-6 h-full transition-colors duration-500"
        style={{ borderColor: hovered ? `${pillar.color}40` : undefined }}
      >
        {/* Top accent bar */}
        <m.div
          className="absolute top-0 left-0 right-0 h-[2px] rounded-full"
          style={{ background: `linear-gradient(90deg, transparent, ${pillar.color}, transparent)` }}
          animate={{ opacity: hovered ? 1 : 0.25 }}
          transition={{ duration: 0.4 }}
        />

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            {/* Big emoji icon */}
            <m.div
              className="text-5xl mb-3 select-none"
              animate={{ scale: hovered ? 1.15 : 1, rotate: hovered ? [0, -8, 8, 0] : 0 }}
              transition={{ duration: 0.4 }}
            >
              {pillar.emoji}
            </m.div>
            <h3 className="text-xl md:text-2xl font-heading font-bold tracking-tight" style={{ color: hovered ? pillar.color : undefined }}>
              {pillar.title}
            </h3>
            <p className="text-xs font-mono mt-1" style={{ color: pillar.color, opacity: 0.7 }}>
              {pillar.subtitle}
            </p>
          </div>

          {/* Metric badge */}
          <div className="text-right flex-shrink-0">
            <div className="text-2xl font-heading font-black gradient-text">{pillar.metric.value}</div>
            <div className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mt-0.5">
              {pillar.metric.label}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
          {pillar.description}
        </p>

        {/* Tool pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
          {pillar.tools.map((tool) => (
            <span
              key={tool}
              className="text-[10px] font-mono px-2.5 py-1 rounded-full border"
              style={{
                color: pillar.color,
                borderColor: `${pillar.color}30`,
                background: `${pillar.color}0d`,
              }}
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </m.div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export function Skills() {
  return (
    <section id="skills" className="py-32 relative z-10 bg-[#020205] overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[#ff4500]/4 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#a855f7]/4 rounded-full blur-[140px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono tracking-[0.5em] text-primary uppercase mb-4 block font-bold">
            // WHAT_I_BUILD
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tighter mb-4">
            Five Pillars of <span className="gradient-text">Excellence</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm leading-relaxed">
            I don't just write code — I solve real problems. Every tool I use is chosen because it makes your product faster, smarter, or more profitable.
          </p>
        </m.div>

        {/* 5-pillar grid: 3 top + 2 bottom centered */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {PILLARS.slice(0, 3).map((pillar, i) => (
            <PillarCard key={pillar.id} pillar={pillar} index={i} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto mt-5">
          {PILLARS.slice(3).map((pillar, i) => (
            <PillarCard key={pillar.id} pillar={pillar} index={i + 3} />
          ))}
        </div>


      </div>
    </section>
  );
}
