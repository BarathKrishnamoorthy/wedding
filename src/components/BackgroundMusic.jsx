import React, { useEffect, useState, useRef } from "react";
import { Music, Volume2, VolumeX, Disc, Sparkles, ChevronUp, ChevronDown, Flame, Radio } from "lucide-react";
import { WEDDING_CONFIG } from "../config/weddingData";

export default function BackgroundMusic({ onPlayStateChange, startTrigger }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isYTReady, setIsYTReady] = useState(false);
  
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const audioRef = useRef(null);

  const currentTrack = WEDDING_CONFIG.music.alternativeTracks[currentTrackIndex] || WEDDING_CONFIG.music.alternativeTracks[0];

  useEffect(() => {
    // Check saved preference
    const savedMusicPref = localStorage.getItem("sk_music_pref");
    if (savedMusicPref === "off") {
      setIsMuted(true);
    }

    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = () => {
      initPlayer(currentTrack.id);
    };

    if (window.YT && window.YT.Player) {
      initPlayer(currentTrack.id);
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, []);

  const initPlayer = (videoId) => {
    try {
      playerRef.current = new window.YT.Player("youtube-audio-player", {
        height: "1",
        width: "1",
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          loop: 1
        },
        events: {
          onReady: (event) => {
            setIsYTReady(true);
            try {
              event.target.setVolume(55);
            } catch (e) {}
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
              if (onPlayStateChange) onPlayStateChange(true);
            } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
              if (event.data === window.YT.PlayerState.ENDED) {
                event.target.seekTo(0);
                event.target.playVideo();
              } else {
                setIsPlaying(false);
                if (onPlayStateChange) onPlayStateChange(false);
              }
            }
          },
          onError: () => {
            console.warn("YouTube player fallback triggered");
          }
        }
      });
    } catch (err) {
      console.warn("Error creating YT Player", err);
    }
  };

  useEffect(() => {
    if (startTrigger && !isMuted) {
      playAudio();
    }
  }, [startTrigger]);

  const playAudio = () => {
    if (playerRef.current && typeof playerRef.current.playVideo === "function") {
      try {
        playerRef.current.unMute();
        playerRef.current.setVolume(60);
        playerRef.current.playVideo();
        setIsPlaying(true);
        if (onPlayStateChange) onPlayStateChange(true);
      } catch (err) {
        console.warn("Autoplay attempt handled", err);
      }
    } else if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        if (onPlayStateChange) onPlayStateChange(true);
      }).catch(() => {});
    }
  };

  const pauseAudio = () => {
    if (playerRef.current && typeof playerRef.current.pauseVideo === "function") {
      try {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
        if (onPlayStateChange) onPlayStateChange(false);
      } catch (err) {}
    } else if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      if (onPlayStateChange) onPlayStateChange(false);
    }
  };

  const togglePlay = (e) => {
    if (e) e.stopPropagation();
    if (isPlaying) {
      pauseAudio();
      setIsMuted(true);
      localStorage.setItem("sk_music_pref", "off");
    } else {
      playAudio();
      setIsMuted(false);
      localStorage.setItem("sk_music_pref", "on");
    }
  };

  const switchTrack = (index) => {
    setCurrentTrackIndex(index);
    const newTrack = WEDDING_CONFIG.music.alternativeTracks[index];
    if (playerRef.current && typeof playerRef.current.loadVideoById === "function") {
      playerRef.current.loadVideoById(newTrack.id);
      setIsPlaying(true);
      setIsMuted(false);
      localStorage.setItem("sk_music_pref", "on");
    }
  };

  return (
    <>
      {/* Hidden YouTube IFrame Container */}
      <div
        id="youtube-audio-player"
        style={{
          position: "fixed",
          bottom: "-100px",
          left: "-100px",
          width: "1px",
          height: "1px",
          opacity: 0,
          pointerEvents: "none",
          zIndex: -1
        }}
        aria-hidden="true"
      />

      {/* Floating 24K Gold Gramophone Vinyl Player Widget */}
      <div
        ref={containerRef}
        style={{
          position: "fixed",
          bottom: "24px",
          left: "20px",
          zIndex: 80,
          transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)"
        }}
      >
        <div
          style={{
            position: "relative",
            background: "rgba(25, 5, 12, 0.92)",
            backdropFilter: "blur(20px)",
            border: "1.5px solid var(--gold)",
            borderRadius: isExpanded ? "22px" : "100px",
            padding: isExpanded ? "16px 18px" : "7px 16px 7px 8px",
            boxShadow: "0 20px 45px rgba(0, 0, 0, 0.9), 0 0 25px rgba(255, 215, 0, 0.35)",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            maxWidth: isExpanded ? "310px" : "auto",
            transition: "all 0.3s var(--ease)"
          }}
        >
          {/* Main Control Row */}
          <div
            onClick={togglePlay}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              cursor: "pointer",
              userSelect: "none"
            }}
          >
            {/* Rotating 24K Gold Vinyl Disc */}
            <div
              style={{
                position: "relative",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "radial-gradient(circle, #380A16 30%, #FFD700 70%, #996515 100%)",
                border: "2px solid #FFF5C2",
                display: "grid",
                placeItems: "center",
                animation: isPlaying ? "spinMassDisc 3.5s linear infinite" : "none",
                boxShadow: isPlaying ? "0 0 18px rgba(255, 215, 0, 0.8)" : "none",
                flexShrink: 0
              }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: "#1A050B",
                  border: "1px solid #FFD700"
                }}
              />
              <Disc size={18} color="#FFD700" style={{ position: "absolute", opacity: 0.85 }} />
            </div>

            {/* Song Details & Animated Equalizer Waves */}
            <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: "800",
                    color: "var(--gold-light)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: isExpanded ? "180px" : "120px",
                    textShadow: "0 0 10px rgba(255, 215, 0, 0.4)"
                  }}
                >
                  {currentTrack.title.split("(")[0]}
                </span>
                
                {/* Equalizer Bars */}
                {isPlaying && (
                  <div style={{ display: "flex", alignItems: "flex-end", gap: "2.5px", height: "14px" }}>
                    <span className="mass-eq-bar mass-eq-1" />
                    <span className="mass-eq-bar mass-eq-2" />
                    <span className="mass-eq-bar mass-eq-3" />
                  </div>
                )}
              </div>
              <span style={{ fontSize: "10.5px", color: "var(--gold)", letterSpacing: "0.08em", fontWeight: "700" }}>
                {isPlaying ? "♪ Playing BGM" : "Tap to Play BGM"}
              </span>
            </div>

            {/* Track Menu Toggle */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              aria-label="Toggle song list"
              style={{
                display: "grid",
                placeItems: "center",
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "rgba(255, 215, 0, 0.15)",
                border: "1px solid var(--line)",
                color: "#FFD700",
                marginLeft: "auto"
              }}
            >
              {isExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
            </button>
          </div>

          {/* Expanded Track Selection Playlist */}
          {isExpanded && (
            <div
              style={{
                borderTop: "1px solid var(--line)",
                paddingTop: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "8px"
              }}
            >
              <div
                style={{
                  fontSize: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: "var(--gold)",
                  fontWeight: "800",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px"
                }}
              >
                <Flame size={12} color="var(--accent)" /> Select Background Melody
              </div>
              
              {WEDDING_CONFIG.music.alternativeTracks.map((track, idx) => (
                <button
                  key={track.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    switchTrack(idx);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 10px",
                    borderRadius: "10px",
                    fontSize: "12px",
                    textAlign: "left",
                    background: currentTrackIndex === idx ? "rgba(255, 215, 0, 0.25)" : "rgba(255, 255, 255, 0.05)",
                    color: currentTrackIndex === idx ? "#FFD700" : "var(--ink-soft)",
                    fontWeight: currentTrackIndex === idx ? "800" : "500",
                    border: "1px solid " + (currentTrackIndex === idx ? "var(--gold)" : "transparent"),
                    transition: "all 0.2s"
                  }}
                >
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {track.title}
                  </span>
                  {currentTrackIndex === idx && <Radio size={14} color="#FFD700" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spinMassDisc {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .mass-eq-bar {
          width: 3px;
          background: #FFD700;
          border-radius: 3px;
          box-shadow: 0 0 8px #FFD700;
          animation: massEqDance 0.75s ease-in-out infinite alternate;
        }
        .mass-eq-1 { height: 10px; animation-delay: 0.1s; }
        .mass-eq-2 { height: 14px; animation-delay: 0.35s; }
        .mass-eq-3 { height: 8px; animation-delay: 0.2s; }
        @keyframes massEqDance {
          0% { height: 4px; }
          100% { height: 14px; }
        }
      `}</style>
    </>
  );
}
