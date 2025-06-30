import { useEffect } from 'react';

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

export function useFrameworkReady() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.frameworkReady?.();
    }
  }, []);
}
