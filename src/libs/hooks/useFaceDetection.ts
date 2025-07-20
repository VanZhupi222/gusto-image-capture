'use client';

import { useState, useCallback } from 'react';
import type { FaceDetector, FaceDetectionResult, UseFaceDetectionReturn } from '@/types';
import { checkRedPixels } from '@/libs/utils';
import { MAX_FACES } from "@/libs/constants";

let globalDetector: FaceDetector | null = null;
let globalLoadingPromise: Promise<FaceDetector> | null = null;

export function useFaceDetection(): UseFaceDetectionReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(!!globalDetector);

  const preloadDetector = useCallback(async (): Promise<void> => {
    if (globalDetector) {
      setIsReady(true);
      return;
    }
    if (globalLoadingPromise) {
      await globalLoadingPromise;
      setIsReady(true);
      return;
    }

    setIsLoading(true);
    setIsReady(false);

    globalLoadingPromise = (async (): Promise<FaceDetector> => {
      try {
        const [faceDetection, tf] = await Promise.all([
          import('@tensorflow-models/face-detection'),
          import('@tensorflow/tfjs')
        ]);

        await tf.ready();
        const model = faceDetection.SupportedModels.MediaPipeFaceDetector;
        const detectorInstance = await faceDetection.createDetector(model, {
          runtime: 'tfjs',
          modelType: 'short',
          maxFaces: MAX_FACES
        });
        
        globalDetector = detectorInstance;
        return detectorInstance;

      } catch (err) {
        console.error('Failed to load face detector:', err);
        globalLoadingPromise = null;
        globalDetector = null;
        setIsReady(false);
        throw err;
      } finally {
        setIsLoading(false);
      }
    })();

    await globalLoadingPromise;
    setIsReady(true);
  }, []);

  const detectFaces = useCallback(async (
    image: HTMLImageElement | HTMLCanvasElement
  ): Promise<FaceDetectionResult> => {
    try {
      if (!globalDetector) {
        await preloadDetector();
      }
      const detectorInstance = globalDetector!;
      const faces = await detectorInstance.estimateFaces(image);
      
      console.log(`Face detection completed: ${faces.length} faces detected`, faces);
      return {
        success: faces.length > 0,
        faceCount: faces.length,
        faces
      };

    } catch (err) {
      console.error('Face detection failed, trying color analysis fallback:', err);
      
      // Use color analysis as fallback
      const colorAnalysisSuccess = checkRedPixels(image);
      console.log('colorAnalysisSuccess', colorAnalysisSuccess);
      
      return {
        success: colorAnalysisSuccess,
        faceCount: colorAnalysisSuccess ? 1 : 0,
        error: colorAnalysisSuccess 
          ? 'Face detection failed, but color analysis passed' 
          : 'Both face detection and color analysis failed'
      };
    }
  }, [preloadDetector]);

  return {
    preloadDetector,
    detectFaces,
    isLoading,
    isReady
  };
} 