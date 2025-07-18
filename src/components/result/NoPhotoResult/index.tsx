import Card from '@/components/ui/card';
import Button from '@/components/ui/button';

interface NoPhotoResultProps {
  onTakeNewPhoto: () => void;
}

export default function NoPhotoResult({ onTakeNewPhoto }: NoPhotoResultProps) {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <main className="container mx-auto px-6 py-6">
        <Card variant="elevated" className="min-h-[calc(100vh-8rem)] flex flex-col">
          <div className="flex flex-col items-center justify-center space-y-6 flex-1">
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4">📷</div>
              <h1 className="text-3xl font-bold text-primary">
                No Photo Available
              </h1>
              <p className="text-lg text-secondary max-w-md">
                No photo has been captured yet. Take a photo on the home page to see the results here.
              </p>
            </div>

            <Button onClick={onTakeNewPhoto}>
              Go to Camera
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
} 