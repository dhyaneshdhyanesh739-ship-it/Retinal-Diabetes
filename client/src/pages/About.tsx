import React from 'react';
import { PublicLayout } from '../layouts/PublicLayout';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { Award, Eye, Heart, ShieldCheck, Target, Users } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <PublicLayout activePath="/about">
      <div className="pt-28 pb-20 bg-bg-darkest min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <SectionHeader
            number="10"
            eyebrow="Smart India Hackathon 2026"
            title="MISSION & PROBLEM STATEMENT"
            description="SIH26038 — Explainable AI for Diabetic Retinopathy Screening in Rural India (MathWorks Theme)."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6 font-sans text-text-secondary leading-relaxed">
              <div className="p-6 bg-surface-1 border border-accent-gold/40">
                <span className="font-mono text-xs uppercase font-bold text-accent-gold block mb-1">
                  THE HACKATHON CHALLENGE
                </span>
                <h3 className="text-xl font-bold text-text-primary uppercase mb-2 font-mono">
                  Why Explainable AI Matters in Rural Ophthalmology
                </h3>
                <p className="text-sm">
                  Diabetic Retinopathy (DR) is the leading cause of preventable blindness among working-age adults. In rural India, over 77 million people live with diabetes, yet fewer than 10% receive regular retinal eye screenings due to lack of specialists and high diagnostic costs.
                </p>
              </div>

              <p>
                Generic AI models are often treated as "black boxes" by clinicians, leading to low adoption in medical practice. Our platform bridges this gap by integrating Grad-CAM explainability, enabling health workers and doctors to visually audit the exact retinal features driving every AI prediction.
              </p>
            </div>

            <div className="lg:col-span-5 space-y-4 font-mono text-xs">
              <div className="brutal-card p-6 border-l-4 border-l-accent-orange">
                <div className="text-accent-orange font-bold uppercase mb-1">SIH PROBLEM CODE</div>
                <div className="text-lg font-black text-text-primary">SIH26038</div>
                <div className="text-text-muted mt-1">Theme: Healthcare & MedTech • Organization: MathWorks</div>
              </div>

              <div className="brutal-card p-6 border-l-4 border-l-accent-gold">
                <div className="text-accent-gold font-bold uppercase mb-1">CORE INNOVATION</div>
                <div className="text-text-primary font-bold">Pixel-Level XAI Heatmaps</div>
                <div className="text-text-muted mt-1">Directly visualizes microaneurysms and exudate clusters for doctor verification.</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </PublicLayout>
  );
};
