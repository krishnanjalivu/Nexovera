interface LogoProps {
  className?: string;
  height?: number;
}

export function Logo({ className = '', height = 32 }: LogoProps) {
  return (
    <svg
      className={className}
      width={height}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <filter id="logoGlow">
          <feGaussianBlur stdDeviation="0.5" result="blur" />
          <feFlood floodColor="#7c3aed" floodOpacity="0.3" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Product-inspired: continuous biomarker signal (pulse/waveform) + monitoring nodes */}
      {/* Central waveform - like a vital sign / biomarker stream */}
      <path
        d="M6 16c0 0 2-4 6-4s6 4 6 4 2 4 6 4 6-4 6-4"
        fill="none"
        stroke="url(#logoGrad)"
        strokeWidth="0.6"
        strokeLinecap="round"
        filter="url(#logoGlow)"
      />
      <path
        d="M6 16v-.5c0 0 2.5-3.5 6.5-3.5s6.5 3.5 6.5 3.5v.5"
        fill="none"
        stroke="url(#logoGrad)"
        strokeWidth="0.35"
        strokeLinecap="round"
        opacity="0.85"
      />
      {/* Monitoring nodes on the signal */}
      <circle cx="8" cy="16" r="1.4" fill="url(#logoGrad)" filter="url(#logoGlow)" opacity="0.95" />
      <circle cx="16" cy="12.5" r="1.5" fill="url(#logoGrad)" filter="url(#logoGlow)" opacity="0.95" />
      <circle cx="24" cy="16" r="1.4" fill="url(#logoGrad)" filter="url(#logoGlow)" opacity="0.95" />
      {/* Secondary nodes - connected insights */}
      <circle cx="12" cy="20" r="0.9" fill="url(#logoGrad)" opacity="0.9" />
      <circle cx="20" cy="20" r="0.9" fill="url(#logoGrad)" opacity="0.9" />
      {/* Thin connection lines (data flow / neural) */}
      <path d="M9.4 16 11 19.2" stroke="url(#logoGrad)" strokeWidth="0.22" opacity="0.8" />
      <path d="M16 13.9 14.5 19.2" stroke="url(#logoGrad)" strokeWidth="0.22" opacity="0.8" />
      <path d="M22.6 16 21 19.2" stroke="url(#logoGrad)" strokeWidth="0.22" opacity="0.8" />
      <path d="M12 19.2 14 19.2" stroke="url(#logoGrad)" strokeWidth="0.2" opacity="0.75" />
      <path d="M18 19.2 20 19.2" stroke="url(#logoGrad)" strokeWidth="0.2" opacity="0.75" />
    </svg>
  );
}
