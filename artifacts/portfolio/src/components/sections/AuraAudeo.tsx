import { m } from "framer-motion";
import { Play, ExternalLink, Headphones, Sparkles, Zap, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AuraAudeo() {
  return (
    <section id="aura-audeo" className="py-24 relative overflow-hidden bg-background">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#00ff87]/5 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content side */}
          <m.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-[#00ff87]/10 border border-[#00ff87]/20 text-[#00ff87]">
                <Headphones size={20} />
              </div>
              <span className="text-sm font-mono font-bold tracking-widest text-[#00ff87] uppercase">
                Featured Project
              </span>
            </div>

            <h2 className="text-5xl md:text-7xl font-heading font-bold tracking-tighter mb-6 leading-[0.9]">
              Aura <span className="gradient-text">Audeo</span>
            </h2>
            
            <p className="text-xl text-foreground/90 font-medium mb-6 leading-relaxed">
              Premium Audiobook Streaming — <span className="text-[#00ff87]">Zero Subscription.</span>
            </p>
            
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed max-w-xl">
              A minimalist, high-performance platform engineered for distraction-free immersion. 
              Stream 180+ expert book summaries in 8-15 minutes. Built with a custom 
              edge-caching system for sub-50ms latency.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-foreground font-bold">
                  <Zap size={16} className="text-[#00ff87]" />
                  <span>Instant Play</span>
                </div>
                <p className="text-xs text-muted-foreground font-mono">No sign-up or app required to start listening.</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-foreground font-bold">
                  <Smartphone size={16} className="text-primary" />
                  <span>PWA Support</span>
                </div>
                <p className="text-xs text-muted-foreground font-mono">Download and listen offline anytime, anywhere.</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-foreground font-bold">
                  <Sparkles size={16} className="text-[#00ff87]" />
                  <span>Expert Curation</span>
                </div>
                <p className="text-xs text-muted-foreground font-mono">180+ hand-picked titles across 12+ premium genres.</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-foreground font-bold">
                  <Play size={16} className="text-primary" />
                  <span>HQ Summaries</span>
                </div>
                <p className="text-xs text-muted-foreground font-mono">Absorb full book insights in under 15 minutes.</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-[#00ff87] text-black hover:bg-[#00ff87]/90 font-bold px-8 h-14 rounded-2xl group"
                onClick={() => window.open("https://auraaudeo.com", "_blank")}
              >
                Launch Experience <ExternalLink size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </m.div>

          {/* Visual side */}
          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main Mockup Container */}
            <div className="relative z-10 glass glow-border rounded-[2.5rem] p-4 bg-white/5 overflow-hidden">
              <div className="aspect-[4/3] rounded-[2rem] overflow-hidden relative">
                 {/* Replace with your actual hero image path */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-transparent z-10" />
                <img 
                  src="/aura-audeo-hero.webp" 
                  alt="Aura Audeo Platform" 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=2069&auto=format&fit=crop";
                  }}
                />
                
                {/* Floating Player Card */}
                <m.div 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="absolute bottom-6 left-6 right-6 glass p-4 rounded-2xl z-20 border border-white/20 shadow-2xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#00ff87] flex items-center justify-center text-black">
                      <Play fill="currentColor" size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold truncate">The Art of War</div>
                      <div className="text-[10px] text-white/60 font-mono">Sun Tzu • Audio Summary</div>
                    </div>
                    <div className="text-[10px] font-mono text-[#00ff87]">12:45</div>
                  </div>
                  <div className="mt-3 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-[#00ff87]" />
                  </div>
                </m.div>
              </div>
            </div>

            {/* Smartphone Mockup Floating */}
            <m.div
              initial={{ x: 50, y: 50, opacity: 0 }}
              whileInView={{ x: 0, y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="absolute -bottom-4 -right-2 md:-bottom-10 md:-right-10 w-28 md:w-48 aspect-[9/19] glass glow-border rounded-[1.5rem] md:rounded-[2rem] p-1.5 md:p-2 bg-white/10 z-30 shadow-2xl rotate-6"
            >
              <div className="w-full h-full rounded-2xl md:rounded-[1.8rem] overflow-hidden">
                <img 
                  src="/aura-audeo-mockup.webp" 
                  alt="Mobile App" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop";
                  }}
                />
              </div>
            </m.div>

            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#00ff87]/20 rounded-full blur-[50px] animate-pulse" />
          </m.div>
        </div>
      </div>
    </section>
  );
}
