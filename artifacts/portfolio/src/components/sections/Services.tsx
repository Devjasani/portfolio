import { m } from "framer-motion";
import { Monitor, Smartphone, Cpu, Palette, ArrowRight, Zap, Shield, Globe } from "lucide-react";
import { Link } from "wouter";
import { DotLottiePlayer } from '@dotlottie/react-player';

const highlights = [
  { icon: <Zap size={16} />, label: "Fast Delivery", desc: "MVPs in weeks, not months" },
  { icon: <Shield size={16} />, label: "S-Grade Quality", desc: "Production-ready from day one" },
  { icon: <Globe size={16} />, label: "Global Scale", desc: "Built for millions of users" },
];

export function Services() {
  return (
    <section id="services" className="py-32 relative z-10 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
      <div className="container mx-auto px-6 relative z-10">
        <m.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="text-xs font-mono tracking-[0.5em] text-primary uppercase mb-4 block font-bold">// CORE_CAPABILITIES</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tighter mb-4">What I <span className="gradient-text">Deliver</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm">End-to-end digital solutions designed for the future — on time, on budget, exceeding expectations.</p>
        </m.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto mb-8">
          {/* Featured — 2 cols */}
          <m.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="md:col-span-2 glass glow-border rounded-3xl p-8 relative overflow-hidden group border border-white/8 hover:border-[#ff4500]/40 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-[#ff4500]/8 via-transparent to-transparent rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#ff4500]/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#ff4500]/10 border border-[#ff4500]/20 flex items-center justify-center"><Monitor size={28} className="text-[#ff4500]" /></div>
                <span className="text-[10px] font-mono text-[#ff4500] border border-[#ff4500]/30 px-3 py-1 rounded-full uppercase tracking-widest">Most Popular</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-heading font-bold mb-2">Web Development</h3>
              <p className="text-xs font-mono text-[#ff4500] mb-4">React · Next.js · TypeScript · Three.js</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-md">High-performance, futuristic web apps built with React, Next.js, and 3D capabilities. From MVPs to enterprise scale — systems that last.</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {["React / Next.js", "TypeScript", "API Integration", "Performance Optimised"].map(f => (
                  <span key={f} className="text-[10px] font-mono px-3 py-1 rounded-full bg-[#ff4500]/10 border border-[#ff4500]/20 text-[#ff4500]/80">{f}</span>
                ))}
              </div>
              <div className="flex items-center justify-end">
                <Link href="/contact" className="flex items-center gap-2 text-xs font-mono bg-primary text-black px-5 py-2.5 rounded-full font-bold hover:bg-white transition-colors">Get a Quote <ArrowRight size={12} /></Link>
              </div>
            </div>
          </m.div>

          {/* AI */}
          <m.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="glass glow-border rounded-3xl p-6 relative overflow-hidden group border border-white/8 hover:border-[#ff8c00]/40 transition-all duration-500">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#ff8c00]/10 rounded-full blur-2xl" />
            <div className="relative z-10 h-full flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-[#ff8c00]/10 border border-[#ff8c00]/20 flex items-center justify-center mb-4"><Cpu size={24} className="text-[#ff8c00]" /></div>
              <h3 className="text-xl font-heading font-bold mb-1">AI Integration</h3>
              <p className="text-[10px] font-mono text-[#ff8c00] mb-3">LLMs · Agents · Automation</p>
              <p className="text-muted-foreground text-xs leading-relaxed mb-4 flex-1">Embed intelligent features — LLMs, AI models, chatbots, and automation — into your product.</p>
              <ul className="space-y-1.5 mb-4">{["OpenAI / Claude", "RAG Pipelines", "AI Agents", "Data Pipelines"].map(f => <li key={f} className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono"><span className="w-1 h-1 rounded-full bg-[#ff8c00]" />{f}</li>)}</ul>
              <div className="pt-3 border-t border-white/8 flex items-center justify-end">
                <Link href="/contact" className="flex items-center gap-1 text-[10px] font-mono text-foreground/50 hover:text-[#ff8c00] transition-colors">Quote <ArrowRight size={10} /></Link>
              </div>
            </div>
          </m.div>

          {/* Mobile */}
          <m.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="glass glow-border rounded-3xl p-6 relative overflow-hidden group border border-white/8 hover:border-[#ffcc00]/40 transition-all duration-500">
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-[#ffcc00]/10 border border-[#ffcc00]/20 flex items-center justify-center mb-4"><Smartphone size={24} className="text-[#ffcc00]" /></div>
              <h3 className="text-xl font-heading font-bold mb-1">Mobile Apps</h3>
              <p className="text-[10px] font-mono text-[#ffcc00] mb-3">React Native · Expo</p>
              <p className="text-muted-foreground text-xs leading-relaxed mb-4">Cross-platform mobile experiences that feel native and ship fast.</p>
              <div className="pt-3 border-t border-white/8 flex items-center justify-end">
                <Link href="/contact" className="flex items-center gap-1 text-[10px] font-mono text-foreground/50 hover:text-[#ffcc00] transition-colors">Quote <ArrowRight size={10} /></Link>
              </div>
            </div>
          </m.div>

          {/* UI/UX */}
          <m.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="glass glow-border rounded-3xl p-6 relative overflow-hidden group border border-white/8 hover:border-[#a855f7]/40 transition-all duration-500">
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-[#a855f7]/10 border border-[#a855f7]/20 flex items-center justify-center mb-4"><Palette size={24} className="text-[#a855f7]" /></div>
              <h3 className="text-xl font-heading font-bold mb-1">UI/UX Design</h3>
              <p className="text-[10px] font-mono text-[#a855f7] mb-3">Figma · Motion · Brand</p>
              <p className="text-muted-foreground text-xs leading-relaxed mb-4">Immersive interface design focused on dark mode aesthetics and conversion-driven UX.</p>
              <div className="pt-3 border-t border-white/8 flex items-center justify-end">
                <Link href="/contact" className="flex items-center gap-1 text-[10px] font-mono text-foreground/50 hover:text-[#a855f7] transition-colors">Quote <ArrowRight size={10} /></Link>
              </div>
            </div>
          </m.div>

          {/* Highlights */}
          <m.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="glass glow-border rounded-3xl p-6 border border-white/8">
            <div className="space-y-5">
              {highlights.map(h => (
                <div key={h.label} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0">{h.icon}</div>
                  <div><div className="text-xs font-bold mb-0.5">{h.label}</div><div className="text-[10px] text-muted-foreground font-mono">{h.desc}</div></div>
                </div>
              ))}
            </div>
          </m.div>
        </div>

        {/* CTA Banner */}
        <m.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass glow-border rounded-3xl p-8 md:p-10 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 text-center md:text-left border border-white/8">
          <div className="flex-1">
            <p className="text-muted-foreground text-sm font-mono mb-2">Ready to build something extraordinary?</p>
            <h3 className="text-2xl md:text-3xl font-heading font-bold mb-6">Let's Turn Your Idea Into <span className="gradient-text">Reality</span></h3>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:shadow-[0_0_30px_rgba(255,140,0,0.4)] transition-shadow duration-300">Start a Project <ArrowRight size={16} /></Link>
          </div>
          <div className="w-48 h-48 md:w-56 md:h-56 flex-shrink-0 relative mx-auto md:mx-0">
            <div className="absolute inset-0 bg-[#ff4500]/10 rounded-full blur-3xl mix-blend-screen pointer-events-none" />
            <DotLottiePlayer src="/gaming-community.lottie" autoplay loop style={{ height: '100%', width: '100%' }} />
          </div>
        </m.div>
      </div>
    </section>
  );
}
