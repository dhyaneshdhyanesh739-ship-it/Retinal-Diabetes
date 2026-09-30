import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Maximize2, Layers, Eye, Sparkles, Sliders, Shield } from 'lucide-react';
import { Button } from '../common/Button';

interface ImageViewerProps {
  imageSrc: string;
  heatmapOverlay?: boolean;
  showVessels?: boolean;
  showLesions?: boolean;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({
  imageSrc,
  heatmapOverlay = true,
  showVessels = true,
  showLesions = true,
}) => {
  const [zoom, setZoom] = useState(1);
  const [activeHeatmap, setActiveHeatmap] = useState(heatmapOverlay);
  const [activeVessels, setActiveVessels] = useState(showVessels);
  const [activeLesions, setActiveLesions] = useState(showLesions);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.75));
  const handleReset = () => setZoom(1);

  return (
    <div className={`relative bg-bg-darkest border border-surface-border overflow-hidden skeo-panel flex flex-col ${isFullscreen ? 'fixed inset-0 z-50 p-4' : 'w-full'}`}>
      
      {/* Top Equipment Header Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-surface-1 border-b border-surface-border font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-accent-orange animate-pulse" />
          <span className="font-bold text-text-primary uppercase tracking-wider">
            RETINAL WORKSTATION VIEWER
          </span>
          <span className="text-[10px] text-accent-gold bg-accent-gold/10 px-2 py-0.5 border border-accent-gold/30">
            MAG: {Math.round(zoom * 100)}%
          </span>
        </div>

        {/* Tactile Skeuomorphic Toggles */}
        <div className="flex items-center gap-1.5 bg-surface-2 p-1 border border-surface-border">
          <button
            onClick={() => setActiveHeatmap(!activeHeatmap)}
            className={`px-2.5 py-1 text-[11px] font-bold uppercase transition-all flex items-center gap-1 border ${
              activeHeatmap
                ? 'bg-accent-orange text-bg-darkest border-accent-bright shadow-skeuo-btn'
                : 'bg-surface-3 text-text-secondary border-surface-border hover:text-text-primary'
            }`}
          >
            <Sparkles className="w-3 h-3" /> Heatmap
          </button>
          
          <button
            onClick={() => setActiveVessels(!activeVessels)}
            className={`px-2.5 py-1 text-[11px] font-bold uppercase transition-all flex items-center gap-1 border ${
              activeVessels
                ? 'bg-accent-crimson text-white border-accent-crimson shadow-skeuo-btn'
                : 'bg-surface-3 text-text-secondary border-surface-border hover:text-text-primary'
            }`}
          >
            <Layers className="w-3 h-3" /> Vessels
          </button>

          <button
            onClick={() => setActiveLesions(!activeLesions)}
            className={`px-2.5 py-1 text-[11px] font-bold uppercase transition-all flex items-center gap-1 border ${
              activeLesions
                ? 'bg-accent-gold text-bg-darkest border-accent-gold shadow-skeuo-btn'
                : 'bg-surface-3 text-text-secondary border-surface-border hover:text-text-primary'
            }`}
          >
            <Eye className="w-3 h-3" /> Lesions
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleZoomOut}
            className="p-1.5 bg-surface-2 hover:bg-surface-3 border border-surface-border text-text-primary"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleReset}
            className="px-2 py-1.5 bg-surface-2 hover:bg-surface-3 border border-surface-border text-text-secondary font-mono text-[11px]"
            title="Reset Zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleZoomIn}
            className="p-1.5 bg-surface-2 hover:bg-surface-3 border border-surface-border text-text-primary"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 bg-surface-2 hover:bg-surface-3 border border-surface-border text-accent-orange"
            title="Toggle Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Image Canvas Viewport */}
      <div className="relative w-full aspect-video min-h-[380px] max-h-[580px] bg-bg-darkest flex items-center justify-center overflow-hidden p-4">
        
        {/* Retinal Fundus Container */}
        <div
          className="relative transition-transform duration-200 ease-out flex items-center justify-center max-w-full max-h-full"
          style={{ transform: `scale(${zoom})` }}
        >
          <img
            src={imageSrc}
            alt="Retinal Fundus Scan"
            className="max-h-[460px] object-contain border border-accent-orange/30 shadow-2xl rounded-full"
          />

          {/* Grad-CAM Heatmap Layer */}
          {activeHeatmap && (
            <div className="absolute inset-0 rounded-full pointer-events-none mix-blend-screen opacity-75 transition-opacity duration-300">
              <div className="absolute top-[38%] left-[40%] w-32 h-32 rounded-full bg-radial from-accent-orange via-accent-crimson/70 to-transparent blur-md animate-pulse" />
              <div className="absolute top-[28%] left-[30%] w-20 h-20 rounded-full bg-radial from-accent-bright via-accent-gold/50 to-transparent blur-sm" />
            </div>
          )}

          {/* Blood Vessels Highlighting Overlay */}
          {activeVessels && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-80">
              <g stroke="#FF5A1F" strokeWidth="2" fill="none">
                <path d="M 180 140 Q 140 100 80 80" />
                <path d="M 180 140 Q 220 80 290 60" />
                <path d="M 180 140 Q 130 200 70 240" />
                <path d="M 180 140 Q 240 210 300 270" />
              </g>
            </svg>
          )}

          {/* Detected Lesions Callout Overlays */}
          {activeLesions && (
            <>
              <div className="absolute top-[36%] left-[38%] border-2 border-accent-orange bg-accent-orange/20 px-1.5 py-0.5 text-[9px] font-mono font-bold text-accent-bright animate-pulse">
                MA-1 (Confidence 94%)
              </div>
              <div className="absolute bottom-[40%] right-[35%] border border-accent-gold bg-accent-gold/20 px-1 py-0.5 text-[8px] font-mono text-accent-gold">
                HARD EXUDATE
              </div>
            </>
          )}
        </div>

      </div>

      {/* Footer Info HUD */}
      <div className="px-4 py-2 bg-surface-1 border-t border-surface-border font-mono text-[11px] text-text-muted flex items-center justify-between">
        <span>MODE: GRAD-CAM XAI EXPLAINABILITY ENGINE</span>
        <span className="text-accent-gold">ATTENTION QUADRANT: INFERIOR TEMPORAL</span>
      </div>

    </div>
  );
};
