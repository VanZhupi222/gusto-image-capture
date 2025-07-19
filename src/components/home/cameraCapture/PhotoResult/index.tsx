import Image from 'next/image';
import Button from '@/components/ui/button';
import { CAMERA_TEXT } from '@/libs/constants';

interface PhotoResultProps {
  capturedImage: string;
  onRetakePhoto: () => Promise<void>;
  onAnalyzePhoto: () => void;
}

export default function PhotoResult({ capturedImage, onRetakePhoto, onAnalyzePhoto }: PhotoResultProps) {
  const handleRetakePhoto = () => {
    onRetakePhoto();
  };

  return (
    <>
      <h2 className="text-2xl font-semibold text-primary text-center">
        {CAMERA_TEXT.PHOTO_CAPTURED_TITLE}
      </h2>
      
      <div className="w-4/5 bg-surface-tertiary rounded-lg overflow-hidden">
        <Image 
          src={capturedImage} 
          alt={CAMERA_TEXT.CAPTURED_PHOTO_ALT} 
          width={800}
          height={600}
          className="w-full h-auto"
          priority
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={handleRetakePhoto}>
          {CAMERA_TEXT.RETAKE_PHOTO_BUTTON}
        </Button>
        <Button variant="secondary" onClick={onAnalyzePhoto}>
          {CAMERA_TEXT.ANALYZE_PHOTO_BUTTON}
        </Button>
      </div>
    </>
  );
} 