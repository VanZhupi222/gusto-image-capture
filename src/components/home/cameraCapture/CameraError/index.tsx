interface CameraErrorProps {
  onRefreshPage: () => void;
  onFileUpload: () => void;
}

import Button from '@/components/ui/button';

export default function CameraError({ onRefreshPage, onFileUpload }: CameraErrorProps) {
  return (
    <>
      <h2 className="text-2xl font-semibold text-primary text-center">
        Camera Access Required
      </h2>
      
      <div className="w-4/5 aspect-video bg-error-bg border border-error-border rounded-lg p-6 text-center flex flex-col justify-center">
        <div className="text-error-text mb-4">
          <div className="mx-auto h-12 w-12 bg-error-border rounded-full flex items-center justify-center text-2xl">
            ⚠️
          </div>
        </div>
        <p className="text-error-text mb-6 font-semibold text-lg">
          Camera access was denied
        </p>
        
        <div className="text-sm text-secondary bg-surface-primary p-4 rounded border mb-4">
          <p className="font-medium mb-4 text-base">To enable camera access:</p>
          
          <div className="space-y-4 text-left">
            <div className="border-l-4 border-accent pl-3">
              <p className="font-semibold text-accent mb-1">Chrome / Edge:</p>
              <p>Click the camera/information icon in the address bar → Allow → Refresh page</p>
            </div>
            
            <div className="border-l-4 border-accent-secondary pl-3">
              <p className="font-semibold text-accent-secondary mb-1">Firefox:</p>
              <p>Click the camera icon next to the address bar → Allow → Refresh page</p>
            </div>
            
            <div className="border-l-4 border-secondary pl-3">
              <p className="font-semibold text-secondary mb-1">Safari:</p>
              <p>Safari menu → Settings for This Website → Camera: Allow → Refresh page</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={onRefreshPage}>
          Refresh Page
        </Button>
        <Button variant="secondary" onClick={onFileUpload}>
          Upload from Device
        </Button>
      </div>
    </>
  );
} 