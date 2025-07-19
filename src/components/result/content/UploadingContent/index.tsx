import Button from '@/components/ui/button';
import PhotoDisplay from '../../PhotoDisplay';
import StatusMessage from '../../StatusMessage';
import Loading from '@/components/ui/Loading';
import { RESULT_TEXT } from '@/libs/constants';

interface UploadingContentProps {
  imageUrl: string;
  onTakeNew: () => void;
}

export default function UploadingContent({ imageUrl, onTakeNew }: UploadingContentProps) {
  return (
    <>
      <h1 className="text-3xl font-bold text-primary text-center">
        {RESULT_TEXT.UPLOADING_TITLE}
      </h1>
      
      <PhotoDisplay imageUrl={imageUrl} />

      <Loading message={RESULT_TEXT.UPLOADING_DESCRIPTION} size="lg" />

      <div className="text-center space-y-4">
        <StatusMessage 
          type="success"
          title={RESULT_TEXT.UPLOADING_SUCCESS_TITLE}
          description={RESULT_TEXT.UPLOADING_DESCRIPTION}
        />
      </div>

      <Button variant="secondary" onClick={onTakeNew}>
        {RESULT_TEXT.TAKE_NEW_PHOTO_BUTTON}
      </Button>
    </>
  );
} 