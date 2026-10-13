import React from "react";
import { Palette, Type, RotateCcw, Share2, Sparkles } from "lucide-react";

export default function Navbar({ onOpenTheme, onOpenShare, onReplayIntro, fontSize, onToggleFontSize }) {
  return (
    <header
      id="top-navbar"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        padding: "calc(12px + env(safe-area-inset-top, 0px)) 16px 12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        pointerEvents: "none"
      }}
    >
      {/* Brand Monogram */}
      <div
        className="chip"
        style={{
          pointerEvents: "auto",
          fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif",
          fontWeight: "700",
          fontSize: "13px",
          letterSpacing: "0.15em",
          background: "var(--paper-trans)",
          border: "1px solid var(--line)"
        }}
      >
        <Sparkles size={12} color="var(--gold)" />
        <span className="gold-text">S &amp; K</span>
      </div>

      {/* Action Chips */}
      <div style={{ display: "flex", gap: "8px", pointerEvents: "auto" }}>
        {/* Theme Switcher */}
        {/* <button
          type="button"
          onClick={onOpenTheme}
          className="chip"
          aria-label="Change Color Theme"
          title="Change Color Theme"
        >
          <Palette size={14} color="var(--primary)" />
          <span style={{ display: "none" }}>Theme</span>
        </button> */}

        {/* Font Scaler */}
        {/* <button
          type="button"
          onClick={onToggleFontSize}
          className="chip"
          aria-label="Adjust Text Size"
          title="Adjust Text Size"
        >
          <Type size={14} color="var(--primary)" />
          <span style={{ fontSize: "11px", fontWeight: "700" }}>{fontSize > 1 ? "A" : "A+"}</span>
        </button> */}

        {/* Share Button */}
        <button
          type="button"
          onClick={onOpenShare}
          className="chip"
          aria-label="Share Invitation"
          title="Share Invitation"
        >
          <Share2 size={13} color="var(--primary)" />
        </button>

        {/* Replay Intro Envelope */}
        <button
          type="button"
          onClick={onReplayIntro}
          className="chip"
          aria-label="Replay Envelope Opening"
          title="Replay Envelope Opening"
        >
          <RotateCcw size={13} color="var(--primary)" />
        </button>
      </div>
    </header>
  );
}
