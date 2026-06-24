import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import {
  Play,
  ExternalLink,
  Headphones,
  Sparkles,
  Zap,
  Smartphone,
  Sun,
  Gauge,
  MousePointerClick,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface FeaturedHighlight {
  icon: typeof Zap;
  iconClassName: string;
  title: string;
  description: string;
}

interface FeaturedProject {
  id: string;
  badgeIcon: typeof Headphones;
  titleMain: string;
  titleAccent: string;
  tagline: string;
  taglineAccent: string;
  description: string;
  highlights: FeaturedHighlight[];
  ctaLabel: string;
  url: string;
  heroImage: string;
  heroAlt: string;
  mockupImage: string;
  mockupAlt: string;
  accentColor: string;
  playerLabel: string;
  playerSubLabel: string;
  playerTime: string;
  playerProgress: string;
}

const featuredProjects: FeaturedProject[] = [
  {
    id: "aura-audeo",
    badgeIcon: Headphones,
    titleMain: "Aura",
    titleAccent: "Audeo",
    tagline: "Premium Audiobook Streaming —",
    taglineAccent: "Zero Subscription.",
    description:
      "A minimalist, high-performance platform engineered for distraction-free immersion. Stream 180+ expert book summaries in 8-15 minutes. Built with a custom edge-caching system for sub-50ms latency.",
    highlights: [
      {
        icon: Zap,
        iconClassName: "text-[#00ff87]",
        title: "Instant Play",
        description: "No sign-up or app required to start listening.",
      },
      {
        icon: Smartphone,
        iconClassName: "text-primary",
        title: "PWA Support",
        description: "Download and listen offline anytime, anywhere.",
      },
      {
        icon: Sparkles,
        iconClassName: "text-[#00ff87]",
        title: "Expert Curation",
        description: "180+ hand-picked titles across 12+ premium genres.",
      },
      {
        icon: Play,
        iconClassName: "text-primary",
        title: "HQ Summaries",
        description: "Absorb full book insights in under 15 minutes.",
      },
    ],
    ctaLabel: "Launch Experience",
    url: "https://auraaudeo.com",
    heroImage: "/aura-audeo-hero.webp",
    heroAlt: "Aura Audeo Platform",
    mockupImage: "/aura-audeo-mockup.webp",
    mockupAlt: "Aura Audeo Mobile App",
    accentColor: "#00ff87",
    playerLabel: "The Art of War",
    playerSubLabel: "Sun Tzu • Audio Summary",
    playerTime: "12:45",
    playerProgress: "w-1/3",
  },
  {
    id: "solar-energy",
    badgeIcon: Sun,
    titleMain: "Solar",
    titleAccent: "Energy",
    tagline: "Best Solar Catalog Website —",
    taglineAccent: "Fully Web Responsive.",
    description:
      "A sleek, conversion-focused catalog site for a solar energy brand. Showcases photocell, wind, and storage product lines with a fast, interactive layout that adapts seamlessly across desktop and mobile.",
    highlights: [
      {
        icon: Zap,
        iconClassName: "text-[#7ee62e]",
        title: "Fast Loading",
        description: "Optimized assets keep every page lightweight and quick.",
      },
      {
        icon: Smartphone,
        iconClassName: "text-primary",
        title: "Fully Responsive",
        description: "Pixel-perfect across desktop, tablet, and mobile.",
      },
      {
        icon: MousePointerClick,
        iconClassName: "text-[#7ee62e]",
        title: "Interactive UI",
        description: "Smooth carousels and motion guide every product tour.",
      },
      {
        icon: Gauge,
        iconClassName: "text-primary",
        title: "Catalog Ready",
        description: "Built to scale across full solar & renewable lineups.",
      },
    ],
    ctaLabel: "View Live Site",
    url: "https://solar-energy-5km.pages.dev/",
    heroImage: "/solar-energy-hero.webp",
    heroAlt: "Solar Energy Catalog Website",
    mockupImage: "/solar-energy-mockup.webp",
    mockupAlt: "Solar Energy Mobile View",
    accentColor: "#7ee62e",
    playerLabel: "Sahara Ridge Array",
    playerSubLabel: "Nevada, USA • Solar Assembly",
    playerTime: "85 MW",
    playerProgress: "w-2/3",
  },
];

export function AuraAudeo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const project = featuredProjects[activeIndex];
  const BadgeIcon = project.badgeIcon;
  const total = featuredProjects.length;

  const goTo = (index: number) => {
    setActiveIndex((index + total) % total);
  };

  return (
    <section id="aura-audeo" className="py-24 relative overflow-hidden bg-background">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div
          className="absolute top-1/4 -left-20 w-96 h-96 rounded-full blur-[100px] animate-pulse transition-colors duration-700"
          style={{ backgroundColor: `${project.accentColor}0d` }}
        />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section heading + pagination controls */}
        <div className="flex items-center justify-between gap-4 mb-12">
          <span className="text-sm font-mono font-bold tracking-widest text-muted-foreground uppercase">
            {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous project"
              onClick={() => goTo(activeIndex - 1)}
              className="p-2.5 rounded-full border border-white/15 text-foreground/70 hover:text-foreground hover:border-white/30 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-2">
              {featuredProjects.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  aria-label={`Show ${p.titleMain} ${p.titleAccent}`}
                  onClick={() => goTo(i)}
                  className="h-2.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === activeIndex ? "1.75rem" : "0.625rem",
                    backgroundColor: i === activeIndex ? project.accentColor : "rgba(255,255,255,0.2)",
                  }}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label="Next project"
              onClick={() => goTo(activeIndex + 1)}
              className="p-2.5 rounded-full border border-white/15 text-foreground/70 hover:text-foreground hover:border-white/30 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <m.div
            key={project.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            {/* Content side */}
            <m.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="p-2.5 rounded-xl border"
                  style={{
                    backgroundColor: `${project.accentColor}1a`,
                    borderColor: `${project.accentColor}33`,
                    color: project.accentColor,
                  }}
                >
                  <BadgeIcon size={20} />
                </div>
                <span
                  className="text-sm font-mono font-bold tracking-widest uppercase"
                  style={{ color: project.accentColor }}
                >
                  Featured Project
                </span>
              </div>

              <h2 className="text-5xl md:text-7xl font-heading font-bold tracking-tighter mb-6 leading-[0.9]">
                {project.titleMain} <span className="gradient-text">{project.titleAccent}</span>
              </h2>

              <p className="text-xl text-foreground/90 font-medium mb-6 leading-relaxed">
                {project.tagline}{" "}
                <span style={{ color: project.accentColor }}>{project.taglineAccent}</span>
              </p>

              <p className="text-muted-foreground mb-8 text-lg leading-relaxed max-w-xl">
                {project.description}
              </p>

              <div className="grid grid-cols-2 gap-6 mb-10">
                {project.highlights.map((highlight) => {
                  const HighlightIcon = highlight.icon;
                  return (
                    <div className="space-y-2" key={highlight.title}>
                      <div className="flex items-center gap-2 text-foreground font-bold">
                        <HighlightIcon size={16} className={highlight.iconClassName} />
                        <span>{highlight.title}</span>
                      </div>
                      <p className="text-xs text-muted-foreground font-mono">{highlight.description}</p>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="font-bold px-8 h-14 rounded-2xl group text-black hover:opacity-90"
                  style={{ backgroundColor: project.accentColor }}
                  onClick={() => window.open(project.url, "_blank")}
                >
                  {project.ctaLabel} <ExternalLink size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </m.div>

            {/* Visual side */}
            <m.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Main Mockup Container */}
              <div className="relative z-10 glass glow-border rounded-[2.5rem] p-4 bg-white/5 overflow-hidden">
                <div className="aspect-video rounded-[2rem] overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-transparent z-10" />
                  <img
                    src={project.heroImage}
                    alt={project.heroAlt}
                    className="w-full h-full object-cover object-top transform hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=2069&auto=format&fit=crop";
                    }}
                  />

                  {/* Floating Player Card */}
                  <m.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="hidden md:block absolute bottom-6 left-6 right-6 glass p-4 rounded-2xl z-20 border border-white/20 shadow-2xl"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-black"
                        style={{ backgroundColor: project.accentColor }}
                      >
                        <Play fill="currentColor" size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-bold truncate">{project.playerLabel}</div>
                        <div className="text-[10px] text-white/60 font-mono">{project.playerSubLabel}</div>
                      </div>
                      <div className="text-[10px] font-mono" style={{ color: project.accentColor }}>
                        {project.playerTime}
                      </div>
                    </div>
                    <div className="mt-3 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full ${project.playerProgress}`} style={{ backgroundColor: project.accentColor }} />
                    </div>
                  </m.div>
                </div>
              </div>

              {/* Smartphone Mockup Floating */}
              <m.div
                initial={{ x: 50, y: 50, opacity: 0 }}
                whileInView={{ x: 0, y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute -bottom-4 -right-2 md:-bottom-10 md:-right-10 w-28 md:w-48 aspect-[9/19] glass glow-border rounded-[1.5rem] md:rounded-[2rem] p-1.5 md:p-2 bg-white/10 z-30 shadow-2xl rotate-6"
              >
                <div className="w-full h-full rounded-2xl md:rounded-[1.8rem] overflow-hidden">
                  <img
                    src={project.mockupImage}
                    alt={project.mockupAlt}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop";
                    }}
                  />
                </div>
              </m.div>

              {/* Decorative elements */}
              <div
                className="absolute -top-10 -left-10 w-32 h-32 rounded-full blur-[50px] animate-pulse"
                style={{ backgroundColor: `${project.accentColor}33` }}
              />
            </m.div>
          </m.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
