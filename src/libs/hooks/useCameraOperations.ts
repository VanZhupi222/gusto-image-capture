'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import { usePhotoStore, selectSetCapturedImage, selectClearCapturedImage, selectClearUploadedPhotos } from '@/store';
import { PHOTO_QUALITY } from '@/libs/constants';

export interface UseCameraOperationsReturn {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  capturePhoto: () => void;
  retakePhoto: () => Promise<void>;
}

export function useCameraOperations(
  stream: MediaStream | null,
  permissionStatus: string,
  requestPermission: () => Promise<boolean>,
  capturedImage: string | null
): UseCameraOperationsReturn {
  const setCapturedImage = usePhotoStore(selectSetCapturedImage);
  const clearCapturedImage = usePhotoStore(selectClearCapturedImage);
  const clearUploadedPhotos = usePhotoStore(selectClearUploadedPhotos);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageDataUrl = canvas.toDataURL('image/jpeg', PHOTO_QUALITY);
    setCapturedImage(imageDataUrl);
    clearUploadedPhotos();
  }, [setCapturedImage, clearUploadedPhotos]);

  const retakePhoto = useCallback(async () => {
    clearCapturedImage();
    
    if (!stream && permissionStatus === 'granted') {
      await requestPermission();
    }
  }, [clearCapturedImage, stream, permissionStatus, requestPermission]);

  // Connect video to stream when stream changes or when retaking photos
  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream, capturedImage]);

  return {
    videoRef,
    canvasRef,
    capturePhoto,
    retakePhoto
  };
} 