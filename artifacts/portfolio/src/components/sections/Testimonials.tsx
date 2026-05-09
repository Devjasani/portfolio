import { useRef } from "react";
import { m, useAnimationFrame, useMotionValue } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Web Application Users",
    role: "Global E-Commerce & SaaS Base",
    avatar: "WEB",
    rating: 5,
    text: "The transition to the new web architecture resulted in a zero-latency experience. Page loads are instantaneous, and the fluid 3D UI keeps users engaged far longer than before.",
    color: "#ff4500",
  },
  {
    name: "AI Agent Users",
    role: "Automated Platform Community",
    avatar: "AI",
    rating: 5,
    text: "Interacting with the integrated LLM pipelines feels magical. The context-aware responses and sub-second processing speeds have entirely transformed our daily workflows.",
    color: "#ff8c00",
  },
  {
    name: "Enterprise Clients",
    role: "B2B & Fintech Partners",
    avatar: "B2B",
    rating: 5,
    text: "The scalable architecture handles our massive trading data volumes without a single dropped packet. A truly robust, S-Grade system built for high-stakes environments.",
    color: "#ffcc00",
  },
  {
    name: "Startup Founders",
    role: "Early-Stage SaaS Products",
    avatar: "STP",
    rating: 5,
    text: "Dev shipped our MVP in 3 weeks with a quality that felt like 6 months of work. The design system alone has saved us thousands in future dev costs.",
    color: "#ff3366",
  },
  {
    name: "Mobile Users",
    role: "React Native App Community",
    avatar: "MOB",
    rating: 5,
    text: "The mobile experience is buttery smooth. Transitions, gestures, and offline support work flawlessly — feels better than most native apps on the market.",
    color: "#a855f7",
  },
];

const featured = testimonials[2];

// ─── Shared card ─────────────────────────────────────────────────────────────

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={11} className="fill-[#ffcc00] text-[#ffcc00]" />
      ))}
    </div>
  );
}

function TestimonialCard({ t, compact = false }: { t: typeof testimonials[0]; compact?: boolean }) {
  return (
    <div
      className={`flex flex-col glass rounded-2xl border border-white/8 hover:border-white/20 transition-all duration-500 relative overflow-hidden group ${compact ? "p-5" : "p-6"}`}
      style={{ boxShadow: `0 4px 30px ${t.color}06` }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top left, ${t.color}10, transparent 70%)` }}
      />
      <Quote size={18} style={{ color: t.color }} className="opacity-50 mb-3 flex-shrink-0" />
      <p className="text-foreground/75 text-[13px] leading-relaxed mb-4 flex-1">"{t.text}"</p>
      <StarRating count={t.rating} />
      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/8">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-[9px] font-bold text-black font-mono flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${t.color}, #ff8c00)` }}
        >
          {t.avatar}
        </div>
        <div>
          <div className="text-xs font-semibold leading-tight">{t.name}</div>
          <div className="text-[10px] text-muted-foreground font-mono">{t.role}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Desktop marquee row ─────────────────────────────────────────────────────

function MarqueeRow({ items, direction = -1, speed = 35 }: {
  items: typeof testimonials; direction?: number; speed?: number;
}) {
  const x = useMotionValue(0);
  const tripled = [...items, ...items, ...items];
  const chipPx = 324;
  const totalWidth = items.length * chipPx;

  useAnimationFrame((_, delta) => {
    const next = x.get() + direction * (speed / 1000) * delta;
    x.set(((next % totalWidth) + totalWidth) % totalWidth - totalWidth);
  });

  return (
    <div className="overflow-hidden w-full">
      <m.div className="flex" style={{ x }}>
        {tripled.map((t, i) => (
          <div key={i} className="flex-shrink-0 w-[300px] mx-3">
            <TestimonialCard t={t} />
          </div>
        ))}
      </m.div>
    </div>
  );
}


// ─── Section ─────────────────────────────────────────────────────────────────

export function Testimonials() {
  return (
    <section id="testimonials" className="py-32 relative z-10 overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] bg-[#ff4500]/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono tracking-[0.5em] text-[#ff4500] uppercase mb-4 block font-bold">
            // COMMUNITY_FEEDBACK
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tighter">
            Community <span className="gradient-text">Impact</span>
          </h2>
        </m.div>

        {/* Featured pull-quote */}
        <m.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="glass glow-border rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#ffcc00]/8 via-transparent to-[#ff4500]/8 rounded-3xl pointer-events-none" />
            <div className="absolute top-6 left-8 opacity-10">
              <Quote size={70} className="text-[#ffcc00]" />
            </div>
            <div className="relative z-10">
              <StarRating count={5} />
              <p className="text-lg md:text-2xl font-heading font-semibold leading-relaxed text-foreground/90 mt-5 mb-6">
                "{featured.text}"
              </p>
              <div className="flex items-center gap-4">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-xs font-bold text-black font-mono flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${featured.color}, #ff8c00)` }}
                >
                  {featured.avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm">{featured.name}</div>
                  <div className="text-xs text-muted-foreground font-mono">{featured.role}</div>
                </div>
              </div>
            </div>
          </div>
        </m.div>

      </div>

      {/* Dual marquee rows - All Devices */}
      <div className="relative space-y-4 mt-4">
        <div className="absolute top-0 left-0 w-16 md:w-32 h-full z-10 pointer-events-none bg-gradient-to-r from-background to-transparent" />
        <div className="absolute top-0 right-0 w-16 md:w-32 h-full z-10 pointer-events-none bg-gradient-to-l from-background to-transparent" />
        <MarqueeRow items={testimonials} direction={-1} speed={35} />
        <MarqueeRow items={[...testimonials].reverse()} direction={1} speed={28} />
      </div>
    </section>
  );
}
