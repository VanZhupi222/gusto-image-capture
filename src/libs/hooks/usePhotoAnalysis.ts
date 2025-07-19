'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useFaceDetection, useToast } from './index';
import { usePhotoStore, selectSetIsAnalyzing } from '@/store';

export interface UsePhotoAnalysisReturn {
  analyzePhoto: (capturedImage: string, onRetakePhoto: () => Promise<void>) => Promise<void>;
}

export function usePhotoAnalysis(): UsePhotoAnalysisReturn {
  const router = useRouter();
  const toast = useToast();
  
  const {
    preloadDetector,
    detectFaces,
    isReady: isFaceDetectionReady
  } = useFaceDetection();

  const setIsAnalyzing = usePhotoStore(selectSetIsAnalyzing);

  const analyzePhoto = useCallback(async (
    capturedImage: string, 
    onRetakePhoto: () => Promise<void>
  ) => {
    if (!capturedImage) return;

    // Check if the detector is ready
    if (!isFaceDetectionReady) {
      setIsAnalyzing(true);
      try {
        await preloadDetector();
      } catch (error) {
        console.error('Failed to load face detector:', error);
        toast.error('Face detection failed. Please try again.');
        setIsAnalyzing(false);
        return;
      }
    }

    setIsAnalyzing(true);
    try {
      const img = new Image();
      img.src = capturedImage;
      await new Promise((resolve) => {
        img.onload = resolve;
      });
      
      const result = await detectFaces(img);

      if (result.success) {
        console.log(`Face detection successful: ${result.faceCount} faces detected`);
        // TODO: Upload photo to server here
        router.push('/result');
      } else {
        toast.error('No face detected. Please retake the photo.');
        await onRetakePhoto();
      }

    } catch (error) {
      console.error('Face detection analysis failed:', error);
      toast.error('Face detection failed. Please try again.');
      await onRetakePhoto();
    } finally {
      setIsAnalyzing(false);
    }
  }, [isFaceDetectionReady, preloadDetector, detectFaces, router, toast, setIsAnalyzing]);

  return {
    analyzePhoto
  };
} 