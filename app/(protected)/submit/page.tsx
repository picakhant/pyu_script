import SeasonalBanner from "@/components/SeasonalBanner";
import SubmitForm from "@/components/SubmitForm";

export default function SubmitPage() {
  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in-up pb-12">
      {/*  1. Full Page Cover Banner */}
      <div className="w-full h-32 md:h-48 bg-linear-to-r from-base-200 to-base-100 rounded-3xl border border-base-content/5 relative overflow-hidden shadow-sm">
        <SeasonalBanner />

        {/* Banner Text Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12 z-10">
          <h1 className="text-xl md:text-4xl font-black text-base-content tracking-tight">
            Initialize Project
          </h1>
          <p className="text-base-content/60 md:text-lg text-sm mt-1 max-w-lg">
            Submit your GitHub repository. Our system will automatically extract
            your title, tech stack, and description.
          </p>
        </div>
      </div>

      {/*  2. Minimalist Form Area */}
      <div className="mt-8 px-4 md:px-12 grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Left Side: Explainer & Myanmar Hint */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-base-content">
              Zero Friction Submit
            </h3>
            <p className="text-base-content/60 leading-relaxed mt-2">
              Just paste your public GitHub repository link. We use the GitHub
              API to read your project's name, description, and the programming
              languages you used.
            </p>
          </div>

          <div className="bg-base-200/50 p-4 rounded-2xl border border-base-content/5">
            <p className="text-xs font-bold text-base-content/50 uppercase tracking-widest mb-3">
              What we extract:
            </p>
            <ul className="space-y-2 text-sm text-base-content/80 font-mono">
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> Project Title
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> Description
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> Tech Stack (Languages)
              </li>
            </ul>
          </div>

          {/*  The Myanmar README Hint Alert */}
          <div className="bg-info/10 p-4 rounded-2xl border border-info/20 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-info"></div>
            <p className="text-sm text-base-content/80 leading-relaxed font-medium">
              <span className="text-xl mr-2">💡</span>
              <strong className="font-bold text-info">အကြံပြုချက်:</strong>
              <br className="mb-1" />
              နောက်ပိုင်း Project Detail ကို နှိပ်ကြည့်တဲ့အခါ အသေးစိတ်
              ဖတ်လို့ကောင်းအောင် GitHub Repo ထဲမှာ{" "}
              <code className="bg-base-300 px-1.5 py-0.5 rounded text-xs font-mono text-base-content">
                README.md
              </code>{" "}
              ဖိုင်လေး ရေးထားဖို့ အကြံပေးချင်ပါတယ်။ (မပါလည်း တင်လို့တော့
              ရပါတယ်)။
            </p>
          </div>
        </div>

        {/* Right Side: The Client Form */}
        <div className="lg:col-span-3">
          <SubmitForm />
        </div>
      </div>
    </div>
  );
}
