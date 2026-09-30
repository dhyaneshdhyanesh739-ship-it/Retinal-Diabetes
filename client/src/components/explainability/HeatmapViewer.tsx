import React, { useState } from 'react';
import { Eye, Sparkles, Layers, SlidersHorizontal, AlertCircle, HelpCircle } from 'lucide-react';

export const HeatmapViewer: React.FC = () => {
  const [opacity, setOpacity] = useState(0.85);
  const [mode, setMode] = useState<'overlay' | 'side-by-side' | 'raw'>('overlay');

  const sampleRetinaUrl = "/real_retina.png";

  return (
    <div className="brutal-card p-6 space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-surface-border font-mono">
        <div>
          <h3 className="text-lg font-bold text-text-primary uppercase flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent-orange" />
            Grad-CAM Heatmap & Attention Visualizer
          </h3>
          <p className="text-xs text-text-muted">Interactive explainable neural network feature map</p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 bg-surface-2 p-1 border border-surface-border text-xs">
          <button
            onClick={() => setMode('overlay')}
            className={`px-3 py-1 font-bold uppercase transition-all ${
              mode === 'overlay' ? 'bg-accent-orange text-bg-darkest' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Heatmap Overlay
          </button>
          <button
            onClick={() => setMode('side-by-side')}
            className={`px-3 py-1 font-bold uppercase transition-all ${
              mode === 'side-by-side' ? 'bg-accent-orange text-bg-darkest' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Compare Side-By-Side
          </button>
          <button
            onClick={() => setMode('raw')}
            className={`px-3 py-1 font-bold uppercase transition-all ${
              mode === 'raw' ? 'bg-accent-orange text-bg-darkest' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Original Only
          </button>
        </div>
      </div>

      {/* Opacity slider for heatmap overlay */}
      {mode === 'overlay' && (
        <div className="flex items-center gap-4 bg-surface-2 p-3 border border-surface-border font-mono text-xs">
          <span className="text-text-secondary flex items-center gap-1">
            <SlidersHorizontal className="w-4 h-4 text-accent-orange" /> HEATMAP OPACITY:
          </span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={opacity}
            onChange={(e) => setOpacity(parseFloat(e.target.value))}
            className="w-48 accent-accent-orange cursor-pointer"
          />
          <span className="text-accent-gold font-bold">{Math.round(opacity * 100)}%</span>
        </div>
      )}

      {/* Main Image Display Area */}
      {mode === 'side-by-side' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase text-text-muted flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-accent-orange" /> Original Retinal Scan
            </div>
            <div className="relative aspect-square bg-bg-darkest border border-surface-border overflow-hidden rounded-full flex items-center justify-center p-2">
              <img src={sampleRetinaUrl} alt="Original Fundus" className="w-full h-full object-cover rounded-full" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase text-accent-bright flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Grad-CAM Attention Map
            </div>
            <div className="relative aspect-square bg-bg-darkest border border-accent-orange overflow-hidden rounded-full flex items-center justify-center p-2">
              <img src={sampleRetinaUrl} alt="Heatmap" className="w-full h-full object-cover rounded-full" />
              <div className="absolute inset-0 rounded-full bg-radial from-accent-orange via-accent-crimson/80 to-transparent blur-md mix-blend-screen opacity-90" />
            </div>
          </div>
        </div>
      ) : (
        <div className="relative aspect-video max-h-[460px] bg-bg-darkest border border-surface-border rounded-full flex items-center justify-center overflow-hidden p-4 mx-auto max-w-xl">
          <img src={sampleRetinaUrl} alt="Retinal Fundus" className="h-full object-cover rounded-full" />
          
          {mode === 'overlay' && (
            <div
              className="absolute inset-0 rounded-full mix-blend-screen pointer-events-none transition-opacity duration-200"
              style={{ opacity }}
            >
              <div className="absolute top-[32%] left-[38%] w-36 h-36 rounded-full bg-radial from-accent-orange via-accent-crimson/80 to-transparent blur-lg animate-pulse" />
              <div className="absolute bottom-[35%] right-[32%] w-24 h-24 rounded-full bg-radial from-accent-bright via-accent-gold/60 to-transparent blur-md" />
            </div>
          )}
        </div>
      )}

      {/* Diagnostic Legend */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t border-surface-border font-mono text-xs">
        <div className="p-2.5 bg-surface-2 border border-surface-border flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-accent-orange shadow-[0_0_8px_#FF5A1F]" />
          <div>
            <span className="text-text-primary font-bold block">High Attention (80-100%)</span>
            <span className="text-text-muted text-[10px]">Microaneurysm & hemorrhage cluster</span>
          </div>
        </div>
        <div className="p-2.5 bg-surface-2 border border-surface-border flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-accent-gold" />
          <div>
            <span className="text-text-primary font-bold block">Moderate Attention (50-79%)</span>
            <span className="text-text-muted text-[10px]">Hard exudates & vessel tortuosity</span>
          </div>
        </div>
        <div className="p-2.5 bg-surface-2 border border-surface-border flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-surface-border" />
          <div>
            <span className="text-text-primary font-bold block">Baseline Background</span>
            <span className="text-text-muted text-[10px]">Normal foveal & optical reflex</span>
          </div>
        </div>
      </div>

    </div>
  );
};
