import React from "react";
import { Share2, Heart, Sparkles, UserPlus } from "lucide-react";
import { WEDDING_CONFIG } from "../config/weddingData";

export default function ClosingSection({ onOpenShare }) {
  return (
    <section id="closing" style={{ padding: "20px 0 calc(140px + env(safe-area-inset-bottom, 0px))", textAlign: "center" }}>
      <div className="wrap">
        <div className="eyebrow">With Boundless Love</div>

        {/* Hashtag */}
        <div
          className="font-serif gold-text"
          style={{
            fontSize: "clamp(28px, 7.5vw, 38px)",
            fontStyle: "italic",
            fontWeight: "700",
            margin: "12px 0 20px"
          }}
        >
          {WEDDING_CONFIG.tagline}
        </div>

        <p
          style={{
            fontSize: "clamp(15px, 4.2vw, 17px)",
            color: "var(--ink-soft)",
            maxWidth: "40ch",
            margin: "0 auto 28px",
            lineHeight: "1.7"
          }}
        >
          We have everything we need — except the laughter, blessings, and warm smiles of the people we love, all under one roof.
          Come, bless us, and make our celebration complete.
        </p>

        {/* Share Invitation Action */}
        <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={onOpenShare}
            className="btn btn-gold"
            style={{ padding: "15px 32px" }}
          >
            <Share2 size={16} />
            <span>Share Invitation</span>
          </button>
        </div>

        <div className="sep" style={{ marginTop: "48px" }} />

        <div style={{ fontSize: "12px", color: "var(--ink-muted)", marginTop: "20px", letterSpacing: "0.08em" }}>
          Handcrafted with love for {WEDDING_CONFIG.groom} &amp; {WEDDING_CONFIG.bride}
        </div>

        {/* Powered By RB Technologies */}
        <div style={{
          marginTop: "36px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px"
        }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0.18) 100%)",
            border: "1px solid rgba(212,175,55,0.3)",
            borderRadius: "50px",
            padding: "8px 22px",
            backdropFilter: "blur(12px)",
            boxShadow: "0 4px 20px rgba(212,175,55,0.15), inset 0 1px 0 rgba(255,255,255,0.08)"
          }}>
            <span style={{
              fontSize: "9px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--ink-muted)",
              fontWeight: "500"
            }}>Powered by</span>
            <span style={{
              fontSize: "13px",
              fontWeight: "700",
              letterSpacing: "0.06em",
              background: "linear-gradient(90deg, #D4AF37 0%, #FFE066 50%, #D4AF37 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontFamily: "'Playfair Display', serif"
            }}>RB Technologies</span>
          </div>
        </div>
      </div>
    </section>
  );
}
