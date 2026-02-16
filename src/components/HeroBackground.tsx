import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathsRef = useRef<SVGPathElement[]>([]);
  const nodesRef = useRef<SVGCircleElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const paths = pathsRef.current.filter(Boolean);
    const nodes = nodesRef.current.filter(Boolean);

    const tl = gsap.timeline({ repeat: -1 });

    paths.forEach((path, i) => {
      tl.to(path, {
        opacity: 0.2 + Math.random() * 0.4,
        duration: 2 + Math.random() * 2,
        ease: 'sine.inOut',
      }, i * 0.1);
    });

    nodes.forEach((node, i) => {
      gsap.to(node, {
        scale: 1.2 + Math.random() * 0.3,
        opacity: 0.6 + Math.random() * 0.4,
        duration: 1.5 + Math.random(),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.2,
      });
    });

    gsap.to(container, {
      backgroundPosition: '100% 100%',
      duration: 20,
      ease: 'none',
      repeat: -1,
    });

    return () => { tl.kill(); };
  }, []);

  const nodePositions = [
    [20, 25], [40, 15], [60, 30], [80, 20], [35, 45], [65, 50], [50, 65], [25, 70], [75, 75],
  ];

  const pathD = [
    'M 20 25 Q 40 15 60 30',
    'M 40 15 Q 50 30 65 50',
    'M 60 30 Q 70 40 75 75',
    'M 35 45 Q 50 55 65 50',
    'M 25 70 Q 40 60 50 65',
    'M 80 20 Q 75 45 65 50',
    'M 50 65 Q 60 70 75 75',
    'M 20 25 Q 30 50 35 45',
  ];

  return (
    <div
      ref={containerRef}
      className="hero-background"
      aria-hidden="true"
    >
      <div className="hero-background-gradient" />
      <svg
        className="hero-neural-svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="pathGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {pathD.map((d, i) => (
          <path
            key={i}
            ref={(el) => { if (el) pathsRef.current[i] = el; }}
            d={d}
            fill="none"
            stroke="url(#pathGrad1)"
            strokeWidth="0.3"
            opacity="0.4"
          />
        ))}
        {nodePositions.map(([cx, cy], i) => (
          <circle
            key={i}
            ref={(el) => { if (el) nodesRef.current[i] = el; }}
            cx={cx}
            cy={cy}
            r="1.2"
            fill="url(#pathGrad1)"
            filter="url(#glow)"
          />
        ))}
      </svg>
    </div>
  );
}
