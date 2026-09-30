import React, { useState } from 'react';
import { Eye, ShieldAlert, Activity, Sparkles, Layers, Zap } from 'lucide-react';

export const RetinalVisualization: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<'scan' | 'heatmap' | 'vessels'>('heatmap');

  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center p-4">
      {/* Outer Glow Halo */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent-crimson/25 via-accent-orange/20 to-accent-gold/15 blur-2xl animate-pulse-glow" />

      {/* Outer Tactical Reticle */}
      <div className="absolute inset-0 rounded-full border border-accent-orange/40 p-1.5">
        <div className="w-full h-full rounded-full border border-dashed border-accent-orange/30 animate-radar" />
      </div>

      {/* Main Circular Retinal Scanning Container */}
      <div className="relative w-full h-full rounded-full bg-black border-2 border-accent-orange shadow-royal overflow-hidden flex items-center justify-center">
        
        {/* Real Retinal Fundus Image - Scaled to fit circular eye frame perfectly */}
        <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-black">
          <img 
            src="/real_retina.png" 
            alt="Real Retinal Fundus Scan" 
            className={`w-full h-full object-cover scale-[1.08] rounded-full transition-all duration-500 ${
              activeLayer === 'vessels' 
                ? 'contrast-[1.4] brightness-[1.1] saturate-[1.4] hue-rotate-[-10deg]' 
                : 'contrast-[1.1] brightness-[1.02]'
            }`}
          />

          {/* Grad-CAM Heatmap In-Process Overlay */}
          {activeLayer === 'heatmap' && (
            <div className="absolute inset-0 rounded-full pointer-events-none mix-blend-color-dodge transition-opacity duration-300">
              {/* Primary Lesion Attention Heat Map (Macula & Temporal Arcade) */}
              <div className="absolute top-[38%] left-[28%] w-40 h-40 rounded-full bg-radial from-[#FF1E00] via-[#FF7A00]/90 to-transparent blur-md opacity-95 animate-pulse" />
              
              {/* Secondary Attention Peak (Optic Disc Vascular Root) */}
              <div className="absolute top-[32%] right-[18%] w-28 h-28 rounded-full bg-radial from-[#FFCC00] via-[#FF5A1F]/80 to-transparent blur-md opacity-85" />
              
              {/* Microaneurysm & Exudate Attention Clusters (Inferior Arcades) */}
              <div className="absolute bottom-[24%] left-[34%] w-28 h-28 rounded-full bg-radial from-[#FF0055] via-[#FF7A00]/70 to-transparent blur-sm opacity-90" />
            </div>
          )}

          {/* Vessel Highlight Mode Grid Overlay */}
          {activeLayer === 'vessels' && (
            <div className="absolute inset-0 rounded-full pointer-events-none mix-blend-screen bg-gradient-to-t from-accent-crimson/30 via-transparent to-accent-orange/20" />
          )}

          {/* Crosshairs (+) Centered on Macula & Optic Disc for Clinical Precision */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-40">
            <div className="w-full h-[1px] bg-accent-orange/60" />
            <div className="h-full w-[1px] bg-accent-orange/60 absolute" />
          </div>

          {/* Animated AI Scanning Radar / Laser Line */}
          <div className="absolute inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-accent-bright to-transparent animate-scan shadow-[0_0_20px_#FF7A00]" />

        </div>

      </div>

      {/* Layer Toggle Controls Below Visualization */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-surface-1 border border-surface-border p-1 shadow-royal z-20">
        <button
          onClick={() => setActiveLayer('heatmap')}
          className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 transition-colors ${
            activeLayer === 'heatmap'
              ? 'bg-accent-orange text-bg-darkest font-bold'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          <Sparkles className="w-3 h-3" /> Grad-CAM Heatmap
        </button>
        <button
          onClick={() => setActiveLayer('vessels')}
          className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 transition-colors ${
            activeLayer === 'vessels'
              ? 'bg-accent-orange text-bg-darkest font-bold'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          <Layers className="w-3 h-3" /> Vessel Contrast
        </button>
        <button
          onClick={() => setActiveLayer('scan')}
          className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 transition-colors ${
            activeLayer === 'scan'
              ? 'bg-accent-orange text-bg-darkest font-bold'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          <Eye className="w-3 h-3" /> Raw Retina
        </button>
      </div>

    </div>
  );
};
