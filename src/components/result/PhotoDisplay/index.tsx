import Image from 'next/image';
import { RESULT_TEXT } from '@/libs/constants';
import React from "react";

interface PhotoDisplayProps {
  imageUrl: string;
  className?: string;
  overlay?: React.ReactNode;
}

export default function PhotoDisplay({ imageUrl, className = '', overlay }: PhotoDisplayProps) {
  return (
    <div className={`w-full max-w-2xl bg-surface-tertiary rounded-lg overflow-hidden relative ${className}`}>
      <Image 
        src={imageUrl} 
        alt={RESULT_TEXT.CAPTURED_PHOTO_ALT} 
        width={800}
        height={600}
        className="w-full h-auto"
        priority
      />
      {overlay}
    </div>
  );
} 