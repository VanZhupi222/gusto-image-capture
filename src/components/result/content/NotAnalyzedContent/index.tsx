import Button from '@/components/ui/button';
import PhotoDisplay from '../../PhotoDisplay';
import StatusMessage from '../../StatusMessage';
import { RESULT_TEXT } from '@/libs/constants';

interface NotAnalyzedContentProps {
  imageUrl: string;
  onGoBack: () => void;
  onTakeNew: () => void;
}

export default function NotAnalyzedContent({ imageUrl, onGoBack, onTakeNew }: NotAnalyzedContentProps) {
  return (
    <>
      <h1 className="text-3xl font-bold text-primary text-center">
        {RESULT_TEXT.PHOTO_CAPTURED_TITLE}
      </h1>
      
      <PhotoDisplay imageUrl={imageUrl} />

      <div className="text-center space-y-4">
        <p className="text-lg text-secondary">
          {RESULT_TEXT.PHOTO_CAPTURED_DESCRIPTION}
        </p>
        
        <StatusMessage 
          type="warning"
          title={RESULT_TEXT.ANALYSIS_REQUIRED_TITLE}
          description={RESULT_TEXT.ANALYSIS_REQUIRED_DESCRIPTION}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={onGoBack}>
          {RESULT_TEXT.GO_TO_CAMERA_BUTTON}
        </Button>
        <Button variant="secondary" onClick={onTakeNew}>
          {RESULT_TEXT.TAKE_NEW_PHOTO_BUTTON}
        </Button>
      </div>
    </>
  );
} 