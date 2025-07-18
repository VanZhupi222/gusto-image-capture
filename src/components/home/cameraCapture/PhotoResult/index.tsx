import Image from 'next/image';
import Button from '@/components/ui/button';

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
        Photo Captured
      </h2>
      
      <div className="w-4/5 bg-surface-tertiary rounded-lg overflow-hidden">
        <Image 
          src={capturedImage} 
          alt="Captured photo" 
          width={800}
          height={600}
          className="w-full h-auto"
          priority
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={handleRetakePhoto}>
          Retake Photo
        </Button>
        <Button variant="secondary" onClick={onAnalyzePhoto}>
          Analyze Photo
        </Button>
      </div>
    </>
  );
} 