import React, { useState } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { FileText, Download, Printer, Shield, CheckCircle, Eye, Sparkles, User, Calendar, MapPin, Award } from 'lucide-react';

interface PatientReportData {
  id: string;
  name: string;
  age: number;
  gender: string;
  location: string;
  phone: string;
  date: string;
  grade: string;
  confidence: number;
  urgency: string;
  attention: string;
  lesions: { microaneurysms: number; exudates: number; hemorrhages: number };
  doctor: string;
}

const PATIENTS: PatientReportData[] = [
  {
    id: 'DR-2026-001',
    name: 'Ramesh Kumar',
    age: 54,
    gender: 'Male',
    location: 'Raigarh Rural Camp, CG',
    phone: '+91 98765 43210',
    date: '2026-09-28',
    grade: 'Moderate Non-Proliferative Diabetic Retinopathy',
    confidence: 91.8,
    urgency: 'ROUTINE REFERRAL (Within 4 Weeks)',
    attention: 'Inferior Temporal Vascular Arcades & Macular Periphery',
    lesions: { microaneurysms: 8, exudates: 4, hemorrhages: 2 },
    doctor: 'Dr. A. Sharma, M.D. (AIIMS Retina Specialist)',
  },
  {
    id: 'DR-2026-002',
    name: 'Sunita Devi',
    age: 48,
    gender: 'Female',
    location: 'Surguja Outreach Unit, CG',
    phone: '+91 98123 55678',
    date: '2026-09-29',
    grade: 'Severe Non-Proliferative Diabetic Retinopathy',
    confidence: 94.8,
    urgency: 'URGENT REFERRAL (Laser Assessment within 72 Hours)',
    attention: 'Superior & Temporal Vascular Arcades',
    lesions: { microaneurysms: 18, exudates: 9, hemorrhages: 5 },
    doctor: 'Dr. P. Nair (Retina Specialist)',
  },
  {
    id: 'DR-2026-003',
    name: 'Balwant Singh',
    age: 62,
    gender: 'Male',
    location: 'Bastar Mobile Clinic, CG',
    phone: '+91 97654 32109',
    date: '2026-09-30',
    grade: 'No Apparent Diabetic Retinopathy',
    confidence: 97.1,
    urgency: 'NO REFERRAL (Annual Rescreening in 12 Months)',
    attention: 'Uniform Normal Foveal Reflex',
    lesions: { microaneurysms: 0, exudates: 0, hemorrhages: 0 },
    doctor: 'Health Worker S. Verma',
  },
];

export const Reports: React.FC = () => {
  const [selectedPatientId, setSelectedPatientId] = useState<string>('DR-2026-001');

  const selectedPatient = PATIENTS.find((p) => p.id === selectedPatientId) || PATIENTS[0];

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById('printable-report-document');
    if (!element) {
      window.print();
      return;
    }

    const reportHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>RetinaX_Clinical_Report_${selectedPatient.id}</title>
        <style>
          body { font-family: 'Helvetica Neue', Arial, sans-serif; background: #ffffff; color: #111111; padding: 25px; margin: 0; }
          .print-bg-white { background: #ffffff !important; }
          .print-text-dark { color: #111111 !important; }
          .no-print { display: none !important; }
          img { max-width: 100%; height: auto; }
        </style>
      </head>
      <body>
        ${element.innerHTML}
        <script>
          window.onload = function() { window.print(); };
        </script>
      </body>
      </html>
    `;

    const blob = new Blob([reportHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `RetinaX_Clinical_Report_${selectedPatient.id}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout activeItem="reports" activePath="/reports">
      <div className="space-y-8">
        
        {/* Header & Controls (Hidden during print) */}
        <div className="no-print flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-border pb-6">
          <div>
            <div className="font-mono text-xs text-accent-gold uppercase font-bold mb-1">
              CLINICAL AUDIT & EXPORT MODULE
            </div>
            <h1 className="text-3xl font-black font-sans uppercase text-text-primary tracking-tight">
              Screening & XAI PDF Reports
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Patient Selector */}
            <div className="flex items-center gap-2 bg-surface-1 border border-surface-border px-3 py-1.5 font-mono text-xs">
              <User className="w-3.5 h-3.5 text-accent-orange" />
              <select
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(e.target.value)}
                className="bg-transparent text-text-primary focus:outline-none cursor-pointer font-bold"
              >
                {PATIENTS.map((p) => (
                  <option key={p.id} value={p.id} className="bg-bg-dark text-text-primary">
                    {p.name} ({p.id})
                  </option>
                ))}
              </select>
            </div>

            <Button variant="primary" size="sm" icon={<Printer className="w-4 h-4" />} onClick={handlePrint}>
              Print Report
            </Button>
            <Button variant="secondary" size="sm" icon={<Download className="w-4 h-4" />} onClick={handleDownloadPDF}>
              Download PDF
            </Button>
          </div>
        </div>

        {/* Official Printable Clinical Document Document Container */}
        <div
          id="printable-report-document"
          className="brutal-card p-8 bg-surface-1 border-accent-orange/50 max-w-4xl mx-auto space-y-6 text-text-primary font-sans print-bg-white print-text-dark"
        >
          
          {/* Document Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b-2 border-accent-orange pb-6 gap-4 print:border-black">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white border-2 border-accent-orange flex items-center justify-center p-0.5 rounded shadow-brutal flex-shrink-0">
                <img src="/logo.png" alt="Retina-X Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h2 className="font-mono text-xl font-black uppercase tracking-wide text-text-primary print-text-dark">
                  RETINA-X CLINICAL AUDIT REPORT
                </h2>
                <p className="font-mono text-xs text-text-muted print:text-black">
                  AIIMS Tele-Ophthalmology Network • Clinical Diagnostic Record
                </p>
              </div>
            </div>

            <div className="text-right font-mono text-xs">
              <span className="inline-block px-2.5 py-1 bg-accent-orange/10 border border-accent-orange text-accent-orange font-bold uppercase print:border-black print:text-black print:bg-gray-100">
                VERIFIED CLINICAL AUDIT
              </span>
              <div className="text-[10px] text-text-muted mt-1 print:text-black">
                AUDIT ID: SCR-{selectedPatient.id.split('-')[2]}-2026
              </div>
            </div>
          </div>

          {/* Patient Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-surface-2 border border-surface-border font-mono text-xs print:bg-gray-50 print:border-gray-300 print-text-dark">
            <div>
              <span className="text-text-muted text-[10px] block print:text-gray-600">PATIENT ID</span>
              <strong className="text-accent-orange print:text-black font-bold">{selectedPatient.id}</strong>
            </div>
            <div>
              <span className="text-text-muted text-[10px] block print:text-gray-600">PATIENT NAME</span>
              <strong className="text-text-primary print-text-dark">{selectedPatient.name}</strong>
            </div>
            <div>
              <span className="text-text-muted text-[10px] block print:text-gray-600">AGE / GENDER</span>
              <strong className="text-text-primary print-text-dark">{selectedPatient.age} YRS ({selectedPatient.gender})</strong>
            </div>
            <div>
              <span className="text-text-muted text-[10px] block print:text-gray-600">SCREENING DATE</span>
              <strong className="text-text-primary print-text-dark">{selectedPatient.date}</strong>
            </div>
            <div className="col-span-2">
              <span className="text-text-muted text-[10px] block print:text-gray-600">CAMP LOCATION</span>
              <strong className="text-text-primary print-text-dark">{selectedPatient.location}</strong>
            </div>
            <div className="col-span-2">
              <span className="text-text-muted text-[10px] block print:text-gray-600">ASSIGNED DOCTOR</span>
              <strong className="text-text-primary print-text-dark">{selectedPatient.doctor}</strong>
            </div>
          </div>

          {/* Side-by-Side Retinal Scans & Grad-CAM Heatmap Image Section */}
          <div className="space-y-3 font-mono text-xs">
            <h3 className="font-bold text-accent-orange uppercase border-b border-surface-border pb-1 flex items-center gap-2 print:border-gray-300 print:text-black">
              <Eye className="w-4 h-4 text-accent-orange no-print" /> 01 — RETINAL FUNDUS SCAN & GRAD-CAM ATTENTION MAP
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 bg-surface-2 border border-surface-border print:bg-white print:border-gray-300">
              {/* Image 1: Raw Retina */}
              <div className="space-y-2 text-center">
                <span className="text-[11px] font-bold text-text-muted block uppercase print:text-black">
                  Raw Retinal Fundus Scan
                </span>
                <div className="relative aspect-square max-w-[280px] mx-auto rounded-full overflow-hidden border-2 border-surface-border bg-black print:border-black">
                  <img src="/real_retina.png" alt="Raw Fundus" className="w-full h-full object-cover rounded-full scale-[1.05]" />
                </div>
              </div>

              {/* Image 2: Grad-CAM Overlay */}
              <div className="space-y-2 text-center">
                <span className="text-[11px] font-bold text-accent-bright block uppercase print:text-black">
                  Grad-CAM XAI Heatmap
                </span>
                <div className="relative aspect-square max-w-[280px] mx-auto rounded-full overflow-hidden border-2 border-accent-orange bg-black print:border-black">
                  <img src="/real_retina.png" alt="Grad-CAM Heatmap" className="w-full h-full object-cover rounded-full scale-[1.05]" />
                  {/* Grad-CAM Blended Heatmap */}
                  <div className="absolute inset-0 rounded-full mix-blend-color-dodge pointer-events-none opacity-90">
                    <div 
                      className="absolute top-[32%] left-[28%] w-28 h-28 rounded-full blur-md"
                      style={{ background: 'radial-gradient(circle, #FF1E00 0%, #FF7A00 50%, transparent 70%)' }}
                    />
                    <div 
                      className="absolute bottom-[26%] left-[36%] w-20 h-20 rounded-full blur-sm"
                      style={{ background: 'radial-gradient(circle, #FF0055 0%, #FF7A00 50%, transparent 70%)' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Screening Summary Box */}
          <div className="space-y-3 font-mono text-xs">
            <h3 className="font-bold text-accent-gold uppercase border-b border-surface-border pb-1 print:border-gray-300 print:text-black">
              02 — AI CLASSIFICATION & CLINICAL TRIAGE
            </h3>
            
            <div className="p-4 bg-surface-2 border-l-4 border-l-accent-orange flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:bg-gray-50 print:border-l-black print:border-gray-300">
              <div>
                <span className="text-text-muted text-[10px] uppercase block print:text-gray-600">PREDICTED SEVERITY GRADE</span>
                <span className="text-lg font-bold text-text-primary font-sans print:text-black">{selectedPatient.grade}</span>
              </div>
              <div className="sm:text-right">
                <span className="text-text-muted text-[10px] uppercase block print:text-gray-600">MODEL CALIBRATED CONFIDENCE</span>
                <span className="text-2xl font-black text-accent-orange print:text-black">{selectedPatient.confidence}%</span>
              </div>
            </div>

            <div className="p-3 bg-accent-orange/10 border border-accent-orange/40 font-mono text-xs text-accent-bright font-bold uppercase print:bg-gray-100 print:text-black print:border-black">
              REFERRAL DIRECTIVE: {selectedPatient.urgency}
            </div>
          </div>

          {/* Explainability Breakdown & Biomarkers */}
          <div className="space-y-3 font-mono text-xs">
            <h3 className="font-bold text-accent-orange uppercase border-b border-surface-border pb-1 print:border-gray-300 print:text-black">
              03 — BIOMARKER & LESION EVIDENCE BREAKDOWN
            </h3>

            <div className="grid grid-cols-3 gap-3 p-3 bg-surface-2 border border-surface-border text-center print:bg-white print:border-gray-300">
              <div className="p-2 border-r border-surface-border print:border-gray-300">
                <span className="text-text-muted text-[10px] block">MICROANEURYSMS</span>
                <strong className="text-base text-accent-orange print:text-black">{selectedPatient.lesions.microaneurysms} DETECTED</strong>
              </div>
              <div className="p-2 border-r border-surface-border print:border-gray-300">
                <span className="text-text-muted text-[10px] block">HARD EXUDATES</span>
                <strong className="text-base text-accent-gold print:text-black">{selectedPatient.lesions.exudates} DETECTED</strong>
              </div>
              <div className="p-2">
                <span className="text-text-muted text-[10px] block">HEMORRHAGES</span>
                <strong className="text-base text-accent-crimson print:text-black">{selectedPatient.lesions.hemorrhages} LOCATIONS</strong>
              </div>
            </div>

            <p className="text-text-secondary text-xs print:text-black">
              • <strong>GRAD-CAM ATTENTION REGION:</strong> {selectedPatient.attention}
            </p>
          </div>

          {/* Doctor Verification Sign-Off Block */}
          <div className="pt-4 border-t-2 border-surface-border space-y-4 font-mono text-xs print:border-black print:text-black">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-text-primary uppercase block print:text-black">TELE-OPHTHALMOLOGIST VERIFICATION</span>
                <span className="text-[10px] text-text-muted print:text-gray-600">Review & Clinical Signature</span>
              </div>
              <div className="w-48 h-12 border-2 border-dashed border-surface-border flex items-center justify-center text-[10px] text-text-muted print:border-black print:text-black">
                OFFICIAL STAMP / SIGN
              </div>
            </div>

            <div className="p-3 bg-surface-2 border border-surface-border text-[11px] text-text-muted leading-relaxed print:bg-white print:border-gray-300 print:text-black">
              <strong className="text-accent-gold uppercase print:text-black">CLINICAL DIRECTIVE:</strong>
              AI-assisted diabetic retinopathy screening results are for diagnostic decision support. Confirmation by a licensed ophthalmologist is required before clinical intervention.
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};

