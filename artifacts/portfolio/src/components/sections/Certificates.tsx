import { m } from "framer-motion";
import { ExternalLink, GraduationCap } from "lucide-react";

const certificates = [
  {
    title: "Problem Solving & Structured Thinking",
    organization: "McKinsey & Company",
    orgLogo: "McK",
    orgColor: "#60a5fa",
    date: "Dec 2025",
    description: "Mastered McKinsey's elite frameworks for complex problem-solving and executive communication.",
    accent: "#3b82f6",
  },
  {
    title: "Best Article Award",
    organization: "IIM Rohtak",
    orgLogo: "IIM",
    orgColor: "#fbbf24",
    date: "Oct 2025",
    description: "Awarded by IIM Rohtak for exceptional research on technology's impact on modern business.",
    accent: "#f59e0b",
  },
  {
    title: "Quantitative Research Simulation",
    organization: "JPMorgan Chase & Co.",
    orgLogo: "JPM",
    orgColor: "#34d399",
    date: "Oct 2025",
    description: "Completed an immersive simulation of quantitative analysis and financial modelling.",
    accent: "#10b981",
  },
  {
    title: "Client Needs Analysis",
    organization: "TATA Group",
    orgLogo: "TATA",
    orgColor: "#c084fc",
    date: "Sep 2025",
    description: "Certified in strategic consulting and identifying critical client pain points.",
    accent: "#a855f7",
  },
];

const education = {
  degree: "MCA — Software & Web with AI Expertise",
  university: "Parul University",
  badge: "NAAC A++",
};

export function Certificates() {
  return (
    <section id="certificates" className="py-24 relative overflow-hidden bg-background">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono tracking-[0.5em] text-primary uppercase mb-4 block font-bold">
            // ACCREDITATIONS
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tighter mb-4">
            Certified by the <span className="gradient-text">World's Best</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base">
            Credentials from institutions that set the global standard — not just completed, but earned.
          </p>
        </m.div>

        {/* Certificate Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto mb-10">
          {certificates.map((cert, index) => (
            <m.a
              key={cert.title}
              href="https://drive.google.com/drive/folders/1SkYrIk9hZ7XxYgS4dmy9xiqZZ_WQXPwZ?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative glass rounded-2xl border border-white/8 overflow-hidden flex flex-col cursor-pointer transition-all duration-500"
              style={{ borderColor: undefined }}
            >
              {/* Animated accent top bar */}
              <m.div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: `linear-gradient(90deg, transparent, ${cert.accent}, transparent)` }}
                initial={{ opacity: 0.3 }}
                whileHover={{ opacity: 1 }}
              />

              {/* Glow layer on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ boxShadow: `inset 0 0 40px ${cert.accent}18` }}
              />

              <div className="relative z-10 p-6 flex flex-col h-full">
                {/* Org badge — THE hero element */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-sm font-mono tracking-wider border transition-all duration-300 group-hover:scale-105"
                    style={{
                      color: cert.orgColor,
                      background: `${cert.accent}18`,
                      borderColor: `${cert.accent}35`,
                    }}
                  >
                    {cert.orgLogo}
                  </div>
                  <ExternalLink
                    size={13}
                    className="text-muted-foreground/40 group-hover:text-primary transition-colors mt-1"
                  />
                </div>

                {/* Org name — BIG and dominant */}
                <p
                  className="text-lg font-black font-heading mb-1 tracking-tight leading-tight group-hover:brightness-125 transition-all duration-300"
                  style={{ color: cert.orgColor }}
                >
                  {cert.organization}
                </p>

                {/* Date */}
                <p className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-widest mb-3">
                  {cert.date}
                </p>

                {/* Title */}
                <h3 className="text-sm font-semibold text-foreground/80 leading-snug mb-3 flex-1">
                  {cert.title}
                </h3>

                {/* Description */}
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  {cert.description}
                </p>

                {/* Verified footer */}
                <div className="flex items-center gap-1.5 mt-4 pt-4 border-t border-white/6">
                  <div
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: cert.accent }}
                  />
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                    Certificate Verified
                  </span>
                </div>
              </div>
            </m.a>
          ))}
        </div>

        {/* Education Banner */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-8"
        >
          <div className="glass rounded-2xl border border-[#ff4500]/20 hover:border-[#ff4500]/50 transition-all duration-500 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#ff4500]/6 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl pointer-events-none" />
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 relative z-10"
              style={{ background: "linear-gradient(135deg, #ff450020, #ff8c0010)", border: "1px solid #ff450030" }}
            >
              <GraduationCap size={24} className="text-[#ff4500]" />
            </div>
            <div className="relative z-10 flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-[10px] font-mono text-[#ff4500] border border-[#ff4500]/30 px-2.5 py-0.5 rounded-full uppercase tracking-widest">
                  Education
                </span>
                <span className="text-[10px] font-mono text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full uppercase tracking-widest">
                  {education.badge}
                </span>
              </div>
              <h3 className="text-base md:text-lg font-heading font-bold text-foreground leading-tight">
                {education.degree}
              </h3>
              <p className="text-sm text-muted-foreground font-medium mt-0.5">{education.university}</p>
            </div>
          </div>
        </m.div>

        {/* CTA */}
        <m.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <a
            href="https://drive.google.com/drive/folders/1SkYrIk9hZ7XxYgS4dmy9xiqZZ_WQXPwZ?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-primary transition-colors border border-white/10 hover:border-primary/40 px-6 py-3 rounded-full"
          >
            <ExternalLink size={13} />
            View All Certificates on Google Drive
          </a>
        </m.div>
      </div>
    </section>
  );
}
