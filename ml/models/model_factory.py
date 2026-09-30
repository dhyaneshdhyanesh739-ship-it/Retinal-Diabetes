"""
Canonical Model Factory for Diabetic Retinopathy Classification.
Provides the single, standardized EfficientNet-B0 architecture specification used
identically across training (Colab), validation, and inference (FastAPI).
"""
from typing import Optional

try:
    import torch
    import torch.nn as nn
    TORCH_AVAILABLE = True
except (ImportError, OSError):
    TORCH_AVAILABLE = False
    torch = None
    nn = None

try:
    import timm
except (ImportError, OSError):
    timm = None


DEFAULT_MODEL_NAME = "efficientnet_b0"
DEFAULT_NUM_CLASSES = 4  # E2 ordinal head outputs 4 cumulative logits (p1..p4)
DEFAULT_DROP_RATE = 0.3


def create_dr_model(
    model_name: str = DEFAULT_MODEL_NAME,
    num_classes: int = DEFAULT_NUM_CLASSES,
    pretrained: bool = False,
    drop_rate: float = DEFAULT_DROP_RATE
):
    """
    Constructs the canonical classification network using timm or torchvision fallback.
    Standardized on EfficientNet-B0 to guarantee consistent state_dict key structure
    across training, checkpoint saving, and inference.
    """
    if not TORCH_AVAILABLE:
        raise RuntimeError("PyTorch is unavailable in the current runtime environment.")

    if timm is not None:
        model = timm.create_model(
            model_name,
            pretrained=pretrained,
            num_classes=num_classes,
            drop_rate=drop_rate
        )
        return model

    # Fallback to torchvision
    try:
        from torchvision.models import efficientnet_b0, EfficientNet_B0_Weights
        weights = EfficientNet_B0_Weights.DEFAULT if pretrained else None
        model = efficientnet_b0(weights=weights)
        # Modify head to num_classes
        in_features = model.classifier[1].in_features
        model.classifier = nn.Sequential(
            nn.Dropout(p=drop_rate, inplace=True),
            nn.Linear(in_features=in_features, out_features=num_classes)
        )
        return model
    except Exception as e:
        raise RuntimeError(f"Unable to instantiate model using timm or torchvision: {e}")


def get_model_target_layer(model):
    """
    Returns the canonical target convolutional layer for Grad-CAM explainability.
    For timm EfficientNet-B0, this is consistently `conv_head`.
    """
    if hasattr(model, "conv_head"):
        return model.conv_head
    raise AttributeError("Model does not have 'conv_head' layer expected for timm EfficientNet-B0.")
