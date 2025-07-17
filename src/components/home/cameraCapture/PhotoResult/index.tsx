interface PhotoResultProps {
  capturedImage: string;
  onRetakePhoto: () => Promise<void>;
  onAnalyzePhoto: () => void;
}

import Button from '@/components/ui/button';

export default function PhotoResult({ capturedImage, onRetakePhoto, onAnalyzePhoto }: PhotoResultProps) {
  const handleRetakePhoto = () => {
    onRetakePhoto();
  };

  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Photo Captured
      </h2>
      
      <div className="w-4/5 bg-gray-200 rounded-lg overflow-hidden">
        <img 
          src={capturedImage} 
          alt="Captured photo" 
          className="w-full h-auto"
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