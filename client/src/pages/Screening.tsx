import React, { useState } from 'react';
import { PublicLayout } from '../layouts/PublicLayout';
import { ImageUploader } from '../components/screening/ImageUploader';
import { ImageViewer } from '../components/screening/ImageViewer';
import { ScreeningProgress } from '../components/screening/ScreeningProgress';
import { ScreeningResult } from '../components/screening/ScreeningResult';
import { analyzeRetinalImage } from '../services/screeningService';
import type { FullScreeningResponse, ReliabilityStatus } from '../types/screening';
import { Button } from '../components/common/Button';
import { Eye, Cpu, RefreshCw, AlertTriangle, ShieldCheck, CheckCircle2, HelpCircle, AlertCircle } from 'lucide-react';

export const Screening: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>('');
  const [eyeSide, setEyeSide] = useState<string>('Right Eye (OD)');
  const [demoState, setDemoState] = useState<ReliabilityStatus>('RELIABLE_SCREENING');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [result, setResult] = useState<FullScreeningResponse | null>(null);

  const handleImageSelected = (src: string, name: string) => {
    setSelectedImage(src);
    setImageName(name);
    setResult(null);
  };

  const handleStartScreening = async () => {
    if (!selectedImage) return;
    setIsAnalyzing(true);
    setResult(null);
  };

  const handleProgressComplete = async () => {
    try {
      const apiResult = await analyzeRetinalImage(imageName, eyeSide, demoState);
      setResult(apiResult);
    } catch {
      console.warn('Using client screening fallback');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setImageName('');
    setResult(null);
    setIsAnalyzing(false);
  };

  return (
    <PublicLayout activePath="/screening">
      <div className="pt-28 pb-20 bg-bg-darkest min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-surface-border pb-6">
            <div>
              <div className="flex items-center gap-2 mb-2 font-mono text-xs text-accent-gold">
                <span className="w-2 h-2 rounded-full bg-accent-orange animate-ping" />
                EXPLAINABLE AI SCREENING WORKFLOW & RURAL SIMULATION
              </div>
              <h1 className="text-3xl md:text-5xl font-black font-sans uppercase text-text-primary tracking-tight">
                AI Retinal Screening Console
              </h1>
            </div>

            {/* Eye Selector & Demo Reliability State Selector */}
            <div className="flex flex-wrap items-center gap-3">
              
              {/* Eye Position Toggle */}
              <div className="flex items-center gap-1 bg-surface-1 p-1 border border-surface-border font-mono text-xs">
                <span className="text-text-muted px-2">Eye:</span>
                <button
                  onClick={() => setEyeSide('Right Eye (OD)')}
                  className={`px-3 py-1 font-bold uppercase transition-colors ${
                    eyeSide === 'Right Eye (OD)'
                      ? 'bg-accent-orange text-bg-darkest'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  OD (Right)
                </button>
                <button
                  onClick={() => setEyeSide('Left Eye (OS)')}
                  className={`px-3 py-1 font-bold uppercase transition-colors ${
                    eyeSide === 'Left Eye (OS)'
                      ? 'bg-accent-orange text-bg-darkest'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  OS (Left)
                </button>
              </div>

              {/* Member 4 State Simulator Toggle */}
              <div className="flex items-center gap-1 bg-surface-1 p-1 border border-accent-gold/40 font-mono text-xs">
                <span className="text-accent-gold px-2 font-bold">State:</span>
                <button
                  onClick={() => setDemoState('RELIABLE_SCREENING')}
                  className={`px-2.5 py-1 text-[11px] font-bold uppercase transition-all border ${
                    demoState === 'RELIABLE_SCREENING'
                      ? 'bg-status-success text-bg-darkest border-status-success'
                      : 'bg-surface-2 text-text-secondary border-surface-border'
                  }`}
                  title="Reliable High Confidence Result"
                >
                  Reliable
                </button>
                <button
                  onClick={() => setDemoState('HUMAN_REVIEW_RECOMMENDED')}
                  className={`px-2.5 py-1 text-[11px] font-bold uppercase transition-all border ${
                    demoState === 'HUMAN_REVIEW_RECOMMENDED'
                      ? 'bg-status-warning text-bg-darkest border-status-warning'
                      : 'bg-surface-2 text-text-secondary border-surface-border'
                  }`}
                  title="Borderline High Uncertainty - Human Review"
                >
                  Human Review
                </button>
                <button
                  onClick={() => setDemoState('IMAGE_RECAPTURE_REQUIRED')}
                  className={`px-2.5 py-1 text-[11px] font-bold uppercase transition-all border ${
                    demoState === 'IMAGE_RECAPTURE_REQUIRED'
                      ? 'bg-status-danger text-white border-status-danger'
                      : 'bg-surface-2 text-text-secondary border-surface-border'
                  }`}
                  title="Poor Image Quality - Recapture Required"
                >
                  Recapture
                </button>
              </div>

            </div>
          </div>

          {/* Main Workstation Layout */}
          {!selectedImage ? (
            <div className="max-w-3xl mx-auto">
              <ImageUploader onImageSelected={handleImageSelected} />
            </div>
          ) : isAnalyzing ? (
            <ScreeningProgress onComplete={handleProgressComplete} />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: ImageViewer */}
              <div className="lg:col-span-7 space-y-4">
                <ImageViewer imageSrc={selectedImage} />
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-text-muted">File: {imageName}</span>
                  <button onClick={handleReset} className="text-accent-orange hover:underline flex items-center gap-1">
                    <RefreshCw className="w-3.5 h-3.5" /> Select Different Image
                  </button>
                </div>
              </div>

              {/* Right Column: Control or Result */}
              <div className="lg:col-span-5 space-y-6">
                {!result ? (
                  <div className="brutal-card p-6 space-y-6">
                    <div className="border-b border-surface-border pb-4">
                      <span className="font-mono text-xs text-status-success uppercase font-bold block mb-1">
                        IMAGE QUALITY VERIFIED
                      </span>
                      <h3 className="font-mono text-lg font-bold text-text-primary uppercase">
                        Ready for AI Neural Inference
                      </h3>
                      <p className="text-xs text-text-secondary mt-1">
                        Calls POST /api/v1/predict/full-screening (EfficientNet-B4 + Grad-CAM XAI Pipeline).
                      </p>
                    </div>

                    <div className="space-y-3 font-mono text-xs text-text-secondary">
                      <div className="flex justify-between p-2 bg-surface-2 border border-surface-border">
                        <span>Target API Endpoint:</span>
                        <span className="text-accent-orange font-bold">/v1/predict/full-screening</span>
                      </div>
                      <div className="flex justify-between p-2 bg-surface-2 border border-surface-border">
                        <span>Selected Test State:</span>
                        <span className="text-accent-gold font-bold">{demoState}</span>
                      </div>
                    </div>

                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full"
                      onClick={handleStartScreening}
                      icon={<Cpu className="w-5 h-5" />}
                    >
                      Start AI Screening Analysis
                    </Button>
                  </div>
                ) : (
                  <ScreeningResult result={result} onReset={handleReset} />
                )}
              </div>

            </div>
          )}

        </div>
      </div>
    </PublicLayout>
  );
};
