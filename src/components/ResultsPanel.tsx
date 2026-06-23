import { motion } from 'framer-motion';
import {
  User,
  Briefcase,
  Target,
  TrendingUp,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ChevronDown,
  RotateCcw,
  FileText,
  MessageSquareText,
  Zap,
  Award,
  ShieldCheck,
  ShieldX,
  ShieldAlert,
} from 'lucide-react';
import { useState } from 'react';
import type { ResumeAnalysis } from '../types';
import ScoreCircle from './ScoreCircle';
import SkillBadge from './SkillBadge';
import AnimatedCounter from './AnimatedCounter';

interface ResultsPanelProps {
  data: ResumeAnalysis;
  onReset: () => void;
}

function Card({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`rounded-2xl border border-surface-700 bg-surface-900 p-8 sm:p-10 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({ icon: Icon, title, iconColor = 'text-primary-400' }: { icon: React.ElementType; title: string; iconColor?: string }) {
  return (
    <div className="mb-10 flex items-center gap-4">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-800">
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </div>
      <h3 className="text-lg font-bold text-white">{title}</h3>
    </div>
  );
}

export default function ResultsPanel({ data, onReset }: ResultsPanelProps) {
  const [expandedFeedback, setExpandedFeedback] = useState(false);
  const { overall_score, semantic_match, skills_match } = data.score_breakdown;
  const overallPct = Math.min(Math.max(overall_score, 0), 100);
  const semanticPct = Math.min(Math.max(semantic_match, 0), 100);
  const skillsPct = Math.min(Math.max(skills_match, 0), 100);
  const skillMatchRate = data.required_skills.length
    ? Math.round((data.matched_skills.length / data.required_skills.length) * 100)
    : 0;

  const getDecisionConfig = () => {
    const d = data.hiring_decision.decision.toLowerCase();
    if (d.includes('recommend') && !d.includes('not'))
      return { ShieldIcon: ShieldCheck, Icon: CheckCircle2, gradient: 'from-accent-500 to-emerald-400', border: 'border-accent-500/40', text: 'text-accent-400', badge: 'bg-accent-500/15 text-accent-300 border-accent-500/30', bg: 'bg-accent-500/8' };
    if (d.includes('not'))
      return { ShieldIcon: ShieldX, Icon: XCircle, gradient: 'from-danger-400 to-rose-400', border: 'border-danger-500/40', text: 'text-danger-400', badge: 'bg-danger-500/15 text-danger-300 border-danger-500/30', bg: 'bg-danger-500/8' };
    return { ShieldIcon: ShieldAlert, Icon: AlertTriangle, gradient: 'from-warning-400 to-amber-400', border: 'border-warning-500/40', text: 'text-warning-400', badge: 'bg-warning-500/15 text-warning-300 border-warning-500/30', bg: 'bg-warning-500/8' };
  };

  const dc = getDecisionConfig();

  const formatFeedback = (text: string) =>
    text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
      .replace(/\n/g, '<br />');

  return (
    <div className="space-y-10 sm:space-y-12">

      {/* Refresh / New Analysis */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center pb-2"
      >
        <motion.button
          type="button"
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={onReset}
          className="group relative overflow-hidden rounded-2xl border border-primary-500/30 bg-gradient-to-r from-surface-800 via-surface-800 to-surface-900 px-3 py-3 pr-8 pl-3 shadow-lg shadow-primary-500/10 transition-shadow hover:border-primary-400/50 hover:shadow-xl hover:shadow-primary-500/20"
        >
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/10 to-primary-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <span className="relative flex items-center gap-4">
            <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-md shadow-primary-600/30 ring-1 ring-white/10">
              <RotateCcw
                className="h-5 w-5 text-white transition-transform duration-500 ease-out group-hover:-rotate-[360deg]"
              />
              <span className="absolute inset-0 rounded-xl bg-white/15 opacity-0 transition-opacity group-hover:opacity-100" />
            </span>

            <span className="flex flex-col items-start text-left">
              <span className="text-sm font-bold text-white transition-colors group-hover:text-primary-100">
                Screen New Resume
              </span>
              <span className="text-[11px] font-medium text-surface-400 group-hover:text-primary-300/80">
                Start a fresh analysis
              </span>
            </span>
          </span>
        </motion.button>
      </motion.div>

      {/* Decision Hero */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`overflow-hidden rounded-2xl border ${dc.border} ${dc.bg}`}
      >
        <div className="px-8 py-12 text-center sm:px-10 sm:py-16">
          <motion.div
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 120, delay: 0.2 }}
            className={`mx-auto mb-8 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${dc.gradient} shadow-lg`}
          >
            <dc.ShieldIcon className="h-8 w-8 text-white" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`text-2xl font-extrabold sm:text-3xl ${dc.text}`}
          >
            {data.hiring_decision.decision}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`mx-auto mt-5 inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-medium ${dc.badge}`}
          >
            <dc.Icon className="h-3.5 w-3.5" />
            {data.hiring_decision.recommendation}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mx-auto mt-12 grid max-w-md grid-cols-3 gap-6 sm:gap-8"
          >
            <div>
              <p className="text-2xl font-extrabold text-white sm:text-3xl">
                <AnimatedCounter value={overallPct} suffix="%" />
              </p>
              <p className="mt-1 text-xs text-surface-400">Match</p>
            </div>
            <div className="border-x border-surface-700">
              <p className="text-2xl font-extrabold text-white sm:text-3xl">
                <AnimatedCounter value={data.required_skills.length} />
              </p>
              <p className="mt-1 text-xs text-surface-400">Required</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-white sm:text-3xl">
                <AnimatedCounter value={skillMatchRate} suffix="%" />
              </p>
              <p className="mt-1 text-xs text-surface-400">Skills Hit</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Info Cards */}
      <div className="grid gap-6 sm:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-5 rounded-2xl border border-surface-700 bg-surface-900 p-6 sm:p-7"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-500/15">
            <User className="h-5 w-5 text-primary-400" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-surface-500">Resume</p>
            <p className="mt-0.5 truncate text-sm font-bold text-white">{data.filename}</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
          className="flex items-center gap-5 rounded-2xl border border-surface-700 bg-surface-900 p-6 sm:p-7"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-500/15">
            <Briefcase className="h-5 w-5 text-accent-400" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-surface-500">Detected Role</p>
            <p className="mt-0.5 truncate text-sm font-bold text-white">{data.detected_role}</p>
          </div>
        </motion.div>
      </div>

      {/* Score Breakdown */}
      <Card delay={0.3}>
        <SectionHeader icon={TrendingUp} title="Score Breakdown" />

        <div className="flex flex-col items-center gap-10 py-4 sm:flex-row sm:justify-center sm:gap-16">
          <ScoreCircle score={data.score_breakdown.overall_score} maxScore={100} label="Overall" size="lg" delay={0.3} />
          <div className="flex gap-10 sm:gap-14">
            <ScoreCircle score={data.score_breakdown.semantic_match} maxScore={100} label="Semantic" delay={0.5} />
            <ScoreCircle score={data.score_breakdown.skills_match} maxScore={100} label="Skills" delay={0.7} />
          </div>
        </div>

        <div className="mt-12 space-y-6">
          {[
            { label: 'Overall', pct: overallPct, delay: 0.6 },
            { label: 'Semantic', pct: semanticPct, delay: 0.7 },
            { label: 'Skills', pct: skillsPct, delay: 0.8 },
          ].map((bar) => (
            <div key={bar.label}>
              <div className="mb-2.5 flex items-center justify-between text-sm">
                <span className="font-medium text-surface-300">{bar.label}</span>
                <span className="font-mono font-bold text-white">{bar.pct.toFixed(0)}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-surface-800">
                <motion.div
                  className={`h-full rounded-full ${
                    bar.pct >= 70
                      ? 'bg-gradient-to-r from-accent-600 to-accent-400'
                      : bar.pct >= 40
                        ? 'bg-gradient-to-r from-warning-600 to-warning-400'
                        : 'bg-gradient-to-r from-danger-600 to-danger-400'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${bar.pct}%` }}
                  transition={{ duration: 1.2, delay: bar.delay, ease: 'easeOut' }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Skills Analysis */}
      <Card delay={0.4}>
        <SectionHeader icon={Target} title="Skills Analysis" />

        <div className="mb-10 grid grid-cols-3 gap-4 sm:gap-6">
          {[
            { icon: Award, count: data.required_skills.length, label: 'Required', color: 'text-primary-400', border: 'border-primary-500/20', bg: 'bg-primary-500/8' },
            { icon: CheckCircle2, count: data.matched_skills.length, label: 'Matched', color: 'text-accent-400', border: 'border-accent-500/20', bg: 'bg-accent-500/8' },
            { icon: XCircle, count: data.missing_skills.length, label: 'Missing', color: 'text-danger-400', border: 'border-danger-500/20', bg: 'bg-danger-500/8' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`rounded-xl border ${stat.border} ${stat.bg} p-5 text-center sm:p-6`}
            >
              <stat.icon className={`mx-auto mb-1.5 h-4 w-4 sm:h-5 sm:w-5 ${stat.color}`} />
              <p className={`text-xl font-extrabold sm:text-2xl ${stat.color}`}>{stat.count}</p>
              <p className="mt-0.5 text-[11px] font-medium text-surface-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="space-y-10">
          <div>
            <p className="mb-5 flex items-center gap-2 text-sm font-semibold text-white">
              <Zap className="h-4 w-4 text-primary-400" />
              Required Skills
            </p>
            <div className="flex flex-wrap gap-3">
              {data.required_skills.map((skill, i) => {
                const isMatched = data.matched_skills.map((s) => s.toLowerCase()).includes(skill.toLowerCase());
                return <SkillBadge key={skill} skill={skill} matched={isMatched} index={i} />;
              })}
            </div>
          </div>

          {data.missing_skills.length > 0 && (
            <div>
              <p className="mb-5 flex items-center gap-2 text-sm font-semibold text-white">
                <AlertTriangle className="h-4 w-4 text-danger-400" />
                Missing Skills
              </p>
              <div className="flex flex-wrap gap-3">
                {data.missing_skills.map((skill, i) => (
                  <SkillBadge key={skill} skill={skill} matched={false} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* AI Feedback */}
      <Card delay={0.5}>
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-800">
              <MessageSquareText className="h-5 w-5 text-primary-400" />
            </div>
            <h3 className="text-lg font-bold text-white">AI Feedback</h3>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setExpandedFeedback(!expandedFeedback)}
            className="flex shrink-0 items-center gap-2 rounded-lg border border-surface-600 bg-surface-800 px-4 py-2.5 text-xs font-semibold text-surface-300 transition-all hover:text-white"
          >
            {expandedFeedback ? 'Less' : 'More'}
            <motion.div animate={{ rotate: expandedFeedback ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown className="h-3.5 w-3.5" />
            </motion.div>
          </motion.button>
        </div>

        <motion.div
          initial={false}
          animate={{ height: expandedFeedback ? 'auto' : 220 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="relative overflow-hidden"
        >
          <div
            className="text-sm leading-8 text-surface-300 [&_strong]:text-white"
            dangerouslySetInnerHTML={{ __html: formatFeedback(data.ai_feedback) }}
          />
          {!expandedFeedback && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface-900 to-transparent" />
          )}
        </motion.div>
      </Card>

      {/* Resume Preview */}
      {data.resume_preview && (
        <Card delay={0.6}>
          <SectionHeader icon={FileText} title="Resume Preview" iconColor="text-accent-400" />

          <div className="overflow-hidden rounded-xl border border-surface-700 bg-surface-950">
            <div className="flex items-center gap-2 border-b border-surface-800 px-4 py-2.5">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
              </div>
              <span className="ml-2 text-[11px] font-medium text-surface-500">{data.filename}</span>
            </div>

            <div className="max-h-[300px] overflow-y-auto p-6 sm:p-8">
              <pre className="whitespace-pre-wrap font-mono text-xs leading-7 text-surface-300">
                {data.resume_preview.split('\n').map((line, i) => (
                  <div key={i} className="rounded px-1 transition-colors hover:bg-surface-800/50">
                    {highlightLine(line)}
                  </div>
                ))}
              </pre>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

function highlightLine(line: string) {
  if (line.endsWith(':') || /^[A-Z][A-Za-z\s]+:$/.test(line.trim()))
    return <span className="font-semibold text-primary-400">{line}</span>;
  if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
    return (
      <>
        <span className="text-accent-400">{line.trim()[0]}</span>
        <span>{line.trim().slice(1)}</span>
      </>
    );
  }
  if (/https?:\/\//.test(line))
    return line.split(/(https?:\/\/[^\s]+)/).map((part, i) =>
      /^https?:\/\//.test(part)
        ? <span key={i} className="text-primary-400 underline underline-offset-2">{part}</span>
        : <span key={i}>{part}</span>
    );
  return line;
}
