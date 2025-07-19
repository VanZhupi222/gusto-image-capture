import { create } from 'zustand';

interface UploadedPhoto {
  id: string;
  dataUrl: string;
  clientHash: string;
  timestamp: string;
}

interface PhotoState {
  capturedImage: string | null;
  isAnalyzing: boolean;
  isAnalyzed: boolean;
  // Upload related states
  isUploading: boolean;
  uploadedPhotoId: string | null;
  uploadedPhoto: UploadedPhoto | null;
  uploadError: string | null;
  clientHash: string | null;
  
  setCapturedImage: (image: string | null) => void;
  clearCapturedImage: () => void;
  setIsAnalyzing: (analyzing: boolean) => void;
  setAnalyzed: (analyzed: boolean) => void;
  // Upload related actions
  setIsUploading: (uploading: boolean) => void;
  setUploadedPhoto: (photo: UploadedPhoto | null) => void;
  setUploadError: (error: string | null) => void;
  setClientHash: (hash: string | null) => void;
  clearUploadedPhotos: () => void;
}

export const usePhotoStore = create<PhotoState>((set) => ({
  capturedImage: null,
  isAnalyzing: false,
  isAnalyzed: false,
  // Upload related initial states
  isUploading: false,
  uploadedPhotoId: null,
  uploadedPhoto: null,
  uploadError: null,
  uploadRetryCount: 0,
  clientHash: null,

  setCapturedImage: (image: string | null) => 
    set({ capturedImage: image, isAnalyzed: false }),

  clearCapturedImage: () => 
    set({ 
      capturedImage: null, 
      isAnalyzing: false, 
      isAnalyzed: false,
      isUploading: false,
      clientHash: null,
    }),

  setIsAnalyzing: (analyzing: boolean) => 
    set({ isAnalyzing: analyzing }),

  setAnalyzed: (analyzed: boolean) => 
    set({ isAnalyzed: analyzed, isAnalyzing: false }),

  // Upload related actions
  setIsUploading: (uploading: boolean) => 
    set({ isUploading: uploading }),

  setUploadedPhoto: (photo: UploadedPhoto | null) => 
    set({ uploadedPhoto: photo, uploadedPhotoId: photo?.id || null }),

  setUploadError: (error: string | null) => 
    set({ uploadError: error }),

  setClientHash: (hash: string | null) =>
    set({ clientHash: hash }),

  clearUploadedPhotos: () =>
    set({
      isAnalyzed: false,
      isUploading: false,
      uploadedPhoto: null,
      uploadError: null,
      clientHash: null,
    }),
}));

// Selectors
export const selectCapturedImage = (state: PhotoState) => state.capturedImage;
export const selectSetCapturedImage = (state: PhotoState) => state.setCapturedImage;
export const selectClearCapturedImage = (state: PhotoState) => state.clearCapturedImage;
export const selectIsAnalyzing = (state: PhotoState) => state.isAnalyzing;
export const selectSetIsAnalyzing = (state: PhotoState) => state.setIsAnalyzing;
export const selectIsAnalyzed = (state: PhotoState) => state.isAnalyzed;
export const selectSetAnalyzed = (state: PhotoState) => state.setAnalyzed;

// Upload related selectors
export const selectIsUploading = (state: PhotoState) => state.isUploading;
export const selectSetIsUploading = (state: PhotoState) => state.setIsUploading;
export const selectUploadedPhoto = (state: PhotoState) => state.uploadedPhoto;
export const selectSetUploadedPhoto = (state: PhotoState) => state.setUploadedPhoto;
export const selectUploadError = (state: PhotoState) => state.uploadError;
export const selectSetUploadError = (state: PhotoState) => state.setUploadError;
export const selectClientHash = (state: PhotoState) => state.clientHash;
export const selectSetClientHash = (state: PhotoState) => state.setClientHash;
export const selectClearUploadedPhotos = (state: PhotoState) => state.clearUploadedPhotos;
