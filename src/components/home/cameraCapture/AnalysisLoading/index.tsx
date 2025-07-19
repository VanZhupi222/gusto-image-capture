import Image from 'next/image';
import Spinner from '@/components/ui/spinner';
import { CAMERA_TEXT } from '@/libs/constants';

interface AnalysisLoadingProps {
  capturedImage: string;
}

export default function AnalysisLoading({ capturedImage }: AnalysisLoadingProps) {
  return (
    <>
      <h2 className="text-2xl font-semibold text-primary text-center">
        {CAMERA_TEXT.ANALYZING_PHOTO_TITLE}
      </h2>
      
      <div className="relative w-4/5 bg-surface-tertiary rounded-lg overflow-hidden">
        <Image 
          src={capturedImage} 
          alt={CAMERA_TEXT.ANALYZING_PHOTO_ALT} 
          width={800}
          height={600}
          className="w-full h-auto"
          priority
        />
        
        <div className="absolute inset-0 bg-black opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <Spinner size="lg" color="white" className="mx-auto mb-4" />
            <p className="text-lg font-medium">{CAMERA_TEXT.DETECTING_FACES_TEXT}</p>
          </div>
        </div>
      </div>

      <div className="text-center text-secondary">
        <p>{CAMERA_TEXT.PLEASE_WAIT_TEXT}</p>
      </div>
    </>
  );
} 