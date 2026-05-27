import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface SkillBadgeProps {
  skill: string;
  matched: boolean;
  index: number;
}

export default function SkillBadge({ skill, matched, index }: SkillBadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.04 * index, type: 'spring', stiffness: 150 }}
      whileHover={{ scale: 1.06, y: -1 }}
      className={`inline-flex cursor-default items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
        matched
          ? 'border-accent-500/30 bg-accent-500/10 text-accent-400 hover:bg-accent-500/15'
          : 'border-danger-500/25 bg-danger-500/8 text-danger-400 hover:bg-danger-500/12'
      }`}
    >
      {matched ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
      <span className="capitalize">{skill}</span>
    </motion.span>
  );
}
