import React, { useEffect, useState } from "react";
import { Navigation, Heart, Send } from "lucide-react";
import { WEDDING_CONFIG } from "../config/weddingData";

export default function BottomBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [barState, setBarState] = useState("directions"); // "directions" | "rsvp"

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      // Show after scrolling past 300px
      if (scrollY > 320) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Check current section
      const rsvpEl = document.getElementById("rsvp");
      if (rsvpEl) {
        const rect = rsvpEl.getBoundingClientRect();
        if (rect.top <= vh * 0.8 && rect.bottom >= 0) {
          setBarState("rsvp");
          return;
        }
      }
      setBarState("directions");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      id="bottom-bar"
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 60,
        padding: "12px 20px calc(12px + env(safe-area-inset-bottom, 0px))",
        background: "linear-gradient(to top, var(--bg) 65%, transparent)",
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        animation: "slideUpBar 0.35s var(--ease)"
      }}
    >
      <div
        style={{
          maxWidth: "520px",
          width: "100%",
          display: "flex",
          gap: "10px",
          pointerEvents: "auto"
        }}
      >
        {barState === "directions" ? (
          <a
            href={WEDDING_CONFIG.weddingVenue.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-solid"
            style={{ flex: 1, padding: "14px 20px", fontSize: "12px" }}
          >
            <Navigation size={15} />
            <span>Directions to Venue</span>
          </a>
        ) : (
          <a
            href="#rsvp"
            className="btn btn-accent"
            style={{ flex: 1, padding: "14px 20px", fontSize: "12px" }}
          >
            <Send size={15} />
            <span>Send RSVP Reply</span>
          </a>
        )}
      </div>

      <style>{`
        @keyframes slideUpBar {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
