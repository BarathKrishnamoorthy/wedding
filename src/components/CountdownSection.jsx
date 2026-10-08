import React, { useState, useEffect } from "react";
import { Calendar, Clock, Check, Sparkles, Hourglass } from "lucide-react";
import { WEDDING_CONFIG } from "../config/weddingData";

export default function CountdownSection({ onToast }) {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    mins: "00",
    secs: "00",
    isHappening: false,
    isCompleted: false
  });

  const [flipping, setFlipping] = useState({ days: false, hours: false, mins: false, secs: false });

  useEffect(() => {
    const target = new Date(WEDDING_CONFIG.muhurthamStart).getTime();
    const end = new Date(WEDDING_CONFIG.muhurthamEnd).getTime();

    const calculateTime = () => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        if (now < end) {
          setTimeLeft({ days: "00", hours: "00", mins: "00", secs: "00", isHappening: true, isCompleted: false });
        } else {
          setTimeLeft({ days: "00", hours: "00", mins: "00", secs: "00", isHappening: false, isCompleted: true });
        }
        return;
      }

      const totalSeconds = Math.floor(diff / 1000);
      const d = Math.floor(totalSeconds / 86400);
      const h = Math.floor((totalSeconds % 86400) / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;

      const newTime = {
        days: String(d).padStart(2, "0"),
        hours: String(h).padStart(2, "0"),
        mins: String(m).padStart(2, "0"),
        secs: String(s).padStart(2, "0"),
        isHappening: false,
        isCompleted: false
      };

      setTimeLeft((prev) => {
        if (prev.secs !== newTime.secs) triggerFlip("secs");
        if (prev.mins !== newTime.mins) triggerFlip("mins");
        if (prev.hours !== newTime.hours) triggerFlip("hours");
        if (prev.days !== newTime.days) triggerFlip("days");
        return newTime;
      });
    };

    const triggerFlip = (unit) => {
      setFlipping((prev) => ({ ...prev, [unit]: true }));
      setTimeout(() => {
        setFlipping((prev) => ({ ...prev, [unit]: false }));
      }, 450);
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatIcsStamp = (iso) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

  const handleAddToCalendar = () => {
    const title = `${WEDDING_CONFIG.groom} & ${WEDDING_CONFIG.bride} — Royal Wedding Muhurtham`;
    const details = `Muhurtham between 9:30 am and 10:30 am. Venue: ${WEDDING_CONFIG.weddingVenue.name}, ${WEDDING_CONFIG.weddingVenue.address}`;
    const location = `${WEDDING_CONFIG.weddingVenue.name}, ${WEDDING_CONFIG.weddingVenue.address}`;

    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&dates=${formatIcsStamp(WEDDING_CONFIG.muhurthamStart)}/${formatIcsStamp(
      WEDDING_CONFIG.muhurthamEnd
    )}&location=${encodeURIComponent(location)}&details=${encodeURIComponent(details)}`;

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      `PRODID:-//${WEDDING_CONFIG.groom} and ${WEDDING_CONFIG.bride}//Wedding//EN`,
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:${formatIcsStamp(WEDDING_CONFIG.muhurthamStart)}-siva-kani-wedding`,
      `DTSTAMP:${formatIcsStamp(new Date())}`,
      `DTSTART:${formatIcsStamp(WEDDING_CONFIG.muhurthamStart)}`,
      `DTEND:${formatIcsStamp(WEDDING_CONFIG.muhurthamEnd)}`,
      `SUMMARY:${title}`,
      `LOCATION:${location}`,
      `DESCRIPTION:${details}`,
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    try {
      const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
      const url = URL.createObjectURL(blob);

      if (/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)) {
        window.location.href = url;
        if (onToast) onToast("Opening Apple Calendar...");
        return;
      }

      const win = window.open(googleUrl, "_blank", "noopener");
      if (!win) {
        const a = document.createElement("a");
        a.href = url;
        a.download = "siva-kani-wedding.ics";
        document.body.appendChild(a);
        a.click();
        a.remove();
        if (onToast) onToast("Downloaded wedding calendar invite (.ics)");
      } else {
        if (onToast) onToast("Opened in Google Calendar");
      }

      setTimeout(() => URL.revokeObjectURL(url), 30000);
    } catch (err) {
      window.open(googleUrl, "_blank", "noopener");
    }
  };

  const tileUnits = [
    { label: "Days", val: timeLeft.days, key: "days" },
    { label: "Hours", val: timeLeft.hours, key: "hours" },
    { label: "Mins", val: timeLeft.mins, key: "mins" },
    { label: "Secs", val: timeLeft.secs, key: "secs" }
  ];

  return (
    <section id="count" style={{ padding: "30px 0 60px" }}>
      <div className="wrap">
        <div className="eyebrow">
          <Hourglass size={14} color="var(--gold)" />
          <span>Auspicious Countdown</span>
          <Hourglass size={14} color="var(--gold)" />
        </div>
        
        <h2 className="h2-title">
          {timeLeft.isHappening
            ? "Happening Right Now! ✨"
            : timeLeft.isCompleted
            ? "Thank You for Your Divine Blessings"
            : "Until The Grand Muhurtham"}
        </h2>

        {/* 4-Tile Mass 3D Flip Clock */}
        {!timeLeft.isCompleted && !timeLeft.isHappening && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "12px",
              marginTop: "12px"
            }}
          >
            {tileUnits.map(({ label, val, key }) => (
              <div
                key={key}
                className={`countdown-tile ${flipping[key] ? "tile-shimmer" : ""}`}
                style={{
                  position: "relative",
                  borderRadius: "20px",
                  padding: "18px 6px",
                  textAlign: "center",
                  background: "linear-gradient(180deg, #2D0914 0%, #150308 100%)",
                  border: "2px solid var(--line-strong)",
                  boxShadow: "var(--shadow-md), 0 0 20px rgba(255, 215, 0, 0.2)",
                  overflow: "hidden"
                }}
              >
                <b
                  className={`mass-title ${flipping[key] ? "flip-digit" : ""}`}
                  style={{
                    display: "block",
                    fontSize: "clamp(28px, 8vw, 42px)",
                    lineHeight: "1",
                    backfaceVisibility: "hidden"
                  }}
                >
                  {val}
                </b>
                <span
                  style={{
                    fontSize: "11.5px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    marginTop: "6px",
                    display: "block",
                    fontWeight: "800",
                    textShadow: "0 0 8px rgba(255, 215, 0, 0.4)"
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Add to Calendar Button */}
        {!timeLeft.isCompleted && (
          <div style={{ textAlign: "center", marginTop: "32px" }}>
            <button
              type="button"
              onClick={handleAddToCalendar}
              className="btn btn-solid"
              aria-label="Add wedding to your calendar"
            >
              <Calendar size={17} />
              <span>Add to Calendar</span>
            </button>
          </div>
        )}
      </div>

      <style>{`
        .flip-digit {
          animation: digitMassFlip 0.44s cubic-bezier(0.35, 0, 0.2, 1);
        }
        @keyframes digitMassFlip {
          0% { transform: rotateX(0deg) scale(1); }
          45% { transform: rotateX(-80deg) scale(0.92); opacity: 0.7; }
          55% { transform: rotateX(80deg) scale(0.92); opacity: 0.7; }
          100% { transform: rotateX(0deg) scale(1); opacity: 1; }
        }
        .tile-shimmer::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(110deg, transparent 25%, rgba(255, 215, 0, 0.6) 50%, transparent 75%);
          background-size: 250% 100%;
          animation: tileMassShimmer 0.85s var(--ease);
        }
        @keyframes tileMassShimmer {
          0% { background-position: 150% 50%; }
          100% { background-position: -150% 50%; }
        }
      `}</style>
    </section>
  );
}
