import { create } from 'zustand';

interface PhotoState {
  capturedImage: string | null;
  isAnalyzing: boolean;
  setCapturedImage: (image: string | null) => void;
  clearCapturedImage: () => void;
  setIsAnalyzing: (analyzing: boolean) => void;
}

export const usePhotoStore = create<PhotoState>((set) => ({
  capturedImage: null,
  isAnalyzing: false,

  setCapturedImage: (image: string | null) => 
    set({ capturedImage: image }),

  clearCapturedImage: () => 
    set({ capturedImage: null, isAnalyzing: false }),

  setIsAnalyzing: (analyzing: boolean) => 
    set({ isAnalyzing: analyzing }),
}));

// Selectors
export const selectCapturedImage = (state: PhotoState) => state.capturedImage;
export const selectSetCapturedImage = (state: PhotoState) => state.setCapturedImage;
export const selectClearCapturedImage = (state: PhotoState) => state.clearCapturedImage;
export const selectIsAnalyzing = (state: PhotoState) => state.isAnalyzing;
export const selectSetIsAnalyzing = (state: PhotoState) => state.setIsAnalyzing; 