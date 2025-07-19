import Button from '@/components/ui/button';
import PhotoDisplay from '../../PhotoDisplay';
import StatusMessage from '../../StatusMessage';
import { RESULT_TEXT } from '@/libs/constants';
import { usePhotoStore, selectUploadedPhoto } from '@/store';

interface SuccessContentProps {
  imageUrl: string;
  onTakeNew: () => void;
}

export default function SuccessContent({ imageUrl, onTakeNew }: SuccessContentProps) {
  const uploadedPhoto = usePhotoStore(selectUploadedPhoto);
  
  const displayImageUrl = uploadedPhoto?.dataUrl || imageUrl;
  const photoId = uploadedPhoto?.id;
  
  return (
    <>
      <h1 className="text-3xl font-bold text-primary text-center">
        {RESULT_TEXT.ANALYSIS_COMPLETE_TITLE}
      </h1>
      
      <PhotoDisplay imageUrl={displayImageUrl} />

      <div className="text-center space-y-4">
        <p className="text-lg text-secondary">
          {RESULT_TEXT.ANALYSIS_SUCCESS_DESCRIPTION}
        </p>
        
        <StatusMessage 
          type="success"
          title={RESULT_TEXT.UPLOAD_SUCCESS_TITLE}
          description={photoId ? `Photo saved to server (ID: ${photoId})` : 'Photo saved to server'}
        />
      </div>

      <Button onClick={onTakeNew}>
        {RESULT_TEXT.TAKE_NEW_PHOTO_BUTTON}
      </Button>
    </>
  );
} 