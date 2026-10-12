import React from "react";
import { Sparkles, Heart, Crown, Flame } from "lucide-react";
import { WEDDING_CONFIG } from "../config/weddingData";

export default function InvitationCard() {
  return (
    <section id="invite" style={{ padding: "10px 0 70px" }}>
      <div className="wrap">
        <div className="kasavu-card text-center" style={{ position: "relative" }}>
          {/* Corner Filigree Ornaments */}
          <div className="corner-ornament corner-tl">✦</div>
          <div className="corner-ornament corner-tr">✦</div>
          <div className="corner-ornament corner-bl">✦</div>
          <div className="corner-ornament corner-br">✦</div>

          {/* Sacred Mantra Header */}
          <div
            style={{
              fontSize: "14px",
              letterSpacing: "0.22em",
              color: "var(--gold)",
              fontFamily: "'Cinzel Decorative', Georgia, serif",
              textTransform: "uppercase",
              marginBottom: "14px",
              textShadow: "0 0 12px rgba(255, 215, 0, 0.5)"
            }}
          >
            ॐ || Sri Ganeshaya Namaha || ॐ
          </div>

          <p
            style={{
              fontSize: "clamp(15px, 4.4vw, 18px)",
              color: "var(--ink-soft)",
              lineHeight: "1.65",
              margin: "0 0 18px"
            }}
          >
            Together with our families and with the divine blessings of Almighty,<br />
            we cordially invite you to celebrate the sacred wedding ceremony of
          </p>

          {/* Couple Names */}
          <h2
            className="mass-title"
            style={{
              fontSize: "clamp(36px, 9.5vw, 52px)",
              margin: "10px 0 18px",
              lineHeight: "1.1"
            }}
          >
            {WEDDING_CONFIG.groom} &amp; {WEDDING_CONFIG.bride}
          </h2>

          {/* Muhurtham Box */}
          <div
            style={{
              background: "linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(230, 57, 70, 0.15))",
              border: "1px solid var(--line-strong)",
              borderRadius: "18px",
              padding: "16px 20px",
              maxWidth: "460px",
              margin: "0 auto 20px"
            }}
          >
            <div
              style={{
                fontSize: "clamp(16px, 4.6vw, 19px)",
                color: "var(--gold)",
                fontWeight: "700",
                textShadow: "0 0 10px rgba(255, 215, 0, 0.4)"
              }}
            >
              {WEDDING_CONFIG.weddingDateFormatted}
            </div>
            <div
              style={{
                fontSize: "14.5px",
                color: "var(--ink)",
                fontWeight: "600",
                marginTop: "4px"
              }}
            >
              {WEDDING_CONFIG.muhurthamWindow}
            </div>
          </div>

          <div className="sep" />

          {/* Venue Detail */}
          <div style={{ marginTop: "6px" }}>
            <span
              style={{
                fontSize: "11px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--gold)",
                fontWeight: "800",
                display: "block",
                marginBottom: "6px"
              }}
            >
              Wedding Mandapam
            </span>
            <strong
              className="font-serif"
              style={{
                display: "block",
                fontSize: "clamp(20px, 5.5vw, 24px)",
                color: "var(--gold-light)",
                marginBottom: "6px",
                textShadow: "0 0 14px rgba(255, 215, 0, 0.3)"
              }}
            >
              {WEDDING_CONFIG.weddingVenue.name}
            </strong>
            <span
              style={{
                fontSize: "14.5px",
                color: "var(--ink-soft)",
                lineHeight: "1.6",
                display: "block",
                maxWidth: "440px",
                margin: "0 auto"
              }}
            >
              {WEDDING_CONFIG.weddingVenue.address}
            </span>
          </div>

          <div className="sep" />

          {/* Family Lineage Grid */}
          {/* <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
              marginTop: "8px"
            }}
          >
            <div
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                padding: "18px 16px",
                borderRadius: "18px",
                border: "1px solid var(--line)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.4)"
              }}
            >
              <span
                style={{
                  display: "block",
                  fontSize: "11px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  fontWeight: "800",
                  marginBottom: "8px"
                }}
              >
                ✦ Groom's Side ✦
              </span>
              <b
                className="font-serif"
                style={{
                  display: "block",
                  fontSize: "18px",
                  lineHeight: "1.4",
                  color: "var(--ink)"
                }}
              >
                {WEDDING_CONFIG.family.groom.parents}
              </b>
              <em
                style={{
                  display: "block",
                  fontStyle: "normal",
                  fontSize: "13px",
                  color: "var(--ink-muted)",
                  marginTop: "6px"
                }}
              >
                {WEDDING_CONFIG.family.groom.native}
              </em>
            </div>

            <div
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                padding: "18px 16px",
                borderRadius: "18px",
                border: "1px solid var(--line)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.4)"
              }}
            >
              <span
                style={{
                  display: "block",
                  fontSize: "11px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  fontWeight: "800",
                  marginBottom: "8px"
                }}
              >
                ✦ Bride's Side ✦
              </span>
              <b
                className="font-serif"
                style={{
                  display: "block",
                  fontSize: "18px",
                  lineHeight: "1.4",
                  color: "var(--ink)"
                }}
              >
                {WEDDING_CONFIG.family.bride.parents}
              </b>
              <em
                style={{
                  display: "block",
                  fontStyle: "normal",
                  fontSize: "13px",
                  color: "var(--ink-muted)",
                  marginTop: "6px"
                }}
              >
                {WEDDING_CONFIG.family.bride.native}
              </em>
            </div>
          </div> */}

          {/* <div className="sep" /> */}

          {/* Compliments */}
          {/* <div>
            <span
              style={{
                display: "block",
                fontSize: "11.5px",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "var(--gold)",
                fontWeight: "800",
                marginBottom: "8px"
              }}
            >
              With Best Compliments From
            </span>
            <b
              className="font-serif"
              style={{
                display: "block",
                fontSize: "16px",
                color: "var(--ink-soft)",
                lineHeight: "1.6"
              }}
            >
              {WEDDING_CONFIG.family.compliments}
            </b>
          </div> */}
        </div>
      </div>
    </section>
  );
}
