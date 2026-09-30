export type DRCategory = 
  | 'No Apparent DR' 
  | 'Mild Non-Proliferative DR' 
  | 'Moderate Non-Proliferative DR' 
  | 'Severe DR' 
  | 'Proliferative DR'
  | 'Unassessable Image';

export type ReliabilityStatus = 
  | 'IMAGE_RECAPTURE_REQUIRED' 
  | 'HUMAN_REVIEW_RECOMMENDED' 
  | 'RELIABLE_SCREENING';

export interface ClassProbability {
  class_id: number;
  name: string;
  prob: number;
}

export interface LesionEvidence {
  type: string;
  count: number;
  severity: string;
  confidence: number;
}

export interface FullScreeningResponse {
  case_id: string;
  quality: {
    score: number;
    status: 'GOOD' | 'POOR';
    recapture_message: string | null;
  };
  prediction: {
    class_id: number;
    grade_name: string;
    short_code: string;
  };
  probabilities: ClassProbability[];
  calibrated_confidence: number;
  gradcam: {
    attention_quadrant: string;
    heatmap_overlay_url: string | null;
    intensity_score: number;
  };
  lesion_evidence: LesionEvidence[];
  reliability: {
    status: ReliabilityStatus;
    badge_color: 'GREEN' | 'AMBER' | 'RED';
    uncertainty_margin: number;
    explanation: string;
  };
  triage: {
    screening_recommendation: string;
    referral_urgency: string;
  };
  report_data: {
    timestamp: string;
    disclaimer: string;
  };
}

// Legacy type alias for backwards compatibility
export interface ScreeningResultData extends FullScreeningResponse {}
