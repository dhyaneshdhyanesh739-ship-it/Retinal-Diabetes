import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Maximize2, Layers, Eye, Sparkles, RefreshCw } from 'lucide-react';

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
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const [activeHeatmap, setActiveHeatmap] = useState(heatmapOverlay);
  const [activeVessels, setActiveVessels] = useState(showVessels);
  const [activeLesions, setActiveLesions] = useState(showLesions);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Zoom Handler Functions
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.35, 3.5));
  };

  const handleZoomOut = () => {
    setZoom((prev) => {
      const next = Math.max(prev - 0.35, 1);
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const setPresetZoom = (val: number) => {
    setZoom(val);
    if (val === 1) setPan({ x: 0, y: 0 });
  };

  // Mouse Drag / Pan Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  // Wheel Zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  return (
    <div className={`relative bg-bg-darkest border border-surface-border overflow-hidden flex flex-col ${isFullscreen ? 'fixed inset-0 z-50 p-4' : 'w-full'}`}>
      
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

        {/* Tactile Skeuomorphic Layer Toggles */}
        <div className="flex items-center gap-1.5 bg-surface-2 p-1 border border-surface-border">
          <button
            onClick={() => setActiveHeatmap(!activeHeatmap)}
            className={`px-2.5 py-1 text-[11px] font-bold uppercase transition-all flex items-center gap-1 border cursor-pointer ${
              activeHeatmap
                ? 'bg-accent-orange text-bg-darkest border-accent-bright shadow-skeuo-btn'
                : 'bg-surface-3 text-text-secondary border-surface-border hover:text-text-primary'
            }`}
          >
            <Sparkles className="w-3 h-3" /> Heatmap
          </button>
          
          <button
            onClick={() => setActiveVessels(!activeVessels)}
            className={`px-2.5 py-1 text-[11px] font-bold uppercase transition-all flex items-center gap-1 border cursor-pointer ${
              activeVessels
                ? 'bg-accent-crimson text-white border-accent-crimson shadow-skeuo-btn'
                : 'bg-surface-3 text-text-secondary border-surface-border hover:text-text-primary'
            }`}
          >
            <Layers className="w-3 h-3" /> Vessels
          </button>

          <button
            onClick={() => setActiveLesions(!activeLesions)}
            className={`px-2.5 py-1 text-[11px] font-bold uppercase transition-all flex items-center gap-1 border cursor-pointer ${
              activeLesions
                ? 'bg-accent-gold text-bg-darkest border-accent-gold shadow-skeuo-btn'
                : 'bg-surface-3 text-text-secondary border-surface-border hover:text-text-primary'
            }`}
          >
            <Eye className="w-3 h-3" /> Lesions
          </button>
        </div>

        {/* Zoom & Magnification Controls */}
        <div className="flex items-center gap-1">
          {/* Quick Preset Badges */}
          <button
            onClick={() => setPresetZoom(1)}
            className={`px-2 py-1 border text-[10px] font-bold transition-all cursor-pointer ${zoom === 1 ? 'bg-accent-orange text-bg-darkest border-accent-orange' : 'bg-surface-2 text-text-secondary border-surface-border hover:text-text-primary'}`}
          >
            1x
          </button>
          <button
            onClick={() => setPresetZoom(1.5)}
            className={`px-2 py-1 border text-[10px] font-bold transition-all cursor-pointer ${zoom === 1.5 ? 'bg-accent-orange text-bg-darkest border-accent-orange' : 'bg-surface-2 text-text-secondary border-surface-border hover:text-text-primary'}`}
          >
            1.5x
          </button>
          <button
            onClick={() => setPresetZoom(2.2)}
            className={`px-2 py-1 border text-[10px] font-bold transition-all cursor-pointer ${zoom === 2.2 ? 'bg-accent-orange text-bg-darkest border-accent-orange' : 'bg-surface-2 text-text-secondary border-surface-border hover:text-text-primary'}`}
          >
            2.2x
          </button>
          <button
            onClick={() => setPresetZoom(3.0)}
            className={`px-2 py-1 border text-[10px] font-bold transition-all cursor-pointer ${zoom === 3.0 ? 'bg-accent-orange text-bg-darkest border-accent-orange' : 'bg-surface-2 text-text-secondary border-surface-border hover:text-text-primary'}`}
          >
            3.0x
          </button>

          <div className="w-px h-4 bg-surface-border mx-1" />

          <button
            onClick={handleZoomOut}
            className="p-1.5 bg-surface-2 hover:bg-surface-3 border border-surface-border text-text-primary active:scale-95 cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleReset}
            className="px-2 py-1.5 bg-surface-2 hover:bg-surface-3 border border-surface-border text-text-secondary font-mono text-[11px] active:scale-95 cursor-pointer"
            title="Reset Zoom & Position"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleZoomIn}
            className="p-1.5 bg-surface-2 hover:bg-surface-3 border border-surface-border text-text-primary active:scale-95 cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 bg-surface-2 hover:bg-surface-3 border border-surface-border text-accent-orange active:scale-95 cursor-pointer"
            title="Toggle Fullscreen View"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Workstation Viewport Canvas */}
      <div 
        className="relative w-full min-h-[420px] max-h-[620px] bg-bg-darkest flex items-center justify-center overflow-hidden p-6 select-none"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        
        {/* Enforced 1:1 Circular Fundus Lens Container (Prevents Oval Distortion for any uploaded aspect ratio) */}
        <div className={`relative w-[360px] h-[360px] sm:w-[420px] sm:h-[420px] aspect-square rounded-full border-4 border-accent-orange/80 shadow-royal overflow-hidden bg-black flex items-center justify-center transition-transform duration-150 ${zoom > 1 ? 'cursor-grab active:cursor-grabbing' : ''}`}>
          
          {/* Scalable & Pannable Retinal Image Wrapper */}
          <div
            className="relative w-full h-full flex items-center justify-center transition-transform duration-100 ease-out"
            style={{
              transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
            }}
          >
            {/* Fundus Scan Image fitted inside perfect 1:1 circular lens */}
            <img
              src={imageSrc}
              alt="Retinal Fundus Scan"
              className="w-full h-full object-cover rounded-full pointer-events-none"
            />

            {/* Multi-spectral Grad-CAM Heatmap Layer */}
            {activeHeatmap && (
              <div className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300 opacity-85">
                <div 
                  className="absolute top-[34%] left-[30%] w-36 h-36 rounded-full blur-md animate-pulse" 
                  style={{ background: 'radial-gradient(circle, rgba(255, 0, 0, 0.95) 0%, rgba(255, 100, 0, 0.85) 35%, rgba(255, 210, 0, 0.65) 60%, rgba(0, 220, 255, 0.3) 80%, transparent 100%)' }}
                />
                <div 
                  className="absolute bottom-[26%] left-[36%] w-28 h-28 rounded-full blur-md" 
                  style={{ background: 'radial-gradient(circle, rgba(255, 0, 85, 0.95) 0%, rgba(255, 140, 0, 0.8) 40%, rgba(255, 230, 0, 0.6) 65%, transparent 85%)' }}
                />
              </div>
            )}

            {/* Blood Vessels Highlighting Overlay */}
            {activeVessels && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-80">
                <g stroke="#FF5A1F" strokeWidth="2.5" fill="none">
                  <path d="M 210 180 Q 150 120 90 90" />
                  <path d="M 210 180 Q 260 100 330 70" />
                  <path d="M 210 180 Q 150 250 80 300" />
                  <path d="M 210 180 Q 280 260 350 330" />
                </g>
              </svg>
            )}

            {/* Detected Lesions Callout Overlays */}
            {activeLesions && (
              <>
                <div className="absolute top-[36%] left-[38%] border-2 border-accent-orange bg-accent-orange/30 px-1.5 py-0.5 text-[9px] font-mono font-bold text-accent-bright animate-pulse pointer-events-none">
                  MA-1 (94%)
                </div>
                <div className="absolute bottom-[38%] right-[32%] border border-accent-gold bg-accent-gold/30 px-1 py-0.5 text-[8px] font-mono font-bold text-accent-gold pointer-events-none">
                  HARD EXUDATE
                </div>
              </>
            )}
          </div>

          {/* Focal Crosshairs HUD Overlay */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
            <div className="w-full h-[1px] bg-accent-orange" />
            <div className="h-full w-[1px] bg-accent-orange absolute" />
          </div>

        </div>

      </div>

      {/* Footer Info HUD */}
      <div className="px-4 py-2 bg-surface-1 border-t border-surface-border font-mono text-[11px] text-text-muted flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-accent-orange" />
          CANVAS: 1:1 CIRCULAR FUNDUS LENS • {zoom > 1 ? 'DRAG TO PAN SCAN' : 'READY'}
        </span>
        <span className="text-accent-gold font-bold">MAGNIFICATION: {Math.round(zoom * 100)}%</span>
      </div>

    </div>
  );
};
