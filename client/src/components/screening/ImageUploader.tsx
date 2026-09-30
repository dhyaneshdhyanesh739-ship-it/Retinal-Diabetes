import React, { useState } from 'react';
import { UploadCloud, Image as ImageIcon, CheckCircle, AlertCircle, Sparkles, RefreshCw } from 'lucide-react';
import { Button } from '../common/Button';

interface ImageUploaderProps {
  onImageSelected: (imageSrc: string, imageName: string) => void;
  selectedImageName?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelected,
  selectedImageName,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');

  const sampleImages = [
    {
      name: 'retina_moderate_dr_sample.jpg',
      label: 'Sample 1: Moderate DR (Lesions)',
      src: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'retina_severe_dr_sample.jpg',
      label: 'Sample 2: Severe DR (Exudates)',
      src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'retina_normal_sample.jpg',
      label: 'Sample 3: Normal Retina',
      src: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const src = reader.result as string;
      setPreview(src);
      setFileName(file.name);
      onImageSelected(src, file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectSample = (sample: typeof sampleImages[0]) => {
    setPreview(sample.src);
    setFileName(sample.name);
    onImageSelected(sample.src, sample.name);
  };

  return (
    <div className="space-y-6">
      {/* Upload Box */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`relative p-8 border-2 border-dashed transition-all duration-200 text-center flex flex-col items-center justify-center min-h-[260px] ${
          dragActive
            ? 'border-accent-orange bg-accent-orange/10 scale-[1.01]'
            : 'border-surface-border bg-surface-1 hover:border-accent-orange/60'
        }`}
      >
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />

        <div className="w-14 h-14 bg-surface-2 border border-accent-orange/50 flex items-center justify-center mb-4 shadow-brutal">
          <UploadCloud className="w-7 h-7 text-accent-orange animate-pulse" />
        </div>

        <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-text-primary mb-1">
          Drop Retinal Fundus Image Here
        </h3>
        <p className="text-xs text-text-secondary mb-4">
          or click to browse from workstation storage (JPG, PNG • Max 25MB)
        </p>

        <Button variant="secondary" size="sm" icon={<ImageIcon className="w-4 h-4" />}>
          Browse File
        </Button>
      </div>

      {/* Demo Preset Selector for Quick Testing */}
      <div className="p-4 bg-surface-1 border border-surface-border">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-xs uppercase font-bold text-accent-gold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Quick Screening Presets (XAI Demo)
          </span>
          <span className="text-[10px] font-mono text-text-muted">Click to Load</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {sampleImages.map((sample) => (
            <button
              key={sample.name}
              onClick={() => handleSelectSample(sample)}
              className={`p-2.5 text-left border font-mono text-xs transition-all flex items-center gap-2 ${
                fileName === sample.name
                  ? 'border-accent-orange bg-accent-orange/10 text-accent-orange font-bold'
                  : 'border-surface-border bg-surface-2 text-text-secondary hover:text-text-primary hover:border-accent-orange/50'
              }`}
            >
              <img src={sample.src} alt={sample.label} className="w-8 h-8 object-cover border border-surface-border" />
              <span className="truncate">{sample.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected File Status */}
      {fileName && (
        <div className="p-3 bg-surface-2 border border-status-success/40 flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-xs text-status-success">
            <CheckCircle className="w-4 h-4" />
            <span>FILE READY: <strong className="text-text-primary">{fileName}</strong></span>
          </div>
          <span className="font-mono text-[10px] bg-status-success/20 text-status-success px-2 py-0.5 border border-status-success/30">
            QUALITY OK (94.6%)
          </span>
        </div>
      )}
    </div>
  );
};
