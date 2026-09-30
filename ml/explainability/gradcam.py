"""
Explainable AI Module: Grad-CAM (Gradient-weighted Class Activation Mapping).
Generates visual explanations highlighting retinal regions (microaneurysms, hemorrhages, exudates)
driving the model's Diabetic Retinopathy prediction.
"""
from typing import Optional, Tuple, Dict, Any
import numpy as np
import cv2
import torch
import torch.nn as nn


class GradCAM:
    """
    Grad-CAM generator for CNN architectures (EfficientNet-B0 candidate).
    """

    def __init__(self, model: nn.Module, target_layer: Optional[nn.Module] = None):
        self.model = model
        self.model.eval()
        self.target_layer = target_layer or self._find_target_layer()

        self.gradients = None
        self.activations = None
        self.handles = []
        self._register_hooks()

    def _find_target_layer(self) -> nn.Module:
        """
        Locates the final convolutional layer of EfficientNet.
        """
        # timm EfficientNet-B0
        if hasattr(self.model, "conv_head"):
            return self.model.conv_head
        # torchvision EfficientNet-B0
        elif hasattr(self.model, "features"):
            return self.model.features[-1]
        else:
            # Fallback: scan modules in reverse
            for name, module in reversed(list(self.model.named_modules())):
                if isinstance(module, nn.Conv2d):
                    return module
            raise ValueError("Could not automatically locate a Conv2d layer for Grad-CAM.")

    def _register_hooks(self):
        def forward_hook(module, input, output):
            self.activations = output.detach()

        def backward_hook(module, grad_in, grad_out):
            self.gradients = grad_out[0].detach()

        self.handles.append(self.target_layer.register_forward_hook(forward_hook))
        self.handles.append(self.target_layer.register_full_backward_hook(backward_hook))

    def generate(
        self,
        input_tensor: torch.Tensor,
        target_class: Optional[int] = None
    ) -> np.ndarray:
        """
        Generates a 2D normalized heatmap [0, 1] for the specified class.
        """
        self.model.zero_grad()
        output = self.model(input_tensor)

        if target_class is None:
            target_class = torch.argmax(output, dim=1).item()

        target_score = output[0, target_class]
        target_score.backward()

        # Global average pooling of gradients
        weights = torch.mean(self.gradients, dim=(2, 3), keepdim=True)
        cam = torch.sum(weights * self.activations, dim=1, keepdim=True)
        cam = torch.clamp(cam, min=0)  # ReLU on weighted activation

        cam = cam.squeeze().cpu().numpy()
        if np.max(cam) > 0:
            cam = (cam - np.min(cam)) / (np.max(cam) - np.min(cam))
        else:
            cam = np.zeros_like(cam)

        return cam

    def overlay_heatmap(
        self,
        heatmap: np.ndarray,
        original_rgb: np.ndarray,
        alpha: float = 0.5,
        colormap: int = cv2.COLORMAP_JET
    ) -> np.ndarray:
        """
        Overlays the Grad-CAM heatmap onto the fundus photograph.
        """
        h, w = original_rgb.shape[:2]
        heatmap_resized = cv2.resize(heatmap, (w, h))
        heatmap_uint8 = np.uint8(255 * heatmap_resized)
        colored_heatmap = cv2.applyColorMap(heatmap_uint8, colormap)
        colored_heatmap = cv2.cvtColor(colored_heatmap, cv2.COLOR_BGR2RGB)

        overlay = cv2.addWeighted(original_rgb, 1 - alpha, colored_heatmap, alpha, 0)
        return overlay

    def remove_hooks(self):
        for h in self.handles:
            h.remove()
        self.handles.clear()


def explain_prediction(
    model: Optional[nn.Module],
    input_tensor: torch.Tensor,
    original_rgb: np.ndarray,
    target_class: Optional[int] = None
) -> Dict[str, Any]:
    """
    Convenience wrapper to produce Grad-CAM heatmap with transparent status reporting.
    """
    if model is None:
        return {
            "status": "pending_model_training",
            "message": "Grad-CAM explanation requires trained model weights. Train model in Google Colab first.",
            "heatmap_available": False,
            "heatmap_base64": None
        }

    try:
        gradcam = GradCAM(model)
        heatmap = gradcam.generate(input_tensor, target_class=target_class)
        overlay = gradcam.overlay_heatmap(heatmap, original_rgb)
        gradcam.remove_hooks()

        return {
            "status": "success",
            "message": "Grad-CAM visual explanation successfully synthesized.",
            "heatmap_available": True,
            "raw_heatmap": heatmap,
            "overlay_image": overlay
        }
    except Exception as e:
        return {
            "status": "error",
            "message": f"Grad-CAM generation failed: {str(e)}",
            "heatmap_available": False
        }
