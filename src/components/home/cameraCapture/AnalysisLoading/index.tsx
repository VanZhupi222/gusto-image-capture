import Image from 'next/image';
import Spinner from '@/components/ui/spinner';

interface AnalysisLoadingProps {
  capturedImage: string;
}

export default function AnalysisLoading({ capturedImage }: AnalysisLoadingProps) {
  return (
    <>
      <h2 className="text-2xl font-semibold text-primary text-center">
        Analyzing Photo
      </h2>
      
      <div className="relative w-4/5 bg-surface-tertiary rounded-lg overflow-hidden">
        <Image 
          src={capturedImage} 
          alt="Analyzing photo" 
          width={800}
          height={600}
          className="w-full h-auto"
          priority
        />
        
        <div className="absolute inset-0 bg-black opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <Spinner size="lg" color="white" className="mx-auto mb-4" />
            <p className="text-lg font-medium">Detecting faces...</p>
          </div>
        </div>
      </div>

      <div className="text-center text-secondary">
        <p>Please wait while we analyze your photo</p>
      </div>
    </>
  );
} 