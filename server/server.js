import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json({ limit: '25mb' }));

// Mock Patient Database
const PATIENTS_DB = [
  {
    id: "DR-2026-001",
    name: "Ramesh Kumar",
    age: 54,
    gender: "Male",
    location: "Raigarh Rural Camp, CG",
    primaryPhone: "+91 98765 43210",
    lastScreeningDate: "2026-09-28",
    riskCategory: "Moderate DR",
    confidence: 89.4,
    reviewStatus: "Pending Review",
    assignedDoctor: "Dr. A. Sharma (AIIMS)",
    imageQuality: "Good (94.2%)",
    screenings: [
      {
        id: "SCR-9021",
        date: "2026-09-28",
        eye: "Right Eye (OD)",
        grade: "Moderate Non-Proliferative DR",
        confidence: 89.4,
        lesionsCount: 14,
        microaneurysms: 8,
        hardExudates: 4,
        hemorrhages: 2,
        attentionRegion: "Inferior Temporal Quadrant",
        recommendation: "Clinical confirmation required within 4 weeks. Refer to District Eye Hospital.",
        heatmapUrl: "/sample_retina_heatmap.jpg"
      },
      {
        id: "SCR-8110",
        date: "2025-11-14",
        eye: "Right Eye (OD)",
        grade: "Mild Non-Proliferative DR",
        confidence: 91.2,
        lesionsCount: 5,
        microaneurysms: 4,
        hardExudates: 1,
        hemorrhages: 0,
        attentionRegion: "Macular Periphery",
        recommendation: "Annual follow-up screening recommended.",
        heatmapUrl: "/sample_retina_heatmap.jpg"
      }
    ]
  },
  {
    id: "DR-2026-002",
    name: "Sunita Devi",
    age: 48,
    gender: "Female",
    location: "Surguja Outreach Unit",
    primaryPhone: "+91 98123 55678",
    lastScreeningDate: "2026-09-29",
    riskCategory: "Severe DR",
    confidence: 94.8,
    reviewStatus: "Flagged Urgent",
    assignedDoctor: "Dr. P. Nair (Retina Specialist)",
    imageQuality: "Optimal (98.0%)",
    screenings: [
      {
        id: "SCR-9044",
        date: "2026-09-29",
        eye: "Left Eye (OS)",
        grade: "Severe Non-Proliferative DR",
        confidence: 94.8,
        lesionsCount: 32,
        microaneurysms: 18,
        hardExudates: 9,
        hemorrhages: 5,
        attentionRegion: "Superior & Temporal Arcades",
        recommendation: "URGENT REFERRAL: Laser photocoagulation assessment required within 72 hours.",
        heatmapUrl: "/sample_retina_heatmap.jpg"
      }
    ]
  },
  {
    id: "DR-2026-003",
    name: "Balwant Singh",
    age: 62,
    gender: "Male",
    location: "Bastar Mobile Clinic",
    primaryPhone: "+91 97654 32109",
    lastScreeningDate: "2026-09-30",
    riskCategory: "No Apparent DR",
    confidence: 97.1,
    reviewStatus: "Verified Normal",
    assignedDoctor: "Health Worker S. Verma",
    imageQuality: "Good (91.5%)",
    screenings: [
      {
        id: "SCR-9051",
        date: "2026-09-30",
        eye: "Both Eyes (OU)",
        grade: "No Apparent DR",
        confidence: 97.1,
        lesionsCount: 0,
        microaneurysms: 0,
        hardExudates: 0,
        hemorrhages: 0,
        attentionRegion: "Uniform Normal Foveal Reflex",
        recommendation: "Routine annual DR screening in 12 months.",
        heatmapUrl: "/sample_retina_heatmap.jpg"
      }
    ]
  },
  {
    id: "DR-2026-004",
    name: "Meena Patel",
    age: 51,
    gender: "Female",
    location: "Dhar CHC Center, MP",
    primaryPhone: "+91 94250 88192",
    lastScreeningDate: "2026-09-25",
    riskCategory: "Mild DR",
    confidence: 86.5,
    reviewStatus: "Reviewed",
    assignedDoctor: "Dr. K. Mehta",
    imageQuality: "Acceptable (85.2%)",
    screenings: [
      {
        id: "SCR-8992",
        date: "2026-09-25",
        eye: "Right Eye (OD)",
        grade: "Mild DR",
        confidence: 86.5,
        lesionsCount: 4,
        microaneurysms: 4,
        hardExudates: 0,
        hemorrhages: 0,
        attentionRegion: "Nasal Arcades",
        recommendation: "Glycemic control counseling & follow-up in 6 months.",
        heatmapUrl: "/sample_retina_heatmap.jpg"
      }
    ]
  },
  {
    id: "DR-2026-005",
    name: "Gopal Charan",
    age: 58,
    gender: "Male",
    location: "Korba Mobile Unit",
    primaryPhone: "+91 93011 44552",
    lastScreeningDate: "2026-09-30",
    riskCategory: "Referable DR",
    confidence: 92.3,
    reviewStatus: "Pending Review",
    assignedDoctor: "Unassigned",
    imageQuality: "Good (93.1%)",
    screenings: [
      {
        id: "SCR-9060",
        date: "2026-09-30",
        eye: "Left Eye (OS)",
        grade: "Proliferative DR / Macular Edema",
        confidence: 92.3,
        lesionsCount: 26,
        microaneurysms: 12,
        hardExudates: 10,
        hemorrhages: 4,
        attentionRegion: "Macular Foveal Region",
        recommendation: "Urgent tele-consultation with Ophthalmologist.",
        heatmapUrl: "/sample_retina_heatmap.jpg"
      }
    ]
  }
];

// Health endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    system: 'RETINA-X XAI Engine',
    version: '2.4.0-SIH26038',
    theme: 'MathWorks Explainable AI Theme',
    backend: 'Node.js Express + Mongoose API',
    aiModel: 'ResNet50 + Grad-CAM Explainability Pipeline',
    timestamp: new Date().toISOString()
  });
});

// Dashboard Statistics Endpoint
app.get('/api/dashboard/stats', (req, res) => {
  res.json({
    todayScreenings: 42,
    pendingReviews: 18,
    highRiskCases: 6,
    ruralCampsActive: 14,
    totalPatientsScreened: 3840,
    modelAccuracy: "96.4%",
    avgInferenceTimeMs: 412,
    drDistribution: [
      { category: "No DR", count: 2150, percentage: 56 },
      { category: "Mild DR", count: 810, percentage: 21 },
      { category: "Moderate DR", count: 540, percentage: 14 },
      { category: "Severe DR", count: 230, percentage: 6 },
      { category: "Proliferative DR", count: 110, percentage: 3 }
    ]
  });
});

// Get Patients
app.get('/api/patients', (req, res) => {
  res.json(PATIENTS_DB);
});

// Get Patient by ID
app.get('/api/patients/:id', (req, res) => {
  const patient = PATIENTS_DB.find(p => p.id.toLowerCase() === req.params.id.toLowerCase());
  if (!patient) {
    return res.status(404).json({ error: "Patient profile not found" });
  }
  res.json(patient);
});

// AI Screening & XAI Inference Simulator Endpoint
app.post('/api/screening/analyze', (req, res) => {
  const { imageName, eyeSide } = req.body;

  const categories = [
    { category: "No Apparent DR", confidence: 96.2, riskLevel: "LOW", color: "#35C759" },
    { category: "Mild Non-Proliferative DR", confidence: 88.5, riskLevel: "MODERATE", color: "#FFB020" },
    { category: "Moderate Non-Proliferative DR", confidence: 91.8, riskLevel: "HIGH", color: "#FF7A00" },
    { category: "Severe DR", confidence: 94.1, riskLevel: "CRITICAL", color: "#FF3B30" }
  ];

  let result = categories[2];
  if (imageName && imageName.includes("normal")) result = categories[0];
  if (imageName && imageName.includes("severe")) result = categories[3];

  setTimeout(() => {
    res.json({
      screeningId: `SCR-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString(),
      imageQualityScore: 94.6,
      imageQualityStatus: "OPTIMAL",
      eyeSide: eyeSide || "Right Eye (OD)",
      aiResult: {
        category: result.category,
        confidence: result.confidence,
        riskLevel: result.riskLevel,
        referralRecommended: result.riskLevel !== "LOW",
      },
      explainableAI: {
        gradCAMAttentionRegion: "Inferior Temporal Vascular Quadrant & Macular Margin",
        attentionIntensityScore: 0.87,
        detectedLesions: [
          { type: "Microaneurysms", count: 9, severity: "Mild", confidence: 92.4, coordinates: { x: 42, y: 58 } },
          { type: "Hard Exudates", count: 5, severity: "Moderate", confidence: 89.1, coordinates: { x: 61, y: 34 } },
          { type: "Venous Beading", count: 2, severity: "Localized", confidence: 84.7, coordinates: { x: 38, y: 72 } }
        ],
        vesselDensityIndex: "78.4% (Mild vessel tortuosity detected)",
        xaiSummary: "Model focused heavily on microaneurysm clusters and localized exudates in the inferior temporal retina. The Grad-CAM heatmap highlights key pathological regions with 87% attention density.",
      },
      clinicalDisclaimer: "AI-assisted screening is intended to support healthcare professionals and does not replace clinical diagnosis. Results should be reviewed by a qualified ophthalmologist."
    });
  }, 1000);
});

app.listen(PORT, () => {
  console.log(`RETINA-X Express Server running on port ${PORT}`);
});
