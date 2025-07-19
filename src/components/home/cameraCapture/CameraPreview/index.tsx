import { RefObject } from 'react';
import Button from '@/components/ui/button';
import { CAMERA_TEXT } from '@/libs/constants';

interface CameraPreviewProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  countdown: number | null;
  isActive: boolean;
  onStartCountdown: () => void;
  onFileUpload: () => void;
  onDisableCamera: () => void;
}

export default function CameraPreview({ 
  videoRef, 
  canvasRef, 
  countdown,
  isActive,
  onStartCountdown, 
  onFileUpload,
  onDisableCamera
}: CameraPreviewProps) {
  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        {CAMERA_TEXT.CAMERA_CAPTURE_TITLE}
      </h2>
      
      <div className="relative w-4/5 aspect-video bg-black rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-auto"
        />
        
        {/* Countdown indicator */}
        {countdown && (
          <div className="absolute top-4 right-4 pointer-events-none">
            <div className="bg-black opacity-60 rounded-full w-20 h-20 flex items-center justify-center">
              <div className="text-white text-4xl font-bold animate-pulse">
                {countdown}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={onStartCountdown} disabled={isActive}>
          {isActive ? CAMERA_TEXT.TAKING_PHOTO_BUTTON : CAMERA_TEXT.TAKE_PHOTO_BUTTON}
        </Button>
        <Button variant="secondary" onClick={onFileUpload} disabled={isActive}>
          {CAMERA_TEXT.UPLOAD_FROM_DEVICE_BUTTON}
        </Button>
        <Button variant="secondary" onClick={onDisableCamera} disabled={isActive}>
          {CAMERA_TEXT.DISABLE_CAMERA_BUTTON}
        </Button>
      </div>

      {/* Hidden canvas for photo capture */}
      <canvas ref={canvasRef} className="hidden" />
    </>
  );
} 