import { motion } from "motion/react";
import React, { useEffect, useRef } from "react";

type SignalPoint = {
  lane: number;
  progress: number;
  speed: number;
  size: number;
  alpha: number;
};

function HeroSignalCanvas({ disabled }: { disabled: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled) return;

    const canvas = canvasRef.current;
    const shell = shellRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !shell || !context) return;

    let animationFrame = 0;
    let lastTime = performance.now();
    let width = 0;
    let height = 0;
    let dpr = 1;
    const pointer = { x: 0.5, y: 0.5, active: false };
    const lanes = [0.18, 0.28, 0.39, 0.52, 0.64, 0.76];
    const signals: SignalPoint[] = lanes.flatMap((_, lane) =>
      Array.from({ length: 3 }, (_, index) => ({
        lane,
        progress: (index * 0.33 + lane * 0.08) % 1,
        speed: 0.045 + lane * 0.006 + index * 0.004,
        size: 2 + ((lane + index) % 3),
        alpha: 0.42 + index * 0.08,
      })),
    );

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

    const getPoint = (lane: number, progress: number, time: number) => {
      const baseY = height * lanes[lane];
      const wave = Math.sin(progress * Math.PI * 2 + lane * 0.9 + time * 0.0007) * height * 0.025;
      const lift = Math.cos(progress * Math.PI * 4 + time * 0.00045) * height * 0.01;
      return {
        x: width * (-0.08 + progress * 1.16),
        y: baseY + wave + lift,
      };
    };

    const drawLane = (lane: number, time: number) => {
      context.beginPath();
      for (let step = 0; step <= 80; step += 1) {
        const progress = step / 80;
        const point = getPoint(lane, progress, time);
        if (step === 0) context.moveTo(point.x, point.y);
        else context.lineTo(point.x, point.y);
      }

      const gradient = context.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, "rgba(15, 23, 42, 0)");
      gradient.addColorStop(0.22, "rgba(15, 23, 42, 0.1)");
      gradient.addColorStop(0.5, "rgba(211, 16, 39, 0.18)");
      gradient.addColorStop(0.78, "rgba(15, 23, 42, 0.09)");
      gradient.addColorStop(1, "rgba(15, 23, 42, 0)");
      context.strokeStyle = gradient;
      context.lineWidth = lane % 2 === 0 ? 1.4 : 1;
      context.stroke();
    };

    const draw = (time: number) => {
      const delta = Math.min(40, time - lastTime) / 1000;
      lastTime = time;

      context.clearRect(0, 0, width, height);

      const ambient = context.createLinearGradient(0, height * 0.2, width, height * 0.8);
      ambient.addColorStop(0, "rgba(255, 255, 255, 0)");
      ambient.addColorStop(0.48, "rgba(211, 16, 39, 0.055)");
      ambient.addColorStop(1, "rgba(15, 23, 42, 0.035)");
      context.fillStyle = ambient;
      context.fillRect(0, 0, width, height);

      for (let lane = 0; lane < lanes.length; lane += 1) {
        drawLane(lane, time);
      }

      for (const signal of signals) {
        signal.progress = (signal.progress + signal.speed * delta) % 1;
        const point = getPoint(signal.lane, signal.progress, time);
        const pulse = 0.7 + Math.sin(time * 0.004 + signal.lane) * 0.3;
        const size = signal.size + pulse;

        context.fillStyle = `rgba(211, 16, 39, ${signal.alpha})`;
        context.fillRect(point.x - size / 2, point.y - size / 2, size, size);

        context.strokeStyle = `rgba(255, 255, 255, ${0.5 * signal.alpha})`;
        context.lineWidth = 1;
        context.strokeRect(point.x - size * 1.2, point.y - size * 1.2, size * 2.4, size * 2.4);
      }

      const cursorX = pointer.x * width;
      const cursorY = pointer.y * height;
      const focus = context.createRadialGradient(cursorX, cursorY, 0, cursorX, cursorY, pointer.active ? 260 : 180);
      focus.addColorStop(0, pointer.active ? "rgba(211, 16, 39, 0.16)" : "rgba(255, 255, 255, 0.2)");
      focus.addColorStop(0.42, "rgba(255, 255, 255, 0.18)");
      focus.addColorStop(1, "rgba(255, 255, 255, 0)");
      context.fillStyle = focus;
      context.fillRect(0, 0, width, height);

      animationFrame = requestAnimationFrame(draw);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = shell.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
        pointer.active = false;
        return;
      }
      pointer.x = (event.clientX - rect.left) / rect.width;
      pointer.y = (event.clientY - rect.top) / rect.height;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    resize();
    animationFrame = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [disabled]);

  return (
    <div ref={shellRef} className="hero-signal-canvas absolute inset-0 z-[2]" aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}

const heroBeams = [
  {
    style: { top: "14%", left: "-18%", rotate: "-11deg" },
    size: "h-16 w-[22rem] md:h-24 md:w-[42rem]",
    duration: 11,
    delay: 0,
  },
  {
    style: { top: "39%", right: "-16%", rotate: "13deg" },
    size: "h-14 w-[20rem] md:h-20 md:w-[36rem]",
    duration: 13,
    delay: 0.8,
  },
  {
    style: { bottom: "20%", left: "2%", rotate: "6deg" },
    size: "h-12 w-[18rem] md:h-20 md:w-[32rem]",
    duration: 12,
    delay: 0.4,
  },
];

const metricTicks = [
  { style: { top: "16%", left: "12%" }, delay: 0, height: "h-12" },
  { style: { top: "22%", right: "16%" }, delay: 0.4, height: "h-16" },
  { style: { top: "58%", left: "9%" }, delay: 0.8, height: "h-14" },
  { style: { bottom: "18%", right: "12%" }, delay: 1.1, height: "h-12" },
  { style: { bottom: "12%", left: "30%" }, delay: 1.5, height: "h-10" },
];

type HeroBackgroundProps = {
  disabled: boolean;
  style?: React.ComponentProps<typeof motion.div>["style"];
};

export default function HeroBackground({ disabled, style }: HeroBackgroundProps) {
  return (
    <motion.div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" style={style}>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_48%,#eef2f7_100%)]" />
      <div className="premium-scan-grid absolute inset-0 z-[1] opacity-35" />

      <motion.div
        animate={{ x: ["-6%", "6%", "-6%"], opacity: [0.16, 0.32, 0.16] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-0 right-0 top-[23%] h-24 bg-gradient-to-r from-transparent via-brand-primary/12 to-transparent blur-3xl"
      />
      <motion.div
        animate={{ x: ["7%", "-7%", "7%"], opacity: [0.08, 0.2, 0.08] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
        className="absolute left-0 right-0 bottom-[18%] h-24 bg-gradient-to-r from-transparent via-slate-400/18 to-transparent blur-3xl"
      />

      <HeroSignalCanvas disabled={disabled} />

      {heroBeams.map((beam, index) => (
        <motion.div
          key={`hero-beam-${index}`}
          animate={{ x: [0, index % 2 === 0 ? 42 : -42, 0], opacity: [0.16, 0.42, 0.16], scaleX: [1, 1.1, 1] }}
          transition={{ duration: beam.duration, repeat: Infinity, ease: "easeInOut", delay: beam.delay }}
          style={beam.style}
          className={`absolute z-[1] bg-gradient-to-r from-transparent via-white/80 to-transparent blur-2xl ${beam.size}`}
        />
      ))}

      {metricTicks.map((tick, index) => (
        <motion.div
          key={`metric-tick-${index}`}
          animate={{ scaleY: [0.65, 1, 0.65], opacity: [0.18, 0.52, 0.18] }}
          transition={{ duration: 3.8 + index * 0.35, repeat: Infinity, ease: "easeInOut", delay: tick.delay }}
          style={tick.style}
          className={`absolute z-[3] w-px ${tick.height} bg-gradient-to-b from-transparent via-brand-primary/45 to-transparent`}
        />
      ))}

      <div className="absolute inset-x-0 bottom-0 z-[4] h-20 bg-gradient-to-t from-brand-section via-white/80 to-transparent md:h-28" />
    </motion.div>
  );
}
