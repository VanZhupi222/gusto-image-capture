'use client';

import { useEffect } from 'react';
import Card from '@/components/ui/card';
import { usePhotoStore, selectCapturedImage, selectClearCapturedImage, selectIsAnalyzed, selectIsAnalyzing, selectIsUploading, selectUploadedPhoto, selectUploadError } from '@/store';
import { useRouter } from 'next/navigation';
import { usePhotoUpload } from '@/libs/hooks';
import NoPhotoContent from './content/NoPhotoContent';
import NotAnalyzedContent from './content/NotAnalyzedContent';
import UploadingContent from './content/UploadingContent';
import SuccessContent from './content/SuccessContent';
import FailedContent from './content/FailedContent';

export default function Result() {
  const router = useRouter();
  const capturedImage = usePhotoStore(selectCapturedImage);
  const clearCapturedImage = usePhotoStore(selectClearCapturedImage);
  const isAnalyzed = usePhotoStore(selectIsAnalyzed);
  const isAnalyzing = usePhotoStore(selectIsAnalyzing);
  const isUploading = usePhotoStore(selectIsUploading);
  const uploadedPhoto = usePhotoStore(selectUploadedPhoto);
  const uploadError = usePhotoStore(selectUploadError);
  
  const { retryUpload } = usePhotoUpload();

  // Analyzing, redirect to camera
  useEffect(() => {
    if (isAnalyzing) {
      router.push('/');
    }
  }, [isAnalyzing, router]);

  const handleTakeNewPhoto = () => {
    clearCapturedImage();
    router.push('/');
  };

  const handleGoBackToCamera = () => {
    router.push('/');
  };

  const handleRetryUpload = async () => {
    await retryUpload();
  };

  const renderContent = () => {
    // 1. No photo at all
    if (!capturedImage && !uploadedPhoto) {
      return <NoPhotoContent onTakePhoto={handleTakeNewPhoto} />;
    }

    // 2. Photo captured but not analyzed
    if (capturedImage && !isAnalyzed) {
      return <NotAnalyzedContent imageUrl={capturedImage} onGoBack={handleGoBackToCamera} onTakeNew={handleTakeNewPhoto} />;
    }

    // 3. No current photo but has uploaded photo - show uploaded photo
    if (!capturedImage && uploadedPhoto) {
      return <SuccessContent imageUrl={uploadedPhoto.dataUrl} onTakeNew={handleTakeNewPhoto} />;
    }

    // 4. Uploading
    if (capturedImage && isUploading) {
      return <UploadingContent imageUrl={capturedImage} onTakeNew={handleTakeNewPhoto} />;
    }

    // 5. Upload success
    if (uploadedPhoto) {
      const imageUrl = capturedImage || uploadedPhoto.dataUrl;
      return <SuccessContent imageUrl={imageUrl} onTakeNew={handleTakeNewPhoto} />;
    }

    // 6. Upload failed
    if (capturedImage && uploadError) {
      return (
        <FailedContent 
          imageUrl={capturedImage} 
          uploadError={uploadError}
          isRetrying={isUploading}
          onRetry={handleRetryUpload}
          onTakeNew={handleTakeNewPhoto} 
        />
      );
    }

    // 7. Default case - should not reach here
    return <NoPhotoContent onTakePhoto={handleTakeNewPhoto} />;
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <main className="container mx-auto px-6 py-6">
        <Card variant="elevated" className={`min-h-[calc(100vh-8rem)] flex flex-col ${!capturedImage ? 'justify-center' : ''}`}>
          <div className={`flex flex-col items-center space-y-6 ${!capturedImage ? 'flex-1' : ''}`}>
            {renderContent()}
          </div>
        </Card>
      </main>
    </div>
  );
} 