'use client';

import { usePhotoStore, selectCapturedImage, selectClearCapturedImage } from '@/store';
import { useRouter } from 'next/navigation';
import NoPhotoResult from './NoPhotoResult';
import PhotoResult from './PhotoResult';

export default function Result() {
  const router = useRouter();
  const capturedImage = usePhotoStore(selectCapturedImage);
  const clearCapturedImage = usePhotoStore(selectClearCapturedImage);

  const handleTakeNewPhoto = () => {
    clearCapturedImage();
    router.push('/');
  };

  if (!capturedImage) {
    return <NoPhotoResult onTakeNewPhoto={handleTakeNewPhoto} />;
  }

  return <PhotoResult capturedImage={capturedImage} onTakeNewPhoto={handleTakeNewPhoto} />;
} 