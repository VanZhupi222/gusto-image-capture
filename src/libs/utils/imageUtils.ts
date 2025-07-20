import { IDEAL_CAMERA_WIDTH, IDEAL_CAMERA_HEIGHT, PHOTO_QUALITY } from '@/libs/constants';

export const resizeImage = (imageUrl: string): Promise<string> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      if (!ctx) return;
      
      const maxWidth = IDEAL_CAMERA_WIDTH;
      const maxHeight = IDEAL_CAMERA_HEIGHT;
      const { width, height } = img;
      
      const scaleX = maxWidth / width;
      const scaleY = maxHeight / height;
      const scale = Math.min(scaleX, scaleY, 1);
      
      const newWidth = Math.round(width * scale);
      const newHeight = Math.round(height * scale);
      
      canvas.width = newWidth;
      canvas.height = newHeight;
      ctx.drawImage(img, 0, 0, newWidth, newHeight);
      
      const resizedImageUrl = canvas.toDataURL('image/jpeg', PHOTO_QUALITY);
      resolve(resizedImageUrl);
    };
    
    img.src = imageUrl;
  });
}; 