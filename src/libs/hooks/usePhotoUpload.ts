'use client';

import { useCallback } from 'react';
import { usePhotoStore, selectSetIsUploading, selectSetUploadedPhoto, selectSetUploadError, selectSetClientHash, selectCapturedImage } from '@/store';
import { generateClientHash } from '@/libs/utils';
import { UPLOAD_API_URL } from '@/libs/constants';

export interface UsePhotoUploadReturn {
  uploadPhoto: (imageData: string) => Promise<string | null>;
  retryUpload: () => Promise<string | null>;
}

export function usePhotoUpload(): UsePhotoUploadReturn {
  const setIsUploading = usePhotoStore(selectSetIsUploading);
  const setUploadedPhoto = usePhotoStore(selectSetUploadedPhoto);
  const setUploadError = usePhotoStore(selectSetUploadError);
  const setClientHash = usePhotoStore(selectSetClientHash);
  const capturedImage = usePhotoStore(selectCapturedImage);

  const uploadPhoto = useCallback(async (imageData: string): Promise<string | null> => {
    const clientHash = generateClientHash(imageData);
    setClientHash(clientHash);
    
    setIsUploading(true);
    setUploadError(null);

    try {
      const response = await fetch(UPLOAD_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dataUrl: imageData,
          clientHash: clientHash,
          timestamp: new Date().toISOString(),
        })
      });

      if (response.ok) {
        const result = await response.json();
        setUploadedPhoto(result);
        setIsUploading(false);
        console.log('Photo uploaded successfully:', result.id);
        return result.id;
      } else {
        throw new Error(`Upload failed with status: ${response.status}`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown upload error';
      setUploadError(errorMessage);
      setIsUploading(false);
      console.warn('Photo upload failed:', errorMessage);
      return null;
    }
  }, [setIsUploading, setUploadedPhoto, setUploadError, setClientHash]);

  const retryUpload = useCallback(async (): Promise<string | null> => {
    if (!capturedImage) return null;
    return uploadPhoto(capturedImage);
  }, [capturedImage, uploadPhoto]);

  return { uploadPhoto, retryUpload };
} 