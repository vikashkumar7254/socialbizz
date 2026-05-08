/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { lazy, Suspense, useState, useEffect } from "react";

// Layout
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import PageWrapper from "./components/layout/PageWrapper";
import ScrollToHash from "./components/ScrollToHash";

// Pages
import Home from "./pages/Home";

const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Contact = lazy(() => import("./pages/Contact"));
const TestimonialsPage = lazy(() => import("./pages/TestimonialsPage"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy"));
const ChatBot = lazy(() => import("./components/ChatBot"));

function PageFallback() {
  return (
    <div className="min-h-[40vh] bg-brand-bg flex items-center justify-center px-4 pt-24">
      <div className="h-10 w-10 rounded-full border-2 border-brand-primary/20 border-t-brand-primary animate-spin" />
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageFallback />}>
        <Routes location={location}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
          <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
          <Route path="/services/:slug" element={<PageWrapper><ServiceDetail /></PageWrapper>} />
          <Route path="/portfolio" element={<PageWrapper><Portfolio /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
          <Route path="/testimonials" element={<PageWrapper><TestimonialsPage /></PageWrapper>} />
          <Route path="/privacy-policy" element={<PageWrapper><PrivacyPolicy /></PageWrapper>} />
          <Route path="/terms-of-service" element={<PageWrapper><TermsOfService /></PageWrapper>} />
          <Route path="/refund-policy" element={<PageWrapper><RefundPolicy /></PageWrapper>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-brand-bg">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          <div className="w-20 h-20 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute inset-0 flex items-center justify-center text-xs font-bold text-brand-primary uppercase tracking-widest"
          >
            Socialbizz
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <Router>
      <ScrollToHash />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
        <Footer />
        <Suspense fallback={null}>
          <ChatBot />
        </Suspense>
      </div>
    </Router>
  );
}
