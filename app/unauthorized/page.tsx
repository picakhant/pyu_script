import { adminTelegramAccount } from "@/utils/infoContact";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-6 md:p-12 lg:p-24">
      {/* Page Container: Grid layout for Desktop (2 columns), Stacked for Mobile (1 column) */}
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center animate-fade-in-up">
        {/* Left Section: Icon, Title & Description */}
        <div className="space-y-8 text-center lg:text-left">
          {/* Subtle Error Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-error/10 text-error rounded-4xl rotate-3 hover:rotate-0 transition-transform duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 md:h-12 md:w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-base-content tracking-tight">
              ဝင်ရောက်ခွင့် မရှိပါ
            </h1>
            <p className="text-lg md:text-xl text-base-content/70 leading-relaxed max-w-xl mx-auto lg:mx-0">
              မင်းရဲ့ GitHub အကောင့် (Email) ဟာ ကျောင်းသား Allowlist စာရင်းထဲမှာ
              မပါဝင်သေးပါဘူး။ ဒါဟာ{" "}
              <span className="font-semibold text-primary">UCS Pyay</span>{" "}
              ကျောင်းသားများအတွက် သီးသန့်ပြုလုပ်ထားတဲ့ Private System ဖြစ်ပါတယ်။
            </p>
          </div>
        </div>

        {/* Right Section: Steps & Actions (No Card Borders) */}
        <div className="flex flex-col space-y-10">
          <div className="space-y-8">
            <h3 className="font-bold text-2xl md:text-3xl text-base-content flex items-center justify-center lg:justify-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-primary"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              အကောင့်ဖွင့်ရန် အဆင့်များ
            </h3>

            {/* Seamless List */}
            <ul className="space-y-6 text-base md:text-lg text-base-content/80">
              <li className="flex gap-5 items-start">
                <span className="bg-primary/10 text-primary border border-primary/20 w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 shadow-sm mt-0.5">
                  1
                </span>
                <p className="pt-1.5">
                  အောက်ပါ Telegram လင့်ခ်မှတစ်ဆင့် Admin{" "}
                  <span className="font-semibold text-primary">(Aster)</span> ထံ
                  ဆက်သွယ်ပါ။
                </p>
              </li>
              <li className="flex gap-5 items-start">
                <span className="bg-primary/10 text-primary border border-primary/20 w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 shadow-sm mt-0.5">
                  2
                </span>
                <p className="pt-1.5">
                  မင်းရဲ့{" "}
                  <span className="font-semibold text-base-content">
                    ခုံနံပါတ် (Row Number)
                  </span>{" "}
                  နှင့်{" "}
                  <span className="font-semibold text-base-content">
                    GitHub ဖွင့်ထားသော Email
                  </span>{" "}
                  ကို ပေးပို့ပါ။
                </p>
              </li>
              <li className="flex gap-5 items-start">
                <span className="bg-primary/10 text-primary border border-primary/20 w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 shadow-sm mt-0.5">
                  3
                </span>
                <p className="pt-1.5">
                  Admin မှ အတည်ပြုပြီးပါက Website သို့ ပြန်လည် Login
                  ဝင်နိုင်ပါပြီ။
                </p>
              </li>
            </ul>
          </div>

          {/* Action Buttons: Stacked on mobile, side-by-side on larger screens */}
          <div className="flex flex-row gap-4 pt-2">
            <a
              href={`https://t.me/${adminTelegramAccount}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary w-1/2 md:btn-lg font-bold rounded-full shadow-[0_0_20px_rgba(var(--p),0.2)] hover:scale-[1.02] transition-transform"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.94z" />
              </svg>
              Telegram
            </a>

            <Link
              href="/"
              className="btn btn-ghost border-base-content/20 w-1/2 md:btn-lg rounded-full hover:bg-base-content/10 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
