import React from 'react';
import { ShieldAlert, CheckCircle2, AlertTriangle, FileText, Share2, RefreshCcw, Stethoscope, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { ScreeningResultData } from '../../types/screening';

interface ScreeningResultProps {
  result: ScreeningResultData;
  onReset: () => void;
}

export const ScreeningResult: React.FC<ScreeningResultProps> = ({ result, onReset }) => {
  const isHighRisk = result.aiResult.riskLevel === 'HIGH' || result.aiResult.riskLevel === 'CRITICAL';

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Main Result Banner */}
      <div className={`p-6 border-2 shadow-royal ${
        isHighRisk
          ? 'bg-surface-1 border-accent-crimson shadow-crimson'
          : 'bg-surface-1 border-status-success'
      }`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            <div className={`p-4 border ${
              isHighRisk ? 'bg-accent-crimson/20 border-accent-crimson text-accent-crimson' : 'bg-status-success/20 border-status-success text-status-success'
            }`}>
              {isHighRisk ? <ShieldAlert className="w-8 h-8 animate-pulse" /> : <CheckCircle2 className="w-8 h-8" />}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs text-text-muted uppercase">SCREENING CATEGORY</span>
                <Badge variant={isHighRisk ? 'danger' : 'success'} pulse={isHighRisk}>
                  {result.aiResult.riskLevel} RISK
                </Badge>
              </div>
              <h3 className="text-2xl font-black font-sans uppercase text-text-primary tracking-tight">
                {result.aiResult.category}
              </h3>
              <p className="text-xs font-mono text-text-secondary mt-0.5">
                Screening ID: {result.screeningId} • Eye: {result.eyeSide}
              </p>
            </div>
          </div>

          {/* Model Confidence Metric */}
          <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-surface-border pt-4 md:pt-0 md:pl-6">
            <div>
              <div className="text-[10px] font-mono uppercase text-text-muted">MODEL CONFIDENCE</div>
              <div className="font-mono text-3xl font-black text-accent-orange">
                {result.aiResult.confidence}%
              </div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-text-muted">IMAGE QUALITY</div>
              <div className="font-mono text-xl font-bold text-status-success">
                {result.imageQualityStatus} ({result.imageQualityScore}%)
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Grid: Explainability Breakdown + Detected Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Panel: XAI Attention Map Summary */}
        <div className="brutal-card p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-surface-border">
            <span className="font-mono text-xs uppercase font-bold text-accent-gold flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Explainable AI Attention Region
            </span>
            <span className="text-[10px] font-mono text-text-muted">Grad-CAM XAI</span>
          </div>

          <div className="p-3 bg-surface-2 border border-surface-border">
            <div className="text-xs font-mono text-text-muted uppercase mb-1">Primary Attention Quadrant:</div>
            <div className="font-mono text-sm font-bold text-accent-bright">
              {result.explainableAI.gradCAMAttentionRegion}
            </div>
          </div>

          <p className="text-xs text-text-secondary leading-relaxed">
            {result.explainableAI.xaiSummary}
          </p>

          <div className="pt-2 flex items-center justify-between text-xs font-mono text-text-muted border-t border-surface-border">
            <span>Vessel Density Index:</span>
            <span className="text-text-primary font-bold">{result.explainableAI.vesselDensityIndex}</span>
          </div>
        </div>

        {/* Right Panel: Detected Lesion Features */}
        <div className="brutal-card p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-surface-border">
            <span className="font-mono text-xs uppercase font-bold text-accent-orange flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Detected Pathological Features
            </span>
            <span className="text-[10px] font-mono text-text-muted">3 Features Identified</span>
          </div>

          <div className="space-y-2">
            {result.explainableAI.detectedLesions.map((lesion) => (
              <div
                key={lesion.type}
                className="p-2.5 bg-surface-2 border border-surface-border flex items-center justify-between font-mono text-xs"
              >
                <div>
                  <span className="font-bold text-text-primary">{lesion.type}</span>
                  <span className="text-text-muted text-[10px] block">Severity: {lesion.severity}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-accent-orange">{lesion.count} detected</span>
                  <span className="text-[10px] text-text-muted block">Conf: {lesion.confidence}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Safety Medical Disclaimer Box */}
      <div className="p-4 bg-surface-1 border border-accent-gold/40 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-accent-gold flex-shrink-0 mt-0.5" />
        <div className="text-xs text-text-secondary leading-relaxed font-sans">
          <strong className="text-accent-gold font-mono uppercase">CLINICAL SAFETY DIRECTIVE:</strong> {result.clinicalDisclaimer}
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-surface-border">
        <Button variant="ghost" size="sm" onClick={onReset} icon={<RefreshCcw className="w-4 h-4" />}>
          Perform New Screening
        </Button>

        <div className="flex items-center gap-3">
          <a href="/reports">
            <Button variant="secondary" size="md" icon={<FileText className="w-4 h-4" />}>
              Generate Report
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
