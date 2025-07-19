'use client';

import Image from 'next/image';
import Card from '@/components/ui/card';
import Button from '@/components/ui/button';
import { usePhotoStore, selectCapturedImage, selectClearCapturedImage, selectIsAnalyzed } from '@/store';
import { useRouter } from 'next/navigation';
import { RESULT_TEXT } from '@/libs/constants';

export default function Result() {
  const router = useRouter();
  const capturedImage = usePhotoStore(selectCapturedImage);
  const clearCapturedImage = usePhotoStore(selectClearCapturedImage);
  const isAnalyzed = usePhotoStore(selectIsAnalyzed);

  const handleTakeNewPhoto = () => {
    clearCapturedImage();
    router.push('/');
  };

  const handleGoBackToCamera = () => {
    router.push('/');
  };

  // 渲染标题
  const renderTitle = () => {
    if (!capturedImage) {
      return RESULT_TEXT.NO_PHOTO_TITLE;
    }
    if (!isAnalyzed) {
      return RESULT_TEXT.PHOTO_CAPTURED_TITLE;
    }
    return RESULT_TEXT.ANALYSIS_COMPLETE_TITLE;
  };

  // 渲染主要内容
  const renderMainContent = () => {
    if (!capturedImage) {
      return (
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4">{RESULT_TEXT.NO_PHOTO_EMOJI}</div>
          <p className="text-lg text-secondary max-w-md">
            {RESULT_TEXT.NO_PHOTO_DESCRIPTION}
          </p>
        </div>
      );
    }

    return (
      <div className="w-full max-w-2xl bg-surface-tertiary rounded-lg overflow-hidden">
        <Image 
          src={capturedImage} 
          alt={RESULT_TEXT.CAPTURED_PHOTO_ALT} 
          width={800}
          height={600}
          className="w-full h-auto"
          priority
        />
      </div>
    );
  };

  // 渲染描述文本
  const renderDescription = () => {
    if (!capturedImage) {
      return null;
    }

    if (!isAnalyzed) {
      return (
        <div className="text-center space-y-4">
          <p className="text-lg text-secondary">
            {RESULT_TEXT.PHOTO_CAPTURED_DESCRIPTION}
          </p>
          
          <div className="bg-warning-bg border border-warning-border rounded-lg p-4">
            <p className="text-warning-text font-medium">
              {RESULT_TEXT.ANALYSIS_REQUIRED_TITLE}
            </p>
            <p className="text-warning-text-secondary text-sm mt-1">
              {RESULT_TEXT.ANALYSIS_REQUIRED_DESCRIPTION}
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="text-center space-y-4">
        <p className="text-lg text-secondary">
          {RESULT_TEXT.ANALYSIS_SUCCESS_DESCRIPTION}
        </p>
        
        <div className="bg-success-bg border border-success-border rounded-lg p-4">
          <p className="text-success-text font-medium">
            {RESULT_TEXT.ANALYSIS_RESULT_TITLE}
          </p>
          <p className="text-success-text-secondary text-sm mt-1">
            {RESULT_TEXT.ANALYSIS_RESULT_DESCRIPTION}
          </p>
        </div>
      </div>
    );
  };

  // 渲染按钮
  const renderButtons = () => {
    if (!capturedImage) {
      return (
        <Button onClick={handleTakeNewPhoto}>
          {RESULT_TEXT.GO_TO_CAMERA_BUTTON}
        </Button>
      );
    }

    if (!isAnalyzed) {
      return (
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={handleGoBackToCamera}>
            {RESULT_TEXT.GO_TO_CAMERA_BUTTON}
          </Button>
          <Button variant="secondary" onClick={handleTakeNewPhoto}>
            {RESULT_TEXT.TAKE_NEW_PHOTO_BUTTON}
          </Button>
        </div>
      );
    }

    return (
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={handleTakeNewPhoto}>
          {RESULT_TEXT.TAKE_NEW_PHOTO_BUTTON}
        </Button>
      </div>
    );
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <main className="container mx-auto px-6 py-6">
        <Card variant="elevated" className="min-h-[calc(100vh-8rem)] flex flex-col">
          <div className={`flex flex-col items-center space-y-6 ${!capturedImage ? 'justify-center flex-1' : ''}`}>
            <h1 className="text-3xl font-bold text-primary text-center">
              {renderTitle()}
            </h1>
            
            {renderMainContent()}
            {renderDescription()}
            {renderButtons()}
          </div>
        </Card>
      </main>
    </div>
  );
} 