import React from 'react';
import { UserPlus, Camera, ShieldCheck, Cpu, Sparkles, AlertTriangle, Stethoscope, ArrowRightLeft } from 'lucide-react';

export const Workflow: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Patient Registration',
      desc: 'Health worker inputs patient ID & demographics into offline tablet.',
      icon: <UserPlus className="w-5 h-5 text-accent-orange" />,
    },
    {
      num: '02',
      title: 'Retinal Image Capture',
      desc: 'Non-mydriatic fundus camera captures high-resolution macula image.',
      icon: <Camera className="w-5 h-5 text-accent-bright" />,
    },
    {
      num: '03',
      title: 'Image Quality Check',
      desc: 'Automated blur/illumination validator rejects unusable scans.',
      icon: <ShieldCheck className="w-5 h-5 text-status-success" />,
    },
    {
      num: '04',
      title: 'AI Screening',
      desc: 'Deep Neural Net analyzes microaneurysms & vascular lesions.',
      icon: <Cpu className="w-5 h-5 text-accent-orange" />,
    },
    {
      num: '05',
      title: 'Explainability Analysis',
      desc: 'Grad-CAM heatmaps highlight precise pathological features.',
      icon: <Sparkles className="w-5 h-5 text-accent-gold" />,
    },
    {
      num: '06',
      title: 'Risk Classification',
      desc: 'Stratifies severity into No DR, Mild, Moderate, Severe, or Referable.',
      icon: <AlertTriangle className="w-5 h-5 text-status-warning" />,
    },
    {
      num: '07',
      title: 'Doctor Review',
      desc: 'Remote ophthalmologist verifies AI findings & heatmaps on web console.',
      icon: <Stethoscope className="w-5 h-5 text-accent-bright" />,
    },
    {
      num: '08',
      title: 'Referral / Follow-up',
      desc: 'Generates SMS referral voucher & local hospital appointment.',
      icon: <ArrowRightLeft className="w-5 h-5 text-status-success" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {steps.map((step) => (
        <div
          key={step.num}
          className="brutal-card p-6 relative group hover:-translate-y-1 transition-all duration-200"
        >
          {/* Top Icon Header */}
          <div className="flex items-center justify-end mb-4">
            <div className="p-2 bg-surface-2 border border-surface-border">
              {step.icon}
            </div>
          </div>

          {/* Title */}
          <h3 className="font-mono text-base font-bold text-text-primary uppercase mb-2 group-hover:text-accent-orange transition-colors">
            {step.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-text-secondary leading-relaxed">
            {step.desc}
          </p>

          {/* Bottom Accent line */}
          <div className="mt-4 w-full h-0.5 bg-surface-border group-hover:bg-accent-orange transition-colors" />
        </div>
      ))}
    </div>
  );
};
