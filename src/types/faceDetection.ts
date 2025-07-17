export interface FaceDetector {
  estimateFaces: (image: HTMLImageElement | HTMLCanvasElement) => Promise<any[]>;
}

export interface FaceDetectionResult {
  success: boolean;
  faceCount: number;
  faces?: any[];
  error?: string;
}

export interface UseFaceDetectionReturn {
  preloadDetector: () => Promise<void>;
  detectFaces: (image: HTMLImageElement | HTMLCanvasElement) => Promise<FaceDetectionResult>;
  isLoading: boolean;
  isReady: boolean;
}