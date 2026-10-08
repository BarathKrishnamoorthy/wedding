import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Heart, Crown, Flame } from "lucide-react";
import confetti from "canvas-confetti";
import MotesCanvas from "./MotesCanvas";
import { WEDDING_CONFIG } from "../config/weddingData";

export default function IntroEnvelope({ onOpenComplete, recipientName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFlapOpen, setIsFlapOpen] = useState(false);
  const [isCardUp, setIsCardUp] = useState(false);
  const [isRiserOver, setIsRiserOver] = useState(false);
  const [isSealGone, setIsSealGone] = useState(false);
  const [isSealPressed, setIsSealPressed] = useState(false);
  const [isIntroGone, setIsIntroGone] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const stageRef = useRef(null);
  const targetTilt = useRef({ x: 0, y: 0 });
  const currentTilt = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);

  useEffect(() => {
    // Check if already opened in this session
    const hasOpened = sessionStorage.getItem("sk_wedding_opened") === "1";
    if (hasOpened) {
      setIsIntroGone(true);
      if (onOpenComplete) onOpenComplete();
      return;
    }

    // Show skip after a brief delay
    const skipTimer = setTimeout(() => setShowSkip(true), 1200);

    // Mouse tilt tracking
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 18;
      const y = -(e.clientY / window.innerHeight - 0.5) * 14;
      targetTilt.current = { x, y };
    };

    // Device orientation tilt for mobile
    const handleDeviceOrientation = (e) => {
      if (e.gamma !== null && e.beta !== null) {
        const x = Math.max(-14, Math.min(14, e.gamma / 2.2));
        const y = Math.max(-12, Math.min(12, -(e.beta - 45) / 2.8));
        targetTilt.current = { x, y };
      }
    };

    window.addEventListener("pointermove", handleMouseMove, { passive: true });
    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleDeviceOrientation, { passive: true });
    }

    // Smooth tilt lerp loop
    const updateTilt = () => {
      currentTilt.current.x += (targetTilt.current.x - currentTilt.current.x) * 0.08;
      currentTilt.current.y += (targetTilt.current.y - currentTilt.current.y) * 0.08;
      setTilt({ x: currentTilt.current.x, y: currentTilt.current.y });
      animationFrameRef.current = requestAnimationFrame(updateTilt);
    };
    animationFrameRef.current = requestAnimationFrame(updateTilt);

    return () => {
      clearTimeout(skipTimer);
      window.removeEventListener("pointermove", handleMouseMove);
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const triggerMassCelebration = () => {
    // Fire global celebrate event
    window.dispatchEvent(new CustomEvent("wedding:celebrate"));

    // Mass Multi-Cannon Fireworks Confetti Blast
    const count = 200;
    const defaults = {
      origin: { y: 0.65 }
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    // Golden sparks & royal velvet streamers
    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ["#FFD700", "#FFF4B8", "#FFB703"]
    });
    fire(0.2, {
      spread: 60,
      colors: ["#E63946", "#9B111E", "#FFFFFF"]
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 1.2,
      colors: ["#FFD700", "#10B981", "#E63946", "#F59E0B"]
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      colors: ["#FFEAA7", "#D4AF37", "#FFFFFF"]
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
      colors: ["#FFD700", "#E63946"]
    });
  };

  const handleOpenInvitation = () => {
    if (isOpen) return;
    setIsOpen(true);

    if (navigator.vibrate) {
      try { navigator.vibrate([30, 50, 30]); } catch (e) { }
    }

    // 1. Press Seal & trigger fire
    setIsSealPressed(true);

    // 2. Seal Disappears with shockwave
    setTimeout(() => {
      setIsSealGone(true);
    }, 180);

    // 3. Flap unfolds open in 3D
    setTimeout(() => {
      setIsFlapOpen(true);
    }, 320);

    // 4. Card rises from inside envelope
    setTimeout(() => {
      setIsCardUp(true);
    }, 900);

    // 5. Card pops to foreground
    setTimeout(() => {
      setIsRiserOver(true);
    }, 1450);

    // 6. Mass Fireworks & Petals Explosion
    setTimeout(() => {
      triggerMassCelebration();
    }, 1650);

    // 7. Transition out intro screen
    setTimeout(() => {
      finishIntro();
    }, 2600);
  };

  const finishIntro = () => {
    sessionStorage.setItem("sk_wedding_opened", "1");
    setIsIntroGone(true);
    document.body.classList.remove("locked");
    if (onOpenComplete) onOpenComplete();
  };

  const handleFastForward = (e) => {
    if (e) e.stopPropagation();
    triggerMassCelebration();
    finishIntro();
  };

  if (isIntroGone) return null;

  return (
    <div
      id="intro-overlay"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "radial-gradient(100% 70% at 50% 15%, #380816 0%, #17030A 50%, #060103 100%)",
        display: "grid",
        placeItems: "center",
        perspective: "1600px",
        overflow: "hidden",
        transition: "opacity 0.85s var(--ease)",
        opacity: isIntroGone ? 0 : 1,
        pointerEvents: isIntroGone ? "none" : "auto"
      }}
      onClick={isOpen ? handleFastForward : handleOpenInvitation}
    >
      {/* Background Animated Golden Light Rays & Sparkler Motes */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 45%, rgba(255, 215, 0, 0.18) 0%, transparent 60%)",
          animation: "rayPulse 6s ease-in-out infinite alternate",
          pointerEvents: "none"
        }}
      />
      <MotesCanvas burst={isOpen} />

      {/* 3D Royal Box / Envelope Stage */}
      <div
        ref={stageRef}
        style={{
          position: "relative",
          width: "min(86vw, 360px)",
          aspectRatio: "1 / 1.42",
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilt.y.toFixed(2)}deg) rotateY(${tilt.x.toFixed(2)}deg)`,
          transition: "transform 0.1s linear"
        }}
      >
        {/* Envelope Container */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            transformStyle: "preserve-3d"
          }}
        >
          {/* Royal Velvet Back Body */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "26px",
              background: "linear-gradient(168deg, #380A16 0%, #1D040A 100%)",
              boxShadow: "0 38px 80px -20px rgba(0, 0, 0, 0.95), 0 0 0 2px rgba(255, 215, 0, 0.6), 0 0 45px rgba(255, 215, 0, 0.35)",
              border: "1px solid rgba(255, 215, 0, 0.8)"
            }}
          >
            {/* 24K Gold Kasavu Inset Border */}
            <div
              style={{
                position: "absolute",
                inset: "10px",
                border: "1px solid rgba(255, 215, 0, 0.5)",
                borderRadius: "18px"
              }}
            />
          </div>

          {/* Envelope Flap (Top triangle with Gold Mandala & Trim) */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: "46%",
              zIndex: 9,
              transformOrigin: "top center",
              transform: isFlapOpen ? "rotateX(-172deg)" : "rotateX(0deg)",
              transition: "transform 0.85s var(--ease-soft)",
              backfaceVisibility: "hidden"
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                background: isFlapOpen
                  ? "linear-gradient(180deg, #24060E, #150308)"
                  : "linear-gradient(180deg, #4A0E1F 0%, #290610 100%)",
                borderTop: "2px solid rgba(255, 215, 0, 0.8)",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.8)",
                display: "grid",
                placeItems: "center"
              }}
            >
              {/* Gold Filigree on Flap Tip */}
              <div
                style={{
                  position: "absolute",
                  bottom: "14%",
                  color: "#FFD700",
                  opacity: 0.8,
                  fontSize: "13px"
                }}
              >
                ✦ ॐ ✦
              </div>
            </div>
          </div>

          {/* Riser Card (The Royal Wedding Card sliding out) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: isRiserOver ? 16 : 10,
              overflow: "hidden",
              borderRadius: "26px",
              pointerEvents: "none"
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "5%",
                right: "5%",
                top: "5%",
                bottom: "5%",
                borderRadius: "20px",
                background: "linear-gradient(180deg, #2D0914 0%, #180309 100%)",
                border: "2px solid var(--gold)",
                boxShadow: "0 30px 65px -15px rgba(0, 0, 0, 0.95), 0 0 35px rgba(255, 215, 0, 0.4)",
                transform: isCardUp ? "translateY(0%)" : "translateY(92%)",
                opacity: isCardUp ? 1 : 0,
                transition: "transform 1.05s var(--ease), opacity 0.3s ease",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden"
              }}
            >
              {/* Couple Photo on Card */}
              <div style={{ flex: "1 1 auto", overflow: "hidden", position: "relative" }}>
                <img
                  src={WEDDING_CONFIG.photos.hero}
                  alt={`${WEDDING_CONFIG.groom} & ${WEDDING_CONFIG.bride}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "50% 14%"
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(24, 3, 9, 0.9) 0%, transparent 55%)"
                  }}
                />
              </div>

              {/* Riser Card Text */}
              <div
                style={{
                  padding: "14px 16px 18px",
                  textAlign: "center",
                  background: "linear-gradient(180deg, #280712 0%, #150207 100%)",
                  borderTop: "1px solid var(--line)"
                }}
              >
                {recipientName && (
                  <p
                    style={{
                      fontSize: "13.5px",
                      color: "var(--gold-light)",
                      fontStyle: "italic",
                      marginBottom: "3px",
                      fontFamily: "'Fraunces', Georgia, serif"
                    }}
                  >
                    Honored Guest: {recipientName}
                  </p>
                )}

                <h3
                  className="font-display gold-text"
                  style={{
                    fontSize: "24px",
                    fontWeight: "900",
                    margin: "2px 0 4px"
                  }}
                >
                  {WEDDING_CONFIG.groom} &amp; {WEDDING_CONFIG.bride}
                </h3>

                <p
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--gold-light)",
                    fontWeight: "700"
                  }}
                >
                  22 November 2026 · Chennai
                </p>
              </div>
            </div>
          </div>

          {/* Envelope Pocket (Front fold with Velvet Texture & Gold Trim) */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              top: "42%",
              zIndex: 11,
              borderRadius: "0 0 26px 26px",
              background: "linear-gradient(190deg, #3A0A17 0%, #1F040C 100%)",
              boxShadow: "0 -18px 36px -14px rgba(0, 0, 0, 0.8) inset, 0 0 0 1px rgba(255, 215, 0, 0.4)",
              borderTop: "1px solid rgba(255, 215, 0, 0.5)",
              pointerEvents: "none"
            }}
          >
            {/* Gold Geometric Lace Pattern */}
            <div
              style={{
                position: "absolute",
                inset: "10px",
                border: "1px solid rgba(255, 215, 0, 0.3)",
                borderRadius: "0 0 18px 18px"
              }}
            />

            {/* Tamil Wedding Invitation Sub-Tag */}
            <div
              style={{
                position: "absolute",
                bottom: "16px",
                left: 0,
                right: 0,
                textAlign: "center",
                fontFamily: "'Cinzel Decorative', Georgia, serif",
                fontSize: "11px",
                letterSpacing: "0.24em",
                color: "#FFD700",
                textTransform: "uppercase",
                opacity: 0.9
              }}
            >
              ✦ திருமண அழைப்பிதழ் ✦
            </div>
          </div>

          {/* Personalized Golden Royal Ribbon Across Envelope */}
          {recipientName && !isOpen && (
            <div
              style={{
                position: "absolute",
                left: "-5%",
                right: "-5%",
                bottom: "22%",
                zIndex: 13,
                textAlign: "center",
                background: "linear-gradient(90deg, transparent 0%, #B8860B 15%, #FFD700 50%, #B8860B 85%, transparent 100%)",
                padding: "8px 0",
                boxShadow: "0 6px 16px rgba(0, 0, 0, 0.6)",
                borderTop: "1px solid #FFF5C2",
                borderBottom: "1px solid #9A7B1C",
                transform: "rotate(-2deg)"
              }}
            >
              <div
                style={{
                  fontFamily: "'Cinzel Decorative', 'Fraunces', serif",
                  fontSize: "13px",
                  fontWeight: "900",
                  letterSpacing: "0.14em",
                  color: "#24050D",
                  textTransform: "uppercase",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px"
                }}
              >
                <Crown size={14} color="#24050D" />
                <span>Special Invitation for {recipientName}</span>
                <Crown size={14} color="#24050D" />
              </div>
            </div>
          )}

          {/* 3D Mass Royal Wax Seal Button */}
          {!isSealGone && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenInvitation();
              }}
              aria-label="Break royal seal and enter"
              style={{
                position: "absolute",
                left: "50%",
                top: "43%",
                zIndex: 15,
                width: "150px",
                height: "150px",
                display: "grid",
                placeItems: "center",
                transform: `translate(-50%, -50%) translateZ(32px) ${isSealPressed ? "scale(0.9)" : "scale(1)"}`,
                transition: "transform 0.25s var(--ease), opacity 0.3s ease",
                cursor: "pointer"
              }}
            >
              {/* Multi-layered Pulsing Shockwave Rings */}
              <span className="mass-seal-pulse p1" />
              <span className="mass-seal-pulse p2" />
              <span className="mass-seal-pulse p3" />

              {/* Wax Seal Medallion */}
              <div
                style={{
                  position: "relative",
                  width: "116px",
                  height: "116px",
                  display: "block",
                  filter: "drop-shadow(0 14px 22px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 30px rgba(255, 215, 0, 0.75))"
                }}
              >
                <img
                  src={WEDDING_CONFIG.photos.seal}
                  alt="Siva & Kani Royal Wax Seal"
                  style={{ width: "100%", height: "100%", display: "block" }}
                />

                {/* Glare Beam Sweep */}
                <div className="mass-seal-shine" />
              </div>
            </button>
          )}
        </div>

        {/* Break Seal Action Cue */}
        {!isOpen && (
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: "-54px",
              textAlign: "center",
              fontSize: "12px",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#FFD700",
              fontWeight: "800",
              textShadow: "0 0 14px rgba(255, 215, 0, 0.8)",
              animation: "breatheMassHint 2.2s ease-in-out infinite",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px"
            }}
          >
            <Flame size={15} color="#FFD700" />
            <span>Tap to Enter</span>
            <Flame size={15} color="#FFD700" />
          </div>
        )}
      </div>

      {/* Skip Button */}
      {/* {showSkip && !isOpen && (
        <button
          type="button"
          onClick={handleFastForward}
          style={{
            position: "absolute",
            right: "24px",
            bottom: "calc(22px + env(safe-area-inset-bottom, 0px))",
            fontSize: "11px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#FFD700",
            fontWeight: "700",
            padding: "9px 20px",
            border: "1px solid rgba(255, 215, 0, 0.5)",
            borderRadius: "100px",
            background: "rgba(35, 10, 20, 0.85)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 0 15px rgba(255, 215, 0, 0.3)",
            opacity: 0.9,
            transition: "all 0.2s"
          }}
        >
          Skip Intro ⚡
        </button>
      )} */}

      {/* Keyframe Styles */}
      <style>{`
        @keyframes rayPulse {
          0% { opacity: 0.4; transform: scale(0.92); }
          100% { opacity: 0.9; transform: scale(1.1); }
        }
        .mass-seal-pulse {
          position: absolute;
          width: 125px;
          height: 125px;
          border-radius: 50%;
          pointer-events: none;
          border: 1.5px solid rgba(255, 215, 0, 0.8);
          opacity: 0;
          animation: massSealPulse 3s var(--ease) infinite;
        }
        .mass-seal-pulse.p2 {
          animation-delay: 1s;
          border-color: rgba(230, 57, 70, 0.8);
        }
        .mass-seal-pulse.p3 {
          animation-delay: 2s;
          border-color: rgba(255, 245, 180, 0.8);
        }
        @keyframes massSealPulse {
          0% { transform: scale(0.85); opacity: 0.9; }
          70% { opacity: 0; }
          100% { transform: scale(1.7); opacity: 0; }
        }
        .mass-seal-shine {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(115deg, transparent 32%, rgba(255, 245, 200, 0.6) 48%, rgba(255, 255, 255, 0.4) 54%, transparent 68%);
          background-size: 300% 100%;
          background-repeat: no-repeat;
          border-radius: 50%;
          animation: massSealGlare 4.5s var(--ease) infinite;
        }
        @keyframes massSealGlare {
          0% { background-position: 150% 50%; }
          50%, 100% { background-position: -150% 50%; }
        }
        @keyframes breatheMassHint {
          0%, 100% { opacity: 0.5; transform: scale(0.96); }
          50% { opacity: 1; transform: scale(1.04); }
        }
      `}</style>
    </div>
  );
}
