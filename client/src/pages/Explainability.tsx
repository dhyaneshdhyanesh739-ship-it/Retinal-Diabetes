import React from 'react';
import { PublicLayout } from '../layouts/PublicLayout';
import { HeatmapViewer } from '../components/explainability/HeatmapViewer';
import { ExplanationPanel } from '../components/explainability/ExplanationPanel';
import { SectionHeader } from '../components/common/SectionHeader';
import { Sparkles, Layers, ShieldCheck, Cpu, Code, FileCode } from 'lucide-react';

export const Explainability: React.FC = () => {
  return (
    <PublicLayout activePath="/explainability">
      <div className="pt-28 pb-20 bg-bg-darkest min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <SectionHeader
            number="05"
            eyebrow="Clinical Auditability & Transparency"
            title="EXPLAINABLE AI ENGINE"
            description="Detailed visual breakdown of how RETINA-X generates pixel-level attention maps to explain AI diabetic retinopathy predictions."
          />

          {/* Interactive Heatmap Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <HeatmapViewer />
            </div>
            <div className="lg:col-span-5">
              <ExplanationPanel />
            </div>
          </div>

          {/* Technical XAI Methods Grid */}
          <div className="pt-8 border-t border-surface-border space-y-6">
            <h3 className="font-mono text-sm font-bold text-accent-gold uppercase tracking-wider">
              XAI TECHNICAL METHODS & ARCHITECTURE
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
              <div className="brutal-card p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-accent-orange">• Grad-CAM</span>
                  <span className="text-[10px] text-text-muted">Feature Localization</span>
                </div>
                <h4 className="text-sm font-bold text-text-primary uppercase">Gradient Visualizer</h4>
                <p className="text-text-secondary leading-relaxed font-sans text-xs">
                  Computes gradients of the target DR class score with respect to feature maps of the final convolutional layer to generate spatial attention weightings.
                </p>
              </div>

              <div className="brutal-card p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-accent-bright">• Layer-CAM</span>
                  <span className="text-[10px] text-text-muted">Multi-Scale Resolution</span>
                </div>
                <h4 className="text-sm font-bold text-text-primary uppercase">Fine-Grained Exudate Maps</h4>
                <p className="text-text-secondary leading-relaxed font-sans text-xs">
                  Extracts fine-grained feature maps from intermediate layers to preserve tiny microaneurysm boundaries often lost in final layer downsampling.
                </p>
              </div>

              <div className="brutal-card p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-status-success">• U-Net Segmentation</span>
                  <span className="text-[10px] text-text-muted">Vascular Tortuosity</span>
                </div>
                <h4 className="text-sm font-bold text-text-primary uppercase">Vessel Arcades Mask</h4>
                <p className="text-text-secondary leading-relaxed font-sans text-xs">
                  Isolates retinal arteriolar and venular trees to calculate blood vessel density and detect tortuosity or venous beading.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </PublicLayout>
  );
};
