"""
Health Check and Service Diagnostics API Routes.
"""
from fastapi import APIRouter
from backend.app.config import settings
from backend.app.services.model_service import ModelService

router = APIRouter(tags=["Health & Status"])


@router.get("/health")
def get_health_status():
    """
    Returns API health status, model loading status, and candidate architecture details.
    """
    predictor = ModelService.get_predictor()
    weights_exist = settings.efficientnet_weights_path.exists()

    return {
        "status": "online",
        "app_name": settings.app_name,
        "version": settings.app_version,
        "model_status": {
            "candidate_architecture": "EfficientNet-B0",
            "weights_file_configured": str(settings.efficientnet_weights_path.name),
            "weights_file_exists": weights_exist,
            "weights_loaded_in_memory": predictor.is_weights_loaded,
            "instruction": "If False, train model on APTOS 2019 in Google Colab and place weights in ml/weights/"
        }
    }


@router.post("/reload-weights")
def reload_weights():
    """
    Hot-reloads model weights from disk without restarting the FastAPI server.
    """
    is_loaded = ModelService.reload_weights()
    return {
        "success": is_loaded,
        "weights_path": str(settings.efficientnet_weights_path),
        "message": "Weights successfully loaded into memory." if is_loaded else "Weights file still not found on disk."
    }
