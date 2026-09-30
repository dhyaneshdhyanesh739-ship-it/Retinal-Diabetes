import React from 'react';
import { Layers, Cpu, Eye, FileText, Database, Shield, Server, ArrowDown } from 'lucide-react';

export const ArchitectureDiagram: React.FC = () => {
  const modules = [
    {
      title: "• FRONTEND COMMAND CENTER",
      tech: "React 18 + TypeScript + Vite + Tailwind CSS",
      desc: "Royal Medical UI design system with Lenis smooth scroll, tactile skeuomorphic image controls, and zero scroll lag.",
      icon: <Layers className="w-5 h-5 text-accent-orange" />,
      tag: "UI / UX Layer"
    },
    {
      title: "• IMAGE PREPROCESSING & QUALITY CHECK",
      tech: "OpenCV + Local Image Quality Filter",
      desc: "Instant automated validation of illumination, contrast, pupil dilation, and blur prior to neural inference.",
      icon: <Eye className="w-5 h-5 text-accent-gold" />,
      tag: "Preprocessing"
    },
    {
      title: "• DEEP LEARNING SCREENING CORE",
      tech: "PyTorch / TensorFlow ResNet-50 & ConvNeXt",
      desc: "Multi-class classification trained on rural retinal fundus datasets for early detection of microaneurysms.",
      icon: <Cpu className="w-5 h-5 text-accent-bright" />,
      tag: "Neural Core"
    },
    {
      title: "• EXPLAINABLE AI (XAI) PIPELINE",
      tech: "Grad-CAM + Layer-CAM Attention Map Engine",
      desc: "Generates high-resolution heatmaps and bounding boxes around micro-lesions for full clinical auditability.",
      icon: <Shield className="w-5 h-5 text-accent-crimson" />,
      tag: "Explainability"
    },
    {
      title: "• RISK STRATIFICATION & BACKEND API",
      tech: "Node.js Express + Mongoose Schema",
      desc: "RESTful microservices handling patient records, triage queues, telemetry, and clinical exportable PDFs.",
      icon: <Server className="w-5 h-5 text-status-success" />,
      tag: "Backend API"
    }
  ];

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {modules.map((mod, index) => (
        <React.Fragment key={mod.title}>
          <div className="brutal-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-l-4 border-l-accent-orange">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-surface-2 border border-surface-border">
                {mod.icon}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-mono text-xs font-bold text-accent-orange uppercase tracking-wider">
                    {mod.title}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-surface-3 text-text-secondary border border-surface-border">
                    {mod.tag}
                  </span>
                </div>
                <h4 className="font-mono text-sm font-bold text-text-primary mb-1">
                  {mod.tech}
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {mod.desc}
                </p>
              </div>
            </div>
          </div>

          {index < modules.length - 1 && (
            <div className="flex items-center justify-center my-2">
              <div className="p-1.5 bg-surface-1 border border-surface-border text-accent-orange">
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
