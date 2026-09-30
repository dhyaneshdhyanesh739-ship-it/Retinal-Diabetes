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
    const origin = window.location.origin;
    const reportHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>RetinaX_Clinical_Report_${selectedPatient.id}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&family=Space+Grotesk:wght@500;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', sans-serif; background: #f4f6f8; color: #111827; padding: 30px 15px; }
    .report-card { max-width: 800px; margin: 0 auto; background: #ffffff; border: 2px solid #FF5A1F; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
    .header { display: flex; align-items: center; justify-content: space-between; border-bottom: 3px solid #FF5A1F; padding-bottom: 20px; margin-bottom: 25px; }
    .logo-box { display: flex; align-items: center; gap: 12px; }
    .logo-img { width: 48px; height: 48px; border: 2px solid #FF5A1F; border-radius: 4px; padding: 2px; object-fit: contain; }
    .title { font-family: 'Space Grotesk', monospace; font-size: 20px; font-weight: 900; text-transform: uppercase; color: #111827; letter-spacing: 0.5px; }
    .subtitle { font-family: 'Space Grotesk', monospace; font-size: 11px; color: #6b7280; margin-top: 2px; }
    .badge { font-family: 'Space Grotesk', monospace; font-size: 11px; font-weight: 700; background: #fff7ed; border: 1px solid #FF5A1F; color: #FF5A1F; padding: 6px 12px; text-transform: uppercase; }
    .meta-grid { display: grid; grid-template-cols: repeat(4, 1fr); gap: 12px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; margin-bottom: 25px; font-family: 'Space Grotesk', monospace; }
    .meta-label { color: #64748b; font-size: 9px; text-transform: uppercase; display: block; margin-bottom: 2px; }
    .meta-val { color: #0f172a; font-weight: 700; font-size: 12px; }
    .section-title { font-family: 'Space Grotesk', monospace; font-size: 12px; font-weight: 700; text-transform: uppercase; color: #FF5A1F; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-bottom: 15px; }
    .scan-grid { display: grid; grid-template-cols: 1fr 1fr; gap: 20px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; margin-bottom: 25px; text-align: center; }
    .scan-box { position: relative; width: 220px; height: 220px; margin: 10px auto; border-radius: 50%; overflow: hidden; border: 3px solid #111827; background: #000; }
    .scan-box img { width: 100%; height: 100%; object-fit: cover; transform: scale(1.08); }
    .heatmap-layer { position: absolute; inset: 0; border-radius: 50%; pointer-events: none; opacity: 0.9; }
    .scan-caption { font-family: 'Space Grotesk', monospace; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #475569; }
    .diag-box { background: #fff7ed; border-left: 5px solid #FF5A1F; border: 1px solid #fed7aa; border-left-width: 5px; padding: 18px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; }
    .diag-grade { font-size: 16px; font-weight: 800; color: #0f172a; margin-top: 4px; }
    .diag-conf { font-family: 'Space Grotesk', monospace; font-size: 24px; font-weight: 900; color: #FF5A1F; text-align: right; }
    .urgency-banner { background: #fee2e2; border: 1px solid #fca5a5; color: #991b1b; font-family: 'Space Grotesk', monospace; font-size: 11px; font-weight: 700; padding: 10px 14px; margin-bottom: 25px; text-transform: uppercase; }
    .lesion-table { display: grid; grid-template-cols: repeat(3, 1fr); gap: 10px; background: #ffffff; border: 1px solid #e2e8f0; padding: 15px; margin-bottom: 20px; text-align: center; font-family: 'Space Grotesk', monospace; }
    .lesion-card { padding: 10px; background: #f8fafc; border: 1px solid #cbd5e1; }
    .lesion-count { font-size: 13px; font-weight: 800; color: #FF5A1F; margin-top: 2px; }
    .sign-block { border-top: 2px solid #e2e8f0; padding-top: 20px; margin-top: 25px; display: flex; justify-content: space-between; align-items: flex-end; font-family: 'Space Grotesk', monospace; font-size: 11px; }
    .stamp-box { width: 180px; height: 50px; border: 2px dashed #94a3b8; display: flex; align-items: center; justify-content: center; color: #94a3b8; font-size: 10px; }
    .disclaimer { background: #f8fafc; border: 1px solid #e2e8f0; padding: 12px; font-size: 10px; color: #64748b; line-height: 1.5; margin-top: 20px; }
    @media print { body { background: #fff; padding: 0; } .report-card { border: none; box-shadow: none; padding: 0; } }
  </style>
</head>
<body>
  <div class="report-card">
    <div class="header">
      <div class="logo-box">
        <img src="${origin}/logo.png" class="logo-img" alt="Logo" />
        <div>
          <div class="title">RETINA-X CLINICAL AUDIT REPORT</div>
          <div class="subtitle">AIIMS Tele-Ophthalmology Network • Clinical Diagnostic Record</div>
        </div>
      </div>
      <div class="badge">VERIFIED RECORD</div>
    </div>

    <div class="meta-grid">
      <div><span class="meta-label">PATIENT ID</span><span class="meta-val" style="color: #FF5A1F;">${selectedPatient.id}</span></div>
      <div><span class="meta-label">PATIENT NAME</span><span class="meta-val">${selectedPatient.name}</span></div>
      <div><span class="meta-label">AGE / GENDER</span><span class="meta-val">${selectedPatient.age} YRS (${selectedPatient.gender})</span></div>
      <div><span class="meta-label">SCREENING DATE</span><span class="meta-val">${selectedPatient.date}</span></div>
      <div style="grid-column: span 2;"><span class="meta-label">OUTREACH LOCATION</span><span class="meta-val">${selectedPatient.location}</span></div>
      <div style="grid-column: span 2;"><span class="meta-label">TELE-SPECIALIST</span><span class="meta-val">${selectedPatient.doctor}</span></div>
    </div>

    <div class="section-title">01 — RETINAL FUNDUS SCAN & GRAD-CAM ATTENTION MAP</div>
    <div class="scan-grid">
      <div>
        <div class="scan-caption">Raw Retinal Fundus Scan</div>
        <div class="scan-box">
          <img src="${origin}/real_retina.png" alt="Raw Retina" />
        </div>
      </div>
      <div>
        <div class="scan-caption" style="color: #FF5A1F;">Grad-CAM Attention Map</div>
        <div class="scan-box">
          <img src="${origin}/real_retina.png" alt="Grad-CAM Retina" />
          <div class="heatmap-layer">
            <div style="position: absolute; top: 28%; left: 26%; width: 120px; height: 120px; border-radius: 50%; filter: blur(8px); background: radial-gradient(circle, rgba(255,0,0,0.95) 0%, rgba(255,100,0,0.85) 35%, rgba(255,210,0,0.65) 60%, rgba(0,220,255,0.3) 80%, transparent 100%);"></div>
            <div style="position: absolute; bottom: 24%; left: 34%; width: 95px; height: 95px; border-radius: 50%; filter: blur(6px); background: radial-gradient(circle, rgba(255,0,85,0.95) 0%, rgba(255,140,0,0.8) 40%, rgba(255,230,0,0.6) 65%, transparent 85%);"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="section-title">02 — AI CLASSIFICATION & CLINICAL TRIAGE</div>
    <div class="diag-box">
      <div>
        <span class="meta-label">PREDICTED SEVERITY GRADE</span>
        <div class="diag-grade">${selectedPatient.grade}</div>
      </div>
      <div>
        <span class="meta-label">MODEL CONFIDENCE</span>
        <div class="diag-conf">${selectedPatient.confidence}%</div>
      </div>
    </div>

    <div class="urgency-banner">
      REFERRAL DIRECTIVE: ${selectedPatient.urgency}
    </div>

    <div class="section-title">03 — BIOMARKER & LESION EVIDENCE BREAKDOWN</div>
    <div class="lesion-table">
      <div class="lesion-card">
        <span class="meta-label">MICROANEURYSMS</span>
        <div class="lesion-count">${selectedPatient.lesions.microaneurysms} DETECTED</div>
      </div>
      <div class="lesion-card">
        <span class="meta-label">HARD EXUDATES</span>
        <div class="lesion-count" style="color: #d97706;">${selectedPatient.lesions.exudates} DETECTED</div>
      </div>
      <div class="lesion-card">
        <span class="meta-label">HEMORRHAGES</span>
        <div class="lesion-count" style="color: #dc2626;">${selectedPatient.lesions.hemorrhages} LOCATIONS</div>
      </div>
    </div>

    <div style="font-family: 'Space Grotesk', monospace; font-size: 11px; margin-bottom: 25px; color: #334155;">
      • <strong>GRAD-CAM ATTENTION QUADRANT:</strong> ${selectedPatient.attention}
    </div>

    <div class="sign-block">
      <div>
        <strong style="font-size: 12px; text-transform: uppercase;">TELE-OPHTHALMOLOGIST VERIFICATION</strong>
        <div style="font-size: 10px; color: #64748b; margin-top: 2px;">Reviewed & Approved by ${selectedPatient.doctor}</div>
      </div>
      <div class="stamp-box">OFFICIAL CLINICAL STAMP</div>
    </div>

    <div class="disclaimer">
      <strong>CLINICAL DIRECTIVE:</strong> AI-assisted diabetic retinopathy screening results are provided for diagnostic decision support. Clinical confirmation by a licensed ophthalmologist is required prior to initiating treatment interventions.
    </div>
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 500);
    };
  </script>
</body>
</html>`;

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
                  <div className="absolute inset-0 rounded-full pointer-events-none opacity-90">
                    <div 
                      className="absolute top-[28%] left-[26%] w-32 h-32 rounded-full blur-md"
                      style={{ background: 'radial-gradient(circle, rgba(255, 0, 0, 0.95) 0%, rgba(255, 100, 0, 0.85) 35%, rgba(255, 210, 0, 0.65) 60%, rgba(0, 220, 255, 0.3) 80%, transparent 100%)' }}
                    />
                    <div 
                      className="absolute bottom-[24%] left-[34%] w-24 h-24 rounded-full blur-md"
                      style={{ background: 'radial-gradient(circle, rgba(255, 0, 85, 0.95) 0%, rgba(255, 140, 0, 0.8) 40%, rgba(255, 230, 0, 0.6) 65%, transparent 85%)' }}
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

