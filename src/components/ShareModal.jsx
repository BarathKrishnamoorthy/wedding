import React, { useState } from "react";
import { X, Copy, Share2, MessageCircle, Sparkles, Check, Link, Crown, QrCode } from "lucide-react";
import { WEDDING_CONFIG } from "../config/weddingData";

export default function ShareModal({ isOpen, onClose, onToast }) {
  const [customGuestName, setCustomGuestName] = useState("");
  const [copiedText, setCopiedText] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState("preview"); // "preview" | "pass"

  if (!isOpen) return null;

  const baseUrl = window.location.origin + window.location.pathname;
  const personalizedUrl = customGuestName.trim()
    ? `${baseUrl}?to=${encodeURIComponent(customGuestName.trim())}`
    : baseUrl;

  // Exact WhatsApp invitation text matching the requested format
  const getFullShareText = () => {
    const intro = customGuestName.trim()
      ? `Dear ${customGuestName.trim()},\n\nWith the blessings of our families, we joyfully invite you to the wedding of ${WEDDING_CONFIG.groom} & ${WEDDING_CONFIG.bride}.`
      : `With the blessings of our families, we joyfully invite you to the wedding of ${WEDDING_CONFIG.groom} & ${WEDDING_CONFIG.bride}.`;

    return `${intro}

🗓️ Sunday, 22 November 2026, 9:30 am – 10:30 am
📍 Sri Raja Rajeshwari Kalyana Mandapam, GST Road, Near Kathipara, Guindy, Chennai

Reception: Sunday, 22 November, evening — 6:30 pm onwards.

Please view the full invitation :
${personalizedUrl}`;
  };

  const handleCopyFullMessage = () => {
    const text = getFullShareText();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedText(true);
        if (onToast) onToast("✨ Full Invitation message copied to clipboard!");
        setTimeout(() => setCopiedText(false), 2500);
      });
    }
  };

  const handleCopyLinkOnly = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(personalizedUrl).then(() => {
        setCopiedLink(true);
        if (onToast) onToast("✨ Invitation link copied!");
        setTimeout(() => setCopiedLink(false), 2500);
      });
    }
  };

  const handleNativeShare = async () => {
    const shareData = {
      title: `${WEDDING_CONFIG.groom} & ${WEDDING_CONFIG.bride} — 22 November 2026`,
      text: getFullShareText(),
      url: personalizedUrl
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        onClose();
      } catch (err) {}
    } else {
      handleCopyFullMessage();
    }
  };

  const getWhatsAppUrl = () => {
    const text = getFullShareText();
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 160,
        background: "rgba(5, 1, 3, 0.88)",
        backdropFilter: "blur(14px)",
        display: "grid",
        placeItems: "center",
        padding: "16px"
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="kasavu-card"
        style={{
          maxWidth: "480px",
          width: "100%",
          padding: "30px 22px",
          background: "linear-gradient(180deg, #2D0914 0%, #150308 100%)",
          boxShadow: "0 35px 80px rgba(0,0,0,0.95), 0 0 35px rgba(255, 215, 0, 0.4)",
          border: "2px solid var(--gold)",
          maxHeight: "92vh",
          overflowY: "auto"
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <MessageCircle size={22} color="#25D366" />
            <h3 className="font-serif gold-text" style={{ fontSize: "22px", fontStyle: "italic" }}>
              Share on WhatsApp
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: "6px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid var(--line)",
              color: "var(--gold)",
              cursor: "pointer"
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "100px",
              fontSize: "12px",
              fontWeight: "800",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              background: activeTab === "preview" ? "var(--gold-gradient)" : "rgba(255,255,255,0.06)",
              color: activeTab === "preview" ? "#1A050B" : "var(--ink-soft)",
              border: "1px solid var(--line)",
              transition: "all 0.2s"
            }}
          >
            WhatsApp Preview 💬
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("pass")}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "100px",
              fontSize: "12px",
              fontWeight: "800",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              background: activeTab === "pass" ? "var(--gold-gradient)" : "rgba(255,255,255,0.06)",
              color: activeTab === "pass" ? "#1A050B" : "var(--ink-soft)",
              border: "1px solid var(--line)",
              transition: "all 0.2s"
            }}
          >
            VIP Digital Pass 🎫
          </button>
        </div>

        {activeTab === "preview" ? (
          <>
            {/* Optional Personalize Name */}
            <div style={{ marginBottom: "16px" }}>
              <label
                htmlFor="guestInput"
                style={{
                  display: "block",
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  fontWeight: "800",
                  marginBottom: "6px"
                }}
              >
                Guest's Name (Optional)
              </label>
              <input
                id="guestInput"
                type="text"
                value={customGuestName}
                onChange={(e) => setCustomGuestName(e.target.value)}
                placeholder="e.g. Karthik / Anand & Family"
                style={{
                  width: "100%",
                  fontSize: "14.5px",
                  padding: "12px 14px",
                  borderRadius: "12px",
                  border: "1px solid var(--line-strong)",
                  background: "rgba(255,255,255,0.08)",
                  color: "#FFFFFF",
                  outline: "none"
                }}
              />
            </div>

            {/* Live WhatsApp Message Bubble Preview */}
            <div
              style={{
                background: "#EFEAE2",
                borderRadius: "16px",
                padding: "14px 14px 10px",
                color: "#111B21",
                fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
                fontSize: "14px",
                lineHeight: "1.5",
                boxShadow: "0 6px 20px rgba(0,0,0,0.6)",
                border: "1px solid rgba(0,0,0,0.1)",
                marginBottom: "20px",
                position: "relative"
              }}
            >
              {/* Rich Link Preview Card */}
              <div
                style={{
                  background: "#E1DCD3",
                  borderRadius: "10px",
                  overflow: "hidden",
                  marginBottom: "10px",
                  display: "flex",
                  border: "1px solid rgba(0,0,0,0.08)"
                }}
              >
                <img
                  src="./assets/siva-kani-portrait.jpg"
                  alt="Siva & Kani"
                  style={{
                    width: "78px",
                    height: "78px",
                    objectFit: "cover",
                    flexShrink: 0
                  }}
                />
                <div style={{ padding: "8px 10px", minWidth: 0 }}>
                  <div style={{ fontWeight: "600", fontSize: "13px", color: "#111B21", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Siva &amp; Kani — 22 November 2026
                  </div>
                  <div style={{ fontSize: "11.5px", color: "#667781", marginTop: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    You are warmly invited to our wedding...
                  </div>
                  <div style={{ fontSize: "11px", color: "#8696A0", marginTop: "4px", display: "flex", alignItems: "center", gap: "3px" }}>
                    <Link size={10} /> {window.location.hostname}
                  </div>
                </div>
              </div>

              {/* Message Body Text */}
              <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", color: "#111B21" }}>
                {customGuestName.trim() && (
                  <p style={{ margin: "0 0 10px", fontWeight: "600" }}>
                    Dear {customGuestName.trim()},
                  </p>
                )}
                <p style={{ margin: "0 0 10px" }}>
                  With the blessings of our families, we joyfully invite you to the wedding of <strong>Siva &amp; Kani</strong>.
                </p>
                <p style={{ margin: "0 0 4px" }}>
                  🗓️ <strong>Sunday, 22 November 2026</strong>, 9:30 am – 10:30 am
                </p>
                <p style={{ margin: "0 0 10px" }}>
                  📍 <strong>Sri Raja Rajeshwari Kalyana Mandapam</strong>, GST Road, Near Kathipara, Guindy, Chennai
                </p>
                <p style={{ margin: "0 0 12px" }}>
                  Reception: Sunday, 22 November, evening — 6:30 pm onwards.
                </p>
                <p style={{ margin: "0 0 2px", color: "#54656F", fontSize: "13px" }}>
                  Please view the full invitation :
                </p>
                <p style={{ margin: 0, color: "#027EB5", textDecoration: "underline", fontSize: "13px" }}>
                  {personalizedUrl}
                </p>
              </div>

              {/* Message Timestamp */}
              <div style={{ textAlign: "right", fontSize: "11px", color: "#8696A0", marginTop: "6px" }}>
                Just now ✓✓
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {/* WhatsApp Direct Send Button */}
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-solid"
                style={{
                  width: "100%",
                  padding: "15px",
                  background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                  color: "#FFFFFF",
                  border: "1px solid #25D366",
                  boxShadow: "0 8px 24px rgba(37, 211, 102, 0.45)"
                }}
              >
                <MessageCircle size={19} />
                <span>Send to WhatsApp Now</span>
              </a>

              {/* Copy Full Message Button */}
              <button
                type="button"
                onClick={handleCopyFullMessage}
                className="btn btn-gold"
                style={{ width: "100%", padding: "13px" }}
              >
                {copiedText ? <Check size={17} /> : <Copy size={17} />}
                <span>{copiedText ? "Full Message Copied!" : "Copy Full WhatsApp Message"}</span>
              </button>

              {/* Native Share */}
              {navigator.share && (
                <button
                  type="button"
                  onClick={handleNativeShare}
                  className="btn btn-ghost"
                  style={{ width: "100%", padding: "12px", fontSize: "12px" }}
                >
                  <Share2 size={15} />
                  <span>Share via Other Apps</span>
                </button>
              )}
            </div>
          </>
        ) : (
          /* VIP Digital Royal Pass View */
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                background: "linear-gradient(135deg, #380816 0%, #17030A 100%)",
                border: "2px solid var(--gold)",
                borderRadius: "20px",
                padding: "24px 20px",
                boxShadow: "0 12px 30px rgba(0,0,0,0.8), 0 0 20px rgba(255, 215, 0, 0.4)",
                position: "relative",
                overflow: "hidden",
                marginBottom: "18px"
              }}
            >
              <div style={{ fontSize: "11px", letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--gold)", fontWeight: "800" }}>
                ROYAL WEDDING VIP PASS
              </div>

              <h4 className="font-display gold-text" style={{ fontSize: "24px", margin: "8px 0" }}>
                {WEDDING_CONFIG.groom} &amp; {WEDDING_CONFIG.bride}
              </h4>

              <div style={{ fontSize: "16px", color: "#FFFFFF", fontStyle: "italic", fontFamily: "'Fraunces', serif" }}>
                Guest: {customGuestName.trim() || "Honored Royal Guest"}
              </div>

              <div style={{ fontSize: "12px", color: "var(--gold-light)", marginTop: "6px" }}>
                Sunday, 22 November 2026 · Chennai
              </div>

              <div
                style={{
                  margin: "16px auto 0",
                  padding: "10px",
                  background: "#FFFFFF",
                  borderRadius: "12px",
                  display: "inline-block"
                }}
              >
                <svg width="90" height="90" viewBox="0 0 100 100" fill="#000000">
                  <rect width="100" height="100" fill="#FFFFFF"/>
                  <rect x="10" y="10" width="25" height="25" fill="#1A050B"/>
                  <rect x="15" y="15" width="15" height="15" fill="#FFFFFF"/>
                  <rect x="65" y="10" width="25" height="25" fill="#1A050B"/>
                  <rect x="70" y="15" width="15" height="15" fill="#FFFFFF"/>
                  <rect x="10" y="65" width="25" height="25" fill="#1A050B"/>
                  <rect x="15" y="70" width="15" height="15" fill="#FFFFFF"/>
                  <rect x="42" y="15" width="12" height="12" fill="#1A050B"/>
                  <rect x="42" y="42" width="16" height="16" fill="#1A050B"/>
                  <rect x="65" y="45" width="12" height="12" fill="#1A050B"/>
                  <rect x="45" y="70" width="20" height="10" fill="#1A050B"/>
                  <rect x="75" y="70" width="15" height="15" fill="#1A050B"/>
                </svg>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopyFullMessage}
              className="btn btn-solid"
              style={{ width: "100%", padding: "14px" }}
            >
              <Copy size={16} />
              <span>Copy Invitation with VIP Pass</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
