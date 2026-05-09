import { lazy, Suspense } from "react";
import { m } from "framer-motion";
import { Hero } from "@/components/Hero";
import { About } from "@/components/sections/About";
import { LazySection } from "@/components/LazySection";

// Below-fold sections: lazy loaded for faster initial paint
const AuraAudeo   = lazy(() => import("@/components/sections/AuraAudeo").then(m => ({ default: m.AuraAudeo })));
const Skills       = lazy(() => import("@/components/sections/Skills").then(m => ({ default: m.Skills })));
const Projects     = lazy(() => import("@/components/sections/Projects").then(m => ({ default: m.Projects })));
const Certificates = lazy(() => import("@/components/sections/Certificates").then(m => ({ default: m.Certificates })));
const Services     = lazy(() => import("@/components/sections/Services").then(m => ({ default: m.Services })));
const Testimonials = lazy(() => import("@/components/sections/Testimonials").then(m => ({ default: m.Testimonials })));
const FAQ          = lazy(() => import("@/components/sections/FAQ").then(m => ({ default: m.FAQ })));
const Footer       = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));

// Minimal fallback — invisible dark div, no layout shift
const SectionFallback = () => (
  <div className="w-full h-32 bg-background" aria-hidden="true" />
);

export default function Home() {
  return (
    <m.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background w-full overflow-hidden"
    >
      {/* Above-fold — always eager loaded, no Suspense needed */}
      <Hero />
      <About />

      {/* Below-fold — lazy loaded in separate JS chunks */}
      <LazySection height="100vh">
        <Suspense fallback={<SectionFallback />}>
          <AuraAudeo />
        </Suspense>
      </LazySection>
      <LazySection height="100vh">
        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>
      </LazySection>
      <LazySection height="100vh">
        <Suspense fallback={<SectionFallback />}>
          <Skills />
        </Suspense>
      </LazySection>
      <LazySection height="100vh">
        <Suspense fallback={<SectionFallback />}>
          <Certificates />
        </Suspense>
      </LazySection>
      <LazySection height="100vh">
        <Suspense fallback={<SectionFallback />}>
          <Services />
        </Suspense>
      </LazySection>
      <LazySection height="100vh">
        <Suspense fallback={<SectionFallback />}>
          <FAQ />
        </Suspense>
      </LazySection>
      <LazySection height="100vh">
        <Suspense fallback={<SectionFallback />}>
          <Testimonials />
        </Suspense>
      </LazySection>
      <LazySection height="50vh">
        <Suspense fallback={<SectionFallback />}>
          <Footer />
        </Suspense>
      </LazySection>
    </m.main>
  );
}

