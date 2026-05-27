import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ScoreCircleProps {
  score: number;
  maxScore: number;
  label: string;
  size?: 'sm' | 'lg';
  delay?: number;
}

export default function ScoreCircle({
  score,
  maxScore,
  label,
  size = 'sm',
  delay = 0,
}: ScoreCircleProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const percentage = Math.min((score / maxScore) * 100, 100);

  const dimensions = size === 'lg' ? 150 : 100;
  const strokeWidth = size === 'lg' ? 10 : 7;
  const radius = (dimensions - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const getColor = (pct: number) => {
    if (pct >= 70) return { main: '#10b981', glow: 'rgba(16,185,129,0.3)', text: 'text-accent-400' };
    if (pct >= 40) return { main: '#f59e0b', glow: 'rgba(245,158,11,0.3)', text: 'text-warning-400' };
    return { main: '#ef4444', glow: 'rgba(239,68,68,0.3)', text: 'text-danger-400' };
  };

  const c = getColor(percentage);

  useEffect(() => {
    const dur = 1500;
    const start = Date.now();
    const timer = setInterval(() => {
      const p = Math.min((Date.now() - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setDisplayScore(Number((score * eased).toFixed(1)));
      if (p >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [score]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay, type: 'spring', stiffness: 100 }}
      className="flex flex-col items-center"
    >
      <div
        className="relative"
        style={{ width: dimensions, height: dimensions }}
      >
        <svg width={dimensions} height={dimensions} className="-rotate-90">
          <circle
            cx={dimensions / 2}
            cy={dimensions / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={dimensions / 2}
            cy={dimensions / 2}
            r={radius}
            fill="none"
            stroke={c.main}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - (circumference * percentage) / 100 }}
            transition={{ duration: 1.5, delay: delay + 0.2, ease: 'easeOut' }}
            style={{ filter: `drop-shadow(0 0 8px ${c.glow})` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`${size === 'lg' ? 'text-3xl' : 'text-xl'} font-extrabold tabular-nums ${c.text}`}>
            {displayScore}
          </span>
          <span className="text-[10px] text-surface-500">/ {maxScore}</span>
        </div>
      </div>
      <p className={`mt-2 text-center ${size === 'lg' ? 'text-sm font-semibold' : 'text-xs font-medium'} text-surface-400`}>
        {label}
      </p>
    </motion.div>
  );
}
