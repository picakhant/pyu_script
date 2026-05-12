// components/ToastProvider.tsx
"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="bottom-center"
      reverseOrder={false}
      toastOptions={{
        // 🌟 DaisyUI ရဲ့ Night Theme နဲ့ တစ်သားတည်းဖြစ်အောင် Tailwind Classes တွေနဲ့ ဖိရေးလိုက်တာပါ (!important သုံးထားတယ်)
        className:
          "!bg-base-300 !text-base-content !border !border-base-content/10 !shadow-xl !rounded-2xl !font-mono !text-sm",
        duration: 4000,
        success: {
          iconTheme: {
            primary: "#38bdf8", // Tailwind 'light blue' (Night theme နဲ့ လိုက်ဖက်အောင်)
            secondary: "#0f172a", // Dark background
          },
        },
        error: {
          iconTheme: {
            primary: "#fb7185", // Tailwind 'rose'
            secondary: "#0f172a",
          },
        },
      }}
    />
  );
}
