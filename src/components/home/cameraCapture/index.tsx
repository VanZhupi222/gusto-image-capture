'use client';

import { useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useCameraPermission, useCountdown, useFaceDetection, useToast, useFileUpload } from '@/libs/hooks';
import { usePhotoStore, selectCapturedImage, selectSetCapturedImage, selectClearCapturedImage, selectIsAnalyzing, selectSetIsAnalyzing } from '@/store';
import { CAMERA_COUNTDOWN_DURATION, PHOTO_QUALITY } from '@/libs/constants';

import PhotoResult from './PhotoResult';
import CameraError from './CameraError';
import CameraPreview from './CameraPreview';
import CameraWaiting from './CameraWaiting';
import AnalysisLoading from './AnalysisLoading';

export default function CameraCapture() {
  const router = useRouter();
  
  const {
    permissionStatus,
    stream,
    error,
    isLoading,
    requestPermission,
    stopStream
  } = useCameraPermission();

  const {
    preloadDetector,
    detectFaces,
    isReady: isFaceDetectionReady
  } = useFaceDetection();

  const toast = useToast();
  
  const { uploadImage } = useFileUpload({
    onSuccess: (imageUrl) => {
      setCapturedImage(imageUrl);
      toast.success('Image uploaded successfully');
    },
    onError: (error) => {
      console.error('Failed to upload image:', error);
      toast.error('Failed to upload image');
    }
  });

  const capturedImage = usePhotoStore(selectCapturedImage);
  const setCapturedImage = usePhotoStore(selectSetCapturedImage);
  const clearCapturedImage = usePhotoStore(selectClearCapturedImage);
  const isAnalyzing = usePhotoStore(selectIsAnalyzing);
  const setIsAnalyzing = usePhotoStore(selectSetIsAnalyzing);

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
  }, [setCapturedImage]);

  const { countdown, isActive, startCountdown } = useCountdown({
    initialCount: CAMERA_COUNTDOWN_DURATION,
    onComplete: capturePhoto
  });

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

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

  // Retake photo, connect video to stream
  useEffect(() => {
    if (stream && videoRef.current && !capturedImage) {
      if (videoRef.current.srcObject !== stream) {
        videoRef.current.srcObject = stream;
      }
    }
  }, [stream, capturedImage]);

  const retakePhoto = useCallback(async () => {
    clearCapturedImage();
    if (!stream && permissionStatus === 'granted') {
      await requestPermission();
    }
  }, [clearCapturedImage, stream, permissionStatus, requestPermission]);

  const handleAnalyzePhoto = useCallback(async () => {
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
        await retakePhoto();
      }

    } catch (error) {
      console.error('Face detection analysis failed:', error);
      toast.error('Face detection failed. Please try again.');
      await retakePhoto();
    } finally {
      setIsAnalyzing(false);
    }
  }, [capturedImage, setIsAnalyzing, detectFaces, retakePhoto, isFaceDetectionReady, preloadDetector, router]);

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

    const errorMessage = error?.message || 'Enable camera to start taking photos';
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