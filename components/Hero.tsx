"use client";

import { account } from "@/lib/appwrite.client";
import { useState } from "react";

export default function Hero() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGitHubLogin = () => {
    setIsLoading(true);
    account.createOAuth2Token({
      provider: "github" as any,
      success: `${window.location.origin}/api/oauth`,
      failure: `${window.location.origin}/`,
    });
  };

  return (
    <div className="relative min-h-[75vh] flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Background Subtle Center Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-150 max-h-150bg-primary/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>

      {/* Main Content Wrapper */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center">
        {/* Subtle Developer Badge */}
        <div className="animate-fade-in-up inline-flex items-center gap-2 px-5 py-2 rounded-full bg-base-200/50 border border-base-content/10 text-sm font-mono text-base-content/70 mb-8 backdrop-blur-sm shadow-sm">
          <span className="text-primary font-bold">&gt;</span>
          ~/ucs-pyay/projects
          <span className="w-1.5 h-4 bg-primary animate-pulse ml-1 rounded-sm"></span>
        </div>

        <h1 className="animate-fade-in-up delay-100 text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter text-base-content mb-6">
          Pyu Script<span className="text-primary">_</span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-up delay-200 text-lg sm:text-xl md:text-2xl opacity-80 max-w-2xl leading-relaxed mb-12 text-base-content/70">
          Built for convenience. UCS Pyay ကျောင်းသားများ ရေးသားထားသော Project
          လေးများကို တစ်စုတစ်စည်းတည်း အလွယ်တကူ ရှာဖွေကြည့်ရှုနိုင်မယ့်{" "}
          <span className="font-mono text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
            &lt;PyuScript /&gt;
          </span>
        </p>

        <div className="animate-fade-in-up delay-300 flex flex-col items-center gap-6 w-full">
          <button
            onClick={handleGitHubLogin}
            disabled={isLoading}
            className="btn bg-base-content text-base-100 hover:bg-base-content/80 hover:scale-[1.02] btn-lg rounded-full px-8 md:px-10 shadow-[0_0_20px_rgba(var(--bc),0.1)] transition-all border-none font-bold text-base md:text-lg flex items-center gap-3"
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            )}
            {isLoading ? "Connecting..." : "Continue with GitHub"}
          </button>

          {/* Helpful text */}
          <p className="text-sm text-base-content/60 flex items-center gap-2">
            Need an invite code?{" "}
            <a
              href="https://t.me/your_ucs_group"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline transition-colors flex items-center gap-1 font-semibold"
            >
              Request via Telegram
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
