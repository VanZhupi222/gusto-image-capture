'use client';

import { useEffect } from 'react';
import type { CameraError, UseCameraPermissionReturn, MediaDevicesError } from '@/types';
import { IDEAL_CAMERA_WIDTH, IDEAL_CAMERA_HEIGHT } from '@/libs/constants';
import { 
  useCameraStore,
  selectPermissionStatus, 
  selectCameraStream, 
  selectCameraError, 
  selectIsLoading,
  selectSetPermissionStatus,
  selectSetCameraStream,
  selectSetCameraError,
  selectSetIsLoading
} from '@/store';

export function useCameraPermission(): UseCameraPermissionReturn {
  const permissionStatus = useCameraStore(selectPermissionStatus);
  const stream = useCameraStore(selectCameraStream);
  const error = useCameraStore(selectCameraError);
  const isLoading = useCameraStore(selectIsLoading);
  
  const setPermissionStatus = useCameraStore(selectSetPermissionStatus);
  const setStream = useCameraStore(selectSetCameraStream);
  const setCameraError = useCameraStore(selectSetCameraError);
  const setIsLoading = useCameraStore(selectSetIsLoading);

  const handleError = (err: MediaDevicesError) => {
    const errorMap: Record<string, CameraError> = {
      NotAllowedError: {
        type: 'permission',
        message: 'Camera access was denied. Please allow camera permissions and try again.'
      },
      NotFoundError: {
        type: 'device',
        message: 'No camera device found on this system.'
      },
      NotReadableError: {
        type: 'device',
        message: 'Camera is already in use by another application.'
      }
    };

    const errorInfo = errorMap[err.name] || {
      type: 'unknown',
      message: 'Failed to access camera. Please check your browser settings.'
    };

    setCameraError(errorInfo);
  };

  const requestPermission = async (): Promise<boolean> => {
    setIsLoading(true);
    setCameraError(null);

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: IDEAL_CAMERA_WIDTH },
          height: { ideal: IDEAL_CAMERA_HEIGHT },
          facingMode: 'user'
        }
      });

      setStream(mediaStream);
      setPermissionStatus('granted');
      setIsLoading(false);
      return true;

    } catch (err) {
      handleError(err as MediaDevicesError);
      setPermissionStatus('denied');
      setIsLoading(false);
      return false;
    }
  };

  const stopStream = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setPermissionStatus('unknown');
    }
  };

  const retryPermission = async (): Promise<boolean> => {
    setCameraError(null);
    setPermissionStatus('prompt');
    return await requestPermission();
  };

  // Cleanup on page unload
  useEffect(() => {
    const handlePageUnload = () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
    };

    window.addEventListener('beforeunload', handlePageUnload);
    window.addEventListener('pagehide', handlePageUnload);

    return () => {
      window.removeEventListener('beforeunload', handlePageUnload);
      window.removeEventListener('pagehide', handlePageUnload);
    };
  }, [stream, setStream]);

  return {
    permissionStatus,
    stream,
    error,
    isLoading,
    requestPermission,
    stopStream,
    retryPermission
  };
} 