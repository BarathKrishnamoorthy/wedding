import React, { useEffect, useState } from "react";
import { Sparkles, Heart, Crown, Flame, Zap } from "lucide-react";
import confetti from "canvas-confetti";
import { WEDDING_CONFIG } from "../config/weddingData";

export default function HeroSection({ recipientName }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxOffset = Math.max(-25, Math.min(25, scrollY * 0.06));

  const handleHeroFireworks = (e) => {
    e.stopPropagation();
    window.dispatchEvent(new CustomEvent("wedding:celebrate"));

    // Multi-angle fireworks burst
    const end = Date.now() + 1000;
    const colors = ["#FFD700", "#E63946", "#FFF4B8", "#10B981", "#F59E0B"];

    (function frame() {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: colors
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <section
      id="hero"
      style={{
        padding: "clamp(70px, 14vh, 120px) 0 40px",
        position: "relative"
      }}
    >
      <div className="wrap">
        {/* Personalized VIP Guest Greeting Banner */}
        {recipientName && (
          <div
            style={{
              textAlign: "center",
              marginBottom: "20px",
              padding: "10px 20px",
              borderRadius: "100px",
              background: "linear-gradient(90deg, rgba(255, 215, 0, 0.15), rgba(230, 57, 70, 0.25), rgba(255, 215, 0, 0.15))",
              border: "1px solid var(--line-strong)",
              boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              margin: "0 auto 24px",
              width: "100%"
            }}
          >
            <Crown size={16} color="var(--gold)" />
            <span
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontStyle: "italic",
                fontSize: "clamp(16px, 4.4vw, 20px)",
                color: "var(--gold-light)",
                fontWeight: "600"
              }}
            >
              Honored Guest: {recipientName}
            </span>
            <Crown size={16} color="var(--gold)" />
          </div>
        )}

        {/* Ambient Spotlight Behind Photo Card */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "5%",
            transform: "translateX(-50%)",
            width: "140%",
            aspectRatio: "1 / 1",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255, 215, 0, 0.28) 0%, rgba(230, 57, 70, 0.18) 45%, transparent 70%)",
            filter: "blur(40px)",
            pointerEvents: "none",
            zIndex: -1
          }}
        />

        {/* 3D Mass Photo Card with Royal Gold Framing & Diya Glow */}
        <div
          style={{
            position: "relative",
            borderRadius: "28px",
            overflow: "hidden",
            background: "#1A050B",
            boxShadow: "0 35px 80px -15px rgba(0, 0, 0, 0.95), 0 0 0 3px var(--gold), 0 0 45px rgba(255, 215, 0, 0.5)",
            maxWidth: "480px",
            margin: "0 auto",
            aspectRatio: "3 / 4",
            border: "2px solid rgba(255, 255, 255, 0.4)"
          }}
        >
          <img
            src={WEDDING_CONFIG.photos.hero}
            alt={`${WEDDING_CONFIG.groom} and ${WEDDING_CONFIG.bride}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "50% 10%",
              transform: `scale(1.06) translateY(${parallaxOffset}px)`,
              transition: "transform 0.1s linear"
            }}
          />

          {/* Vignette & Gold Sheen Overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(14, 4, 7, 0.95) 0%, rgba(14, 4, 7, 0.2) 40%, transparent 70%)",
              pointerEvents: "none"
            }}
          />

          {/* Mass Hashtag Badge on Photo */}
          <div
            style={{
              position: "absolute",
              bottom: "18px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "linear-gradient(135deg, rgba(255, 215, 0, 0.95) 0%, rgba(229, 169, 60, 0.95) 100%)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.6), 0 0 20px rgba(255, 215, 0, 0.7)",
              padding: "7px 22px",
              borderRadius: "100px",
              fontSize: "13px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontWeight: "900",
              color: "#1A050B",
              border: "1px solid #FFFFFF",
              whiteSpace: "nowrap"
            }}
          >
            {WEDDING_CONFIG.tagline}
          </div>
        </div>

        {/* Hero Text & Mass Typography */}
        <div style={{ textAlign: "center", paddingTop: "36px" }}>
          {/* Tamil Calligraphy Invocation */}
          <div
            style={{
              fontFamily: "'Cinzel Decorative', Georgia, serif",
              fontSize: "clamp(13px, 3.8vw, 15px)",
              letterSpacing: "0.3em",
              color: "var(--gold-light)",
              textTransform: "uppercase",
              marginBottom: "8px",
              textShadow: "0 0 14px rgba(255, 215, 0, 0.6)"
            }}
          >
            ✦ Sri Maha Ganapathi Blessings ✦
          </div>

          <div className="eyebrow">
            <Sparkles size={14} color="var(--gold)" />
            <span>The Grand Royal Union</span>
            <Sparkles size={14} color="var(--gold)" />
          </div>

          {/* Couple Names in Mass 3D Gold */}
          <h1
            className="mass-title"
            style={{
              fontSize: "clamp(48px, 13vw, 78px)",
              lineHeight: "1.02",
              margin: "12px 0 16px"
            }}
          >
            <span>{WEDDING_CONFIG.groom}</span>
            <span
              style={{
                display: "block",
                fontSize: "0.38em",
                fontStyle: "italic",
                color: "#E63946",
                margin: "4px 0",
                fontFamily: "'Playfair Display', serif",
                textShadow: "0 0 20px rgba(230, 57, 70, 0.8)"
              }}
            >
              &amp;
            </span>
            <span>{WEDDING_CONFIG.bride}</span>
          </h1>

          {/* Date and Location with Glowing Badge */}
          <div
            className="font-serif"
            style={{
              fontSize: "clamp(20px, 5.5vw, 26px)",
              color: "var(--gold)",
              fontWeight: "600",
              textShadow: "0 0 18px rgba(255, 215, 0, 0.5)",
              marginTop: "8px"
            }}
          >
            {WEDDING_CONFIG.weddingDateFormatted}
          </div>

          <div
            style={{
              fontSize: "13px",
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: "var(--ink-soft)",
              fontWeight: "700",
              marginTop: "8px"
            }}
          >
            {WEDDING_CONFIG.city}
          </div>

          {/* Interactive Fireworks Action Button */}
          <div style={{ marginTop: "28px" }}>
            <button
              type="button"
              onClick={handleHeroFireworks}
              className="btn btn-crimson"
              aria-label="Celebrate with fireworks"
            >
              <Zap size={16} />
              <span>Celebrate with Fireworks 💥</span>
            </button>
          </div>

          {/* Animated Scroll Cue */}
          <div
            style={{
              width: "2px",
              height: "52px",
              margin: "34px auto 0",
              background: "linear-gradient(var(--gold), transparent)",
              boxShadow: "0 0 12px var(--gold)",
              animation: "scrollCuePulse 2.2s ease-in-out infinite"
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes scrollCuePulse {
          0%, 100% { opacity: 0.3; transform: scaleY(0.4); transform-origin: top; }
          50% { opacity: 1; transform: scaleY(1); }
        }
      `}</style>
    </section>
  );
}
