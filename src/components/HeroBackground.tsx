import { motion } from "motion/react";
import React, { useEffect, useRef } from "react";

type WaterRipple = {
  x: number;
  y: number;
  age: number;
  strength: number;
};

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
      if (clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom) {
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

type HeroBackgroundProps = {
  disabled: boolean;
  style?: React.ComponentProps<typeof motion.div>["style"];
};

export default function HeroBackground({ disabled, style }: HeroBackgroundProps) {
  return (
    <motion.div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" style={style}>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_44%,#f1f5f9_100%)]" />
      <div className="premium-scan-grid absolute inset-0 z-[1] opacity-25" />

      <motion.div
        animate={{ x: [0, 45, 0], y: [0, 20, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-20 top-6 h-60 w-60 rounded-full bg-brand-accent blur-[110px] md:h-[22rem] md:w-[22rem]"
      />
      <motion.div
        animate={{ x: [0, -35, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        className="absolute -right-16 bottom-0 h-60 w-60 rounded-full bg-brand-accent blur-[120px] md:h-[22rem] md:w-[22rem]"
      />

      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.03, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-[46%] h-[12rem] w-[12rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 blur-[14px] md:h-[18rem] md:w-[18rem]"
      />

      <HeroWaterCanvas disabled={disabled} />

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
          animate={{ x: [0, index % 2 === 0 ? 36 : -36, 0], opacity: [0.28, 0.65, 0.28], scaleX: [1, 1.08, 1] }}
          transition={{ duration: band.duration, repeat: Infinity, ease: "easeInOut", delay: band.delay }}
          style={band.style}
          className={`absolute bg-gradient-to-r ${band.tone} blur-2xl ${band.size}`}
        />
      ))}

      {heroAccentDots.map((dot, index) => (
        <motion.div
          key={`hero-dot-${index}`}
          animate={{ y: [0, -14, 0], opacity: [0.25, 0.7, 0.25], scale: [1, 1.35, 1] }}
          transition={{ duration: dot.duration, repeat: Infinity, ease: "easeInOut", delay: dot.delay }}
          style={dot.style}
          className={`absolute rounded-full bg-brand-primary/25 blur-[1px] ${dot.size}`}
        />
      ))}

      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-brand-section via-white/80 to-transparent md:h-28" />
    </motion.div>
  );
}
