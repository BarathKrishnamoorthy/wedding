import React, { useState, useEffect } from "react";
import { Sparkles, Heart, Send, MessageSquare, Flame } from "lucide-react";
import confetti from "canvas-confetti";
import { WEDDING_CONFIG } from "../config/weddingData";

export default function WishesWallSection({ recipientName, onToast }) {
  const [name, setName] = useState(recipientName || "");
  const [message, setMessage] = useState("");
  const [wishes, setWishes] = useState([]);

  useEffect(() => {
    // Load saved blessings from localStorage
    const saved = localStorage.getItem("sk_wishes_list");
    if (saved) {
      try {
        setWishes(JSON.parse(saved));
      } catch (e) {
        setWishes(WEDDING_CONFIG.initialWishes);
      }
    } else {
      setWishes(WEDDING_CONFIG.initialWishes);
    }
  }, []);

  const handleAddWish = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      if (onToast) onToast("Please write both your name and blessing");
      return;
    }

    const newWish = {
      name: name.trim(),
      message: message.trim(),
      time: "Just now"
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    localStorage.setItem("sk_wishes_list", JSON.stringify(updated));

    setMessage("");
    if (onToast) onToast("Thank you for your warm blessing! 🌸");

    // Fireworks confetti
    confetti({
      particleCount: 75,
      spread: 80,
      origin: { y: 0.8 },
      colors: ["#FFD700", "#E63946", "#FFF4B8"]
    });
  };

  const getNoteRotation = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 31 + str.charCodeAt(i)) | 0;
    }
    return (((Math.abs(hash) % 100) / 100) * 3.6 - 1.8).toFixed(2);
  };

  return (
    <section id="wishes" style={{ padding: "0 0 70px" }}>
      <div className="wrap">
        <div className="eyebrow">
          <Sparkles size={14} color="var(--gold)" />
          <span>{wishes.length} Divine Blessings Received</span>
          <Sparkles size={14} color="var(--gold)" />
        </div>
        <h2 className="h2-title">Blessings Wall</h2>

        {/* Form Panel */}
        <div className="kasavu-card" style={{ padding: "32px 26px", marginBottom: "34px" }}>
          <form onSubmit={handleAddWish} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div>
              <label
                htmlFor="wName"
                style={{
                  display: "block",
                  fontSize: "11.5px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  fontWeight: "800",
                  marginBottom: "8px"
                }}
              >
                Your Name
              </label>
              <input
                id="wName"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                style={{
                  width: "100%",
                  fontSize: "15px",
                  padding: "15px 18px",
                  borderRadius: "16px",
                  border: "1px solid var(--line-strong)",
                  background: "rgba(255,255,255,0.06)",
                  color: "#FFFFFF",
                  outline: "none"
                }}
              />
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <label
                  htmlFor="wMsg"
                  style={{
                    fontSize: "11.5px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    fontWeight: "800"
                  }}
                >
                  Your Blessing
                </label>
                <span style={{ fontSize: "11px", color: "var(--ink-muted)" }}>
                  {200 - message.length} characters left
                </span>
              </div>
              <textarea
                id="wMsg"
                rows="3"
                maxLength="200"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your heartfelt blessing for Siva & Kani..."
                style={{
                  width: "100%",
                  fontSize: "15px",
                  padding: "15px 18px",
                  borderRadius: "16px",
                  border: "1px solid var(--line-strong)",
                  background: "rgba(255,255,255,0.06)",
                  color: "#FFFFFF",
                  resize: "vertical",
                  outline: "none"
                }}
              />
            </div>

            <button type="submit" className="btn btn-solid" style={{ width: "100%", padding: "16px" }}>
              <Heart size={17} fill="currentColor" />
              <span>Leave Your Royal Blessing</span>
            </button>
          </form>
        </div>

        {/* Wishes List in Golden Framed Cards */}
        <div style={{ display: "grid", gap: "20px" }}>
          {wishes.map((wish, index) => {
            const rot = getNoteRotation(wish.name + wish.message);

            return (
              <figure
                key={index}
                style={{
                  position: "relative",
                  borderRadius: "20px",
                  padding: "26px 28px 22px",
                  background: "linear-gradient(172deg, #250A13 0%, #17040B 100%)",
                  border: "1px solid var(--line-strong)",
                  boxShadow: "0 14px 28px -10px rgba(0, 0, 0, 0.8), 0 0 15px rgba(255, 215, 0, 0.15)",
                  transform: `rotate(${rot}deg)`,
                  transition: "transform 0.25s ease, border-color 0.25s"
                }}
              >
                {/* Gold Margin Line */}
                <div
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "16px",
                    bottom: "16px",
                    width: "2px",
                    background: "var(--gold)",
                    boxShadow: "0 0 8px var(--gold)"
                  }}
                />

                <p
                  className="font-serif"
                  style={{
                    margin: "0 0 14px",
                    fontSize: "clamp(16.5px, 4.6vw, 19px)",
                    fontStyle: "italic",
                    lineHeight: "1.65",
                    color: "#FFFDF9"
                  }}
                >
                  "{wish.message}"
                </p>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "11.5px", color: "var(--gold-light)", opacity: 0.8 }}>
                    {wish.time}
                  </span>
                  <cite
                    className="font-serif gold-text"
                    style={{
                      fontStyle: "italic",
                      fontSize: "16px",
                      fontWeight: "700"
                    }}
                  >
                    — {wish.name}
                  </cite>
                </div>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
