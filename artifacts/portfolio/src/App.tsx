import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";

import NotFound from "@/pages/not-found";
import { useEffect, lazy, Suspense } from "react";
import { useLenis } from "@/hooks/useLenis";
import { LazyMotion } from "framer-motion";

import Home from "@/pages/Home";
const Contact = lazy(() => import("@/pages/Contact"));
import { CustomCursor } from "@/components/CustomCursor";
import { Nav } from "@/components/Nav";

const queryClient = new QueryClient();

// Scroll to top on every route change
function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </>
  );
}

function App() {
  useLenis();

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>

        <LazyMotion features={() => import('./features').then(res => res.default)}>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <CustomCursor />
            <Nav />
            <Router />
          </WouterRouter>
        </LazyMotion>
        <Toaster />

    </QueryClientProvider>
  );
}

export default App;
