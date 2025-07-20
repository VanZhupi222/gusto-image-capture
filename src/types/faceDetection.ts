// Face detection types for TensorFlow.js
export interface Face {
  box: {
    xMin: number;
    yMin: number;
    xMax: number;
    yMax: number;
    width: number;
    height: number;
  };
  keypoints?: Array<{
    x: number;
    y: number;
    name?: string;
  }>;
  score?: number;
}

export interface FaceDetector {
  estimateFaces: (image: HTMLImageElement | HTMLCanvasElement) => Promise<Face[]>;
}

export interface FaceDetectionResult {
  success: boolean;
  faceCount: number;
  faces?: Face[];
  error?: string;
}

export interface UseFaceDetectionReturn {
  preloadDetector: () => Promise<void>;
  detectFaces: (image: HTMLImageElement | HTMLCanvasElement) => Promise<FaceDetectionResult>;
  isLoading: boolean;
  isReady: boolean;
}