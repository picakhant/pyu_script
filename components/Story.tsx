export default function Story() {
  return (
    <section className="relative py-16 sm:py-32 px-4 overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] max-w-3xl pointer-events-none z-0 opacity-20"
        style={{
          background:
            "radial-gradient(circle, var(--color-primary) 0%, transparent 60%)",
        }}
      ></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Tech-styled Header */}
        <div className="flex flex-col items-center mb-10 sm:mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-base-200/80 border border-base-content/10 text-xs font-mono text-base-content/60 mb-4">
            <span className="text-primary">#</span> our-history.md
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-base-content text-center">
            The Story Behind <span className="text-primary">Pyu Script</span>
          </h2>
        </div>

        <div className="relative bg-base-200/80 sm:bg-base-200/40 sm:backdrop-blur-xl rounded-3xl border border-base-content/10 p-6 sm:p-12 shadow-xl sm:shadow-2xl animate-fade-in-up delay-200">
          {/* Git-style Timeline / Vertical Line */}
          <div className="absolute left-16.75 top-16 bottom-16 w-0.5 bg-linear-to-b from-base-content/20 via-primary/50 to-base-content/20 hidden sm:block"></div>

          <div className="space-y-8 sm:space-y-12 text-base sm:text-lg opacity-90 leading-relaxed text-justify sm:text-left">
            {/* 1. The Ancient Root */}
            <div className="relative pl-0 sm:pl-16">
              <div className="absolute -left-6 top-1.5 w-4 h-4 rounded-full bg-base-200 border-2 border-base-content/30 hidden sm:block"></div>
              <p>
                ရှေးနှစ်ပေါင်းများစွာက သရေခေတ္တရာ (ပြည်) မြို့ဟောင်းမှာ
                ပညာရှိတွေဟာ ကျောက်စာတွေပေါ်မှာ{" "}
                <span className="text-primary font-bold font-mono bg-primary/10 px-1.5 py-0.5 rounded">
                  'ပျူစာ (Pyu Script)'
                </span>{" "}
                တွေနဲ့ သမိုင်းကို အခိုင်အမာ မှတ်တမ်းတင်ခဲ့ကြပါတယ်။
              </p>
            </div>

            {/* 2. The Modern Tech */}
            <div className="relative pl-0 sm:pl-16">
              <div className="absolute -left-6 top-1.5 w-4 h-4 rounded-full bg-base-200 border-2 border-primary/60 hidden sm:block"></div>
              <p>
                ယနေ့ခေတ်မှာတော့ UCS Pyay က နည်းပညာကျောင်းသားတွေဟာ Web ပေါ်မှာ{" "}
                <span className="text-primary font-bold font-mono bg-primary/10 px-1.5 py-0.5 rounded">
                  'Code တွေ၊ Script တွေ'
                </span>{" "}
                နဲ့ အနာဂတ်ကို တည်ဆောက်နေကြပါပြီ။
              </p>
            </div>

            {/* 3. The Bridge (Conclusion) */}
            <div className="relative pl-0 sm:pl-16">
              {/* LAYOUT FIX: Changed to `hidden sm:flex` so it doesn't overflow the screen on mobile */}
              <div className="absolute -left-7 top-0 w-6 h-6 rounded-full bg-primary/20 hidden sm:flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></div>
              </div>
              <p>
                ရှေးဟောင်းယဉ်ကျေးမှု အမွေအနှစ်နဲ့ ခေတ်သစ်နည်းပညာကို
                ပေါင်းကူးပေးထားတဲ့{" "}
                <span className="text-primary font-bold">Pyu Script</span> ဟာ
                ကျောင်းသားတွေရဲ့ Project လေးတွေကို တစ်စုတစ်စည်းတည်း အလွယ်တကူ
                မျှဝေမှတ်တမ်းတင်နိုင်မယ့် ကျွန်တော်တို့ရဲ့
                <span className="font-mono ml-1 border-b border-primary/50 pb-0.5">
                  ဒစ်ဂျစ်တယ်ကျောက်စာတိုင်လေး
                </span>{" "}
                ပဲ ဖြစ်ပါတယ်။
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
