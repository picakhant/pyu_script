import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "PyuScript Vault - Secured Project Collection for UCS Pyay";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0F172A",
        padding: "80px",
      }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "250px", height: "250px", marginBottom: "40px" }}
      >
        <polygon
          points="50,5 95,31 95,69 50,95 5,69 5,31"
          fill="none"
          stroke="#334155"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Glowing Accent Line - text-primary အစား #38BDF8 (Cyan) */}
        <path
          d="M 50 5 L 95 31 L 95 40"
          fill="none"
          stroke="#38BDF8"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* The Letter 'P' */}
        <path
          d="M 30 65 V 35 H 42 L 47 40 V 45 L 42 50 H 30"
          fill="none"
          stroke="#38BDF8"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M 70 35 H 58 L 53 40 V 45 L 58 50 H 65 L 70 55 V 60 L 65 65 H 53"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M 53 75 H 70"
          fill="none"
          stroke="#38BDF8"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>

      <h1
        style={{
          fontSize: "64px",
          fontWeight: "bold",
          color: "#FFFFFF",
          margin: "0 0 20px 0",
          letterSpacing: "-0.05em",
        }}
      >
        PyuScript_Vault
      </h1>
      <p
        style={{
          fontSize: "32px",
          color: "#94A3B8", // slate-400
          textAlign: "center",
          maxWidth: "800px",
          lineHeight: 1.5,
          margin: 0,
        }}
      >
        Built for convenience. UCS Pyay ကျောင်းသားများရဲ့ Project လေးများကို
        တစ်စုတစ်စည်းတည်း မျှဝေမှတ်တမ်းတင်ရာ။
      </p>
    </div>,
    {
      ...size,
    },
  );
}
