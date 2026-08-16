'use client';

import { useEffect } from 'react';
import { getTimeMode } from '@/lib/time-utils';

/**
 * DayNightController
 * Applies the `.day-mode` class to <html> based on SAST hour.
 * Runs client-side only. No visible output.
 */
export default function DayNightController() {
  useEffect(() => {
    const apply = () => {
      const mode = getTimeMode();
      if (mode === 'day') {
        document.documentElement.classList.add('day-mode');
      } else {
        document.documentElement.classList.remove('day-mode');
      }
    };

    apply();

    // Re-check every 5 minutes in case user keeps tab open across threshold
    const interval = setInterval(apply, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return null;
}
