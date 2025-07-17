export type CameraPermissionStatus = 'granted' | 'denied' | 'prompt' | 'unknown';

export interface CameraError {
  type: 'permission' | 'device' | 'unknown';
  message: string;
}

export interface UseCameraPermissionReturn {
  permissionStatus: CameraPermissionStatus;
  stream: MediaStream | null;
  error: CameraError | null;
  isLoading: boolean;
  
  requestPermission: () => Promise<boolean>;
  stopStream: () => void;
  retryPermission: () => Promise<boolean>;
} 