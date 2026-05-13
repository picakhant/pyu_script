"use client";

import { useEffect, useState } from "react";

export default function SeasonalBanner() {
  const [season, setSeason] = useState("padauk");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const month: number = new Date().getMonth();

    if (month >= 5 && month <= 9) {
      setSeason("rain");
    } else if (month === 11 || month <= 1) {
      setSeason("snow");
    } else {
      setSeason("padauk");
    }
  }, []);

  if (!mounted) return <div className="absolute inset-0 bg-transparent"></div>;

  const colorClass =
    season === "rain"
      ? "text-primary"
      : season === "snow"
        ? "text-base-content"
        : "text-warning";

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none opacity-20 sm:opacity-40 ${colorClass}`}
    >
      <style>{`
        .organic-layer {
          position: absolute;
          /* 🌟 OPTIMIZED: height ကို ပိုရှည်အောင်လုပ်ထားပြီး transform နဲ့ ရွှေ့မှာပါ */
          top: -100%;
          left: -100%;
          width: 300%;
          height: 300%;
          /* 🌟 OPTIMIZED: GPU ကို သုံးဖို့ hint ပေးထားတာပါ */
          will-change: transform; 
        }

        /* 🌟 THE GRID SHATTERER: (Default Base) */
        .layer-1 { 
          background-image: 
            radial-gradient(circle at 20% 30%, currentColor 1.5px, transparent 0),
            radial-gradient(circle at 70% 80%, currentColor 1px, transparent 0),
            radial-gradient(circle at 80% 20%, currentColor 2px, transparent 0);
          background-size: 113px 113px; 
        }
        .layer-2 { 
          background-image: 
            radial-gradient(circle at 40% 10%, currentColor 1.5px, transparent 0),
            radial-gradient(circle at 10% 60%, currentColor 2px, transparent 0),
            radial-gradient(circle at 90% 50%, currentColor 1.5px, transparent 0);
          background-size: 167px 167px; 
        }
        .layer-3 { 
          background-image: 
            radial-gradient(circle at 50% 50%, currentColor 2px, transparent 0),
            radial-gradient(circle at 30% 90%, currentColor 1.5px, transparent 0),
            radial-gradient(circle at 80% 80%, currentColor 1px, transparent 0);
          background-size: 227px 227px; 
        }

        /* 🌟 OPTIMIZED ANIMATIONS: background-position အစား transform: translate ကို ပြောင်းသုံးထားပါတယ် */
        
        /* 🍃 Padauk / Falling Leaves */
        @keyframes petal-fall-1 { 0% { transform: translate(0, 0); opacity: 0; } 20% { opacity: 0.8; } 80% { opacity: 0.8; } 100% { transform: translate(120px, 250px); opacity: 0; } }
        @keyframes petal-fall-2 { 0% { transform: translate(0, 0); opacity: 0; } 20% { opacity: 0.5; } 80% { opacity: 0.5; } 100% { transform: translate(-100px, 300px); opacity: 0; } }
        @keyframes petal-fall-3 { 0% { transform: translate(0, 0); opacity: 0; } 20% { opacity: 0.9; } 80% { opacity: 0.9; } 100% { transform: translate(80px, 200px); opacity: 0; } }

        /* ❄️ Snow */
        @keyframes drift-down-1 { 0% { transform: translate(0, 0); opacity: 0; } 20% { opacity: 0.8; } 80% { opacity: 0.8; } 100% { transform: translate(30px, 150px); opacity: 0; } }
        @keyframes drift-down-2 { 0% { transform: translate(0, 0); opacity: 0; } 20% { opacity: 0.5; } 80% { opacity: 0.5; } 100% { transform: translate(-20px, 200px); opacity: 0; } }
        @keyframes drift-down-3 { 0% { transform: translate(0, 0); opacity: 0; } 20% { opacity: 0.9; } 80% { opacity: 0.9; } 100% { transform: translate(-40px, 100px); opacity: 0; } }

        /* 💧 Rain Fall */
        @keyframes rain-fall-1 { 0% { transform: translate(0, 0); opacity: 0; } 10% { opacity: 0.6; } 90% { opacity: 0.6; } 100% { transform: translate(20px, 300px); opacity: 0; } }
        @keyframes rain-fall-2 { 0% { transform: translate(0, 0); opacity: 0; } 10% { opacity: 0.4; } 90% { opacity: 0.4; } 100% { transform: translate(30px, 400px); opacity: 0; } }
        @keyframes rain-fall-3 { 0% { transform: translate(0, 0); opacity: 0; } 10% { opacity: 0.8; } 90% { opacity: 0.8; } 100% { transform: translate(15px, 250px); opacity: 0; } }


        /* 🌟 MEDIA QUERY: ဖုန်းတွေမှာ (Screen အကျယ် 768px အောက်) Animation ကို လုံးဝ ပိတ်ထားပါမယ် */
        @media (max-width: 767px) {
           .season-snow .layer-1, .season-snow .layer-2, .season-snow .layer-3,
           .season-padauk .layer-1, .season-padauk .layer-2, .season-padauk .layer-3,
           .season-rain .layer-1, .season-rain .layer-2, .season-rain .layer-3 {
               animation: none !important;
               /* အစက်လေးတွေ အငြိမ်ပဲ ပေါ်နေအောင် opacity နည်းနည်းထားပေးထားပါတယ် */
               opacity: 0.5; 
           }
        }

        /* 🌟 Tablet & PC အတွက် Animations တွေ (768px နဲ့ အထက်မှ အလုပ်လုပ်မယ်) */
        @media (min-width: 768px) {
            /* Snow */
            .season-snow .layer-1 { animation: drift-down-1 12s linear infinite -2s; }
            .season-snow .layer-2 { animation: drift-down-2 16s linear infinite -7s; }
            .season-snow .layer-3 { animation: drift-down-3 20s linear infinite -11s; }

            /* Padauk */
            .season-padauk .layer-1 { 
            background-image: 
                radial-gradient(ellipse 3px 2px at 20% 30%, currentColor, transparent),
                radial-gradient(ellipse 2px 3px at 70% 80%, currentColor, transparent),
                radial-gradient(ellipse 3px 2px at 80% 20%, currentColor, transparent);
            animation: petal-fall-1 12s linear infinite -2s; 
            }
            .season-padauk .layer-2 { 
            background-image: 
                radial-gradient(ellipse 2px 3px at 40% 10%, currentColor, transparent),
                radial-gradient(ellipse 3px 2px at 10% 60%, currentColor, transparent),
                radial-gradient(ellipse 2px 3px at 90% 50%, currentColor, transparent);
            animation: petal-fall-2 16s linear infinite -7s; 
            }
            .season-padauk .layer-3 { 
            background-image: 
                radial-gradient(ellipse 3px 2px at 50% 50%, currentColor, transparent),
                radial-gradient(ellipse 2px 3px at 30% 90%, currentColor, transparent),
                radial-gradient(ellipse 3px 2px at 80% 80%, currentColor, transparent);
            animation: petal-fall-3 20s linear infinite -11s; 
            }

            /* Rain */
            .season-rain .layer-1 { 
            background-image: 
                radial-gradient(ellipse 1px 4px at 20% 30%, currentColor, transparent),
                radial-gradient(ellipse 1px 5px at 70% 80%, currentColor, transparent),
                radial-gradient(ellipse 1px 3px at 80% 20%, currentColor, transparent);
            animation: rain-fall-1 2s linear infinite -0.5s; 
            }
            .season-rain .layer-2 { 
            background-image: 
                radial-gradient(ellipse 1px 4px at 40% 10%, currentColor, transparent),
                radial-gradient(ellipse 1px 5px at 10% 60%, currentColor, transparent),
                radial-gradient(ellipse 1px 3px at 90% 50%, currentColor, transparent);
            animation: rain-fall-2 2.5s linear infinite -1.2s; 
            }
            .season-rain .layer-3 { 
            background-image: 
                radial-gradient(ellipse 1px 4px at 50% 50%, currentColor, transparent),
                radial-gradient(ellipse 1px 5px at 30% 90%, currentColor, transparent),
                radial-gradient(ellipse 1px 3px at 80% 80%, currentColor, transparent);
            animation: rain-fall-3 1.5s linear infinite -0.8s; 
            }
        }
      `}</style>

      <div className={`w-full h-full relative season-${season}`}>
        <div className="organic-layer layer-1"></div>
        <div className="organic-layer layer-2"></div>
        <div className="organic-layer layer-3"></div>
      </div>
    </div>
  );
}
