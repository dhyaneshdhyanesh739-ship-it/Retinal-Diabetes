import React from 'react';
import { PublicLayout } from '../layouts/PublicLayout';
import { SectionHeader } from '../components/common/SectionHeader';
import { ArchitectureDiagram } from '../components/visualization/ArchitectureDiagram';
import { Server, Cpu, Database, Shield, Code2, Terminal } from 'lucide-react';

export const Architecture: React.FC = () => {
  return (
    <PublicLayout activePath="/architecture">
      <div className="pt-28 pb-20 bg-bg-darkest min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <SectionHeader
            number="09"
            eyebrow="Clinical Engineering Specs"
            title="SYSTEM ARCHITECTURE"
            description="Deep-dive specification of our Explainable AI stack, MERN backend REST APIs, and edge deployment pipeline."
          />

          <ArchitectureDiagram />

          {/* Detailed Stack Breakdown */}
          <div className="pt-8 border-t border-surface-border space-y-8">
            <h3 className="font-mono text-sm font-bold text-accent-gold uppercase tracking-wider">
              FULL-STACK MERN + DEEP LEARNING PIPELINE
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-xs">
              
              <div className="brutal-card p-6 space-y-3">
                <div className="flex items-center gap-2 text-accent-orange font-bold">
                  <Code2 className="w-5 h-5" /> 1. FRONTEND LAYER
                </div>
                <ul className="text-text-secondary space-y-1.5 font-sans">
                  <li>• React 18 + TypeScript</li>
                  <li>• Tailwind CSS Royal Medical Tokens</li>
                  <li>• Lenis Smooth Scrolling Engine</li>
                  <li>• Custom Skeuomorphic Canvas Viewer</li>
                </ul>
              </div>

              <div className="brutal-card p-6 space-y-3">
                <div className="flex items-center gap-2 text-accent-bright font-bold">
                  <Server className="w-5 h-5" /> 2. API SERVER LAYER
                </div>
                <ul className="text-text-secondary space-y-1.5 font-sans">
                  <li>• Node.js Express REST API</li>
                  <li>• CORS & JWT Authentication</li>
                  <li>• Asynchronous Worker Queues</li>
                  <li>• Clinical PDF Exporters</li>
                </ul>
              </div>

              <div className="brutal-card p-6 space-y-3">
                <div className="flex items-center gap-2 text-accent-gold font-bold">
                  <Cpu className="w-5 h-5" /> 3. AI / XAI CORE
                </div>
                <ul className="text-text-secondary space-y-1.5 font-sans">
                  <li>• ResNet-50 / ConvNeXt Multi-Class</li>
                  <li>• Grad-CAM Heatmap Extractor</li>
                  <li>• U-Net Retinal Vessel Masker</li>
                  <li>• ONNX Runtime for Edge Tablets</li>
                </ul>
              </div>

              <div className="brutal-card p-6 space-y-3">
                <div className="flex items-center gap-2 text-status-success font-bold">
                  <Database className="w-5 h-5" /> 4. DATABASE LAYER
                </div>
                <ul className="text-text-secondary space-y-1.5 font-sans">
                  <li>• MongoDB / Mongoose ODM</li>
                  <li>• Anonymized Patient Schemes</li>
                  <li>• XAI Heatmap Storage (GridFS)</li>
                  <li>• Audit Trail & Clinical Telemetry</li>
                </ul>
              </div>

              <div className="brutal-card p-6 space-y-3">
                <div className="flex items-center gap-2 text-accent-crimson font-bold">
                  <Shield className="w-5 h-5" /> 5. RURAL OFFLINE EDGE
                </div>
                <ul className="text-text-secondary space-y-1.5 font-sans">
                  <li>• IndexedDB Offline Buffer</li>
                  <li>• Low-Bandwidth Compression</li>
                  <li>• Auto Tele-Sync on Reconnect</li>
                  <li>• SMS Referral Dispatcher</li>
                </ul>
              </div>

              <div className="brutal-card p-6 space-y-3">
                <div className="flex items-center gap-2 text-accent-orange font-bold">
                  <Terminal className="w-5 h-5" /> 6. MATHWORKS ENGINE
                </div>
                <ul className="text-text-secondary space-y-1.5 font-sans">
                  <li>• Deep Learning Toolbox</li>
                  <li>• Computer Vision System Toolbox</li>
                  <li>• Automated Feature Metric Verification</li>
                  <li>• Model Sensitivity Benchmarking</li>
                </ul>
              </div>

            </div>
          </div>

        </div>
      </div>
    </PublicLayout>
  );
};
