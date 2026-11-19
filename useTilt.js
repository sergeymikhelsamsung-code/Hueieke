import { useCallback, useEffect, useState } from 'react';

const THRESHOLD = 4;

export default function useTilt(setDir) {
  const [tiltOn, setTiltOn] = useState(false);

  useEffect(() => {
    if (!tiltOn) return undefined;
    const onOrient = (event) => {
      const gamma = event.gamma ?? 0;
      if (gamma > THRESHOLD) setDir(1);
      else if (gamma < -THRESHOLD) setDir(-1);
      else setDir(0);
    };
    window.addEventListener('deviceorientation', onOrient);
    return () => {
      window.removeEventListener('deviceorientation', onOrient);
      setDir(0);
    };
  }, [tiltOn, setDir]);

  const toggle = useCallback(async () => {
    if (tiltOn) {
      setTiltOn(false);
      return;
    }
    const DOE = window.DeviceOrientationEvent;
    if (!DOE) return;
    if (typeof DOE.requestPermission === 'function') {
      try {
        const answer = await DOE.requestPermission();
        if (answer !== 'granted') return;
      } catch {
        return;
      }
    }
    setTiltOn(true);
  }, [tiltOn]);

  return { tiltOn, toggle };
}