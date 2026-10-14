import React, { useState } from "react";
import confetti from "canvas-confetti";

export default function LiveReactions() {
  const [reactions, setReactions] = useState([]);

  const emojis = [
    { icon: "❤️", label: "Love" },
    { icon: "🌸", label: "Blessings" },
    { icon: "💥", label: "Mass" },
    { icon: "👑", label: "Royal" },
    { icon: "🪔", label: "Diya" },
    { icon: "🥂", label: "Cheers" }
  ];

  const handleTriggerEmoji = (emoji) => {
    const id = Date.now() + Math.random();
    const startX = Math.random() * (window.innerWidth - 60) + 20;

    const newReaction = {
      id,
      icon: emoji.icon,
      x: startX
    };

    setReactions((prev) => [...prev, newReaction]);

    if (emoji.icon === "💥") {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.85, x: startX / window.innerWidth },
        colors: ["#FFD700", "#E63946", "#FFF4B8"]
      });
    }

    setTimeout(() => {
      setReactions((prev) => prev.filter((r) => r.id !== id));
    }, 2300);
  };

  return (
    <>
      {/* Floating upward reaction items */}
      {reactions.map((r) => (
        <div
          key={r.id}
          className="floating-reaction"
          style={{
            left: `${r.x}px`,
            bottom: "80px"
          }}
        >
          {r.icon}
        </div>
      ))}

      {/* Floating Reaction Dock at Right Edge */}
      <div
        style={{
          position: "fixed",
          right: "16px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 70,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          background: "rgba(25, 5, 12, 0.85)",
          backdropFilter: "blur(14px)",
          padding: "10px 6px",
          borderRadius: "100px",
          border: "1px solid var(--line-strong)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.8), 0 0 15px rgba(255, 215, 0, 0.25)"
        }}
      >
        {/* <div
          style={{
            fontSize: "9px",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--gold)",
            fontWeight: "800",
            textAlign: "center",
            padding: "2px 0 4px"
          }}
        >
          React
        </div> */}

        {emojis.map((e, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleTriggerEmoji(e)}
            title={e.label}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid var(--line-soft)",
              fontSize: "18px",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
              transition: "transform 0.18s var(--ease), background 0.18s"
            }}
            onMouseEnter={(el) => {
              el.currentTarget.style.transform = "scale(1.25)";
              el.currentTarget.style.background = "rgba(255, 215, 0, 0.25)";
            }}
            onMouseLeave={(el) => {
              el.currentTarget.style.transform = "scale(1)";
              el.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
            }}
          >
            {e.icon}
          </button>
        ))}
      </div>
    </>
  );
}
