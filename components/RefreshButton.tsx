"use client";

export default function RefreshButton() {
  return (
    <button
      onClick={() => window.location.reload()}
      className="btn btn-error btn-sm text-white rounded-full px-6  hover:scale-105 transition-all"
    >
      Retry Connection
    </button>
  );
}
