import React from "react";
import { MapPin, Navigation, Copy, Sparkles, Clock, CalendarDays, Shirt, PartyPopper } from "lucide-react";
import { WEDDING_CONFIG } from "../config/weddingData";

export default function ScheduleSection({ onToast }) {
  const handleCopyAddress = (address, name) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${name}, ${address}`).then(() => {
        if (onToast) onToast("Address copied to clipboard!");
      });
    }
  };

  return (
    <section id="schedule" style={{ padding: "0 0 70px" }}>
      <div className="wrap">
        <div className="eyebrow">
          <PartyPopper size={14} color="var(--gold)" />
          <span>11 November 2026</span>
          <PartyPopper size={14} color="var(--gold)" />
        </div>
        <h2 className="h2-title">The Royal Celebrations</h2>

        {/* Event 1: Sacred Muhurtham */}
        <article
          className="kasavu-card"
          style={{
            padding: "32px 26px",
            marginBottom: "24px",
            display: "grid",
            gridTemplateColumns: "72px 1fr",
            columnGap: "20px",
            rowGap: "22px",
            alignItems: "start",
            border: "1px solid var(--line-strong)",
            boxShadow: "var(--shadow-md)"
          }}
        >
          {/* Date Stamp */}
          <div
            style={{
              textAlign: "center",
              borderRadius: "18px",
              padding: "14px 0 12px",
              background: "linear-gradient(180deg, rgba(255, 215, 0, 0.25) 0%, rgba(255, 215, 0, 0.08) 100%)",
              border: "1px solid var(--gold)",
              boxShadow: "0 0 18px rgba(255, 215, 0, 0.3)"
            }}
          >
            <b
              className="mass-title"
              style={{
                display: "block",
                fontSize: "34px",
                lineHeight: "1"
              }}
            >
              11
            </b>
            <span
              style={{
                fontSize: "10.5px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--gold)",
                fontWeight: "800",
                display: "block",
                marginTop: "4px"
              }}
            >
              Wed · AM
            </span>
          </div>

          {/* Details */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "10.5px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#1A050B",
                background: "var(--gold-gradient)",
                padding: "3px 12px",
                borderRadius: "100px",
                fontWeight: "900",
                marginBottom: "8px"
              }}
            >
              <Sparkles size={11} /> Sacred Vedic Muhurtham
            </div>

            <h3
              className="font-serif"
              style={{
                fontSize: "clamp(26px, 7vw, 32px)",
                fontStyle: "italic",
                color: "var(--gold-light)",
                textShadow: "0 0 12px rgba(255, 215, 0, 0.3)"
              }}
            >
              The Mangalyam Ceremony
            </h3>

            <div
              style={{
                fontSize: "14.5px",
                color: "var(--gold)",
                fontWeight: "700",
                marginTop: "8px",
                display: "flex",
                alignItems: "center",
                gap: "6px"
              }}
            >
              <Clock size={15} color="var(--gold)" />
              <span>Auspicious Hours: 9:30 am – 10:30 am</span>
            </div>

            <div style={{ marginTop: "12px", color: "var(--ink-soft)", fontSize: "14.5px", lineHeight: "1.6" }}>
              <strong style={{ display: "block", color: "var(--ink)", fontSize: "17px", marginBottom: "2px" }}>
                {WEDDING_CONFIG.weddingVenue.name}
              </strong>
              {WEDDING_CONFIG.weddingVenue.address}
            </div>

            {/* Dress Code Tag */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "12px",
                color: "var(--gold-light)",
                background: "rgba(255, 215, 0, 0.12)",
                padding: "4px 12px",
                borderRadius: "8px",
                border: "1px dashed var(--line)",
                marginTop: "12px"
              }}
            >
              <Shirt size={13} color="var(--gold)" />
              <span>Dress Code: Traditional Silk &amp; Pattu Veshti</span>
            </div>
          </div>

          {/* Actions */}
          <div style={{ gridColumn: "1 / -1", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <a
              href={WEDDING_CONFIG.weddingVenue.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-solid"
              style={{ padding: "14px 10px", fontSize: "12px" }}
            >
              <Navigation size={15} />
              <span>Open in Maps</span>
            </a>

            <button
              type="button"
              onClick={() => handleCopyAddress(WEDDING_CONFIG.weddingVenue.address, WEDDING_CONFIG.weddingVenue.name)}
              className="btn btn-ghost"
              style={{ padding: "14px 10px", fontSize: "12px" }}
            >
              <Copy size={15} />
              <span>Copy Address</span>
            </button>
          </div>
        </article>

        {/* Animated Connecting Dotted Line with Gold Agni */}
        <div
          style={{
            position: "relative",
            height: "48px",
            margin: "-10px 0 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div
            style={{
              width: "2px",
              height: "100%",
              backgroundImage: "linear-gradient(var(--gold) 45%, transparent 0%)",
              backgroundSize: "2px 10px",
              boxShadow: "0 0 10px var(--gold)"
            }}
          />
        </div>

        {/* Event 2: Grand Royal Reception (Mass Highlight Card) */}
        <article
          className="kasavu-card"
          style={{
            position: "relative",
            overflow: "hidden",
            padding: "36px 26px 32px",
            background: "linear-gradient(160deg, #3D0C1B 0%, #20040D 50%, #100206 100%)",
            border: "2px solid var(--gold)",
            boxShadow: "0 30px 65px -15px rgba(230, 57, 70, 0.4), 0 0 40px rgba(255, 215, 0, 0.35)",
            display: "grid",
            gridTemplateColumns: "72px 1fr",
            columnGap: "20px",
            rowGap: "22px",
            alignItems: "start"
          }}
        >
          {/* Shimmer sweep overlay */}
          <div className="reception-sheen" />

          {/* Date Stamp */}
          <div
            style={{
              textAlign: "center",
              borderRadius: "18px",
              padding: "14px 0 12px",
              background: "linear-gradient(180deg, rgba(230, 57, 70, 0.4) 0%, rgba(230, 57, 70, 0.1) 100%)",
              border: "1px solid var(--accent)",
              boxShadow: "0 0 18px rgba(230, 57, 70, 0.4)"
            }}
          >
            <b
              className="mass-title"
              style={{
                display: "block",
                fontSize: "34px",
                lineHeight: "1",
                color: "#FFFFFF"
              }}
            >
              11
            </b>
            <span
              style={{
                fontSize: "10.5px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--gold-light)",
                fontWeight: "800",
                display: "block",
                marginTop: "4px"
              }}
            >
              Wed · AM
            </span>
          </div>

          {/* Details */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "10.5px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#FFFDF9",
                background: "linear-gradient(90deg, #E63946, #9B111E)",
                padding: "4px 14px",
                borderRadius: "100px",
                fontWeight: "900",
                marginBottom: "8px",
                boxShadow: "0 0 15px rgba(230, 57, 70, 0.6)"
              }}
            >
              <Sparkles size={11} /> Grand Gala Dinner &amp; Music
            </div>

            <h3
              className="font-serif"
              style={{
                fontSize: "clamp(28px, 7.5vw, 36px)",
                fontStyle: "italic",
                color: "var(--gold)",
                textShadow: "0 0 16px rgba(255, 215, 0, 0.5)"
              }}
            >
              The Royal Reception
            </h3>

            <div
              style={{
                fontSize: "14.5px",
                color: "var(--gold-light)",
                fontWeight: "700",
                marginTop: "8px",
                display: "flex",
                alignItems: "center",
                gap: "6px"
              }}
            >
              <Clock size={15} color="var(--gold)" />
              <span>Evening: 6:30 pm onwards</span>
            </div>

            <div style={{ marginTop: "12px", color: "var(--ink-soft)", fontSize: "14.5px", lineHeight: "1.6" }}>
              <strong style={{ display: "block", color: "var(--ink)", fontSize: "17px", marginBottom: "2px" }}>
                {WEDDING_CONFIG.receptionVenue.name}
              </strong>
              {WEDDING_CONFIG.receptionVenue.address}
            </div>

            {/* Dress Code Tag */}
            {/* <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "12px",
                color: "var(--gold-light)",
                background: "rgba(230, 57, 70, 0.18)",
                padding: "4px 12px",
                borderRadius: "8px",
                border: "1px dashed var(--accent)",
                marginTop: "12px"
              }}
            >
              <Shirt size={13} color="var(--gold)" />
              <span>Dress Code: Royal Glamour &amp; Evening Silks</span>
            </div> */}
          </div>

          {/* Actions */}
          <div style={{ gridColumn: "1 / -1", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <a
              href={WEDDING_CONFIG.receptionVenue.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-crimson"
              style={{ padding: "14px 10px", fontSize: "12px" }}
            >
              <Navigation size={15} />
              <span>Open in Maps</span>
            </a>

            <button
              type="button"
              onClick={() => handleCopyAddress(WEDDING_CONFIG.receptionVenue.address, WEDDING_CONFIG.receptionVenue.name)}
              className="btn btn-ghost"
              style={{ padding: "14px 10px", fontSize: "12px" }}
            >
              <Copy size={15} />
              <span>Copy Address</span>
            </button>
          </div>
        </article>
      </div>

      <style>{`
        .reception-sheen {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(108deg, transparent 25%, rgba(255, 215, 0, 0.45) 48%, transparent 68%);
          transform: translateX(-120%);
          animation: massSheen 5.5s var(--ease) infinite;
        }
        @keyframes massSheen {
          0% { transform: translateX(-120%); }
          45%, 100% { transform: translateX(120%); }
        }
      `}</style>
    </section>
  );
}
