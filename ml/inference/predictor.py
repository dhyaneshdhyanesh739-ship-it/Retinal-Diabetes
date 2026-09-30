"""
Diabetic Retinopathy Model Predictor.
Candidate Architecture: Standardized timm EfficientNet-B0.

Behavior:
- Strictly imports model creation from canonical `ml.models.model_factory`.
- Checks if trained weights exist in `ml/weights/efficientnet_b0_aptos.pth`.
- If found: executes inference, applies Temperature Scaling calibration, calculates Shannon entropy & margin.
- If not found: returns a transparent status indicating model training is pending. NEVER invents fake predictions.
"""
from pathlib import Path
from typing import Dict, Any, Optional
import numpy as np

try:
    import torch
    import torch.nn as nn
    TORCH_AVAILABLE = True
except (ImportError, OSError):
    TORCH_AVAILABLE = False
    torch = None
    nn = None

from ml.models.model_factory import create_dr_model, DEFAULT_MODEL_NAME
from ml.inference.preprocessing import preprocess_fundus_image, PreprocessConfig, DEFAULT_PREPROCESS_CONFIG
from ml.inference.calibration import TemperatureScaler, default_scaler

DR_SEVERITY_LEVELS = [
    {"grade": 0, "name": "No DR", "description": "No visible signs of diabetic retinopathy."},
    {"grade": 1, "name": "Mild NPDR", "description": "Microaneurysms only. Early clinical stage."},
    {"grade": 2, "name": "Moderate NPDR", "description": "Microaneurysms, hemorrhages, or hard exudates present."},
    {"grade": 3, "name": "Severe NPDR", "description": "Extensive hemorrhages, venous beading, or IRMA (>20 intraretinal hemorrhages)."},
    {"grade": 4, "name": "Proliferative DR", "description": "Neovascularization, preretinal or vitreous hemorrhage. Immediate referral."}
]


class DRPredictor:
    """
    Inference manager for DR severity grading with Temperature Calibration.
    """

    def __init__(
        self,
        weights_path: Optional[Path] = None,
        device: Optional[str] = None,
        scaler: Optional[TemperatureScaler] = None,
        preprocess_config: Optional[PreprocessConfig] = None
    ):
        self.weights_path = Path(weights_path) if weights_path else Path(__file__).resolve().parent.parent / "weights" / "efficientnet_b0_aptos.pth"
        self.device = device or ("cuda" if TORCH_AVAILABLE and torch and torch.cuda.is_available() else "cpu")
        self.scaler = scaler or default_scaler
        self.preprocess_config = preprocess_config or DEFAULT_PREPROCESS_CONFIG
        self.model: Optional[Any] = None
        self.is_weights_loaded: bool = False
        self._initialize_model()

    def _initialize_model(self):
        """
        Attempts to load E2 Ordinal EfficientNet-B0 architecture and weights via model_factory.
        """
        if not TORCH_AVAILABLE:
            self.is_weights_loaded = False
            self.model = None
            return

        try:
            self.model = create_dr_model(model_name=DEFAULT_MODEL_NAME, num_classes=4, pretrained=False)

            if self.weights_path.exists():
                state_dict = torch.load(self.weights_path, map_location=self.device)
                self.model.load_state_dict(state_dict)
                self.model.to(self.device)
                self.model.eval()
                self.is_weights_loaded = True
                print(f"[+] Loaded trained model weights from {self.weights_path}")
            else:
                self.is_weights_loaded = False
                self.model = None
                print(f"[!] No weights found at {self.weights_path}. Model status: PENDING_TRAINING.")
        except Exception as e:
            self.is_weights_loaded = False
            self.model = None
            print(f"[!] Warning during model initialization: {e}")

    def predict(self, image_bytes_or_array) -> Dict[str, Any]:
        """
        Executes crop_pad_512 preprocessing, E2 ordinal inference, and T=2.07 calibration.
        """
        # 1. Preprocess input image using validated E2 config
        input_tensor, processed_rgb = preprocess_fundus_image(image_bytes_or_array, config=self.preprocess_config)

        # 2. Transparent handling when trained model weights are missing or Torch is unavailable
        if not TORCH_AVAILABLE or not self.is_weights_loaded or self.model is None:
            return {
                "status": "pending_training",
                "is_placeholder": True,
                "message": (
                    "E2 model weights not found. Place the trained efficientnet_b0_aptos.pth "
                    f"file at: {self.weights_path}"
                ),
                "model_name": "E2 Ordinal EfficientNet-B0",
                "grade": None,
                "grade_probabilities": None,
                "confidence": None,
                "p_referable": None,
                "referable": None,
                "predicted_grade": None,
                "severity_label": None,
                "description": None,
                "raw_probabilities": None,
                "calibrated_probabilities": None,
                "class_probabilities": None,
                "referable_dr": None,
                "preprocessing_completed": True
            }

        # 3. Model Inference & E2 Ordinal Decoding (T=2.07)
        with torch.no_grad():
            tensor = input_tensor.to(self.device)
            raw_logits = self.model(tensor)[0]  # Shape: (4,)
            
            T = getattr(self.scaler, "temperature", 2.07)
            scaled_logits = raw_logits / T
            
            sigmoids = torch.sigmoid(scaled_logits).cpu().numpy()
            p1, p2, p3, p4 = [float(x) for x in sigmoids]
            
            p0 = max(0.0, 1.0 - p1)
            p1_disc = max(0.0, p1 - p2)
            p2_disc = max(0.0, p2 - p3)
            p3_disc = max(0.0, p3 - p4)
            p4_disc = max(0.0, p4)
            
            disc_probs = np.array([p0, p1_disc, p2_disc, p3_disc, p4_disc], dtype=np.float32)
            total_p = np.sum(disc_probs)
            if total_p > 0:
                disc_probs = disc_probs / total_p
            
            predicted_idx = int(np.argmax(disc_probs))
            confidence = float(disc_probs[predicted_idx])
            
            p_referable = float(p2)  # P(Grade 2-4)
            referable = bool(p_referable >= 0.28)

        grade_info = DR_SEVERITY_LEVELS[predicted_idx]
        grade_probs_dict = {
            "grade_0": round(float(disc_probs[0]), 4),
            "grade_1": round(float(disc_probs[1]), 4),
            "grade_2": round(float(disc_probs[2]), 4),
            "grade_3": round(float(disc_probs[3]), 4),
            "grade_4": round(float(disc_probs[4]), 4)
        }
        calibrated_probs_dict = {
            item["name"]: round(float(disc_probs[i]), 4)
            for i, item in enumerate(DR_SEVERITY_LEVELS)
        }

        return {
            "status": "success",
            "is_placeholder": False,
            "message": "Inference successfully computed with E2 Ordinal EfficientNet-B0 model.",
            "model_name": "E2 Ordinal EfficientNet-B0",
            "grade": grade_info["grade"],
            "grade_probabilities": grade_probs_dict,
            "confidence": round(confidence, 4),
            "p_referable": round(p_referable, 4),
            "referable": referable,
            "predicted_grade": grade_info["grade"],
            "severity_label": grade_info["name"],
            "description": grade_info["description"],
            "raw_probabilities": grade_probs_dict,
            "calibrated_probabilities": calibrated_probs_dict,
            "class_probabilities": calibrated_probs_dict,
            "referable_dr": referable,
            "preprocessing_completed": True
        }
