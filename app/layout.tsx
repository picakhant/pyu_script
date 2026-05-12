import ToastProvider from "@/components/ToastProvider";
import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  // metadataBase to find Next.js OG Image
  metadataBase: new URL("https://pyu-script.vercel.app"),
  title: "PyuScript Vault | UCS Pyay",
  description:
    "Built for convenience. UCS Pyay ကျောင်းသားများရဲ့ Project လေးများကို တစ်စုတစ်စည်းတည်း အလွယ်တကူ ရှာဖွေ၊ မျှဝေ၊ မှတ်တမ်းတင်နိုင်မယ့် ဒစ်ဂျစ်တယ်ကျောက်စာတိုင်လေး။",
  keywords: [
    "UCS Pyay",
    "Pyu Script",
    "PyuScript Vault",
    "Student Projects",
    "Myanmar Students",
    "Computer Science",
    "Web Development",
    "Aster",
  ],
  authors: [{ name: "Aster" }],

  openGraph: {
    title: "PyuScript Vault | UCS Pyay",
    description:
      "UCS Pyay ကျောင်းသားများရဲ့ Project လေးများကို တစ်စုတစ်စည်းတည်း အလွယ်တကူ ရှာဖွေ၊ မျှဝေ၊ မှတ်တမ်းတင်နိုင်မယ့် ဒစ်ဂျစ်တယ်ကျောက်စာတိုင်လေး။",
    siteName: "PyuScript Vault",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "PyuScript Vault | UCS Pyay",
    description:
      "UCS Pyay ကျောင်းသားများရဲ့ Project လေးများကို တစ်စုတစ်စည်းတည်း အလွယ်တကူ ရှာဖွေ၊ မျှဝေ၊ မှတ်တမ်းတင်နိုင်မယ့် ဒစ်ဂျစ်တယ်ကျောက်စာတိုင်လေး။",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="night" lang="en" className={` h-full antialiased`}>
      <body className="min-h-full relative flex flex-col">
        {/* 🌟 Modern Dotted Pattern Background (Next.js/Vercel Style) */}
        <div
          className="absolute inset-0 z-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1.5px, transparent 0)`,

            backgroundSize: "48px 48px",

            maskImage:
              "radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, transparent 100%)",
          }}
        ></div>
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}
