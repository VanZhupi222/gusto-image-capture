interface CameraWaitingProps {
  errorMessage: string;
  isLoading: boolean;
  showCameraButton: boolean;
  onRequestPermission: () => Promise<boolean>;
  onFileUpload: () => void;
}

import Button from '@/components/ui/button';
import { CAMERA_TEXT } from '@/libs/constants';

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
        {CAMERA_TEXT.CAMERA_CAPTURE_TITLE}
      </h2>
      
      <div className="w-4/5 bg-surface-tertiary rounded-lg aspect-video flex items-center justify-center">
        <div className="text-muted text-center">
          <div className="text-4xl mb-2">📷</div>
          <p className={errorMessage.includes('error') ? 'text-error-text' : ''}>{errorMessage}</p>
          {isLoading && <p className="text-sm">{CAMERA_TEXT.LOADING_TEXT}</p>}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {showCameraButton && (
          <Button onClick={handleRequestPermission} disabled={isLoading}>
            {isLoading ? CAMERA_TEXT.CONNECTING_BUTTON : CAMERA_TEXT.ENABLE_CAMERA_BUTTON}
          </Button>
        )}
        <Button variant="secondary" onClick={onFileUpload}>
          {CAMERA_TEXT.UPLOAD_FROM_DEVICE_BUTTON}
        </Button>
      </div>
    </>
  );
} 