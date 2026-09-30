import React from 'react';
import { ShieldAlert, CheckCircle2, AlertTriangle, FileText, RefreshCcw, Stethoscope, Sparkles, AlertCircle, HelpCircle } from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import type { FullScreeningResponse } from '../../types/screening';

interface ScreeningResultProps {
  result: FullScreeningResponse;
  onReset: () => void;
}

export const ScreeningResult: React.FC<ScreeningResultProps> = ({ result, onReset }) => {
  const { reliability, quality, prediction, probabilities, calibrated_confidence, gradcam, lesion_evidence, triage, report_data } = result;

  const isRecapture = reliability.status === 'IMAGE_RECAPTURE_REQUIRED';
  const isHumanReview = reliability.status === 'HUMAN_REVIEW_RECOMMENDED';
  const isReliable = reliability.status === 'RELIABLE_SCREENING';

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* 1. Main Status Banner (Red / Amber / Green) */}
      <div className={`p-6 border-2 shadow-royal ${
        isRecapture
          ? 'bg-surface-1 border-status-danger shadow-crimson'
          : isHumanReview
          ? 'bg-surface-1 border-status-warning'
          : 'bg-surface-1 border-status-success'
      }`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            <div className={`p-4 border ${
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
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs text-text-muted uppercase">RELIABILITY STATUS</span>
                <Badge 
                  variant={isRecapture ? 'danger' : isHumanReview ? 'warning' : 'success'} 
                  pulse={!isReliable}
                >
                  {reliability.status.replace(/_/g, ' ')}
                </Badge>
              </div>

              <h3 className="text-2xl font-black font-sans uppercase text-text-primary tracking-tight">
                {prediction.grade_name}
              </h3>
              
              <p className="text-xs font-mono text-text-secondary mt-0.5">
                Case ID: {result.case_id} • Uncertainty Margin: {reliability.uncertainty_margin}%
              </p>
            </div>
          </div>

          {/* Calibrated Confidence & Quality Score */}
          <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-surface-border pt-4 md:pt-0 md:pl-6">
            <div>
              <div className="text-[10px] font-mono uppercase text-text-muted">CALIBRATED CONFIDENCE</div>
              <div className="font-mono text-3xl font-black text-accent-orange">
                {calibrated_confidence}%
              </div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-text-muted">IMAGE QUALITY</div>
              <div className={`font-mono text-xl font-bold ${quality.status === 'GOOD' ? 'text-status-success' : 'text-status-danger'}`}>
                {quality.status} ({quality.score}%)
              </div>
            </div>
          </div>

        </div>

        {/* Recapture Warning Banner if Quality Failed */}
        {isRecapture && quality.recapture_message && (
          <div className="mt-4 p-3 bg-status-danger/10 border border-status-danger/40 font-mono text-xs text-status-danger flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div>
              <strong>ACTION REQUIRED:</strong> {quality.recapture_message}
            </div>
          </div>
        )}

        {/* Human Review Recommendation Banner if Borderline */}
        {isHumanReview && (
          <div className="mt-4 p-3 bg-status-warning/10 border border-status-warning/40 font-mono text-xs text-status-warning flex items-start gap-2">
            <HelpCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div>
              <strong>CLINICIAN AUDIT REQUIRED:</strong> {reliability.explanation}
            </div>
          </div>
        )}
      </div>

      {/* 2. 5-Class Probability Distribution Bar */}
      <div className="brutal-card p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-surface-border">
          <span className="font-mono text-xs uppercase font-bold text-accent-orange flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> 5-Class Neural DR Probability Distribution
          </span>
          <span className="text-[10px] font-mono text-text-muted">Calibrated Output</span>
        </div>

        <div className="space-y-3 font-mono text-xs">
          {probabilities.map((item) => (
            <div key={item.class_id} className="space-y-1">
              <div className="flex justify-between text-text-secondary">
                <span className={item.class_id === prediction.class_id ? 'font-bold text-accent-bright' : ''}>
                  Class {item.class_id}: {item.name}
                </span>
                <span className="font-bold text-text-primary">
                  {(item.prob * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full h-2 bg-surface-2 border border-surface-border overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    item.class_id === prediction.class_id ? 'bg-accent-orange shadow-[0_0_8px_#FF5A1F]' : 'bg-surface-3'
                  }`}
                  style={{ width: `${item.prob * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Grid: Grad-CAM Explainability + Lesion Evidence */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left: Grad-CAM Attention Region */}
        <div className="brutal-card p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-surface-border">
            <span className="font-mono text-xs uppercase font-bold text-accent-gold flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Grad-CAM Attention Region
            </span>
            <span className="text-[10px] font-mono text-text-muted">Grad-CAM XAI</span>
          </div>

          <div className="p-3 bg-surface-2 border border-surface-border">
            <div className="text-xs font-mono text-text-muted uppercase mb-1">Primary Attention Arcades:</div>
            <div className="font-mono text-sm font-bold text-accent-bright">
              {gradcam.attention_quadrant}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-text-muted pt-2 border-t border-surface-border">
            <span>Grad-CAM Intensity Score:</span>
            <span className="text-text-primary font-bold">{gradcam.intensity_score} / 1.0</span>
          </div>
        </div>

        {/* Right: Lesion Evidence Table */}
        <div className="brutal-card p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-surface-border">
            <span className="font-mono text-xs uppercase font-bold text-accent-orange flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Identified Lesion Evidence
            </span>
            <span className="text-[10px] font-mono text-text-muted">{lesion_evidence.length} Evidence Types</span>
          </div>

          {lesion_evidence.length > 0 ? (
            <div className="space-y-2">
              {lesion_evidence.map((lesion) => (
                <div
                  key={lesion.type}
                  className="p-2.5 bg-surface-2 border border-surface-border flex items-center justify-between font-mono text-xs"
                >
                  <div>
                    <span className="font-bold text-text-primary">{lesion.type}</span>
                    <span className="text-text-muted text-[10px] block">Severity: {lesion.severity}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-accent-orange">{lesion.count} count</span>
                    <span className="text-[10px] text-text-muted block">Conf: {lesion.confidence}%</span>
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

      {/* 4. Screening Recommendation */}
      <div className="p-4 bg-surface-1 border border-accent-gold/40 space-y-2 font-sans">
        <div className="flex items-center gap-2 font-mono text-xs font-bold text-accent-gold uppercase">
          <Stethoscope className="w-4 h-4" /> Screening Recommendation
        </div>
        <p className="text-sm text-text-primary font-medium">
          {triage.screening_recommendation}
        </p>
      </div>

      {/* 5. Medical Safety Disclaimer */}
      <div className="p-4 bg-surface-2 border border-surface-border font-sans text-xs text-text-muted leading-relaxed">
        <strong className="font-mono text-accent-gold uppercase block mb-1">CLINICAL DIRECTIVE:</strong>
        {report_data.disclaimer}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-surface-border">
        <Button variant="ghost" size="sm" onClick={onReset} icon={<RefreshCcw className="w-4 h-4" />}>
          Perform New Screening
        </Button>

        <div className="flex items-center gap-3">
          <a href="/reports">
            <Button variant="secondary" size="md" icon={<FileText className="w-4 h-4" />}>
              Generate Clinical Report
            </Button>
          </a>
          <a href="/dashboard">
            <Button variant="primary" size="md" icon={<Stethoscope className="w-4 h-4" />}>
              Refer to Doctor
            </Button>
          </a>
        </div>
      </div>

    </div>
  );
};
