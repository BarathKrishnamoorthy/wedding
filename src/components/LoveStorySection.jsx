import React from "react";
import { Heart, Sparkles, Coffee, Sunset, Users, HeartHandshake, Film, Clapperboard } from "lucide-react";
import { WEDDING_CONFIG } from "../config/weddingData";

// export default function LoveStorySection() {
//   const chapterTitles = [
//     "Episode I: The Besant Nagar Spark",
//     "Episode II: Twilight on the ECR Coast",
//     "Episode III: Two Dynasties Unite",
//     "The Grand Climax: Siva Weds Kani"
//   ];

//   const milestoneIcons = [Coffee, Sunset, Users, HeartHandshake];

//   return (
//     <section id="story" style={{ padding: "10px 0 70px" }}>
//       <div className="wrap">
//         <div className="eyebrow">
//           <Clapperboard size={14} color="var(--gold)" />
//           <span>Cinematic Romance</span>
//           <Clapperboard size={14} color="var(--gold)" />
//         </div>
//         <h2 className="h2-title">Our Love Story</h2>

//         <div style={{ position: "relative", marginTop: "36px" }}>
//           {/* Glowing Vertical Light Beam */}
//           <div
//             style={{
//               position: "absolute",
//               left: "26px",
//               top: "16px",
//               bottom: "16px",
//               width: "3px",
//               background: "linear-gradient(to bottom, #FFD700 0%, #E63946 50%, #FFD700 100%)",
//               boxShadow: "0 0 14px rgba(255, 215, 0, 0.7)"
//             }}
//           />

//           <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
//             {WEDDING_CONFIG.story.map((item, index) => {
//               const IconComponent = milestoneIcons[index % milestoneIcons.length] || Heart;

//               return (
//                 <div
//                   key={index}
//                   style={{
//                     position: "relative",
//                     paddingLeft: "66px"
//                   }}
//                 >
//                   {/* Glowing Node Disc */}
//                   <div
//                     style={{
//                       position: "absolute",
//                       left: "6px",
//                       top: "4px",
//                       width: "44px",
//                       height: "44px",
//                       borderRadius: "50%",
//                       background: "linear-gradient(135deg, #FFD700 0%, #E5A93C 100%)",
//                       boxShadow: "0 0 25px rgba(255, 215, 0, 0.8), 0 0 10px #FFFFFF",
//                       display: "grid",
//                       placeItems: "center",
//                       color: "#1A050B",
//                       zIndex: 2,
//                       border: "2px solid #FFFFFF"
//                     }}
//                   >
//                     <IconComponent size={20} color="#1A050B" />
//                   </div>

//                   {/* Cinematic Story Card */}
//                   <div
//                     className="kasavu-card"
//                     style={{
//                       padding: "24px 26px",
//                       border: "1px solid var(--line-strong)",
//                       boxShadow: "var(--shadow-md)"
//                     }}
//                   >
//                     <div
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "space-between",
//                         marginBottom: "8px",
//                         flexWrap: "wrap",
//                         gap: "8px"
//                       }}
//                     >
//                       <span
//                         style={{
//                           fontSize: "11px",
//                           fontWeight: "800",
//                           letterSpacing: "0.2em",
//                           textTransform: "uppercase",
//                           color: "var(--gold)",
//                           display: "flex",
//                           alignItems: "center",
//                           gap: "4px"
//                         }}
//                       >
//                         <Film size={12} /> {chapterTitles[index]}
//                       </span>

//                       <span
//                         style={{
//                           fontSize: "11.5px",
//                           fontWeight: "900",
//                           letterSpacing: "0.14em",
//                           color: "#FFFDF9",
//                           background: "var(--accent)",
//                           padding: "3px 12px",
//                           borderRadius: "100px",
//                           boxShadow: "0 0 12px rgba(230, 57, 70, 0.5)"
//                         }}
//                       >
//                         {item.year}
//                       </span>
//                     </div>

//                     <h4
//                       className="font-serif"
//                       style={{
//                         fontSize: "20px",
//                         fontStyle: "italic",
//                         color: "var(--gold-light)",
//                         marginBottom: "8px",
//                         textShadow: "0 0 10px rgba(255, 215, 0, 0.3)"
//                       }}
//                     >
//                       {item.title}
//                     </h4>

//                     <p
//                       style={{
//                         fontSize: "14.5px",
//                         color: "var(--ink-soft)",
//                         lineHeight: "1.65",
//                         margin: 0
//                       }}
//                     >
//                       {item.description}
//                     </p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
