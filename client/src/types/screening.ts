export type DRCategory = 
  | 'No Apparent DR' 
  | 'Mild Non-Proliferative DR' 
  | 'Moderate Non-Proliferative DR' 
  | 'Severe DR' 
  | 'Proliferative DR';

export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';

export interface DetectedLesion {
  type: 'Microaneurysms' | 'Hard Exudates' | 'Hemorrhages' | 'Cotton Wool Spots' | 'Venous Beading';
  count: number;
  severity: string;
  confidence: number;
  coordinates: { x: number; y: number };
}

export interface ExplainableAIOutput {
  gradCAMAttentionRegion: string;
  attentionIntensityScore: number;
  detectedLesions: DetectedLesion[];
  vesselDensityIndex: string;
  xaiSummary: string;
}

export interface ScreeningResultData {
  screeningId: string;
  timestamp: string;
  imageQualityScore: number;
  imageQualityStatus: 'OPTIMAL' | 'ACCEPTABLE' | 'POOR';
  eyeSide: string;
  aiResult: {
    category: DRCategory;
    confidence: number;
    riskLevel: RiskLevel;
    referralRecommended: boolean;
  };
  explainableAI: ExplainableAIOutput;
  clinicalDisclaimer: string;
}

export interface ScreeningProgressStep {
  id: number;
  label: string;
  description: string;
  completed: boolean;
  active: boolean;
}
