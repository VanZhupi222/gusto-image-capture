import Card from '@/components/ui/card';
import CameraCapture from './cameraCapture';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <main className="container mx-auto px-6 py-6">
        <Card variant="elevated" className="min-h-[calc(100vh-8rem)] flex flex-col">
          <CameraCapture />
        </Card>
      </main>
    </div>
  );
} 