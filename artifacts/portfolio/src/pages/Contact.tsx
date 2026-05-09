import { useState } from "react";
import { m } from "framer-motion";
import { Send, Linkedin, Mail, MapPin, Clock, ExternalLink, Phone, Instagram } from "lucide-react";
import { DotLottiePlayer } from '@dotlottie/react-player';

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject is too short"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const socials = [
  {
    icon: <Linkedin size={20} />,
    href: "https://www.linkedin.com/in/dev-jasani-263dj/",
    label: "LinkedIn",
    color: "#0077B5",
  },
  {
    icon: <Instagram size={20} />,
    href: "https://www.instagram.com/_d.jasani_?igsh=OThsODJvMTRjaWQx&utm_source=qr",
    label: "Instagram",
    color: "#E1306C",
  },
];

const contactInfo = [
  {
    icon: <Phone size={18} />,
    label: "WhatsApp",
    value: "+91 70695 51919",
    href: "https://wa.me/917069551919",
  },
  {
    icon: <Mail size={18} />,
    label: "Email",
    value: "devjas263@gmail.com",
    href: "mailto:devjas263@gmail.com",
  },
  {
    icon: <MapPin size={18} />,
    label: "HQ Office",
    value: "Raj Impria, Surat, India",
    href: "https://maps.google.com/?q=Raj+Impria+Surat",
  },
  {
    icon: <Clock size={18} />,
    label: "Response Time",
    value: "Usually within 24 hours",
    href: null,
  },
];

export default function Contact() {
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsPending(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          ...values,
        }),
      });

      const result = await response.json();
      if (result.success) {
        toast({
          title: "✅ Transmission Sent",
          description: "Your message has been delivered to my inbox.",
        });
        form.reset();
      } else {
        throw new Error(result.message || "Failed to send message.");
      }
    } catch (error: any) {
      toast({
        title: "❌ Transmission Failed",
        description: error.message || "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  }


  return (
    <m.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background pt-32 pb-20 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ff4500]/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ff8c00]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
      </div>
      <div className="absolute inset-0 hud-grid opacity-10 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        {/* Page header */}
        <div className="flex flex-col md:flex-row items-center justify-center mb-16 gap-8 text-center md:text-left max-w-4xl mx-auto">
          <m.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <span className="text-xs font-mono tracking-[0.5em] text-primary uppercase mb-4 block font-bold">
              // INITIATE_PROJECT
            </span>
            <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tighter mb-4">
              Start a <span className="gradient-text">Project</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto md:mx-0 text-base">
              You have a vision. I architect the system to make it real — at scale, on time, with zero compromises.
            </p>
          </m.div>
          <m.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 mx-auto md:mx-0"
          >
            <DotLottiePlayer
              src="/hello-worker.lottie"
              autoplay
              loop
              style={{ height: '100%', width: '100%' }}
            />
          </m.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-24">
          {/* Left column — info */}
          <m.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Contact info */}
            <div className="space-y-4">
              {contactInfo.map((info) => (
                <div key={info.label} className="glass glow-border rounded-xl p-4 flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20 text-primary flex-shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-0.5">{info.label}</div>
                    {info.href ? (
                      <a href={info.href} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-primary transition-colors">
                        {info.value}
                      </a>
                    ) : (
                      <span className="text-sm font-medium">{info.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Availability badge */}
            <div className="glass glow-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-bold text-green-400">Open to select projects</span>
              </div>
              <p className="text-xs text-muted-foreground font-mono">
                Accepting a limited number of high-impact projects. If your idea is ambitious, let's talk architecture.
              </p>
            </div>

            {/* Social links */}
            <div>
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">Find me on</p>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.label}
                    className="p-3.5 rounded-xl glass border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all text-foreground/60 hover:text-foreground"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </m.div>

          {/* Right column — form */}
          <m.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3 glass glow-border p-8 md:p-10 rounded-2xl"
          >
            <h2 className="text-xl font-heading font-bold mb-6 gradient-text">Send a Message</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                {/* Honeypot field for spam protection */}
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/80 uppercase tracking-widest text-xs font-bold">Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your name"
                            {...field}
                            className="bg-black/50 border-white/10 focus-visible:border-primary focus-visible:ring-primary/50 focus-visible:ring-offset-0 h-12"
                          />
                        </FormControl>
                        <FormMessage className="text-destructive text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/80 uppercase tracking-widest text-xs font-bold">Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="you@example.com"
                            {...field}
                            className="bg-black/50 border-white/10 focus-visible:border-primary focus-visible:ring-primary/50 focus-visible:ring-offset-0 h-12"
                          />
                        </FormControl>
                        <FormMessage className="text-destructive text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/80 uppercase tracking-widest text-xs font-bold">Subject</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Project inquiry / Collaboration / etc."
                          {...field}
                          className="bg-black/50 border-white/10 focus-visible:border-primary focus-visible:ring-primary/50 focus-visible:ring-offset-0 h-12"
                        />
                      </FormControl>
                      <FormMessage className="text-destructive text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/80 uppercase tracking-widest text-xs font-bold">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell me about your project, goals, and timeline..."
                          {...field}
                          className="bg-black/50 border-white/10 focus-visible:border-primary focus-visible:ring-primary/50 focus-visible:ring-offset-0 min-h-[140px] resize-none"
                        />
                      </FormControl>
                      <FormMessage className="text-destructive text-xs" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-13 bg-primary text-primary-foreground font-bold text-base hover:shadow-[0_0_30px_rgba(255,140,0,0.4)] transition-all duration-300 rounded-xl disabled:opacity-70"
                >
                  {isPending ? "Sending..." : "Send Message"} <Send className="ml-2" size={16} />
                </Button>

              </form>
            </Form>
          </m.div>
        </div>

        {/* New Office Location & Map Section */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center"
        >
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-3xl font-heading font-bold tracking-tight">
              Office <span className="gradient-text">Headquarters</span>
            </h2>
            <p className="text-sm text-muted-foreground border-l-2 border-primary/50 pl-3">
              * Note: If you plan to visit, please book an appointment in advance via WhatsApp or phone call.
            </p>
            <div className="glass glow-border p-6 rounded-2xl space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20 text-primary flex-shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">Physical Address</div>
                  <p className="text-foreground leading-relaxed font-medium">
                    226, SECOND FLOOR, RAJ IMPRIA, VRAJ CHOCK, Sarthana, Choryasi, Surat - 395013, Gujarat, India
                  </p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full border-white/10 glass hover:bg-white/5 h-12 rounded-xl text-xs uppercase tracking-widest font-bold"
                onClick={() => window.open("https://www.google.com/maps/search/?api=1&query=Raj+Impria,+Vraj+Chowk,+Sarthana,+Surat,+Gujarat", "_blank")}
              >
                Get Directions <ExternalLink size={14} className="ml-2" />
              </Button>
            </div>
          </div>

          <div className="lg:col-span-3 glass glow-border p-2 rounded-2xl h-[400px] relative overflow-hidden group bg-black/40">
            {/* Loading Skeleton / Background */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-0">
               <div className="w-full h-full animate-pulse bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
            </div>
            
            <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
            <iframe
              src="https://maps.google.com/maps?q=Raj%20Impria,%20Vraj%20Chowk,%20Sarthana,%20Surat&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-xl relative z-20"
            />
          </div>

        </m.div>
      </div>
    </m.main>
  );
}

