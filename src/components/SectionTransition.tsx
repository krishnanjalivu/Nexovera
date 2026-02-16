import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const PATHS = [
  'M 0 20 Q 25 10 50 20 Q 75 30 100 20',
  'M 0 40 Q 50 25 100 40',
  'M 0 60 Q 25 70 50 60 Q 75 50 100 60',
  'M 0 30 Q 33 35 66 30 T 100 35',
  'M 0 50 Q 50 45 100 55',
];

const NODES: [number, number][] = [
  [10, 20], [30, 15], [50, 25], [70, 18], [90, 22],
  [20, 40], [50, 35], [80, 42],
  [15, 55], [45, 60], [75, 52], [95, 58],
];

export function SectionTransition() {
  const pathsRef = useRef<SVGPathElement[]>([]);
  const nodesRef = useRef<SVGCircleElement[]>([]);

  useEffect(() => {
    const paths = pathsRef.current.filter(Boolean);
    const nodes = nodesRef.current.filter(Boolean);

    paths.forEach((path, i) => {
      gsap.to(path, {
        opacity: 0.15 + (i % 2) * 0.1,
        duration: 3 + i * 0.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.3,
      });
    });

    nodes.forEach((node, i) => {
      gsap.to(node, {
        opacity: 0.25 + (i % 2) * 0.15,
        scale: 1.2,
        duration: 2.5 + (i % 2),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.25,
      });
    });

    return () => gsap.killTweensOf([...paths, ...nodes]);
  }, []);

  return (
    <div className="section-transition" aria-hidden="true">
      <div className="section-transition-gradient" />
      <svg
        className="section-transition-svg"
        viewBox="0 0 100 80"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="transitionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.7" />
          </linearGradient>
          <filter id="transitionGlow">
            <feGaussianBlur stdDeviation="0.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {PATHS.map((d, i) => (
          <path
            key={i}
            ref={(el) => { if (el) pathsRef.current[i] = el; }}
            d={d}
            fill="none"
            stroke="url(#transitionGrad)"
            strokeWidth="0.35"
            opacity="0.2"
          />
        ))}
        {NODES.map(([cx, cy], i) => (
          <circle
            key={i}
            ref={(el) => { if (el) nodesRef.current[i] = el; }}
            cx={cx}
            cy={cy}
            r="1.2"
            fill="url(#transitionGrad)"
            filter="url(#transitionGlow)"
            opacity="0.3"
          />
        ))}
      </svg>
    </div>
  );
}
