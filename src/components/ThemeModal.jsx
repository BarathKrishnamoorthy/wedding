import React from "react";
import { X, Check, Palette, Sparkles, Crown } from "lucide-react";

export default function ThemeModal({ isOpen, onClose, currentTheme, onSelectTheme }) {
  if (!isOpen) return null;

  const themes = [
    {
      id: "royal-gold",
      name: "Imperial Ruby & 24K Gold",
      subtitle: "The Ultimate Mass Royal Tamil Wedding Aesthetic",
      colors: ["#380816", "#FFD700", "#E63946", "#0E0407"]
    },
    {
      id: "royal-emerald",
      name: "Royal Emerald & Gold",
      subtitle: "Grand South Indian Palace & Temple Splendor",
      colors: ["#134E39", "#FFD700", "#10B981", "#040E0A"]
    },
    {
      id: "midnight-gold",
      name: "Midnight Cyber Gold",
      subtitle: "High-Tech Blockbuster Obsidian & Golden Neon",
      colors: ["#0B0E14", "#F59E0B", "#38BDF8", "#05070A"]
    },
    {
      id: "royal-ivory",
      name: "Royal Ivory & Temple Gold",
      subtitle: "Grand Traditional Kasavu Day Ceremony",
      colors: ["#FAF6ED", "#C99738", "#7C182A", "#F3EBD8"]
    }
  ];

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
        padding: "20px"
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="kasavu-card"
        style={{
          maxWidth: "460px",
          width: "100%",
          padding: "34px 26px",
          background: "linear-gradient(180deg, #2D0914 0%, #150308 100%)",
          boxShadow: "0 35px 80px rgba(0,0,0,0.95), 0 0 35px rgba(255, 215, 0, 0.4)",
          border: "2px solid var(--gold)"
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Crown size={20} color="var(--gold)" />
            <h3 className="font-serif gold-text" style={{ fontSize: "24px", fontStyle: "italic" }}>
              Royal Palettes
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

        {/* Theme Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {themes.map((t) => {
            const isSelected = currentTheme === t.id;

            return (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  onSelectTheme(t.id);
                  onClose();
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 18px",
                  borderRadius: "18px",
                  background: isSelected ? "rgba(255, 215, 0, 0.18)" : "rgba(255,255,255,0.06)",
                  border: "1.5px solid " + (isSelected ? "var(--gold)" : "var(--line)"),
                  boxShadow: isSelected ? "0 0 20px rgba(255, 215, 0, 0.35)" : "none",
                  textAlign: "left",
                  transition: "all 0.25s"
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "15px",
                      fontWeight: "800",
                      color: isSelected ? "#FFD700" : "#FFFFFF"
                    }}
                  >
                    {t.name}
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--ink-soft)", marginTop: "3px" }}>
                    {t.subtitle}
                  </div>
                </div>

                {/* Color Swatches */}
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ display: "flex", gap: "4px" }}>
                    {t.colors.map((c, i) => (
                      <span
                        key={i}
                        style={{
                          width: "16px",
                          height: "16px",
                          borderRadius: "50%",
                          background: c,
                          border: "1px solid rgba(255,255,255,0.3)",
                          display: "inline-block"
                        }}
                      />
                    ))}
                  </div>
                  {isSelected && <Check size={20} color="#FFD700" style={{ marginLeft: "6px" }} />}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
