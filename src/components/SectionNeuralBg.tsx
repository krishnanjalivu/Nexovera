import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const PATHS: string[] = [
  'M 20 25 Q 45 20 70 30',
  'M 35 45 Q 55 50 75 55',
  'M 25 60 Q 50 65 70 70',
  'M 30 35 Q 50 45 65 40',
  'M 40 70 Q 60 55 80 65',
  'M 15 50 Q 50 40 85 55',
];

const NODES: [number, number][] = [
  [20, 25], [70, 30], [35, 45], [75, 55], [25, 60], [70, 70], [30, 35], [65, 40], [40, 70], [80, 65], [15, 50], [85, 55],
];

const WAVEFORMS: string[] = [
  'M 0 50 Q 25 45 50 50 Q 75 55 100 50',
  'M 0 65 Q 33 60 66 65 T 100 62',
  'M 0 35 Q 20 38 40 35 T 80 36 T 100 33',
];

interface SectionNeuralBgProps {
  id: string;
}

export function SectionNeuralBg({ id }: SectionNeuralBgProps) {
  const pathsRef = useRef<SVGPathElement[]>([]);
  const nodesRef = useRef<SVGCircleElement[]>([]);
  const wavesRef = useRef<SVGPathElement[]>([]);

  useEffect(() => {
    const paths = pathsRef.current.filter(Boolean);
    const nodes = nodesRef.current.filter(Boolean);
    const waves = wavesRef.current.filter(Boolean);

    paths.forEach((path, i) => {
      gsap.to(path, {
        opacity: 0.04 + (i % 2) * 0.02,
        duration: 5 + i * 0.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.9,
      });
    });

    nodes.forEach((node, i) => {
      gsap.to(node, {
        opacity: 0.06 + (i % 3) * 0.02,
        duration: 4.5 + (i % 2) * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.7,
      });
    });

    waves.forEach((wave, i) => {
      gsap.to(wave, {
        opacity: 0.03 + (i % 2) * 0.02,
        duration: 6 + i * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 1.5,
      });
    });

    return () => gsap.killTweensOf([...paths, ...nodes, ...waves]);
  }, []);

  return (
    <div className="section-neural-bg" aria-hidden="true">
      <svg
        className="section-neural-svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={`sectionGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6d28d9" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.5" />
          </linearGradient>
          <filter id={`sectionGlow-${id}`}>
            <feGaussianBlur stdDeviation="0.25" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g className="section-neural-layer" opacity="0.85">
          {WAVEFORMS.map((d, i) => (
            <path
              key={`w-${i}`}
              ref={(el) => { if (el) wavesRef.current[i] = el; }}
              d={d}
              fill="none"
              stroke={`url(#sectionGrad-${id})`}
              strokeWidth="0.18"
              opacity="0.05"
            />
          ))}
          {PATHS.map((d, i) => (
            <path
              key={`p-${i}`}
              ref={(el) => { if (el) pathsRef.current[i] = el; }}
              d={d}
              fill="none"
              stroke={`url(#sectionGrad-${id})`}
              strokeWidth="0.18"
              opacity="0.06"
            />
          ))}
          {NODES.map(([cx, cy], i) => (
            <circle
              key={`n-${i}`}
              ref={(el) => { if (el) nodesRef.current[i] = el; }}
              cx={cx}
              cy={cy}
              r="0.5"
              fill={`url(#sectionGrad-${id})`}
              filter={`url(#sectionGlow-${id})`}
              opacity="0.1"
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
