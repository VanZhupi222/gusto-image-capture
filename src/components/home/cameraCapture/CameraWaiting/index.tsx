interface CameraWaitingProps {
  errorMessage: string;
  isLoading: boolean;
  showCameraButton: boolean;
  onRequestPermission: () => Promise<boolean>;
  onFileUpload: () => void;
}

import Button from '@/components/ui/button';

export default function CameraWaiting({ 
  errorMessage, 
  isLoading, 
  showCameraButton,
  onRequestPermission, 
  onFileUpload 
}: CameraWaitingProps) {
  const handleRequestPermission = () => {
    onRequestPermission();
  };

  return (
    <>
      <h2 className="text-2xl font-semibold text-primary text-center">
        Camera Capture
      </h2>
      
      <div className="w-4/5 bg-surface-tertiary rounded-lg aspect-video flex items-center justify-center">
        <div className="text-muted text-center">
          <div className="text-4xl mb-2">📷</div>
          <p className={errorMessage.includes('error') ? 'text-error-text' : ''}>{errorMessage}</p>
          {isLoading && <p className="text-sm">Loading...</p>}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {showCameraButton && (
          <Button onClick={handleRequestPermission} disabled={isLoading}>
            {isLoading ? 'Connecting...' : 'Enable Camera'}
          </Button>
        )}
        <Button variant="secondary" onClick={onFileUpload}>
          Upload from Device
        </Button>
      </div>
    </>
  );
} 