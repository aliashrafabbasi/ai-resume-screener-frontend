export interface ScoreBreakdown {
  semantic_match: number;
  skills_match: number;
  overall_score: number;
}

export interface HiringDecision {
  recommendation: string;
  decision: string;
}

export interface ResumeAnalysis {
  filename: string;
  detected_role: string;
  required_skills: string[];
  score_breakdown: ScoreBreakdown;
  matched_skills: string[];
  missing_skills: string[];
  hiring_decision: HiringDecision;
  ai_feedback: string;
  resume_preview: string;
}
