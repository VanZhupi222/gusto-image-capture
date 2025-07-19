import { useCallback } from 'react';
import { resizeImage } from '@/libs/utils';

interface UseFileUploadOptions {
  onSuccess: (imageUrl: string) => void;
  onError?: (error: string) => void;
}

export function useFileUpload({ onSuccess, onError }: UseFileUploadOptions) {
  const uploadImage = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string;
          resizeImage(imageUrl)
            .then(resizedUrl => {
              onSuccess(resizedUrl);
            })
            .catch(error => {
              onError?.(error.message);
            });
        };
        reader.readAsDataURL(file);
      }
    };
    
    input.click();
  }, [onSuccess, onError]);

  return { uploadImage };
} 