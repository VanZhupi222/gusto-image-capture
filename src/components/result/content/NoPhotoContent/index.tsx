import Button from '@/components/ui/button';
import { RESULT_TEXT } from '@/libs/constants';

interface NoPhotoContentProps {
  onTakePhoto: () => void;
}

export default function NoPhotoContent({ onTakePhoto }: NoPhotoContentProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] space-y-6">
      <h1 className="text-3xl font-bold text-primary text-center">
        {RESULT_TEXT.NO_PHOTO_TITLE}
      </h1>
      
      <div className="text-center space-y-4">
        <div className="text-6xl mb-4">{RESULT_TEXT.NO_PHOTO_EMOJI}</div>
        <p className="text-lg text-secondary max-w-md">
          {RESULT_TEXT.NO_PHOTO_DESCRIPTION}
        </p>
      </div>
      
      <Button onClick={onTakePhoto}>
        {RESULT_TEXT.GO_TO_CAMERA_BUTTON}
      </Button>
    </div>
  );
} 