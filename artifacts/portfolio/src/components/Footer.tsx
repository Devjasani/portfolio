import { m } from "framer-motion";
import { Link } from "wouter";
import { Linkedin, Mail, ArrowRight, Phone } from "lucide-react";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
  { label: "Skills", href: "/#skills" },
  { label: "Services", href: "/#services" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/in/dev-jasani-263dj/", label: "LinkedIn" },
  { icon: <Phone size={18} />, href: "https://wa.me/917069551919", label: "WhatsApp" },
  { icon: <Mail size={18} />, href: "mailto:devjas263@gmail.com", label: "Email" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff4500]/40 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#ff4500]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 py-16 relative z-10">
        
        {/* Massive CTA Section */}
        <div className="flex flex-col items-center justify-center py-16 md:py-24 border-b border-white/5 mb-16">
          <m.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-heading font-black tracking-tighter uppercase mb-8 text-center leading-none"
            style={{ 
              background: 'linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.1) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 20px 40px rgba(0,0,0,0.5)'
            }}
          >
            Let's Talk
          </m.h2>
          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/contact"
              className="inline-block px-8 py-4 md:px-12 md:py-5 rounded-full bg-primary text-black font-bold text-sm tracking-[0.2em] uppercase hover:bg-white transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,69,0,0.6)]"
            >
              Start a Project
            </Link>
          </m.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand column */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <img src="/logo.webp" alt="Logo" className="h-12 w-auto" />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Building futuristic, high-performance digital products for ambitious founders and forward-thinking companies.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-mono text-green-400 font-semibold">Available for freelance work</span>
            </div>
          </m.div>

          {/* Quick links */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-xs font-mono uppercase tracking-widest text-primary font-bold mb-5">Navigation</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight size={10} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </m.div>

          {/* Contact + Socials */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-xs font-mono uppercase tracking-widest text-primary font-bold mb-5">Get In Touch</h4>
            <a
              href="mailto:devjas263@gmail.com"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors block mb-6 font-mono"
            >
              devjas263@gmail.com
            </a>

            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  className="p-3 rounded-xl glass border border-white/10 hover:border-primary/40 hover:bg-primary/5 hover:shadow-[0_0_12px_rgba(255,69,0,0.2)] transition-all text-muted-foreground hover:text-foreground"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </m.div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-mono">
            &copy; {year} All rights reserved. Built with React, Vite &amp; Three.js.
          </p>
          <div className="flex items-center justify-end">
            <img 
              src="/logo.webp" 
              alt="Dev Jasani" 
              className="h-8 w-auto hover:scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] hover:drop-shadow-[0_0_20px_rgba(255,69,0,0.6)] transition-all duration-300" 
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
