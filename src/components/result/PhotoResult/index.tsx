import Image from 'next/image';
import Card from '@/components/ui/card';
import Button from '@/components/ui/button';

interface PhotoResultProps {
  capturedImage: string;
  onTakeNewPhoto: () => void;
}

export default function PhotoResult({ capturedImage, onTakeNewPhoto }: PhotoResultProps) {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <main className="container mx-auto px-6 py-6">
        <Card variant="elevated" className="min-h-[calc(100vh-8rem)] flex flex-col">
          <div className="flex flex-col items-center space-y-6">
            <h1 className="text-3xl font-bold text-primary text-center">
              Photo Analysis Complete
            </h1>
            
            <div className="w-full max-w-2xl bg-surface-tertiary rounded-lg overflow-hidden">
              <Image 
                src={capturedImage} 
                alt="Captured photo" 
                width={800}
                height={600}
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="text-center space-y-4">
              <p className="text-lg text-secondary">
                Face detection successful! Your photo has been analyzed.
              </p>
              
              <div className="bg-success-bg border border-success-border rounded-lg p-4">
                <p className="text-success-text font-medium">
                  Analysis Result: Passed
                </p>
                <p className="text-success-text-secondary text-sm mt-1">
                  People detected in the image
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={onTakeNewPhoto}>
                Take New Photo
              </Button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
} 