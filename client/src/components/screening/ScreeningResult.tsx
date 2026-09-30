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
  ShieldCheck,
  ArrowRight,
  TrendingUp,
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
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* 1. Primary Clinical Diagnosis Banner */}
      <div className={`brutal-card p-6 border-2 transition-all ${
        isRecapture
          ? 'border-status-danger bg-surface-1 shadow-[0_0_20px_rgba(230,0,57,0.15)]'
          : isHumanReview
          ? 'border-status-warning bg-surface-1 shadow-[0_0_20px_rgba(255,199,0,0.15)]'
          : 'border-status-success bg-surface-1 shadow-[0_0_20px_rgba(0,230,153,0.15)]'
      }`}>
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-surface-border">
          
          <div className="flex items-start gap-4">
            <div className={`p-3.5 border flex-shrink-0 ${
              isRecapture 
                ? 'bg-status-danger/20 border-status-danger text-status-danger' 
                : isHumanReview
                ? 'bg-status-warning/20 border-status-warning text-status-warning'
                : 'bg-status-success/20 border-status-success text-status-success'
            }`}>
              {isRecapture ? (
                <AlertCircle className="w-8 h-8 animate-pulse" />
              ) : isHumanReview ? (
                <HelpCircle className="w-8 h-8 animate-pulse" />
              ) : (
                <CheckCircle2 className="w-8 h-8" />
              )}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold text-text-muted uppercase tracking-widest">
                  AI CLINICAL DIAGNOSIS RESULT
                </span>
                <Badge 
                  variant={isRecapture ? 'danger' : isHumanReview ? 'warning' : 'success'} 
                  pulse={!isReliable}
                >
                  {reliability.status.replace(/_/g, ' ')}
                </Badge>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black uppercase text-text-primary tracking-tight">
                {prediction.grade_name}
              </h2>

              <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-text-secondary pt-1">
                <span className="bg-surface-2 px-2 py-0.5 border border-surface-border">
                  CASE: <strong className="text-text-primary">{result.case_id}</strong>
                </span>
                <span className="bg-surface-2 px-2 py-0.5 border border-surface-border">
                  UNCERTAINTY: <strong className="text-accent-gold">{reliability.uncertainty_margin}%</strong>
                </span>
                <span className="bg-surface-2 px-2 py-0.5 border border-surface-border">
                  QUALITY: <strong className={quality.status === 'GOOD' ? 'text-status-success' : 'text-status-danger'}>{quality.status} ({quality.score}%)</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Key Metrics Dashboard Card */}
          <div className="flex items-center gap-6 bg-surface-2 p-4 border border-surface-border w-full lg:w-auto justify-between lg:justify-start">
            <div className="text-center font-mono">
              <span className="text-[10px] text-text-muted uppercase font-bold block mb-0.5">
                CALIBRATED CONFIDENCE
              </span>
              <span className="text-3xl font-black text-accent-orange">
                {calibrated_confidence}%
              </span>
            </div>

            <div className="w-px h-10 bg-surface-border" />

            <div className="text-center font-mono">
              <span className="text-[10px] text-text-muted uppercase font-bold block mb-0.5">
                REFERRAL URGENCY
              </span>
              <span className="text-sm font-bold text-accent-gold uppercase">
                {triage.referral_urgency ? triage.referral_urgency.replace(/_/g, ' ') : 'ROUTINE'}
              </span>
            </div>
          </div>

        </div>

        {/* Quality or Recapture Action Banners */}
        {isRecapture && quality.recapture_message && (
          <div className="mt-4 p-3 bg-status-danger/10 border border-status-danger/40 font-mono text-xs text-status-danger flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div>
              <strong>ACTION REQUIRED:</strong> {quality.recapture_message}
            </div>
          </div>
        )}

        {isHumanReview && (
          <div className="mt-4 p-3 bg-status-warning/10 border border-status-warning/40 font-mono text-xs text-status-warning flex items-start gap-2">
            <HelpCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div>
              <strong>CLINICIAN AUDIT RECOMMENDED:</strong> {reliability.explanation}
            </div>
          </div>
        )}
      </div>

      {/* 2. 5-Class Neural DR Probability Distribution */}
      <div className="brutal-card p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-surface-border font-mono text-xs">
          <span className="uppercase font-bold text-accent-orange flex items-center gap-2">
            <Activity className="w-4 h-4" /> 5-Class DR Neural Probability Distribution
          </span>
          <span className="text-text-muted">Temperature Calibrated Output</span>
        </div>

        <div className="space-y-3 font-mono text-xs">
          {probabilities.map((item) => {
            const isSelected = item.class_id === prediction.class_id;
            const percentage = (item.prob * 100).toFixed(1);

            return (
              <div key={item.class_id} className={`p-3 border transition-all ${
                isSelected 
                  ? 'bg-surface-2 border-accent-orange shadow-brutal-dark' 
                  : 'bg-surface-1 border-surface-border opacity-85'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                      isSelected ? 'bg-accent-orange text-bg-darkest' : 'bg-surface-3 text-text-muted'
                    }`}>
                      {item.class_id}
                    </span>
                    <span className={`font-bold ${isSelected ? 'text-text-primary text-sm' : 'text-text-secondary'}`}>
                      {item.name}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] bg-accent-orange/20 text-accent-orange px-2 py-0.5 font-bold uppercase border border-accent-orange/40">
                        PRIMARY PREDICTION
                      </span>
                    )}
                  </div>

                  <span className={`font-black text-sm ${isSelected ? 'text-accent-orange' : 'text-text-primary'}`}>
                    {percentage}%
                  </span>
                </div>

                {/* Progress Bar Container */}
                <div className="w-full h-2.5 bg-surface-3 border border-surface-border overflow-hidden">
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

      {/* 3. Grid: Grad-CAM Explainability + Lesion Evidence */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Grad-CAM XAI Attention Focus (7 Cols) */}
        <div className="lg:col-span-6 brutal-card p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-surface-border font-mono text-xs">
            <span className="uppercase font-bold text-accent-gold flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Grad-CAM XAI Spatial Focus
            </span>
            <span className="text-text-muted">Feature Map Audit</span>
          </div>

          <div className="p-4 bg-surface-2 border border-surface-border space-y-2">
            <span className="font-mono text-[11px] text-text-muted uppercase font-bold block">
              PRIMARY ATTENTION QUADRANT
            </span>
            <div className="font-mono text-base font-black text-accent-bright">
              {gradcam.attention_quadrant}
            </div>
          </div>

          <div className="p-3 bg-surface-2 border border-surface-border flex items-center justify-between font-mono text-xs">
            <span className="text-text-muted">Grad-CAM Activation Score:</span>
            <span className="font-bold text-text-primary text-sm">{gradcam.intensity_score} / 1.0</span>
          </div>
        </div>

        {/* Right: Pathological Lesion Evidence (6 Cols) */}
        <div className="lg:col-span-6 brutal-card p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-surface-border font-mono text-xs">
            <span className="uppercase font-bold text-accent-orange flex items-center gap-2">
              <Layers className="w-4 h-4" /> Identified Lesion Evidence
            </span>
            <span className="text-text-muted">{lesion_evidence.length} Pathologies</span>
          </div>

          {lesion_evidence.length > 0 ? (
            <div className="space-y-2 font-mono text-xs">
              {lesion_evidence.map((lesion) => (
                <div
                  key={lesion.type}
                  className="p-3 bg-surface-2 border border-surface-border flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-text-primary block">{lesion.type}</span>
                    <span className="text-[10px] text-accent-gold block">
                      SEVERITY: <strong>{lesion.severity}</strong>
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-accent-orange text-sm block">
                      {lesion.count} detected
                    </span>
                    <span className="text-[10px] text-text-muted block">
                      Conf: {lesion.confidence}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 bg-surface-2 border border-surface-border text-xs font-mono text-text-muted text-center">
              No pathological lesions detected in retinal scan.
            </div>
          )}
        </div>

      </div>

      {/* 4. Clinical Directive & Action Buttons */}
      <div className="p-5 bg-surface-1 border-2 border-accent-gold/50 space-y-3 brutal-card">
        <div className="flex items-center gap-2 font-mono text-xs font-bold text-accent-gold uppercase tracking-wider">
          <Stethoscope className="w-4 h-4" /> CLINICAL RECOMMENDATION DIRECTIVE
        </div>
        <p className="text-sm md:text-base text-text-primary font-bold leading-relaxed">
          {triage.screening_recommendation}
        </p>
        <div className="pt-2 border-t border-surface-border font-mono text-[11px] text-text-muted">
          <strong className="text-accent-gold">MEDICAL SAFETY NOTICE:</strong> {report_data.disclaimer}
        </div>
      </div>

      {/* Footer Navigation Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-surface-border font-mono text-xs">
        <Button variant="ghost" size="sm" onClick={onReset} icon={<RefreshCcw className="w-4 h-4" />}>
          Perform New Screening
        </Button>

        <div className="flex flex-wrap items-center gap-3">
          <a href="/reports">
            <Button variant="secondary" size="md" icon={<FileText className="w-4 h-4" />}>
              Download PDF Clinical Report
            </Button>
          </a>
          <a href="/dashboard">
            <Button variant="primary" size="md" icon={<Stethoscope className="w-4 h-4" />}>
              Triage & Refer to Doctor
            </Button>
          </a>
        </div>
      </div>

    </div>
  );
};
