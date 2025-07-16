import Button from '@/components/ui/button';
import Card from '@/components/ui/card';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <main className="container mx-auto px-6 py-6">
        <Card variant="elevated" className="min-h-[calc(100vh-8rem)] flex flex-col">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
            Camera Capture
          </h2>

          {/* Camera Preview */}
          <div className="flex-1 flex items-center justify-center mb-8">
            <div className="w-full max-w-2xl bg-gray-200 rounded-lg aspect-video flex items-center justify-center">
              <div className="text-gray-500 text-center">
                <div className="text-4xl mb-2">📷</div>
                <p>Camera preview</p>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button>
                Take Photo
              </Button>
              <Button variant="secondary">
                Upload from Device
              </Button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
} 