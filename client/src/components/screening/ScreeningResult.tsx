import React from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  RefreshCcw, 
  Stethoscope, 
  Sparkles, 
  AlertCircle, 
  HelpCircle,
  Activity,
  Layers
} from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import type { FullScreeningResponse } from '../../types/screening';

interface ScreeningResultProps {
  result: FullScreeningResponse;
  onReset: () => void;
}

export const ScreeningResult: React.FC<ScreeningResultProps> = ({ result, onReset }) => {
  const { 
    reliability, 
    quality, 
    prediction, 
    probabilities, 
    calibrated_confidence, 
    gradcam, 
    lesion_evidence, 
    triage, 
    report_data 
  } = result;

  const isRecapture = reliability.status === 'IMAGE_RECAPTURE_REQUIRED';
  const isHumanReview = reliability.status === 'HUMAN_REVIEW_RECOMMENDED';
  const isReliable = reliability.status === 'RELIABLE_SCREENING';

  // Helper for class probability bar colors
  const getClassColor = (classId: number, isSelected: boolean) => {
    if (!isSelected) return 'bg-surface-3 text-text-secondary';
    switch (classId) {
      case 0: return 'bg-status-success text-bg-darkest shadow-[0_0_12px_#00E699]';
      case 1: return 'bg-accent-gold text-bg-darkest shadow-[0_0_12px_#FFC700]';
      case 2: return 'bg-accent-orange text-bg-darkest shadow-[0_0_12px_#FF5A1F]';
      case 3: return 'bg-accent-crimson text-white shadow-[0_0_12px_#E60039]';
      case 4: return 'bg-purple-600 text-white shadow-[0_0_12px_#9333EA]';
      default: return 'bg-accent-orange text-bg-darkest';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans w-full max-w-full overflow-hidden">
      
      {/* 1. Primary Clinical Diagnosis Box (Enclosed Layout) */}
      <div className={`brutal-card p-5 border-2 w-full overflow-hidden space-y-4 ${
        isRecapture
          ? 'border-status-danger bg-surface-1 shadow-[0_0_20px_rgba(230,0,57,0.12)]'
          : isHumanReview
          ? 'border-status-warning bg-surface-1 shadow-[0_0_20px_rgba(255,199,0,0.12)]'
          : 'border-status-success bg-surface-1 shadow-[0_0_20px_rgba(0,230,153,0.12)]'
      }`}>
        
        {/* Header Bar inside box */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-surface-border font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-orange animate-pulse" />
            <span className="font-bold text-text-muted uppercase tracking-wider text-[11px]">
              AI CLINICAL DIAGNOSIS RESULT
            </span>
          </div>

          <Badge 
            variant={isRecapture ? 'danger' : isHumanReview ? 'warning' : 'success'} 
            pulse={!isReliable}
          >
            {reliability.status.replace(/_/g, ' ')}
          </Badge>
        </div>

        {/* Clinical Prediction Title Banner */}
        <div className="p-3.5 bg-surface-2 border-l-4 border-l-accent-orange border border-surface-border space-y-1">
          <span className="font-mono text-[10px] uppercase font-bold text-accent-gold tracking-widest block">
            CLASSIFIED DISEASE GRADE
          </span>
          <h2 className="text-xl sm:text-2xl font-black uppercase text-text-primary leading-tight tracking-tight break-words font-sans">
            {prediction.grade_name}
          </h2>
        </h2></div>

        {/* 2-Column Encapsulated Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-xs">
          <div className="p-2.5 bg-surface-2 border border-surface-border">
            <span className="text-[10px] text-text-muted uppercase block font-bold">CASE ID</span>
            <span className="text-xs font-bold text-text-primary truncate block">{result.case_id}</span>
          </div>

          <div className="p-2.5 bg-surface-2 border border-surface-border">
            <span className="text-[10px] text-text-muted uppercase block font-bold">CONFIDENCE</span>
            <span className="text-base font-black text-accent-orange block">{calibrated_confidence}%</span>
          </div>

          <div className="p-2.5 bg-surface-2 border border-surface-border col-span-2 sm:col-span-1">
            <span className="text-[10px] text-text-muted uppercase block font-bold">UNCERTAINTY</span>
            <span className="text-xs font-bold text-accent-gold block">{reliability.uncertainty_margin}%</span>
          </div>
        </div>

        {/* Secondary Metrics Bar */}
        <div className="grid grid-cols-2 gap-2 font-mono text-xs">
          <div className="p-2 bg-surface-2 border border-surface-border flex items-center justify-between">
            <span className="text-[10px] text-text-muted uppercase">QUALITY:</span>
            <span className={`font-bold text-xs ${quality.status === 'GOOD' ? 'text-status-success' : 'text-status-danger'}`}>
              {quality.status} ({quality.score}%)
            </span>
          </div>

          <div className="p-2 bg-surface-2 border border-surface-border flex items-center justify-between">
            <span className="text-[10px] text-text-muted uppercase">URGENCY:</span>
            <span className="font-bold text-xs text-accent-gold uppercase truncate">
              {triage.referral_urgency ? triage.referral_urgency.replace(/_/g, ' ') : 'ROUTINE'}
            </span>
          </div>
        </div>

        {/* Recapture or Audit Banners */}
        {isRecapture && quality.recapture_message && (
          <div className="p-3 bg-status-danger/10 border border-status-danger/40 font-mono text-xs text-status-danger flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div>
              <strong>ACTION REQUIRED:</strong> {quality.recapture_message}
            </div>
          </div>
        )}

        {isHumanReview && (
          <div className="p-3 bg-status-warning/10 border border-status-warning/40 font-mono text-xs text-status-warning flex items-start gap-2">
            <HelpCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div>
              <strong>CLINICIAN AUDIT RECOMMENDED:</strong> {reliability.explanation}
            </div>
          </div>
        )}

      </div>

      {/* 2. 5-Class DR Neural Probability Distribution */}
      <div className="brutal-card p-5 space-y-4 overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-surface-border font-mono text-xs">
          <span className="uppercase font-bold text-accent-orange flex items-center gap-2 text-[11px]">
            <Activity className="w-4 h-4" /> 5-Class DR Neural Probability Distribution
          </span>
          <span className="text-[10px] text-text-muted">Calibrated</span>
        </div>

        <div className="space-y-2.5 font-mono text-xs">
          {probabilities.map((item) => {
            const isSelected = item.class_id === prediction.class_id;
            const percentage = (item.prob * 100).toFixed(1);

            return (
              <div key={item.class_id} className={`p-2.5 border transition-all overflow-hidden ${
                isSelected 
                  ? 'bg-surface-2 border-accent-orange shadow-brutal-dark' 
                  : 'bg-surface-1 border-surface-border opacity-85'
              }`}>
                <div className="flex items-center justify-between mb-1.5 gap-2">
                  <div className="flex items-center gap-2 truncate">
                    <span className={`w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center flex-shrink-0 ${
                      isSelected ? 'bg-accent-orange text-bg-darkest' : 'bg-surface-3 text-text-muted'
                    }`}>
                      {item.class_id}
                    </span>
                    <span className={`font-bold truncate text-xs ${isSelected ? 'text-text-primary' : 'text-text-secondary'}`}>
                      {item.name}
                    </span>
                  </div>

                  <span className={`font-black text-xs flex-shrink-0 ${isSelected ? 'text-accent-orange' : 'text-text-primary'}`}>
                    {percentage}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-surface-3 border border-surface-border overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${getClassColor(item.class_id, isSelected)}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Grad-CAM Spatial Focus & Pathological Lesions */}
      <div className="space-y-4">
        
        {/* Grad-CAM XAI Spatial Focus */}
        <div className="brutal-card p-5 space-y-3 overflow-hidden">
          <div className="flex items-center justify-between pb-2 border-b border-surface-border font-mono text-xs">
            <span className="uppercase font-bold text-accent-gold flex items-center gap-2 text-[11px]">
              <Sparkles className="w-4 h-4" /> Grad-CAM XAI Spatial Focus
            </span>
            <span className="text-[10px] text-text-muted">Feature Audit</span>
          </div>

          <div className="p-3 bg-surface-2 border border-surface-border space-y-1">
            <span className="font-mono text-[10px] text-text-muted uppercase font-bold block">
              PRIMARY ATTENTION QUADRANT
            </span>
            <div className="font-mono text-xs font-bold text-accent-bright leading-tight">
              {gradcam.attention_quadrant}
            </div>
          </div>

          <div className="p-2 bg-surface-2 border border-surface-border flex items-center justify-between font-mono text-xs">
            <span className="text-text-muted text-[10px]">Activation Score:</span>
            <span className="font-bold text-text-primary text-xs">{gradcam.intensity_score} / 1.0</span>
          </div>
        </div>

        {/* Pathological Lesion Evidence */}
        <div className="brutal-card p-5 space-y-3 overflow-hidden">
          <div className="flex items-center justify-between pb-2 border-b border-surface-border font-mono text-xs">
            <span className="uppercase font-bold text-accent-orange flex items-center gap-2 text-[11px]">
              <Layers className="w-4 h-4" /> Identified Lesion Evidence
            </span>
            <span className="text-[10px] text-text-muted">{lesion_evidence.length} Pathologies</span>
          </div>

          {lesion_evidence.length > 0 ? (
            <div className="space-y-2 font-mono text-xs">
              {lesion_evidence.map((lesion) => (
                <div
                  key={lesion.type}
                  className="p-2.5 bg-surface-2 border border-surface-border flex items-center justify-between gap-2"
                >
                  <div className="space-y-0.5 truncate">
                    <span className="font-bold text-text-primary block text-xs truncate">{lesion.type}</span>
                    <span className="text-[9px] text-accent-gold block">
                      SEVERITY: <strong>{lesion.severity}</strong>
                    </span>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="font-black text-accent-orange text-xs block">
                      {lesion.count} count
                    </span>
                    <span className="text-[9px] text-text-muted block">
                      Conf: {lesion.confidence}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-3 bg-surface-2 border border-surface-border text-xs font-mono text-text-muted text-center">
              No pathological lesions detected in retinal scan.
            </div>
          )}
        </div>

      </div>

      {/* 4. Clinical Directive & Action Toolbar */}
      <div className="p-4 bg-surface-1 border-2 border-accent-gold/50 space-y-2 brutal-card overflow-hidden">
        <div className="flex items-center gap-2 font-mono text-xs font-bold text-accent-gold uppercase tracking-wider">
          <Stethoscope className="w-4 h-4" /> CLINICAL RECOMMENDATION DIRECTIVE
        </div>
        <p className="text-xs md:text-sm text-text-primary font-bold leading-relaxed">
          {triage.screening_recommendation}
        </p>
        <div className="pt-2 border-t border-surface-border font-mono text-[10px] text-text-muted">
          <strong className="text-accent-gold">NOTICE:</strong> {report_data.disclaimer}
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-surface-border font-mono text-xs">
        <Button variant="ghost" size="sm" onClick={onReset} icon={<RefreshCcw className="w-4 h-4" />}>
          New Screening
        </Button>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <a href="/reports">
            <Button variant="secondary" size="md" className="w-full sm:w-auto" icon={<FileText className="w-4 h-4" />}>
              Download PDF Report
            </Button>
          </a>
          <a href="/dashboard">
            <Button variant="primary" size="md" className="w-full sm:w-auto" icon={<Stethoscope className="w-4 h-4" />}>
              Refer to Doctor
            </Button>
          </a>
        </div>
      </div>

    </div>
  );
};
