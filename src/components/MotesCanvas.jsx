import React, { useEffect, useRef } from "react";

export default function MotesCanvas({ burst = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    const COLORS = ["#FFD700", "#F5DEB3", "#FFF8DC", "#FFB6C1", "#E6C280", "#FAD02C"];
    const count = burst ? 45 : 22;

    const createMote = (initialTime) => ({
      x: Math.random() * width,
      y: burst ? -30 - Math.random() * 250 : Math.random() * height,
      r: 1.2 + Math.random() * (burst ? 3.8 : 2.5),
      vy: (burst ? 0.7 : 0.12) + Math.random() * (burst ? 1.0 : 0.2),
      phase: Math.random() * Math.PI * 2,
      speed: 0.008 + Math.random() * 0.016,
      alpha: 0,
      targetAlpha: 0.15 + Math.random() * 0.45,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      born: initialTime || performance.now(),
      life: burst ? 5500 : 9000
    });

    let motes = Array.from({ length: count }, () => createMote());
    let animationFrameId;
    let isRunning = true;

    const render = (time) => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < motes.length; i++) {
        const p = motes[i];
        p.y += p.vy;
        p.phase += p.speed;
        p.x += Math.sin(p.phase) * (burst ? 0.55 : 0.2);
        p.alpha += ((isRunning ? p.targetAlpha : 0) - p.alpha) * (isRunning ? 0.03 : 0.06);

        const age = (time - p.born) / p.life;
        const currentAlpha = p.alpha * (age > 0.8 ? Math.max(0, 1 - (age - 0.8) / 0.2) : 1);

        ctx.globalAlpha = currentAlpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, p.r, p.r * (burst ? 1.4 : 1), p.phase, 0, Math.PI * 2);
        ctx.fill();

        if (isRunning && (p.y > height + 30 || age > 1)) {
          Object.assign(p, createMote(time));
        }
      }

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;

      if (isRunning) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [burst]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        width: "100%",
        height: "100%"
      }}
      aria-hidden="true"
    />
  );
}
