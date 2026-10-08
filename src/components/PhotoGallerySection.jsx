import React, { useState } from "react";
import { Sparkles, X, ZoomIn, Camera } from "lucide-react";
import { WEDDING_CONFIG } from "../config/weddingData";

export default function PhotoGallerySection() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const galleryItems = [
    {
      src: WEDDING_CONFIG.photos.hero,
      title: "The Sacred Vows",
      subtitle: "Siva & Kani in Traditional South Indian Wedding Splendor"
    },
    {
      src: WEDDING_CONFIG.photos.sunset,
      title: "Twilight Serenades",
      subtitle: "Pre-wedding sunset moments by the tranquil lotus waters"
    },
    {
      src: WEDDING_CONFIG.photos.ring,
      title: "Eternal Promise",
      subtitle: "Sacred rings, fragrant jasmine & auspicious mehndi"
    }
  ];

  return (
    <section id="gallery" style={{ padding: "0 0 70px" }}>
      <div className="wrap">
        <div className="eyebrow">
          <Camera size={14} color="var(--gold)" />
          <span>Cinematic Frames</span>
          <Camera size={14} color="var(--gold)" />
        </div>
        <h2 className="h2-title">Captured Moments</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "22px",
            marginTop: "24px"
          }}
        >
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedPhoto(item)}
              style={{
                position: "relative",
                borderRadius: "24px",
                overflow: "hidden",
                background: "#150409",
                boxShadow: "var(--shadow-md), 0 0 20px rgba(255, 215, 0, 0.2)",
                border: "2px solid var(--line)",
                cursor: "pointer",
                aspectRatio: idx === 0 ? "3 / 4" : "4 / 3",
                transition: "transform 0.3s var(--ease), box-shadow 0.3s ease, border-color 0.3s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px) scale(1.02)";
                e.currentTarget.style.borderColor = "var(--gold)";
                e.currentTarget.style.boxShadow = "0 25px 60px rgba(0,0,0,0.9), 0 0 35px rgba(255, 215, 0, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px) scale(1)";
                e.currentTarget.style.borderColor = "var(--line)";
                e.currentTarget.style.boxShadow = "var(--shadow-md)";
              }}
            >
              <img
                src={item.src}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block"
                }}
              />

              {/* Dynamic Gradient & Glass Caption on Hover */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(14, 3, 7, 0.95) 0%, rgba(14, 3, 7, 0.3) 45%, transparent 75%)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "18px 20px",
                  color: "#FAF7F2"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <h4
                    className="font-serif"
                    style={{
                      fontSize: "19px",
                      fontStyle: "italic",
                      color: "var(--gold)",
                      margin: 0,
                      textShadow: "0 0 10px rgba(255, 215, 0, 0.4)"
                    }}
                  >
                    {item.title}
                  </h4>
                  <div
                    style={{
                      background: "rgba(255,215,0,0.25)",
                      border: "1px solid var(--gold)",
                      borderRadius: "50%",
                      padding: "6px",
                      display: "grid",
                      placeItems: "center",
                      boxShadow: "0 0 12px rgba(255, 215, 0, 0.4)"
                    }}
                  >
                    <ZoomIn size={15} color="#FFD700" />
                  </div>
                </div>
                <p style={{ fontSize: "12px", color: "var(--ink-soft)", margin: "5px 0 0", lineHeight: "1.45" }}>
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mass Lightbox Modal */}
        {selectedPhoto && (
          <div
            onClick={() => setSelectedPhoto(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 160,
              background: "rgba(5, 1, 3, 0.95)",
              backdropFilter: "blur(18px)",
              display: "grid",
              placeItems: "center",
              padding: "20px"
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                maxWidth: "640px",
                width: "100%",
                borderRadius: "26px",
                overflow: "hidden",
                background: "#18040A",
                border: "2px solid var(--gold)",
                boxShadow: "0 35px 90px rgba(0,0,0,0.95), 0 0 45px rgba(255, 215, 0, 0.45)"
              }}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  zIndex: 2,
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.7)",
                  border: "1px solid var(--gold)",
                  color: "#FFD700",
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer",
                  boxShadow: "0 0 15px rgba(255, 215, 0, 0.4)"
                }}
              >
                <X size={20} />
              </button>

              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                style={{
                  width: "100%",
                  maxHeight: "72vh",
                  objectFit: "contain",
                  display: "block",
                  background: "#000000"
                }}
              />

              <div style={{ padding: "20px 24px", textAlign: "center", background: "#1F050D" }}>
                <h3 className="font-serif gold-text" style={{ fontSize: "22px", fontStyle: "italic", margin: 0 }}>
                  {selectedPhoto.title}
                </h3>
                <p style={{ fontSize: "13.5px", color: "var(--ink-soft)", margin: "6px 0 0" }}>
                  {selectedPhoto.subtitle}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
