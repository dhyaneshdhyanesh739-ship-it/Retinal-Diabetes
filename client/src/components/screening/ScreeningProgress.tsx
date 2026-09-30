import React, { useEffect, useState } from 'react';
import { Check, Cpu, Loader2 } from 'lucide-react';

interface ScreeningProgressProps {
  onComplete: () => void;
}

export const ScreeningProgress: React.FC<ScreeningProgressProps> = ({ onComplete }) => {
  const steps = [
    '01 Image Preprocessing & Contrast Normalization',
    '02 Retinal Blood Vessel Segmentation (U-Net)',
    '03 Microaneurysm & Exudate Feature Extraction',
    '04 Grad-CAM Explainability Attention Map Generation',
    '05 Risk Classification & Clinical Referral Scoring',
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return prev;
        }
      });
    }, 450);

    return () => clearInterval(timer);
  }, [onComplete, steps.length]);

  return (
    <div className="brutal-card p-8 text-center space-y-6 max-w-xl mx-auto">
      <div className="flex items-center justify-center gap-3">
        <div className="p-3 bg-surface-2 border border-accent-orange">
          <Cpu className="w-6 h-6 text-accent-orange animate-spin" />
        </div>
        <h3 className="font-mono text-lg font-bold text-text-primary uppercase tracking-wider">
          ANALYZING RETINAL IMAGE
        </h3>
      </div>

      <div className="space-y-3 text-left">
        {steps.map((stepText, idx) => {
          const isDone = idx < currentStepIndex;
          const isActive = idx === currentStepIndex;

          return (
            <div
              key={stepText}
              className={`p-3 border font-mono text-xs flex items-center justify-between transition-all ${
                isDone
                  ? 'bg-status-success/10 border-status-success/40 text-status-success'
                  : isActive
                  ? 'bg-accent-orange/10 border-accent-orange text-accent-orange font-bold'
                  : 'bg-surface-1 border-surface-border text-text-muted opacity-60'
              }`}
            >
              <span className="truncate">{stepText}</span>
              {isDone ? (
                <Check className="w-4 h-4 text-status-success flex-shrink-0" />
              ) : isActive ? (
                <Loader2 className="w-4 h-4 text-accent-orange animate-spin flex-shrink-0" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-text-muted flex-shrink-0" />
              )}
            </div>
          );
        })}
      </div>

      <div className="w-full bg-surface-2 h-2 border border-surface-border overflow-hidden">
        <div
          className="bg-gradient-to-r from-accent-orange to-accent-bright h-full transition-all duration-300"
          style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
        />
      </div>
    </div>
  );
};
