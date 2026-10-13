import React, { useEffect, useRef } from "react";

export default function PetalsCanvas({ triggerGust }) {
  const canvasRef = useRef(null);
  const gustRef = useRef(0);

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

    // Petal color palettes: Rose Petals & Jasmine / Mallipoo Buds
    const ROSE_COLORS = ["#E88282", "#D65A5A", "#F4A4A4", "#C94242", "#EA9E8D", "#D48C70"];
    const JASMINE_COLORS = ["#FFFDF6", "#FAF6E8", "#FFF9E6", "#F5EFE0"];

    const count = window.innerWidth < 600 ? 24 : 32;

    const createPetal = (initialY) => {
      const isJasmine = Math.random() < 0.35; // 35% jasmine buds, 65% rose petals
      return {
        isJasmine,
        x: Math.random() * width,
        y: initialY !== undefined ? initialY : -30 - Math.random() * height * 0.5,
        r: (isJasmine ? 3.5 : 5.5) + Math.random() * (isJasmine ? 4 : 8),
        vy: 0.35 + Math.random() * 0.65,
        sway: 0.5 + Math.random() * 1.2,
        phase: Math.random() * Math.PI * 2,
        speed: 0.006 + Math.random() * 0.014,
        rot: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.02,
        flip: Math.random() * Math.PI * 2,
        vFlip: 0.012 + Math.random() * 0.022,
        alpha: (isJasmine ? 0.55 : 0.4) + Math.random() * 0.25,
        color: (isJasmine ? JASMINE_COLORS : ROSE_COLORS)[
          Math.floor(Math.random() * (isJasmine ? JASMINE_COLORS : ROSE_COLORS).length)
        ]
      };
    };

    const petals = Array.from({ length: count }, () => createPetal(Math.random() * height));

    let windTime = 0;
    let animationFrameId;
    let isRunning = true;

    const drawPetal = (p) => {
      const flipFactor = Math.cos(p.flip);
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.scale(Math.max(0.2, Math.abs(flipFactor)), 1);
      ctx.globalAlpha = p.alpha * (0.5 + 0.5 * Math.abs(flipFactor));
      ctx.fillStyle = p.color;
      ctx.beginPath();

      if (p.isJasmine) {
        // Jasmine bud shape (slender curved teardrop)
        ctx.moveTo(0, -p.r);
        ctx.bezierCurveTo(p.r * 0.35, -p.r * 0.5, p.r * 0.45, p.r * 0.55, 0, p.r);
        ctx.bezierCurveTo(-p.r * 0.45, p.r * 0.55, -p.r * 0.35, -p.r * 0.5, 0, -p.r);
        ctx.fill();
        ctx.strokeStyle = "rgba(180, 160, 110, 0.35)";
        ctx.lineWidth = 0.6;
        ctx.stroke();
      } else {
        // Rose petal shape (soft heart-shaped petal)
        ctx.moveTo(0, -p.r);
        ctx.bezierCurveTo(p.r * 0.95, -p.r * 0.4, p.r * 0.75, p.r * 0.75, 0, p.r);
        ctx.bezierCurveTo(-p.r * 0.75, p.r * 0.75, -p.r * 0.95, -p.r * 0.4, 0, -p.r);
        ctx.fill();
      }

      ctx.restore();
    };

    const render = () => {
      windTime += 0.004;
      const naturalWind = Math.sin(windTime) * 0.6 + Math.sin(windTime * 2.3) * 0.3;

      if (gustRef.current > 0) {
        gustRef.current *= 0.985;
        if (gustRef.current < 0.01) gustRef.current = 0;
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.phase += p.speed;
        p.flip += p.vFlip;
        p.rot += p.vRot;

        p.y += p.vy + gustRef.current * 0.45;
        p.x += Math.sin(p.phase) * p.sway + naturalWind * 1.6 + gustRef.current * 2.4;

        if (p.y > height + 40) {
          Object.assign(p, createPetal(-25));
        }
        if (p.x < -60) p.x = width + 50;
        else if (p.x > width + 60) p.x = -50;

        drawPetal(p);
      }

      if (isRunning) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    const handleVisibility = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        if (!isRunning) {
          isRunning = true;
          cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(render);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    // Global celebration event listener
    const onCelebrate = () => {
      gustRef.current = 2.8;
      for (let i = 0; i < 12; i++) {
        petals.push(createPetal(-20 - Math.random() * 200));
      }
    };
    window.addEventListener("wedding:celebrate", onCelebrate);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("wedding:celebrate", onCelebrate);
    };
  }, []);

  useEffect(() => {
    if (triggerGust) {
      gustRef.current = 2.8;
    }
  }, [triggerGust]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        width: "100vw",
        height: "100vh"
      }}
      aria-hidden="true"
    />
  );
}
