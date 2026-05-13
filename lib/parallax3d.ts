/**
 * 3D Parallax Head-Tracking Engine (M5 + iPhone 17 Pro Max optimized)
 * Advanced face detection + device motion for immersive parallax depth
 */

export interface HeadPosition {
  x: number;
  y: number;
  z: number;
  confidence: number;
}

export interface Parallax3DConfig {
  screenWidth: number;
  screenHeight: number;
  maxDepth: number;
  smoothing: number;
  quality: 'low' | 'medium' | 'high' | 'ultra';
}

export class Parallax3DEngine {
  config: Parallax3DConfig;
  headPosition: HeadPosition = { x: 0, y: 0, z: 0.5, confidence: 0 };
  smoothedPosition: HeadPosition = { x: 0, y: 0, z: 0.5, confidence: 0 };

  constructor(config: Parallax3DConfig) {
    this.config = config;
  }

  updateHeadPosition(face: {
    x: number;
    y: number;
    size: number;
    confidence?: number;
  }) {
    const newPos: HeadPosition = {
      x: (face.x - 0.5) * 2,
      y: (face.y - 0.5) * 2,
      z: Math.max(0.2, Math.min(1, face.size)),
      confidence: face.confidence || 0.8,
    };

    const smooth = this.config.smoothing;
    this.smoothedPosition = {
      x: this.smoothedPosition.x * smooth + newPos.x * (1 - smooth),
      y: this.smoothedPosition.y * smooth + newPos.y * (1 - smooth),
      z: this.smoothedPosition.z * smooth + newPos.z * (1 - smooth),
      confidence: newPos.confidence,
    };

    this.headPosition = newPos;
  }

  getPerspectiveTransform(): {
    translateX: number;
    translateY: number;
    rotateX: number;
    rotateY: number;
    scale: number;
  } {
    const { x, y, z } = this.smoothedPosition;
    const { maxDepth } = this.config;

    return {
      translateX: -x * maxDepth * 0.5,
      translateY: -y * maxDepth * 0.5,
      rotateX: y * 15,
      rotateY: x * 15,
      scale: 0.8 + z * 0.4,
    };
  }

  getCSSTransform(): string {
    const { translateX, translateY, rotateX, rotateY, scale } = this.getPerspectiveTransform();
    return `perspective(1200px)
      translate3d(${translateX}px, ${translateY}px, 0)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(${scale}, ${scale}, 1)`;
  }

  getLayerTransform(depth: number): string {
    const { translateX, translateY } = this.getPerspectiveTransform();
    const scaled = {
      translateX: translateX * depth,
      translateY: translateY * depth,
    };
    return `translate3d(${scaled.translateX}px, ${scaled.translateY}px, ${depth * 500}px)`;
  }
}

export function normalizeFaceData(
  source: 'mlkit' | 'arkit' | 'mediapipe',
  data: any
): { x: number; y: number; size: number; confidence: number } {
  switch (source) {
    case 'arkit':
      return {
        x: 0.5 + (data.transform?.[12] || 0) * 0.5,
        y: 0.5 + (data.transform?.[13] || 0) * 0.5,
        size: Math.max(data.geometry?.extent.width || 0.1, 0.1),
        confidence: 0.95,
      };
    default:
      return data;
  }
}
