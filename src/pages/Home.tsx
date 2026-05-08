import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Mail,
  Megaphone,
  MessageSquare,
  Phone,
  Target,
  TrendingUp,
  User,
  Users,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import React, { lazy, Suspense, useEffect, useState, useRef } from "react";
import { services } from "../data/services";

const Results = lazy(() => import("../components/Results"));
const Testimonials = lazy(() => import("../components/Testimonials"));
const CaseStudyCarousel = lazy(() => import("../components/CaseStudyCarousel"));
const VideoTestimonials = lazy(() => import("../components/VideoTestimonials"));
const FAQ = lazy(() => import("../components/FAQ"));
const PlatformScroller = lazy(() => import("../components/PlatformScroller"));

const brandLogo = "/Social%20Bizz%20Logo-01.png";

type WaterRipple = {
  x: number;
  y: number;
  age: number;
  strength: number;
};

function SectionFallback({ tone = "bg-white" }: { tone?: string }) {
  return <div className={`h-16 ${tone}`} aria-hidden="true" />;
}

function HeroWaterCanvas({ disabled }: { disabled: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled) return;

    const canvas = canvasRef.current;
    const shell = shellRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !shell || !context) return;

    let animationFrame = 0;
    let idleRippleInterval: ReturnType<typeof setInterval> | undefined;
    let lastTime = performance.now();
    let lastRippleTime = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    const ripples: WaterRipple[] = [];
    const pointer = { x: 0, y: 0, active: false };

    const resize = () => {
      const rect = shell.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const addRipple = (clientX: number, clientY: number, force = false) => {
      const rect = shell.getBoundingClientRect();
      if (
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom
      ) {
        pointer.active = false;
        return;
      }

      pointer.x = clientX - rect.left;
      pointer.y = clientY - rect.top;
      pointer.active = true;

      const now = performance.now();
      if (!force && now - lastRippleTime < 70) return;
      lastRippleTime = now;

      ripples.push({ x: pointer.x, y: pointer.y, age: 0, strength: force ? 1.25 : 0.9 });
      if (ripples.length > 22) ripples.shift();
    };

    const draw = (time: number) => {
      const delta = Math.min(40, time - lastTime) / 1000;
      lastTime = time;

      context.clearRect(0, 0, width, height);

      if (pointer.active) {
        const glow = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 150);
        glow.addColorStop(0, "rgba(211, 16, 39, 0.22)");
        glow.addColorStop(0.28, "rgba(255, 255, 255, 0.56)");
        glow.addColorStop(0.58, "rgba(211, 16, 39, 0.09)");
        glow.addColorStop(1, "rgba(211, 16, 39, 0)");
        context.fillStyle = glow;
        context.beginPath();
        context.arc(pointer.x, pointer.y, 150, 0, Math.PI * 2);
        context.fill();

        context.strokeStyle = "rgba(211, 16, 39, 0.28)";
        context.lineWidth = 1.5;
        context.beginPath();
        context.arc(pointer.x, pointer.y, 42 + Math.sin(time / 120) * 5, 0, Math.PI * 2);
        context.stroke();
      }

      for (let index = ripples.length - 1; index >= 0; index -= 1) {
        const ripple = ripples[index];
        ripple.age += delta;
        const progress = ripple.age / 1.45;
        if (progress >= 1) {
          ripples.splice(index, 1);
          continue;
        }

        const radius = 18 + progress * 260;
        const alpha = (1 - progress) * ripple.strength;

        context.lineWidth = 2.4;
        context.strokeStyle = `rgba(211, 16, 39, ${0.4 * alpha})`;
        context.beginPath();
        context.arc(ripple.x, ripple.y, radius, 0, Math.PI * 2);
        context.stroke();

        context.lineWidth = 1;
        context.strokeStyle = `rgba(255, 255, 255, ${0.55 * alpha})`;
        context.beginPath();
        context.arc(ripple.x, ripple.y, radius * 0.72, 0, Math.PI * 2);
        context.stroke();

        context.fillStyle = `rgba(211, 16, 39, ${0.06 * alpha})`;
        context.beginPath();
        context.arc(ripple.x, ripple.y, radius * 0.52, 0, Math.PI * 2);
        context.fill();
      }

      animationFrame = requestAnimationFrame(draw);
    };

    const handlePointerMove = (event: PointerEvent) => addRipple(event.clientX, event.clientY);
    const handlePointerDown = (event: PointerEvent) => addRipple(event.clientX, event.clientY, true);
    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) addRipple(touch.clientX, touch.clientY);
    };
    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) addRipple(touch.clientX, touch.clientY, true);
    };

    resize();
    ripples.push({ x: width * 0.5, y: height * 0.46, age: 0, strength: 0.75 });
    idleRippleInterval = setInterval(() => {
      ripples.push({
        x: width * (0.38 + Math.random() * 0.24),
        y: height * (0.34 + Math.random() * 0.26),
        age: 0,
        strength: 0.45,
      });
      if (ripples.length > 22) ripples.shift();
    }, 1800);
    animationFrame = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrame);
      if (idleRippleInterval) clearInterval(idleRippleInterval);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, [disabled]);

  return (
    <div ref={shellRef} className="hero-water-canvas absolute inset-0 z-[2]" aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}

export default function Home() {
  const [homeFormStatus, setHomeFormStatus] = useState<"idle" | "submitting" | "success">("idle");
  const scrollRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorSpringX = useSpring(cursorX, { stiffness: 140, damping: 28, mass: 0.2 });
  const cursorSpringY = useSpring(cursorY, { stiffness: 140, damping: 28, mass: 0.2 });
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroContentY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -70]);
  const heroBackdropY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 120]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, shouldReduceMotion ? 1 : 0.94]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handlePointerMove = (event: PointerEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [cursorX, cursorY, shouldReduceMotion]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const handleHomeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHomeFormStatus("submitting");
    
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      message: formData.get("message"),
      source: "Quick Inquiry Form (Home Page)"
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setHomeFormStatus("success");
      } else {
        console.error("Failed to submit inquiry");
        setHomeFormStatus("idle");
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      setHomeFormStatus("idle");
      alert("Network error. Please check your connection.");
    }
  };

  const stats = [
    { label: "Clients", value: "100+", icon: <Users className="text-brand-primary" /> },
    { label: "Campaigns", value: "500+", icon: <Megaphone className="text-brand-primary" /> },
    { label: "ROI Delivered", value: "3X", icon: <TrendingUp className="text-brand-primary" /> },
  ];

  const heroRibbonBands = [
    {
      style: { top: "14%", left: "-10%", rotate: "-10deg" },
      size: "h-20 w-[18rem] md:h-28 md:w-[32rem]",
      tone: "from-transparent via-brand-accent to-transparent",
      duration: 10,
      delay: 0,
    },
    {
      style: { top: "30%", right: "-8%", rotate: "14deg" },
      size: "h-16 w-[16rem] md:h-24 md:w-[28rem]",
      tone: "from-transparent via-brand-accent to-transparent",
      duration: 12,
      delay: 0.8,
    },
    {
      style: { bottom: "20%", left: "8%", rotate: "8deg" },
      size: "h-16 w-[14rem] md:h-24 md:w-[24rem]",
      tone: "from-transparent via-brand-accent to-transparent",
      duration: 11,
      delay: 0.4,
    },
  ];

  const heroAccentDots = [
    { style: { top: "14%", left: "18%" }, delay: 0, duration: 4.8, size: "h-2.5 w-2.5" },
    { style: { top: "24%", right: "20%" }, delay: 0.8, duration: 5.3, size: "h-2 w-2" },
    { style: { top: "38%", left: "10%" }, delay: 1.1, duration: 5.1, size: "h-2 w-2" },
    { style: { top: "42%", right: "12%" }, delay: 0.5, duration: 4.9, size: "h-2.5 w-2.5" },
    { style: { bottom: "28%", left: "20%" }, delay: 1.4, duration: 5.5, size: "h-2 w-2" },
    { style: { bottom: "18%", right: "18%" }, delay: 1.9, duration: 4.7, size: "h-2.5 w-2.5" },
    { style: { bottom: "12%", left: "35%" }, delay: 0.3, duration: 5.2, size: "h-2 w-2" },
    { style: { bottom: "11%", right: "34%" }, delay: 1.6, duration: 5, size: "h-2 w-2" },
  ];

  return (
    <div className="pb-2">
      {!shouldReduceMotion && (
        <motion.div
          className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-primary/10 blur-3xl lg:block"
          style={{ x: cursorSpringX, y: cursorSpringY }}
          aria-hidden="true"
        />
      )}
      {/* Hero Section */}
      <section ref={heroRef} className="relative isolate md:min-h-screen flex flex-col items-center justify-start md:justify-center overflow-hidden px-4 md:px-6 pt-[108px] pb-12 md:pt-28 md:pb-10 bg-white">
        {/* Premium digital background */}
        <motion.div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" style={{ y: heroBackdropY, scale: heroScale }}>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_44%,#f1f5f9_100%)]" />
          <div className="premium-scan-grid absolute inset-0 z-[1] opacity-25" />

          <motion.div
            animate={{
              x: [0, 45, 0],
              y: [0, 20, 0],
              scale: [1, 1.08, 1],
            }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-20 top-6 h-60 w-60 rounded-full bg-brand-accent blur-[110px] md:h-[22rem] md:w-[22rem]"
          />
          <motion.div
            animate={{
              x: [0, -35, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            className="absolute -right-16 bottom-0 h-60 w-60 rounded-full bg-brand-accent blur-[120px] md:h-[22rem] md:w-[22rem]"
          />

          <motion.div
            animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.03, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-[46%] h-[12rem] w-[12rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 blur-[14px] md:h-[18rem] md:w-[18rem]"
          />

          <HeroWaterCanvas disabled={Boolean(shouldReduceMotion)} />

          <motion.div
            animate={{ x: ["-8%", "8%", "-8%"], opacity: [0.1, 0.18, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 right-0 top-[25%] h-24 bg-gradient-to-r from-transparent via-brand-accent to-transparent blur-3xl"
          />
          <motion.div
            animate={{ x: ["8%", "-8%", "8%"], opacity: [0.05, 0.12, 0.05] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 right-0 bottom-[18%] h-20 bg-gradient-to-r from-transparent via-brand-accent to-transparent blur-3xl"
          />

          {heroRibbonBands.map((band, index) => (
            <motion.div
              key={`hero-band-${index}`}
              animate={{
                x: [0, index % 2 === 0 ? 36 : -36, 0],
                opacity: [0.28, 0.65, 0.28],
                scaleX: [1, 1.08, 1],
              }}
              transition={{
                duration: band.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: band.delay,
              }}
              style={band.style}
              className={`absolute bg-gradient-to-r ${band.tone} blur-2xl ${band.size}`}
            />
          ))}

          {heroAccentDots.map((dot, index) => (
            <motion.div
              key={`hero-dot-${index}`}
              animate={{
                y: [0, -14, 0],
                opacity: [0.25, 0.7, 0.25],
                scale: [1, 1.35, 1],
              }}
              transition={{
                duration: dot.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: dot.delay,
              }}
              style={dot.style}
              className={`absolute rounded-full bg-brand-primary/25 blur-[1px] ${dot.size}`}
            />
          ))}

          <div className="absolute inset-x-0 bottom-0 h-20 md:h-28 bg-gradient-to-t from-brand-section via-white/80 to-transparent" />
        </motion.div>

        <motion.div className="max-w-7xl mx-auto text-center relative z-10 w-full" style={{ y: heroContentY, opacity: heroOpacity }}>
          {/* HUD Corners - NEW */}
          <div className="absolute -inset-4 md:-inset-10 pointer-events-none opacity-20 hidden sm:block">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-brand-primary" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-brand-primary" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-brand-primary" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-brand-primary" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-2 md:px-4 md:py-1.5 mb-4 md:mb-5 bg-brand-accent rounded-full text-[11px] xs:text-xs md:text-sm font-bold text-brand-primary border border-brand-border whitespace-nowrap shadow-sm relative z-20"
          >
            Turning Social Presence into Real Business
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-display font-bold mb-4 md:mb-5 tracking-tight leading-[1.06] text-brand-text-primary [text-wrap:balance]"
          >
            Scale Your Business with <br />
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-brand-primary inline-block relative"
            >
              Socialbizz
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute bottom-2 left-0 h-2 bg-brand-accent -z-10"
              />
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-brand-text-secondary max-w-2xl mx-auto mb-5 md:mb-7 leading-relaxed"
          >
            We help brands grow using SEO, Ads & Social Media Marketing. 
            Data-driven strategies designed for maximum impact and ROI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-row items-center justify-center gap-3 md:gap-5 mb-6 md:mb-8"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group w-auto"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary to-brand-primary-hover rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
              <Link 
                to="/contact" 
                className="relative bg-brand-primary px-4 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-xs md:text-lg text-white flex items-center justify-center gap-2 md:gap-3 hover:bg-brand-primary-hover transition-all shadow-soft whitespace-nowrap overflow-hidden premium-magnetic"
              >
                <motion.div
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                />
                <span className="relative z-10">Get Free Strategy Call</span>
                <ArrowRight size={16} className="relative z-10 hidden xs:block group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
            
            <Link to="/portfolio" className="w-auto border border-brand-border px-4 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-xs md:text-lg text-brand-text-primary hover:bg-brand-section transition-all text-center whitespace-nowrap backdrop-blur-sm premium-magnetic">
              View Our Work
            </Link>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-2 md:gap-4 max-w-3xl mx-auto">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white px-3 py-2.5 md:px-5 md:py-3.5 rounded-xl md:rounded-2xl flex flex-col items-center gap-1 md:gap-1.5 group shadow-soft border border-brand-border hover:border-brand-accent transition-all duration-500 relative overflow-hidden col-span-1 premium-card"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex flex-col items-center gap-1 md:gap-1.5">
                <div className="p-1.5 md:p-2 bg-brand-accent rounded-lg md:rounded-xl mb-0.5 group-hover:scale-105 group-hover:bg-brand-accent transition-all text-brand-primary">
                    {stat.icon}
                  </div>
                  <div className="text-lg md:text-2xl font-display font-bold text-brand-primary leading-none">{stat.value}</div>
                  <div className="text-brand-text-secondary text-[8px] md:text-[11px] uppercase tracking-[0.18em] font-semibold text-center leading-tight">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
          >
            <div className="w-[1px] h-12 bg-gradient-to-b from-brand-primary/50 to-transparent" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-text-secondary/50">Scroll</span>
          </motion.div>
        </motion.div>
        <div className="absolute inset-x-0 bottom-0 z-10 h-px bg-gradient-to-r from-transparent via-brand-border to-transparent" />
        <div className="absolute bottom-0 left-1/2 z-10 h-1 w-24 -translate-x-1/2 rounded-t-full bg-brand-primary/20 md:w-32" />
      </section>

      {/* Quick Inquiry Form */}
      <section className="premium-section py-8 md:py-12 px-4 md:px-6 relative overflow-hidden bg-brand-section">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-soft-lg border border-brand-border overflow-hidden relative premium-card"
          >
            <div className="grid md:grid-cols-12">
              {/* Left Side: Info */}
              <div className="md:col-span-5 bg-brand-primary p-6 md:p-10 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -mr-32 -mt-32" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/5 blur-[60px] rounded-full -ml-20 -mb-20" />
                
                <div className="relative z-10 h-full flex flex-col justify-center md:justify-between gap-6 md:gap-0">
                  <div>
                    <h3 className="text-xl md:text-3xl font-display font-bold mb-2 md:mb-3 leading-tight">Let's Build Your Digital Success</h3>
                    <p className="text-white/80 text-[10px] md:text-sm mb-4 md:mb-6 max-w-sm">
                      Fill out the form and our strategy experts will reach out to you within 24 hours for a free consultation.
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                          <Clock size={12} className="text-white" />
                        </div>
                        <div>
                          <div className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest opacity-60">Response</div>
                          <div className="text-[10px] md:text-xs font-medium">Under 24h</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                          <CheckCircle2 size={12} className="text-white" />
                        </div>
                        <div>
                          <div className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest opacity-60">Consultation</div>
                          <div className="text-[10px] md:text-xs font-medium">100% Free</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-8 pt-4 md:pt-6 border-t border-white/10">
                    <div className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2">Trusted By Brands Like</div>
                    <div className="flex flex-wrap gap-4 opacity-70 grayscale invert">
                      <img
                        src={brandLogo}
                        alt="SocialBizz"
                        className="h-8 w-auto object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Form */}
              <div className="md:col-span-7 p-6 md:p-10 bg-white">
                {homeFormStatus === "success" ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-3 py-8"
                  >
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-3">
                      <CheckCircle2 size={32} />
                    </div>
                    <h4 className="text-xl font-display font-bold text-brand-text-primary">Inquiry Received!</h4>
                    <p className="text-brand-text-secondary text-sm max-w-xs mx-auto">
                      Thank you for reaching out. One of our experts will contact you shortly on your provided number.
                    </p>
                    <button 
                      onClick={() => setHomeFormStatus("idle")}
                      className="text-brand-primary font-bold text-xs hover:underline pt-3"
                    >
                      Send another inquiry
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleHomeSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-brand-text-secondary uppercase tracking-widest ml-1">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-text-secondary/40" size={16} />
                          <input 
                            required
                            name="name"
                            type="text" 
                            placeholder="John Doe" 
                            className="w-full bg-white border border-brand-border rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-accent transition-all text-brand-text-primary"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-brand-text-secondary uppercase tracking-widest ml-1">Mobile Number</label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-text-secondary/40" size={16} />
                          <input 
                            required
                            name="phone"
                            type="tel" 
                            placeholder="+91 XXXXX XXXXX" 
                            className="w-full bg-white border border-brand-border rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-accent transition-all text-brand-text-primary"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-brand-text-secondary uppercase tracking-widest ml-1">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-text-secondary/40" size={16} />
                        <input 
                          required
                          name="email"
                          type="email" 
                          placeholder="john@example.com" 
                          className="w-full bg-white border border-brand-border rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-accent transition-all text-brand-text-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-brand-text-secondary uppercase tracking-widest ml-1">Message (Optional)</label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3.5 top-4 text-brand-text-secondary/40" size={16} />
                        <textarea 
                          rows={2}
                          name="message"
                          placeholder="Tell us about your project or goals..." 
                          className="w-full bg-white border border-brand-border rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-accent transition-all text-brand-text-primary resize-none"
                        />
                      </div>
                    </div>

                    <button 
                      disabled={homeFormStatus === "submitting"}
                      className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold hover:bg-brand-primary-hover transition-all shadow-soft flex items-center justify-center gap-2 disabled:opacity-70 group"
                    >
                      {homeFormStatus === "submitting" ? (
                        "Processing..."
                      ) : (
                        <>
                          Submit Inquiry 
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Preview */}
      <section id="services" className="premium-section py-8 md:py-12 px-4 md:px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-10 gap-3 md:gap-6">
            <div className="max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-brand-primary font-display font-bold uppercase tracking-widest text-[10px] md:text-sm mb-2.5 flex items-center gap-2"
              >
                <div className="w-10 h-[1px] bg-brand-primary" /> OUR EXPERTISE
              </motion.div>
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-5xl font-display font-bold mb-3 md:mb-5 leading-tight text-brand-text-primary"
              >
                Solutions for <span className="text-brand-primary">Modern Brands</span>
              </motion.h3>
            </div>
          </div>

          {/* Horizontal Scrolling Container */}
          <div className="relative group/carousel">
            {/* Navigation Buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-8 z-20 hidden lg:block">
              <button 
                onClick={() => scroll("left")}
                className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white shadow-soft-lg border border-brand-border flex items-center justify-center text-brand-text-primary hover:bg-brand-primary hover:text-white transition-all duration-300 group/btn"
              >
                <ChevronLeft size={24} className="group-hover/btn:-translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-8 z-20 hidden lg:block">
              <button 
                onClick={() => scroll("right")}
                className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white shadow-soft-lg border border-brand-border flex items-center justify-center text-brand-text-primary hover:bg-brand-primary hover:text-white transition-all duration-300 group/btn"
              >
                <ChevronRight size={24} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>

            <motion.div 
              ref={scrollRef}
              className="flex gap-3 md:gap-6 overflow-x-auto pb-5 md:pb-10 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {services.map((service, i) => (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="min-w-[250px] sm:min-w-[320px] md:min-w-[360px] snap-start"
                >
                  <Link to={`/services/${service.slug}`} className="block h-full">
                    <div className="bg-white rounded-[1.6rem] md:rounded-[2.25rem] relative overflow-hidden group border border-brand-border hover:border-brand-accent shadow-soft hover:shadow-soft-lg transition-all duration-500 h-full flex flex-col premium-card">
                      {/* Service Image */}
                      <div className="h-40 md:h-56 overflow-hidden relative">
                        <img 
                          src={service.image || "https://picsum.photos/seed/service/800/600"} 
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                        <div className="absolute top-4 left-4 p-2.5 md:p-3 bg-white/90 backdrop-blur-md rounded-lg md:rounded-xl text-brand-primary shadow-soft">
                          {service.icon}
                        </div>
                      </div>

                      <div className="p-4 md:p-7 pt-0 relative z-10 flex-grow flex flex-col">
                        <h4 className="text-lg md:text-2xl font-display font-bold mb-2.5 md:mb-3 text-brand-text-primary group-hover:text-brand-primary transition-colors">{service.title}</h4>
                        <p className="text-[13px] md:text-[15px] text-brand-text-secondary leading-relaxed mb-4 md:mb-6 flex-grow">
                          {service.shortDesc}
                        </p>
                        <div className="text-[13px] md:text-sm font-bold flex items-center gap-2 text-brand-primary group-hover:gap-3 transition-all mt-auto">
                          Learn More <ArrowRight size={16} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Scroll Progress Bar (Optional but nice) */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-section rounded-full overflow-hidden hidden md:block">
              <motion.div 
                className="h-full bg-brand-accent"
                initial={{ width: "20%" }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 2 }}
              />
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<SectionFallback />}>
        <VideoTestimonials />
      </Suspense>

      {/* About Preview */}
      <section id="about" className="premium-section py-8 md:py-12 px-4 md:px-6 bg-brand-section relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-accent blur-[100px] -z-10" />
        
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-6 md:gap-10 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1 max-w-md mx-auto lg:mx-0"
          >
            <div className="relative z-10">
              <div className="absolute -top-4 -left-4 w-16 h-16 border-t-4 border-l-4 border-brand-accent rounded-tl-2xl hidden md:block" />
              <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-4 border-r-4 border-brand-accent rounded-br-2xl hidden md:block" />
              
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&h=1000" 
                alt="Digital Marketing Analysis" 
                className="rounded-[1.5rem] md:rounded-[2rem] shadow-soft-lg border border-brand-border w-full relative z-10 object-cover aspect-[4/5] premium-card"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />

              {/* Success Badge */}
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                whileInView={{ scale: 1, rotate: 5 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute -bottom-4 -left-4 md:bottom-8 md:-left-8 bg-white p-3 md:p-5 rounded-2xl shadow-soft-lg border border-brand-border z-20 max-w-[120px] md:max-w-[160px]"
              >
                <div className="text-brand-primary font-display font-black text-xl md:text-3xl mb-0.5 md:mb-1">100+</div>
                <div className="text-brand-text-secondary text-[8px] md:text-xs font-bold uppercase tracking-widest leading-tight">Successful Campaigns</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent text-brand-primary text-[10px] md:text-xs font-bold uppercase tracking-widest mb-3 md:mb-4">
              <Award size={12} />
              Award Winning Agency
            </div>
            
            <h2 className="text-2xl md:text-5xl font-display font-bold mb-3 md:mb-6 leading-tight text-brand-text-primary">
              We Don't Just Manage <br />
              <span className="text-brand-primary">We Scale Brands</span>
            </h2>
            
            <p className="text-sm md:text-lg text-brand-text-secondary mb-6 md:mb-8 leading-relaxed">
              Socialbizz.in was born out of a passion for performance. We combine technical expertise with creative flair to help brands dominate their niche.
            </p>

            <div className="grid sm:grid-cols-1 gap-3 md:gap-4 mb-6 md:mb-8">
              {[
                { 
                  title: "Data-Driven Strategy", 
                  desc: "We use real-time data and advanced analytics to drive your growth.",
                  icon: <TrendingUp size={18} />
                },
                { 
                  title: "Creative Campaigns", 
                  desc: "Stand out from the noise with thumb-stopping content.",
                  icon: <Zap size={18} />
                },
                { 
                  title: "Performance Focused", 
                  desc: "Our goal is simple: deliver the highest possible ROI.",
                  icon: <Target size={18} />
                },
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex gap-3 md:gap-4 p-3 md:p-4 bg-white rounded-xl md:rounded-2xl border border-brand-border shadow-soft hover:border-brand-accent transition-all group premium-card"
                >
                  <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-brand-section flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs md:text-base text-brand-text-primary mb-0.5">{feature.title}</h4>
                    <p className="text-brand-text-secondary text-[10px] md:text-xs leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link 
                to="/about" 
                className="inline-block bg-brand-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-primary-hover transition-all shadow-soft text-center text-sm"
              >
                Learn More
              </Link>
              <Link 
                to="/contact" 
                className="inline-block bg-white text-brand-text-primary border border-brand-border px-6 py-3 rounded-xl font-bold hover:bg-brand-section transition-all shadow-soft text-center text-sm"
              >
                Free Consultation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Suspense fallback={<SectionFallback />}>
        <Results />
      </Suspense>
      
      <Suspense fallback={<SectionFallback />}>
        <CaseStudyCarousel />
      </Suspense>
      
      {/* Process Section */}
      <section id="process" className="premium-section py-8 md:py-12 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-4 md:mb-6">
            <h2 className="text-brand-primary font-display font-bold uppercase tracking-widest text-[10px] md:text-sm mb-2 md:mb-4">Our Workflow</h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold">How We Grow Your Business</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {[
              { num: "01", title: "Strategy", desc: "We analyze your business and audience to create a custom roadmap.", color: "text-brand-primary" },
              { num: "02", title: "Execution", desc: "Our experts launch campaigns and create content with precision.", color: "text-brand-primary" },
              { num: "03", title: "Scaling", desc: "We optimize and scale what works to maximize your growth.", color: "text-brand-primary" },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] text-center border border-brand-border shadow-soft hover:shadow-soft-lg transition-all group premium-card"
              >
                <div className={`text-5xl md:text-6xl font-display font-black mb-4 md:mb-6 opacity-20 ${step.color} group-hover:opacity-100 transition-opacity`}>
                  {step.num}
                </div>
                <h4 className="text-xl md:text-2xl font-display font-bold mb-3 md:mb-4 text-brand-text-primary">{step.title}</h4>
                <p className="text-sm md:text-base text-brand-text-secondary leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Suspense fallback={<SectionFallback tone="bg-brand-section" />}>
        <PlatformScroller />
      </Suspense>
      <Suspense fallback={<SectionFallback tone="bg-brand-section" />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<SectionFallback tone="bg-brand-section/30" />}>
        <FAQ />
      </Suspense>
    </div>
  );
}
