import React from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { FileText, Download, Printer, Share2, Shield, CheckCircle } from 'lucide-react';

export const Reports: React.FC = () => {
  return (
    <DashboardLayout activeItem="reports" activePath="/reports">
      <div className="space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-border pb-6">
          <div>
            <div className="font-mono text-xs text-accent-gold uppercase font-bold mb-1">
              CLINICAL EXPORT MODULE
            </div>
            <h1 className="text-3xl font-black font-sans uppercase text-text-primary tracking-tight">
              Screening & XAI PDF Reports
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="primary" size="sm" icon={<Printer className="w-4 h-4" />} onClick={() => window.print()}>
              Print Report
            </Button>
            <Button variant="secondary" size="sm" icon={<Download className="w-4 h-4" />}>
              Download PDF
            </Button>
          </div>
        </div>

        {/* Report Preview Document */}
        <div className="brutal-card p-8 bg-surface-1 border-accent-orange/40 max-w-4xl mx-auto space-y-6">
          
          {/* Document Header */}
          <div className="flex items-center justify-between border-b border-surface-border pb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-surface-2 border border-accent-orange flex items-center justify-center font-mono font-black text-accent-orange">
                XAI
              </div>
              <div>
                <h2 className="font-mono text-lg font-black uppercase text-text-primary">
                  RETINA-X CLINICAL AUDIT REPORT
                </h2>
                <p className="font-mono text-xs text-text-muted">Explainable AI Screening Summary</p>
              </div>
            </div>

            <Badge variant="gold">OFFICIAL CLINICAL RECORD</Badge>
          </div>

          {/* Patient Details Metadata */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-surface-2 border border-surface-border font-mono text-xs">
            <div>
              <span className="text-text-muted text-[10px] block">PATIENT ID</span>
              <strong className="text-accent-orange">DR-2026-001</strong>
            </div>
            <div>
              <span className="text-text-muted text-[10px] block">PATIENT NAME</span>
              <strong className="text-text-primary">Ramesh Kumar</strong>
            </div>
            <div>
              <span className="text-text-muted text-[10px] block">AGE / GENDER</span>
              <strong className="text-text-primary">54 M</strong>
            </div>
            <div>
              <span className="text-text-muted text-[10px] block">SCREENING DATE</span>
              <strong className="text-text-primary">2026-09-28</strong>
            </div>
          </div>

          {/* AI Screening Summary */}
          <div className="space-y-3 font-mono text-xs">
            <h3 className="font-bold text-accent-orange uppercase border-b border-surface-border pb-1">
              01 — AI SCREENING CLASSIFICATION
            </h3>
            <div className="p-4 bg-surface-2 border-l-4 border-l-accent-orange flex justify-between items-center">
              <div>
                <span className="text-text-muted text-[10px] uppercase block">PREDICTED CATEGORY</span>
                <span className="text-lg font-bold text-text-primary font-sans">Moderate Non-Proliferative Diabetic Retinopathy</span>
              </div>
              <div className="text-right">
                <span className="text-text-muted text-[10px] uppercase block">MODEL CONFIDENCE</span>
                <span className="text-xl font-bold text-accent-orange">91.8%</span>
              </div>
            </div>
          </div>

          {/* Explainability Breakdown */}
          <div className="space-y-3 font-mono text-xs">
            <h3 className="font-bold text-accent-gold uppercase border-b border-surface-border pb-1">
              02 — GRAD-CAM EXPLAINABILITY & LESIONS
            </h3>
            <div className="space-y-2 text-text-secondary">
              <p>• Attention Region: Inferior Temporal Vascular Arcades</p>
              <p>• Detected Lesions: 8 Microaneurysms, 4 Hard Exudates, 2 Hemorrhages</p>
              <p>• Vessel Density Index: 78.4% (Mild vessel tortuosity present)</p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="p-4 bg-surface-2 border border-surface-border font-sans text-xs text-text-muted leading-relaxed">
            <strong className="font-mono text-accent-gold uppercase block mb-1">CLINICAL SAFETY DIRECTIVE:</strong>
            AI-assisted screening results are generated for clinical decision support under established medical protocols and must be verified by a licensed ophthalmologist prior to initiating treatment.
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};
