import React from 'react';
import { ShieldCheck, HelpCircle, Check, AlertCircle, Cpu } from 'lucide-react';
import { Badge } from '../common/Badge';

export const ExplanationPanel: React.FC = () => {
  return (
    <div className="brutal-card p-6 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-surface-border">
        <div>
          <span className="font-mono text-xs text-accent-gold uppercase font-bold block">
            XAI AUDIT LOG
          </span>
          <h3 className="font-mono text-lg font-bold text-text-primary uppercase">
            Clinical Decision Support Explanation
          </h3>
        </div>
        <Badge variant="info">XAI v2.4</Badge>
      </div>

      <div className="space-y-4 font-mono text-xs">
        
        {/* Finding 1 */}
        <div className="p-3 bg-surface-2 border-l-4 border-l-accent-orange space-y-1">
          <div className="flex items-center justify-between text-text-muted">
            <span>PRIMARY AI FINDING</span>
            <span className="text-accent-orange font-bold">Confidence: 91.8%</span>
          </div>
          <div className="text-sm font-bold text-text-primary">
            Moderate Non-Proliferative Diabetic Retinopathy
          </div>
          <p className="text-text-secondary font-sans text-xs pt-1">
            Convolutional features indicate multiple punctate hemorrhages and microaneurysms within the 2-disc-diameter radius of the macula.
          </p>
        </div>

        {/* Finding 2 */}
        <div className="p-3 bg-surface-2 border-l-4 border-l-accent-gold space-y-1">
          <div className="flex items-center justify-between text-text-muted">
            <span>GRAD-CAM FEATURE HIGHLIGHTS</span>
            <span className="text-accent-gold font-bold">Attention Score: 0.87</span>
          </div>
          <ul className="list-disc list-inside text-text-secondary space-y-1 pt-1 font-sans text-xs">
            <li>Localized hyper-intense heat signals around inferior temporal arcade</li>
            <li>Hard exudate deposits identified adjacent to temporal macula</li>
            <li>Vessel tortuosity index elevated by +14.2% above baseline</li>
          </ul>
        </div>

        {/* Finding 3 */}
        <div className="p-3 bg-surface-2 border-l-4 border-l-status-success space-y-1">
          <div className="flex items-center justify-between text-text-muted">
            <span>QUALITATIVE IMAGE VALIDATION</span>
            <span className="text-status-success font-bold">STATUS: PASSED</span>
          </div>
          <div className="text-text-primary font-sans text-xs">
            Optic disc clarity 98%, illumination uniformity optimal, zero eyelid/eyelash artifacts detected.
          </div>
        </div>

      </div>

      {/* MathWorks XAI Framework note */}
      <div className="p-3 bg-surface-1 border border-surface-border text-[11px] font-mono text-text-muted flex items-center justify-between">
        <span>Framework: MathWorks Deep Learning Toolbox + Grad-CAM</span>
        <span className="text-accent-orange">Clinical Benchmark</span>
      </div>
    </div>
  );
};
