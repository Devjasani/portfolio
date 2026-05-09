import { useState } from "react";
import { m } from "framer-motion";
import { ExternalLink } from "lucide-react";
import projectDashboard from "@/assets/project-dashboard.png";
import projectChatbot from "@/assets/project-chatbot.png";
import projectMobile from "@/assets/project-mobile.png";
import projectDataviz from "@/assets/project-dataviz.png";
import projectEcommerce from "@/assets/project-ecommerce.png";
import { usePretextHeight } from "@/hooks/usePretextHeight";

const projects = [
  {
    id: 1,
    title: "BuffetBrain HUD",
    type: "Stock Market & AI Agent",
    year: "2024",
    description: "Real-time stock market platform with AI-driven insights, predictive modelling, and a heads-up display built using Python and yFinance.",
    tech: ["Python", "FastAPI", "Streamlit", "yFinance"],
    image: projectDashboard,
    color: "#ff4500",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Geospatial Analyzer",
    type: "GEO & AOI Systems",
    year: "2024",
    description: "Interactive mapping tool for defining and analyzing Areas of Interest (AOI). Renders complex geospatial datasets efficiently in the browser.",
    tech: ["React", "TypeScript", "Map APIs", "Tailwind"],
    image: projectDataviz,
    color: "#ff8c00",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "S-Grade Interactive Portfolio",
    type: "SEO, AEO & Web Architecture",
    year: "2024",
    description: "Highly optimized, adaptive portfolio featuring a 3D WebGL hero scene, smooth scroll mechanics, and scalable backend infrastructure.",
    tech: ["React", "FastAPI", "MongoDB", "Tailwind CSS"],
    image: projectChatbot,
    color: "#ffcc00",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 4,
    title: "Neon Commerce",
    type: "E-Commerce & Apps",
    year: "2023",
    description: "Headless e-commerce storefront with a futuristic dark UI, 3D product preview, and AI-driven personalised recommendations. Boosted conversion by 40%.",
    tech: ["Next.js", "Stripe", "Three.js", "PostgreSQL"],
    image: projectEcommerce,
    color: "#ff4500",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 5,
    title: "Entro Hub Platform",
    type: "IoT & Design Architect",
    year: "2024",
    description: "A robust community and resource platform including mentor matching, event discovery, and an AI-driven pitch-deck analyser.",
    tech: ["React", "FastAPI", "OpenAI", "Supabase"],
    image: projectMobile,
    color: "#ff8c00",
    liveUrl: "#",
    githubUrl: "#",
  },
];

function HUDCorner({ position, color }: { position: string; color: string }) {
  const classes = {
    "top-left": "top-0 left-0 border-t-2 border-l-2",
    "top-right": "top-0 right-0 border-t-2 border-r-2",
    "bottom-left": "bottom-0 left-0 border-b-2 border-l-2",
    "bottom-right": "bottom-0 right-0 border-b-2 border-r-2",
  };
  return (
    <div
      className={`absolute w-3 h-3 opacity-30 group-hover:opacity-100 transition-opacity duration-500 ${classes[position as keyof typeof classes]}`}
      style={{ borderColor: color }}
    />
  );
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const { ref, height } = usePretextHeight(
    project.description,
    "12px monospace", 
    20 // relaxed line height
  );

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex-shrink-0 w-[280px] h-[360px] md:w-[320px] md:h-[420px] bg-black/60 border border-white/10 rounded-sm overflow-hidden cursor-none mx-4"
      style={{ boxShadow: isHovered ? `0 0 40px ${project.color}20` : "none" }}
    >
      <div className="absolute inset-0 opacity-10 hud-grid pointer-events-none" />
      <div className={`absolute inset-0 z-20 pointer-events-none overflow-hidden ${isHovered ? "opacity-40" : "opacity-10"} transition-opacity`}>
        <div className="scanline" />
      </div>

      <HUDCorner position="top-left" color={project.color} />
      <HUDCorner position="top-right" color={project.color} />
      <HUDCorner position="bottom-left" color={project.color} />
      <HUDCorner position="bottom-right" color={project.color} />

      {/* Image - Make it brighter by default, instead of 30% opacity */}
      <div className="absolute inset-0 z-0">
        <m.img
          src={project.image}
          alt={project.type}
          decoding="async"
          className="w-full h-full object-cover mix-blend-screen opacity-70 group-hover:opacity-100 transition-all duration-700"
          animate={{ scale: isHovered ? 1.08 : 1 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      {/* Technical Metadata */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-1 opacity-60">
        <span className="font-mono text-[8px] font-bold" style={{ color: project.color }}>
          #{project.id.toString().padStart(3, "0")}
        </span>
        <span className="font-mono text-[8px] text-white animate-pulse">LIVE_FEED</span>
      </div>
      <div className="absolute top-4 right-4 z-20 font-mono text-[8px] text-white/50">{project.year}</div>

      {/* Content - Swap Title and Sector (Type) */}
      <div className="absolute inset-0 z-30 flex flex-col justify-end p-6">
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase mb-1 block font-bold text-white/60">
          PROJECT: {project.title}
        </span>
        <h3 className="text-xl md:text-2xl font-bold font-heading mb-2 tracking-tighter" style={{ color: project.color }}>
          {project.type}
        </h3>

        {/* Description — always visible now to remove dullness, expands slightly on hover */}
        <div ref={ref}>
          <m.p
            animate={{ opacity: isHovered ? 1 : 0.85, height: height }}
            className="text-xs text-white/80 font-mono mb-3 leading-relaxed overflow-hidden"
          >
            {project.description}
          </m.p>
        </div>


      </div>
    </div>
  );
}

export function Projects() {
  const [isPaused, setIsPaused] = useState(false);
  const loopedProjects = [...projects, ...projects, ...projects];

  return (
    <section id="work" className="py-32 relative z-10 overflow-hidden bg-[#020205]">
      <div className="absolute inset-0 hud-grid opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 mb-16 text-center">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-xs font-mono tracking-[0.5em] text-primary uppercase mb-4 block font-bold">
            // TERMINAL_DEPLOYMENTS
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tighter mb-4">
            Automated <span className="gradient-text">Gallery</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-mono text-xs opacity-60">
            Real-time scrolling sequence of prioritised project nodes. Hover to interrupt cycle and inspect data parameters.
          </p>
        </m.div>
      </div>

      {/* Infinite Scroll - All Devices */}
      <div
        className="relative py-10 w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <m.div
          className="flex whitespace-nowrap"
          animate={{ x: isPaused ? undefined : [0, -1600] }}
          transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 40, ease: "linear" } }}
          style={{ width: "max-content" }}
        >
          {loopedProjects.map((project, index) => (
            <ProjectCard key={`${project.id}-${index}`} project={project} index={index} />
          ))}
        </m.div>

        <div className="absolute top-0 left-0 w-16 md:w-32 h-full z-40 pointer-events-none bg-gradient-to-r from-[#020205] to-transparent" />
        <div className="absolute top-0 right-0 w-16 md:w-32 h-full z-40 pointer-events-none bg-gradient-to-l from-[#020205] to-transparent" />
      </div>

      <div className="container mx-auto px-6 mt-12 flex justify-between items-center opacity-30 font-mono text-[9px] tracking-widest pointer-events-none">
        <div className="flex gap-10">
          <span>PROJECTS: {projects.length}_ACTIVE</span>
          <span>STATUS: DEPLOYED</span>
        </div>
        <div className="animate-pulse">SYSTEM: SCANNING_GALLERY_ACTIVE</div>
      </div>
    </section>
  );
}
