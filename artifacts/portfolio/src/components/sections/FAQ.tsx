import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

// ─── Data — human, friendly, reassuring ──────────────────────────────────────

const faqs = [
  {
    icon: "💰",
    question: "How much does it cost to work with you?",
    answer:
      "Every project is unique, so pricing depends on what you need. After a free 20-minute call, I'll send you a transparent, fixed-price quote — no hidden fees, no surprises. Most clients find the investment pays for itself within months.",
  },
  {
    icon: "⏱️",
    question: "How quickly can you deliver my project?",
    answer:
      "I move fast. A simple website typically takes 1–2 weeks. A full product with backend and features usually takes 4–8 weeks. I'll always give you a realistic timeline upfront and keep you updated throughout.",
  },
  {
    icon: "🤝",
    question: "What does working with you actually look like?",
    answer:
      "You'll never be left in the dark. We start with a clear plan, I check in regularly with progress updates, and you can give feedback at every stage. Think of me as a partner, not just a vendor.",
  },
  {
    icon: "🌍",
    question: "Do you work with clients outside India?",
    answer:
      "Absolutely. Most of my clients are based in the US, UK, Europe, and the Middle East. Time zones are never a barrier — I schedule calls to work around your day, and I always respond within 24 hours.",
  },
  {
    icon: "🛡️",
    question: "What if I'm not happy with the result?",
    answer:
      "I offer a revision period after every delivery, and I don't consider a project done until you're satisfied. My reputation is built on long-term relationships, not one-off transactions.",
  },
  {
    icon: "🚀",
    question: "Can you also help after my product is launched?",
    answer:
      "Yes, and this is often the most valuable part. I offer ongoing support, feature additions, and performance monitoring after launch. Many clients work with me for years after the initial project.",
  },
];

// ─── FAQItem ─────────────────────────────────────────────────────────────────

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full text-left glass rounded-2xl px-6 py-5 mb-3 border flex items-center gap-4 group transition-all duration-300 ${
          isOpen
            ? "border-primary/40 bg-primary/5"
            : "border-white/8 hover:border-white/20"
        }`}
        aria-expanded={isOpen}
      >
        {/* Emoji icon */}
        <m.span
          className="text-2xl flex-shrink-0 select-none"
          animate={{ scale: isOpen ? 1.2 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {faq.icon}
        </m.span>

        <span className="font-heading font-semibold text-base md:text-lg text-foreground/90 flex-1 text-left pr-4">
          {faq.question}
        </span>

        <m.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown
            size={20}
            className={`transition-colors duration-300 ${isOpen ? "text-primary" : "text-muted-foreground/50"}`}
          />
        </m.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <m.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-4 text-muted-foreground leading-relaxed text-sm border-l-2 border-primary/30 ml-5 mb-3">
              {faq.answer}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export function FAQ() {
  return (
    <section id="faq" className="py-32 relative z-10 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,140,0,0.05)_0%,_transparent_50%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono tracking-[0.5em] text-[#ff8c00] uppercase mb-4 block font-bold">
            // YOUR_QUESTIONS_ANSWERED
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tighter mb-4">
            Got <span className="gradient-text">Questions?</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
            No technical jargon here. Just honest, straightforward answers to help you decide if we're a good fit.
          </p>
        </m.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} index={index} />
          ))}
        </div>

        {/* CTA nudge */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground text-sm mb-4">
            Still have questions? I reply to every message personally.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:shadow-[0_0_30px_rgba(255,140,0,0.4)] transition-shadow duration-300"
          >
            Ask Me Directly →
          </a>
        </m.div>
      </div>
    </section>
  );
}
