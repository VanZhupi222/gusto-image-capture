'use client';

import { useEffect, useCallback } from 'react';
import { useCameraPermission, useCountdown, useFaceDetection, useToast, useFileUpload, usePhotoAnalysis, useCameraOperations } from '@/libs/hooks';
import { usePhotoStore, selectCapturedImage, selectSetCapturedImage, selectIsAnalyzing } from '@/store';
import { CAMERA_COUNTDOWN_DURATION, CAMERA_TEXT } from '@/libs/constants';

import PhotoResult from './PhotoResult';
import CameraError from './CameraError';
import CameraPreview from './CameraPreview';
import CameraWaiting from './CameraWaiting';
import AnalysisLoading from './AnalysisLoading';

export default function CameraCapture() {
  const {
    permissionStatus,
    stream,
    error,
    isLoading,
    requestPermission,
    stopStream
  } = useCameraPermission();

  const capturedImage = usePhotoStore(selectCapturedImage);
  const isAnalyzing = usePhotoStore(selectIsAnalyzing);
  const setCapturedImage = usePhotoStore(selectSetCapturedImage);


  const toast = useToast();
  
  const {
    preloadDetector,
    isReady: isFaceDetectionReady
  } = useFaceDetection();

  const { analyzePhoto } = usePhotoAnalysis();

  const {
    videoRef,
    canvasRef,
    capturePhoto,
    retakePhoto
  } = useCameraOperations(stream, permissionStatus, requestPermission, capturedImage);

  const { countdown, isActive, startCountdown } = useCountdown({
    initialCount: CAMERA_COUNTDOWN_DURATION,
    onComplete: capturePhoto
  });

  const { uploadImage } = useFileUpload({
    onSuccess: (imageUrl) => {
      setCapturedImage(imageUrl);
      toast.success(CAMERA_TEXT.IMAGE_UPLOAD_SUCCESS);
    },
    onError: (error) => {
      console.error('Failed to upload image:', error);
      toast.error(CAMERA_TEXT.IMAGE_UPLOAD_ERROR);
    }
  });

  // Preload face detector when camera permission is granted
  useEffect(() => {
    if (permissionStatus === 'granted' && !isFaceDetectionReady) {
      const preloadInIdle = () => {
        preloadDetector().catch((error) => {
          console.error('Failed to preload face detector:', error);
        });
      };
      requestIdleCallback(preloadInIdle, { timeout: 2000 });
    }
  }, [permissionStatus, isFaceDetectionReady, preloadDetector]);

  const handleAnalyzePhoto = useCallback(async () => {
    if (!capturedImage) return;
    await analyzePhoto(capturedImage, retakePhoto);
  }, [analyzePhoto, capturedImage, retakePhoto]);

  const handleFileUpload = uploadImage;

  const refreshPage = () => {
    window.location.reload();
  };

  const disableCamera = useCallback(() => {
    stopStream();
  }, [stopStream]);

  const renderContent = () => {
    if (capturedImage) {
      if (isAnalyzing) {
        return (
          <AnalysisLoading capturedImage={capturedImage} />
        );
      }
      
      return (
        <PhotoResult
          capturedImage={capturedImage}
          onRetakePhoto={retakePhoto}
          onAnalyzePhoto={handleAnalyzePhoto}
        />
      );
    }

    if (permissionStatus === 'denied') {
      return (
        <CameraError
          onRefreshPage={refreshPage}
          onFileUpload={handleFileUpload}
        />
      );
    }

    if (permissionStatus === 'granted' && stream && !error) {
      return (
        <CameraPreview
          videoRef={videoRef}
          canvasRef={canvasRef}
          countdown={countdown}
          isActive={isActive}
          onStartCountdown={startCountdown}
          onFileUpload={handleFileUpload}
          onDisableCamera={disableCamera}
        />
      );
    }

    const errorMessage = error?.message || CAMERA_TEXT.DEFAULT_ERROR_MESSAGE;
    const showCameraButton = !error || error.type !== 'device';
    return (
      <CameraWaiting
        errorMessage={errorMessage}
        isLoading={isLoading}
        showCameraButton={showCameraButton}
        onRequestPermission={requestPermission}
        onFileUpload={handleFileUpload}
      />
    );
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {renderContent()}
    </div>
  );
} 