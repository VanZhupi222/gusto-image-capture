import { useState, useCallback, useRef, useEffect } from 'react';
import { useCameraStore, selectSetIsCountdownActive } from '@/store';
import { CAMERA_COUNTDOWN_DURATION } from '@/libs/constants';

interface UseCountdownOptions {
  initialCount?: number;
  onComplete?: () => void;
}

interface UseCountdownReturn {
  countdown: number | null;
  isActive: boolean;
  startCountdown: () => void;
}

export function useCountdown({ 
  initialCount = CAMERA_COUNTDOWN_DURATION, 
  onComplete 
}: UseCountdownOptions = {}): UseCountdownReturn {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const setIsCountdownActive = useCameraStore(selectSetIsCountdownActive);

  const startCountdown = useCallback(() => {
    if (timerRef.current) return;
    
    let count = initialCount;
    setCountdown(count);
    setIsActive(true);
    setIsCountdownActive(true);
    
    timerRef.current = setInterval(() => {
      count--;
      if (count > 0) {
        setCountdown(count);
      } else {
        setCountdown(null);
        setIsActive(false);
        setIsCountdownActive(false);
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        onComplete?.();
      }
    }, 1000);
  }, [initialCount, onComplete, setIsCountdownActive]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  return {
    countdown,
    isActive,
    startCountdown
  };
} 