import React, { useState } from 'react';
import { Eye, ShieldAlert, Activity, Sparkles, Layers, Zap } from 'lucide-react';

export const RetinalVisualization: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<'scan' | 'heatmap' | 'vessels'>('heatmap');

  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center p-4">
      {/* Outer Glow Halo */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent-crimson/20 via-accent-orange/15 to-accent-gold/10 blur-2xl animate-pulse-glow" />

      {/* Outer Tactical Reticle */}
      <div className="absolute inset-0 rounded-full border border-accent-orange/30 p-2">
        <div className="w-full h-full rounded-full border border-dashed border-surface-border animate-radar" />
      </div>

      {/* Main Circular Retinal Scanning Container */}
      <div className="relative w-full h-full rounded-full bg-surface-1 border-2 border-accent-orange shadow-royal overflow-hidden flex items-center justify-center">
        
        {/* Retinal Background Canvas Grid */}
        <div className="absolute inset-0 bg-dot-pattern opacity-40" />

        {/* Retinal Fundus Graphic Base */}
        <div className="relative w-[85%] h-[85%] rounded-full bg-gradient-to-br from-[#2A0E06] via-[#1A0502] to-[#0A0201] p-4 flex items-center justify-center border border-accent-crimson/50 shadow-inner">
          
          {/* Fovea Centralis (Dark Spot) */}
          <div className="absolute top-[48%] left-[42%] w-10 h-10 rounded-full bg-[#120302] border border-[#FF5A1F44] shadow-[inset_0_0_15px_#000000]" />

          {/* Optic Disc (Bright Yellowish Gold Spot) */}
          <div className="absolute top-[38%] right-[22%] w-16 h-16 rounded-full bg-gradient-to-tr from-[#D4A84F] to-[#FFF0B3] opacity-80 blur-[2px] shadow-[0_0_20px_#D4A84F88]" />

          {/* Simulated Blood Vessels (SVG paths) */}
          <svg className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-300 ${activeLayer === 'vessels' ? 'opacity-100' : 'opacity-70'}`}>
            <g stroke="#C62828" strokeWidth="2.5" fill="none" strokeLinecap="round">
              <path d="M 240 180 Q 200 120 120 90 T 50 60" className="animate-pulse" />
              <path d="M 240 180 Q 280 100 340 70 T 420 50" />
              <path d="M 240 180 Q 180 240 110 290 T 40 340" />
              <path d="M 240 180 Q 290 260 360 310 T 430 380" />
            </g>
            <g stroke="#FF5A1F" strokeWidth="1.5" fill="none" strokeLinecap="round">
              <path d="M 200 120 Q 160 100 100 110" />
              <path d="M 280 100 Q 310 130 380 120" />
              <path d="M 180 240 Q 140 220 90 260" />
              <path d="M 290 260 Q 330 240 390 280" />
            </g>
          </svg>

          {/* Grad-CAM Heatmap Overlay Layer */}
          {activeLayer === 'heatmap' && (
            <div className="absolute inset-0 rounded-full pointer-events-none mix-blend-screen animate-fade-in">
              {/* Primary Lesion Attention Heat Map */}
              <div className="absolute top-[30%] left-[32%] w-24 h-24 rounded-full bg-radial from-accent-orange via-accent-crimson/60 to-transparent blur-md opacity-85 animate-pulse" />
              
              {/* Secondary Microaneurysm Clusters */}
              <div className="absolute bottom-[35%] right-[30%] w-16 h-16 rounded-full bg-radial from-accent-bright via-accent-gold/50 to-transparent blur-sm opacity-75" />
              
              <div className="absolute top-[55%] left-[25%] w-12 h-12 rounded-full bg-radial from-status-danger via-accent-crimson/50 to-transparent blur-sm opacity-80" />
            </div>
          )}

          {/* Animated AI Scanning Line */}
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-accent-bright to-transparent animate-scan shadow-[0_0_15px_#FF7A00]" />

          {/* Interactive Bounding Box / Lesion Annotations */}
          <div className="absolute top-[34%] left-[35%] w-16 h-16 border-2 border-dashed border-accent-orange bg-accent-orange/10 p-1 flex items-start justify-between">
            <span className="text-[8px] font-mono font-bold bg-accent-orange text-bg-darkest px-1">
              LESION #1
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-status-danger animate-ping" />
          </div>

          <div className="absolute bottom-[32%] right-[32%] w-12 h-12 border border-accent-gold bg-accent-gold/10 p-0.5">
            <span className="text-[7px] font-mono text-accent-gold font-bold">
              MA 92%
            </span>
          </div>

        </div>

        {/* Live HUD Floating Micro Panels */}
        <div className="absolute top-4 left-4 bg-bg-darkest/90 border border-surface-border px-2.5 py-1 backdrop-blur-md text-[10px] font-mono flex items-center gap-1.5 shadow-lg">
          <Activity className="w-3 h-3 text-accent-orange" />
          <span className="text-text-secondary">XAI CONFIDENCE:</span>
          <span className="text-accent-bright font-bold">91.8%</span>
        </div>

        <div className="absolute bottom-4 right-4 bg-bg-darkest/90 border border-accent-crimson px-2.5 py-1 backdrop-blur-md text-[10px] font-mono flex items-center gap-1.5 shadow-lg">
          <ShieldAlert className="w-3 h-3 text-accent-crimson animate-pulse" />
          <span className="text-text-primary uppercase font-bold">MODERATE DR DETECTED</span>
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
          <Sparkles className="w-3 h-3" /> Heatmap
        </button>
        <button
          onClick={() => setActiveLayer('vessels')}
          className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 transition-colors ${
            activeLayer === 'vessels'
              ? 'bg-accent-orange text-bg-darkest font-bold'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          <Layers className="w-3 h-3" /> Vessels
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
