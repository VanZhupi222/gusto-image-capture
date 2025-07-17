import { create } from 'zustand';

interface PhotoState {
  capturedImage: string | null;
  setCapturedImage: (image: string | null) => void;
  clearCapturedImage: () => void;
}

export const usePhotoStore = create<PhotoState>((set) => ({
  capturedImage: null,

  setCapturedImage: (image: string | null) => 
    set({ capturedImage: image }),

  clearCapturedImage: () => 
    set({ capturedImage: null }),
}));

// Selectors
export const selectCapturedImage = (state: PhotoState) => state.capturedImage;
export const selectSetCapturedImage = (state: PhotoState) => state.setCapturedImage;
export const selectClearCapturedImage = (state: PhotoState) => state.clearCapturedImage; 