interface CameraErrorProps {
  onRefreshPage: () => void;
  onFileUpload: () => void;
}

import Button from '@/components/ui/button';
import { CAMERA_TEXT } from '@/libs/constants';

export default function CameraError({ onRefreshPage, onFileUpload }: CameraErrorProps) {
  return (
    <>
      <h2 className="text-2xl font-semibold text-primary text-center">
        {CAMERA_TEXT.CAMERA_ACCESS_REQUIRED_TITLE}
      </h2>
      
      <div className="w-4/5 aspect-video bg-error-bg border border-error-border rounded-lg p-6 text-center flex flex-col justify-center">
        <div className="text-error-text mb-4">
          <div className="mx-auto h-12 w-12 bg-error-border rounded-full flex items-center justify-center text-2xl">
            {CAMERA_TEXT.CAMERA_DENIED_EMOJI}
          </div>
        </div>
        <p className="text-error-text mb-6 font-semibold text-lg">
          {CAMERA_TEXT.CAMERA_DENIED_TITLE}
        </p>
        
        <div className="text-sm text-secondary bg-surface-primary p-4 rounded border mb-4">
          <p className="font-medium mb-4 text-base">{CAMERA_TEXT.ENABLE_CAMERA_INSTRUCTIONS_TITLE}</p>
          
          <div className="space-y-4 text-left">
            <div className="border-l-4 border-accent pl-3">
              <p className="font-semibold text-accent mb-1">{CAMERA_TEXT.CHROME_EDGE_TITLE}</p>
              <p>{CAMERA_TEXT.CHROME_EDGE_INSTRUCTIONS}</p>
            </div>
            
            <div className="border-l-4 border-accent-secondary pl-3">
              <p className="font-semibold text-accent-secondary mb-1">{CAMERA_TEXT.FIREFOX_TITLE}</p>
              <p>{CAMERA_TEXT.FIREFOX_INSTRUCTIONS}</p>
            </div>
            
            <div className="border-l-4 border-secondary pl-3">
              <p className="font-semibold text-secondary mb-1">{CAMERA_TEXT.SAFARI_TITLE}</p>
              <p>{CAMERA_TEXT.SAFARI_INSTRUCTIONS}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={onRefreshPage}>
          {CAMERA_TEXT.REFRESH_PAGE_BUTTON}
        </Button>
        <Button variant="secondary" onClick={onFileUpload}>
          {CAMERA_TEXT.UPLOAD_FROM_DEVICE_BUTTON}
        </Button>
      </div>
    </>
  );
} 