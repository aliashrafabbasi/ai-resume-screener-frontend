import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-surface-950" />

      <motion.div
        className="absolute -top-60 -right-60 h-[600px] w-[600px] rounded-full bg-primary-600/[0.07] blur-[150px]"
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute -bottom-60 -left-60 h-[600px] w-[600px] rounded-full bg-accent-500/[0.06] blur-[150px]"
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 40, -30, 0],
          scale: [1, 0.9, 1.15, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute top-1/3 left-1/4 h-[400px] w-[400px] rounded-full bg-purple-500/[0.04] blur-[130px]"
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -20, 40, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute right-1/4 bottom-1/3 h-[350px] w-[350px] rounded-full bg-primary-400/[0.04] blur-[120px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-primary-950)_0%,_transparent_50%)] opacity-50" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}
