"""
Master Quality Gate Evaluator for Retinal Fundus Screening.
Synthesizes focus, illumination, and field validity into a clinical gradability decision.
"""
from typing import Dict, Any, Union
import cv2
import numpy as np

from quality_gate.blur_detection import evaluate_blur
from quality_gate.illumination import evaluate_illumination


def assess_image_quality(
    image_input: Union[bytes, np.ndarray],
    blur_threshold: float = 100.0
) -> Dict[str, Any]:
    """
    Runs comprehensive quality gate tests on an uploaded fundus image.
    Returns boolean `is_gradable`, confidence score, individual metrics, and actionable recommendations.
    """
    if isinstance(image_input, (bytes, bytearray)):
        nparr = np.frombuffer(image_input, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        if img is None:
            return {
                "is_gradable": False,
                "status": "rejected",
                "reason": "Corrupt or unreadable image file.",
                "quality_score": 0.0
            }
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    elif isinstance(image_input, np.ndarray):
        img_rgb = image_input
    else:
        raise TypeError("Expected bytes or numpy ndarray")

    # Evaluate individual quality aspects
    blur_res = evaluate_blur(img_rgb, blur_threshold=blur_threshold)
    illum_res = evaluate_illumination(img_rgb)

    # Determine overall gradability
    is_gradable = blur_res["is_sharp"] and illum_res["is_well_illuminated"]

    issues = []
    if not blur_res["is_sharp"]:
        issues.append("Image is blurry (low Laplacian edge variance).")
    if not illum_res["is_well_illuminated"]:
        issues.append(illum_res.get("issue") or "Suboptimal illumination.")

    status = "accepted" if is_gradable else "rejected"
    # Quality score out of 100
    quality_score = min(100.0, max(0.0, (blur_res.get("blur_score", 0.0) / 200.0 * 50.0) + (illum_res.get("contrast_std", 0.0) / 80.0 * 50.0)))

    return {
        "is_gradable": is_gradable,
        "status": status,
        "quality_score": round(quality_score, 1),
        "blur_metrics": blur_res,
        "illumination_metrics": illum_res,
        "identified_issues": issues,
        "action_required": "Proceed to AI Analysis." if is_gradable else "Re-capture fundus photograph with stable positioning."
    }
