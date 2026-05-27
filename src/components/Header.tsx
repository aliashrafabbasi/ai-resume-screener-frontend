import { motion } from 'framer-motion';
import { Brain, Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 border-b border-white/[0.06] bg-surface-950/70 backdrop-blur-2xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-lg shadow-primary-500/25">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <motion.div
              className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-surface-950 bg-accent-400"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <div>
            <h1 className="text-lg font-extrabold tracking-tight text-white">
              AI Resume Screener
            </h1>
            <p className="text-[11px] font-medium text-surface-500">
              Intelligent Hiring Assistant
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2">
          <Sparkles className="h-3.5 w-3.5 text-primary-400" />
          <span className="text-xs font-semibold text-surface-300">
            Smart Analysis
          </span>
          <div className="h-1.5 w-1.5 rounded-full bg-accent-400 animate-pulse" />
        </div>
      </div>
    </motion.header>
  );
}
