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
    version: '2.4.0',
    theme: 'MathWorks Explainable AI Theme',
    backend: 'Node.js Express + Mongoose API',
    aiModel: 'EfficientNet-B4 / ResNet50 + Grad-CAM Explainability Pipeline',
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

// Primary Team Member 4 Contract Endpoint: POST /api/v1/predict/full-screening
app.post('/api/v1/predict/full-screening', (req, res) => {
  const { imageName, eyeSide, demoState } = req.body;

  // Handle explicit demo states for Member 4 presentation workflow
  if (demoState === 'IMAGE_RECAPTURE_REQUIRED' || (imageName && imageName.includes('poor'))) {
    return res.json({
      case_id: `DR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      quality: {
        score: 41.2,
        status: "POOR",
        recapture_message: "IMAGE RECAPTURE REQUIRED: Low contrast, pupil shadows, or lens blur detected. Clean lens and re-align non-mydriatic fundus camera before screening."
      },
      prediction: {
        class_id: -1,
        grade_name: "Unassessable Image",
        short_code: "POOR_QUALITY"
      },
      probabilities: [
        { class_id: 0, name: "No Apparent DR", prob: 0.20 },
        { class_id: 1, name: "Mild DR", prob: 0.20 },
        { class_id: 2, name: "Moderate DR", prob: 0.20 },
        { class_id: 3, name: "Severe DR", prob: 0.20 },
        { class_id: 4, name: "Proliferative DR", prob: 0.20 }
      ],
      calibrated_confidence: 41.2,
      gradcam: {
        attention_quadrant: "Indeterminate",
        heatmap_overlay_url: null,
        intensity_score: 0.0
      },
      lesion_evidence: [],
      reliability: {
        status: "IMAGE_RECAPTURE_REQUIRED",
        badge_color: "RED",
        uncertainty_margin: 28.5,
        explanation: "Fundus image quality failed automated quality gate. Recapture required."
      },
      triage: {
        screening_recommendation: "Recapture image with proper illumination and alignment.",
        referral_urgency: "RECAPTURE"
      },
      report_data: {
        timestamp: new Date().toISOString(),
        disclaimer: "AI screening result for decision support. Does not replace clinical diagnosis."
      }
    });
  }

  if (demoState === 'HUMAN_REVIEW_RECOMMENDED' || (imageName && imageName.includes('borderline'))) {
    return res.json({
      case_id: `DR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      quality: {
        score: 82.5,
        status: "GOOD",
        recapture_message: null
      },
      prediction: {
        class_id: 1,
        grade_name: "Mild Non-Proliferative DR (Borderline)",
        short_code: "Mild DR"
      },
      probabilities: [
        { class_id: 0, name: "No Apparent DR", prob: 0.38 },
        { class_id: 1, name: "Mild DR", prob: 0.44 },
        { class_id: 2, name: "Moderate DR", prob: 0.14 },
        { class_id: 3, name: "Severe DR", prob: 0.03 },
        { class_id: 4, name: "Proliferative DR", prob: 0.01 }
      ],
      calibrated_confidence: 68.4,
      gradcam: {
        attention_quadrant: "Macular Periphery & Superior Arcade",
        heatmap_overlay_url: "/sample_heatmap.jpg",
        intensity_score: 0.62
      },
      lesion_evidence: [
        { type: "Microaneurysms", count: 3, severity: "Mild", confidence: 68.4 }
      ],
      reliability: {
        status: "HUMAN_REVIEW_RECOMMENDED",
        badge_color: "AMBER",
        uncertainty_margin: 14.8,
        explanation: "Class probabilities are close between No DR (38%) and Mild DR (44%). Clinician review recommended."
      },
      triage: {
        screening_recommendation: "Human review recommended by Tele-Ophthalmologist.",
        referral_urgency: "HUMAN_REVIEW"
      },
      report_data: {
        timestamp: new Date().toISOString(),
        disclaimer: "AI screening result for decision support. Does not replace clinical diagnosis."
      }
    });
  }

  // Default: RELIABLE_SCREENING (Moderate / Severe DR or Normal)
  const isSevere = imageName && imageName.includes("severe");
  const isNormal = imageName && imageName.includes("normal");

  const classId = isNormal ? 0 : (isSevere ? 3 : 2);
  const gradeName = isNormal ? "No Apparent DR" : (isSevere ? "Severe Non-Proliferative DR" : "Moderate Non-Proliferative DR");
  const confidence = isNormal ? 96.8 : (isSevere ? 94.5 : 89.4);

  const probs = isNormal ? [
    { class_id: 0, name: "No Apparent DR", prob: 0.96 },
    { class_id: 1, name: "Mild DR", prob: 0.03 },
    { class_id: 2, name: "Moderate DR", prob: 0.01 },
    { class_id: 3, name: "Severe DR", prob: 0.00 },
    { class_id: 4, name: "Proliferative DR", prob: 0.00 }
  ] : [
    { class_id: 0, name: "No Apparent DR", prob: 0.03 },
    { class_id: 1, name: "Mild DR", prob: 0.09 },
    { class_id: 2, name: "Moderate DR", prob: 0.78 },
    { class_id: 3, name: "Severe DR", prob: 0.07 },
    { class_id: 4, name: "Proliferative DR", prob: 0.03 }
  ];

  setTimeout(() => {
    res.json({
      case_id: `DR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      quality: {
        score: 94.6,
        status: "GOOD",
        recapture_message: null
      },
      prediction: {
        class_id: classId,
        grade_name: gradeName,
        short_code: gradeName
      },
      probabilities: probs,
      calibrated_confidence: confidence,
      gradcam: {
        attention_quadrant: "Inferior Temporal Vascular Quadrant & Macular Margin",
        heatmap_overlay_url: "/sample_heatmap.jpg",
        intensity_score: 0.87
      },
      lesion_evidence: isNormal ? [] : [
        { type: "Microaneurysms", count: 9, severity: "Mild", confidence: 92.4 },
        { type: "Hard Exudates", count: 5, severity: "Moderate", confidence: 89.1 },
        { type: "Intraretinal Hemorrhages", count: 2, severity: "Localized", confidence: 84.7 }
      ],
      reliability: {
        status: "RELIABLE_SCREENING",
        badge_color: "GREEN",
        uncertainty_margin: 3.8,
        explanation: "High contrast foveal reflex. High model calibration confidence."
      },
      triage: {
        screening_recommendation: isNormal
          ? "Routine annual DR screening in 12 months."
          : "Clinical referral recommended within 4 weeks at District Eye Hospital.",
        referral_urgency: isNormal ? "NO_REFERRAL" : "ROUTINE_REFERRAL"
      },
      report_data: {
        timestamp: new Date().toISOString(),
        disclaimer: "AI screening result for clinical decision support. Does not constitute a confirmed diagnosis."
      }
    });
  }, 1000);
});

// Fallback legacy alias endpoint
app.post('/api/screening/analyze', (req, res) => {
  req.url = '/api/v1/predict/full-screening';
  app.handle(req, res);
});

app.listen(PORT, () => {
  console.log(`RETINA-X Express Server running on port ${PORT}`);
});
