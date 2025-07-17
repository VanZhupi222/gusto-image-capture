import { create } from 'zustand';
import type { CameraPermissionStatus, CameraError } from '@/types';

interface CameraState {
  permissionStatus: CameraPermissionStatus;
  stream: MediaStream | null;
  cameraError: CameraError | null;
  isLoading: boolean;
  isCountdownActive: boolean;
  setPermissionStatus: (status: CameraPermissionStatus) => void;
  setStream: (stream: MediaStream | null) => void;
  setCameraError: (error: CameraError | null) => void;
  setIsLoading: (loading: boolean) => void;
  setIsCountdownActive: (active: boolean) => void;
  clearCameraState: () => void;
}

export const useCameraStore = create<CameraState>((set) => ({
  permissionStatus: 'unknown',
  stream: null,
  cameraError: null,
  isLoading: false,
  isCountdownActive: false,

  // Actions
  setPermissionStatus: (status: CameraPermissionStatus) =>
    set({ permissionStatus: status }),

  setStream: (stream: MediaStream | null) =>
    set({ stream }),

  setCameraError: (error: CameraError | null) =>
    set({ cameraError: error }),

  setIsLoading: (loading: boolean) =>
    set({ isLoading: loading }),

  setIsCountdownActive: (active: boolean) =>
    set({ isCountdownActive: active }),

  clearCameraState: () =>
    set({
      permissionStatus: 'unknown',
      stream: null,
      cameraError: null,
      isLoading: false,
      isCountdownActive: false,
    }),
}));

// Selectors
export const selectPermissionStatus = (state: CameraState) => state.permissionStatus;
export const selectCameraStream = (state: CameraState) => state.stream;
export const selectCameraError = (state: CameraState) => state.cameraError;
export const selectIsLoading = (state: CameraState) => state.isLoading;
export const selectSetPermissionStatus = (state: CameraState) => state.setPermissionStatus;
export const selectSetCameraStream = (state: CameraState) => state.setStream;
export const selectSetCameraError = (state: CameraState) => state.setCameraError;
export const selectSetIsLoading = (state: CameraState) => state.setIsLoading;
export const selectIsCountdownActive = (state: CameraState) => state.isCountdownActive;
export const selectSetIsCountdownActive = (state: CameraState) => state.setIsCountdownActive;
export const selectClearCameraState = (state: CameraState) => state.clearCameraState; 