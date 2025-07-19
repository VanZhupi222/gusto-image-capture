import { create } from 'zustand';

interface PhotoState {
  capturedImage: string | null;
  isAnalyzing: boolean;
  isAnalyzed: boolean;
  setCapturedImage: (image: string | null) => void;
  clearCapturedImage: () => void;
  setIsAnalyzing: (analyzing: boolean) => void;
  setAnalyzed: (analyzed: boolean) => void;
}

export const usePhotoStore = create<PhotoState>((set) => ({
  capturedImage: null,
  isAnalyzing: false,
  isAnalyzed: false,

  setCapturedImage: (image: string | null) => 
    set({ capturedImage: image, isAnalyzed: false }),

  clearCapturedImage: () => 
    set({ capturedImage: null, isAnalyzing: false, isAnalyzed: false }),

  setIsAnalyzing: (analyzing: boolean) => 
    set({ isAnalyzing: analyzing }),

  setAnalyzed: (analyzed: boolean) => 
    set({ isAnalyzed: analyzed, isAnalyzing: false }),
}));

// Selectors
export const selectCapturedImage = (state: PhotoState) => state.capturedImage;
export const selectSetCapturedImage = (state: PhotoState) => state.setCapturedImage;
export const selectClearCapturedImage = (state: PhotoState) => state.clearCapturedImage;
export const selectIsAnalyzing = (state: PhotoState) => state.isAnalyzing;
export const selectSetIsAnalyzing = (state: PhotoState) => state.setIsAnalyzing;
export const selectIsAnalyzed = (state: PhotoState) => state.isAnalyzed;
export const selectSetAnalyzed = (state: PhotoState) => state.setAnalyzed;