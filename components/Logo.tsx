export default function Logo({
  className = "w-10 h-auto",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer Vault (Hexagon Base) - Keeps the secure container vibe */}
      <polygon
        points="50,5 95,31 95,69 50,95 5,69 5,31"
        fill="none"
        stroke="currentColor"
        className="text-base-content/10"
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* Glowing Accent Line (Top Right) */}
      <path
        d="M 50 5 L 95 31 L 95 40"
        fill="none"
        stroke="currentColor"
        className="text-primary"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* The Letter 'P' - Sharp Circuit Trace (Left Side) */}
      {/* Mathematical precision: X ranges from 30 to 47 */}
      <path
        d="M 30 65 V 35 H 42 L 47 40 V 45 L 42 50 H 30"
        fill="none"
        stroke="currentColor"
        className="text-primary"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* The Letter 'S' - Sharp Circuit Trace (Right Side) */}
      {/* Mathematical precision: X ranges from 53 to 70 */}
      <path
        d="M 70 35 H 58 L 53 40 V 45 L 58 50 H 65 L 70 55 V 60 L 65 65 H 53"
        fill="none"
        stroke="currentColor"
        className="text-base-content"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Terminal Blinking Cursor - Under the 'S' */}
      <path
        d="M 53 75 H 70"
        fill="none"
        stroke="currentColor"
        className="text-primary animate-pulse"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}
