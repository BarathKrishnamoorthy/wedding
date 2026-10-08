import React, { useState, useEffect } from "react";
import { Check, Heart, Send, MessageCircle, RotateCcw, Sparkles, PartyPopper } from "lucide-react";
import confetti from "canvas-confetti";
import { WEDDING_CONFIG } from "../config/weddingData";

export default function RSVPSection({ recipientName, onToast }) {
  const [name, setName] = useState(recipientName || "");
  const [phone, setPhone] = useState("");
  const [attending, setAttending] = useState("yes"); // "yes" | "no"
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Check local storage for existing RSVP
    const savedRSVP = localStorage.getItem("sk_rsvp_data");
    if (savedRSVP) {
      try {
        const parsed = JSON.parse(savedRSVP);
        setName(parsed.name || recipientName || "");
        setPhone(parsed.phone || "");
        setAttending(parsed.attending || "yes");
        setGuests(parsed.guests || 1);
        setMessage(parsed.message || "");
        setIsSubmitted(true);
      } catch (e) {}
    } else if (recipientName) {
      setName(recipientName);
    }
  }, [recipientName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      if (onToast) onToast("Please enter your name first");
      return;
    }

    const payload = {
      name: name.trim(),
      phone: phone.trim(),
      attending,
      guests: attending === "yes" ? guests : 0,
      message: message.trim(),
      timestamp: new Date().toISOString()
    };

    localStorage.setItem("sk_rsvp_data", JSON.stringify(payload));
    setIsSubmitted(true);

    if (attending === "yes") {
      window.dispatchEvent(new CustomEvent("wedding:celebrate"));

      // Grand Fireworks Cannon
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.7 },
        colors: ["#FFD700", "#E63946", "#FFF4B8", "#10B981"]
      });
      if (onToast) onToast("✨ RSVP Confirmed! Can't wait to celebrate together!");
    } else {
      if (onToast) onToast("Thank you for letting us know. You will be missed!");
    }
  };

  const handleResetRSVP = () => {
    setIsSubmitted(false);
    localStorage.removeItem("sk_rsvp_data");
    if (onToast) onToast("You can now update your reply");
  };

  const getWhatsAppLink = () => {
    const text = `*RSVP — Siva & Kani Royal Wedding*%0A`
      + `*Guest Name:* ${encodeURIComponent(name)}%0A`
      + `*Status:* ${attending === "yes" ? `Attending joyfully with ${guests} guest(s) 🎉` : "Sending love & blessings from afar 💌"}%0A`
      + (phone ? `*Phone:* ${encodeURIComponent(phone)}%0A` : "")
      + (message ? `*Special Note:* ${encodeURIComponent(message)}` : "");
    return `https://wa.me/${WEDDING_CONFIG.whatsappPhone}?text=${text}`;
  };

  const firstName = name ? name.split(" ")[0] : "Friend";

  return (
    <section id="rsvp" style={{ padding: "0 0 70px", scrollMarginTop: "24px" }}>
      <div className="wrap">
        <div className="eyebrow">
          <PartyPopper size={14} color="var(--gold)" />
          <span>Will You Grace the Occasion?</span>
          <PartyPopper size={14} color="var(--gold)" />
        </div>
        <h2 className="h2-title">Royal RSVP</h2>

        <div
          className="kasavu-card"
          style={{
            padding: "38px 28px"
          }}
        >
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
              {/* Name Field */}
              <div>
                <label
                  htmlFor="rName"
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
                  Your Name *
                </label>
                <input
                  id="rName"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter full name"
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

              {/* Phone Field */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <label
                    htmlFor="rPhone"
                    style={{
                      fontSize: "11.5px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--gold)",
                      fontWeight: "800"
                    }}
                  >
                    Phone Number
                  </label>
                  <span style={{ fontSize: "11px", color: "var(--ink-muted)" }}>optional</span>
                </div>
                <input
                  id="rPhone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
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

              {/* Attendance Segmented Toggle */}
              <div>
                <label
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
                  Are you attending?
                </label>
                <div style={{ display: "flex", gap: "12px" }}>
                  <button
                    type="button"
                    onClick={() => setAttending("yes")}
                    style={{
                      flex: 1,
                      padding: "15px 12px",
                      borderRadius: "100px",
                      fontSize: "13.5px",
                      fontWeight: "800",
                      background: attending === "yes" ? "var(--gold-gradient)" : "rgba(255,255,255,0.06)",
                      color: attending === "yes" ? "#1A050B" : "var(--ink-soft)",
                      border: "1px solid " + (attending === "yes" ? "#FFFFFF" : "var(--line)"),
                      boxShadow: attending === "yes" ? "0 0 24px rgba(255, 215, 0, 0.6)" : "none",
                      transition: "all 0.25s var(--ease)"
                    }}
                  >
                    Yes, Joyfully! 🎉
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttending("no")}
                    style={{
                      flex: 1,
                      padding: "15px 12px",
                      borderRadius: "100px",
                      fontSize: "13.5px",
                      fontWeight: "800",
                      background: attending === "no" ? "linear-gradient(135deg, #E63946, #9B111E)" : "rgba(255,255,255,0.06)",
                      color: attending === "no" ? "#FFFDF9" : "var(--ink-soft)",
                      border: "1px solid " + (attending === "no" ? "#FFFFFF" : "var(--line)"),
                      boxShadow: attending === "no" ? "0 0 20px rgba(230, 57, 70, 0.6)" : "none",
                      transition: "all 0.25s var(--ease)"
                    }}
                  >
                    Sadly, No 💌
                  </button>
                </div>
              </div>

              {/* Guest Count Stepper */}
              {attending === "yes" && (
                <div>
                  <label
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
                    Number of Guests Attending
                  </label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "28px",
                      background: "rgba(255,255,255,0.06)",
                      padding: "12px",
                      borderRadius: "18px",
                      border: "1px solid var(--line)"
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "50%",
                        background: "rgba(255,215,0,0.2)",
                        border: "1px solid var(--gold)",
                        fontSize: "22px",
                        color: "#FFD700",
                        fontWeight: "800",
                        display: "grid",
                        placeItems: "center",
                        boxShadow: "0 0 12px rgba(255, 215, 0, 0.3)"
                      }}
                    >
                      −
                    </button>
                    <span className="mass-title" style={{ fontSize: "32px", minWidth: "35px", textAlign: "center" }}>
                      {guests}
                    </span>
                    <button
                      type="button"
                      onClick={() => setGuests(Math.min(6, guests + 1))}
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "50%",
                        background: "rgba(255,215,0,0.2)",
                        border: "1px solid var(--gold)",
                        fontSize: "22px",
                        color: "#FFD700",
                        fontWeight: "800",
                        display: "grid",
                        placeItems: "center",
                        boxShadow: "0 0 12px rgba(255, 215, 0, 0.3)"
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Message Note Field */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <label
                    htmlFor="rMsg"
                    style={{
                      fontSize: "11.5px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--gold)",
                      fontWeight: "800"
                    }}
                  >
                    A Note For Siva &amp; Kani
                  </label>
                  <span style={{ fontSize: "11px", color: "var(--ink-muted)" }}>optional</span>
                </div>
                <textarea
                  id="rMsg"
                  rows="3"
                  maxLength="200"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your wishes or dietary notes..."
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

              {/* Submit Button */}
              <button type="submit" className="btn btn-solid" style={{ width: "100%", padding: "16px" }}>
                <Send size={17} />
                <span>Confirm Our Royal RSVP</span>
              </button>
            </form>
          ) : (
            /* RSVP Submitted State */
            <div style={{ textAlign: "center", padding: "12px 0" }}>
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: attending === "yes" ? "var(--gold-gradient)" : "var(--accent)",
                  color: attending === "yes" ? "#1A050B" : "#FFFFFF",
                  display: "grid",
                  placeItems: "center",
                  margin: "0 auto 18px",
                  boxShadow: "0 0 30px rgba(255, 215, 0, 0.6)"
                }}
              >
                <Check size={32} />
              </div>

              <h3 className="font-serif gold-text" style={{ fontSize: "28px", fontStyle: "italic" }}>
                {attending === "yes" ? `Can't Wait to See You, ${firstName}! 🌸` : "Thank You for Letting Us Know 💌"}
              </h3>

              <p style={{ color: "var(--ink-soft)", fontSize: "15px", marginTop: "10px", lineHeight: "1.65" }}>
                {attending === "yes"
                  ? `Your reply is confirmed for ${guests} guest${guests > 1 ? "s" : ""}. We look forward to celebrating together in royal splendor!`
                  : "We will miss your presence, but your blessings mean the world to us."}
              </p>

              {/* Direct WhatsApp Confirmation */}
              <div style={{ marginTop: "26px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-solid"
                  style={{ width: "100%", padding: "15px" }}
                >
                  <MessageCircle size={17} />
                  <span>Send Confirmation via WhatsApp</span>
                </a>

                {/* Edit Reply Button */}
                <button
                  type="button"
                  onClick={handleResetRSVP}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    fontSize: "13px",
                    color: "var(--gold)",
                    textDecoration: "underline",
                    textUnderlineOffset: "4px",
                    marginTop: "8px"
                  }}
                >
                  <RotateCcw size={14} />
                  <span>Change My Reply</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
