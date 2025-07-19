import Button from '@/components/ui/button';
import PhotoDisplay from '../../PhotoDisplay';
import StatusMessage from '../../StatusMessage';
import Loading from '@/components/ui/Loading';
import { RESULT_TEXT } from '@/libs/constants';

interface FailedContentProps {
  imageUrl: string;
  uploadError: string;
  isRetrying: boolean;
  onRetry: () => void;
  onTakeNew: () => void;
}

export default function FailedContent({ imageUrl, uploadError, isRetrying, onRetry, onTakeNew }: FailedContentProps) {
  return (
    <>
      <h1 className="text-3xl font-bold text-primary text-center">
        {RESULT_TEXT.ANALYSIS_COMPLETE_TITLE}
      </h1>
      
      <PhotoDisplay imageUrl={imageUrl} />

      <div className="text-center space-y-4">
        <p className="text-lg text-secondary">
          {RESULT_TEXT.ANALYSIS_SUCCESS_DESCRIPTION}
        </p>
        
        <StatusMessage 
          type="success"
          title={RESULT_TEXT.ANALYSIS_RESULT_TITLE}
          description={RESULT_TEXT.ANALYSIS_RESULT_DESCRIPTION}
        />

        <StatusMessage 
          type="warning"
          title={RESULT_TEXT.UPLOAD_FAILED_TITLE}
          description={RESULT_TEXT.UPLOAD_FAILED_DESCRIPTION}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          onClick={onRetry} 
          disabled={isRetrying}
          className="flex items-center justify-center space-x-2"
        >
          {isRetrying ? (
            <Loading message="Retrying..." size="sm" color="white" />
          ) : (
            RESULT_TEXT.RETRY_UPLOAD_BUTTON
          )}
        </Button>
        
        <Button variant="secondary" onClick={onTakeNew}>
          {RESULT_TEXT.TAKE_NEW_PHOTO_BUTTON}
        </Button>
      </div>
    </>
  );
} 