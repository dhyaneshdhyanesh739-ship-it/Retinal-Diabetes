"""
Prediction & Comprehensive Screening API Routes.
Orchestrates:
Fundus Upload -> Quality Gate -> Preprocessing -> EfficientNet-B0 -> Grad-CAM -> Reliability Engine.
"""
from typing import Optional
from datetime import datetime
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from backend.app.services.model_service import ModelService
from backend.app.services.quality_service import QualityService
from backend.app.services.explainability_service import ExplainabilityService
from backend.app.services.reliability_service import ReliabilityService

router = APIRouter(prefix="/predict", tags=["AI Prediction & Screening"])


@router.post("")
async def predict_dr_severity(file: UploadFile = File(...)):
    """
    Core Milestone 1 Endpoint:
    Accepts fundus image -> runs preprocessing -> invokes EfficientNet-B0 model -> returns DR prediction.
    """
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload a JPEG or PNG image.")

    image_bytes = await file.read()
    if len(image_bytes) == 0:
        raise HTTPException(status_code=400, detail="Uploaded file contains no data.")

    # Execute model prediction
    prediction = ModelService.predict(image_bytes)

    return {
        "success": True,
        "filename": file.filename,
        "timestamp": datetime.utcnow().isoformat(),
        "prediction": prediction
    }


@router.post("/full-screening")
async def full_screening_pipeline(
    file: UploadFile = File(...),
    include_gradcam: bool = Form(default=True)
):
    """
    Full End-to-End Pipeline:
    1. Quality Gate Check
    2. Model Prediction
    3. Grad-CAM Explainability
    4. Reliability & Triage Decision
    """
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Please upload a valid image file.")

    image_bytes = await file.read()
    if len(image_bytes) == 0:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

    # 1. Quality Gate
    quality_res = QualityService.evaluate(image_bytes)

    # 2. Prediction
    prediction_res = ModelService.predict(image_bytes)

    # 3. Grad-CAM Explainability
    gradcam_res = None
    if include_gradcam:
        target_cls = prediction_res.get("predicted_grade")
        gradcam_res = ExplainabilityService.generate_gradcam(image_bytes, target_class=target_cls)

    # 4. Reliability & Triage
    triage_res = ReliabilityService.evaluate_triage(
        quality_res=quality_res,
        prediction_res=prediction_res,
        gradcam_res=gradcam_res
    )

    return {
        "success": True,
        "filename": file.filename,
        "timestamp": datetime.utcnow().isoformat(),
        "quality_gate": quality_res,
        "prediction": prediction_res,
        "explainability": gradcam_res,
        "triage": triage_res
    }
