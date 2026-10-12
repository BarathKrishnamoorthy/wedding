import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import IntroEnvelope from "./components/IntroEnvelope";
import PetalsCanvas from "./components/PetalsCanvas";
import BackgroundMusic from "./components/BackgroundMusic";
import LiveReactions from "./components/LiveReactions";
import HeroSection from "./components/HeroSection";
import CountdownSection from "./components/CountdownSection";
import InvitationCard from "./components/InvitationCard";
import ScheduleSection from "./components/ScheduleSection";
// import LoveStorySection from "./components/LoveStorySection";
import PhotoGallerySection from "./components/PhotoGallerySection";
// import RSVPSection from "./components/RSVPSection";
import WishesWallSection from "./components/WishesWallSection";
import ClosingSection from "./components/ClosingSection";
import BottomBar from "./components/BottomBar";
import ThemeModal from "./components/ThemeModal";
import ShareModal from "./components/ShareModal";

export default function App() {
  const [recipientName, setRecipientName] = useState("");
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("royal-gold");
  const [fontSize, setFontSize] = useState(1);
  const [toastMessage, setToastMessage] = useState("");
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [audioStartTrigger, setAudioStartTrigger] = useState(false);
  const [envelopeKey, setEnvelopeKey] = useState(1);

  // Parse `?to=GuestName` from query parameters
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const toParam = params.get("to");
      if (toParam) {
        const cleaned = toParam
          .replace(/[<>&"']/g, "")
          .trim()
          .slice(0, 45)
          .replace(/\s+/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase());
        if (cleaned) setRecipientName(cleaned);
      }
    } catch (e) { }

    // Load saved theme
    const savedTheme = localStorage.getItem("sk_wedding_theme");
    if (savedTheme) {
      setCurrentTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      document.documentElement.setAttribute("data-theme", "royal-gold");
    }

    // Load saved font scale
    const savedFs = parseFloat(localStorage.getItem("sk_wedding_fs")) || 1;
    setFontSize(savedFs);
    document.documentElement.style.setProperty("--fs", savedFs);
  }, []);

  const handleSelectTheme = (themeId) => {
    setCurrentTheme(themeId);
    document.documentElement.setAttribute("data-theme", themeId);
    localStorage.setItem("sk_wedding_theme", themeId);
    showToast(`Applied ${themeId.replace("-", " ")} palette 👑`);
  };

  const handleToggleFontSize = () => {
    const newFs = fontSize >= 1.16 ? 1 : 1.16;
    setFontSize(newFs);
    document.documentElement.style.setProperty("--fs", newFs);
    localStorage.setItem("sk_wedding_fs", newFs);
    showToast(newFs > 1 ? "Larger Text Enabled" : "Standard Text Enabled");
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setIsToastVisible(true);
    setTimeout(() => {
      setIsToastVisible(false);
    }, 2800);
  };

  const handleReplayIntro = () => {
    sessionStorage.removeItem("sk_wedding_opened");
    document.body.classList.add("locked");
    setEnvelopeKey((prev) => prev + 1);
    showToast("Replaying Royal Unveiling Experience... 👑");
  };

  const handleEnvelopeComplete = () => {
    setAudioStartTrigger(true);
  };

  return (
    <div id="page-wrapper" style={{ position: "relative", minHeight: "100vh" }}>
      {/* Ambient Radial Mass Background Glow */}
      <div className="ambient-glow" aria-hidden="true" />

      {/* Floating Canvas Flower Petals & Gold Dust */}
      <PetalsCanvas />

      {/* Floating Live Reaction Dock (❤️ 🌸 💥 👑 🪔 🥂) */}
      <LiveReactions />

      {/* 3D Mass Royal Velvet & 24K Gold Envelope Opening */}
      <IntroEnvelope
        key={envelopeKey}
        recipientName={recipientName}
        onOpenComplete={handleEnvelopeComplete}
      />

      {/* Top Floating Action Bar */}
      <Navbar
        onOpenTheme={() => setIsThemeModalOpen(true)}
        onOpenShare={() => setIsShareModalOpen(true)}
        onReplayIntro={handleReplayIntro}
        fontSize={fontSize}
        onToggleFontSize={handleToggleFontSize}
      />

      {/* Background Music Player ("Pesamale" Song) */}
      <BackgroundMusic startTrigger={audioStartTrigger} />

      {/* Main Wedding Invitation Content */}
      <main id="main-content" style={{ position: "relative", zIndex: 2 }}>
        {/* 1. Mass Hero Section with 3D Spotlight */}
        <HeroSection recipientName={recipientName} />

        {/* 2. 3D Flip Countdown & Calendar Sync */}
        <CountdownSection onToast={showToast} />

        {/* 3. Royal Kasavu Invitation Card */}
        <InvitationCard />

        {/* 4. Schedule of Events (Muhurtham & Reception) */}
        <ScheduleSection onToast={showToast} />

        {/* 5. Love Story / Our Journey Timeline */}
        {/* <LoveStorySection /> */}

        {/* 6. Captured Memories Photo Gallery — Hidden */}
        {/* <PhotoGallerySection /> */}

        {/* 7. Interactive RSVP System */}
        {/* <RSVPSection recipientName={recipientName} onToast={showToast} /> */}

        {/* 8. Live Wishes Wall — Hidden */}
        {/* <WishesWallSection recipientName={recipientName} onToast={showToast} /> */}

        {/* 9. Closing Section with Share Action */}
        <ClosingSection onOpenShare={() => setIsShareModalOpen(true)} />
      </main>

      {/* Contextual Smart Bottom Bar */}
      <BottomBar />

      {/* Theme Switcher Modal */}
      <ThemeModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
        currentTheme={currentTheme}
        onSelectTheme={handleSelectTheme}
      />

      {/* Share & VIP Pass Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        onToast={showToast}
      />

      {/* Global Toast Notification */}
      <div id="toast" className={isToastVisible ? "on" : ""} role="status">
        {toastMessage}
      </div>
    </div>
  );
}
