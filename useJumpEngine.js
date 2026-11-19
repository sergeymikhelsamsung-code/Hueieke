import { useCallback, useEffect, useRef, useState } from 'react';
import { createWorld, step } from '@/components/game/jumpConfig';

export default function useJumpEngine(size, onDead) {
  const [world, setWorld] = useState(null);
  const worldRef = useRef(null);
  const dirRef = useRef(0);
  const deadRef = useRef(false);

  useEffect(() => {
    if (!size) return undefined;

    deadRef.current = false;
    const initial = createWorld(size);
    worldRef.current = initial;
    setWorld(initial);

    let raf = 0;
    let last = performance.now();

    const loop = (now) => {
      const dt = Math.min(0.032, Math.max(0.001, (now - last) / 1000));
      last = now;
      const next = step(worldRef.current, dt, dirRef.current);
      worldRef.current = next;
      setWorld(next);
      if (next.dead) return;
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [size]);

  useEffect(() => {
    if (world?.dead && !deadRef.current) {
      deadRef.current = true;
      onDead(Math.floor(world.height));
    }
  }, [world, onDead]);

  const setDir = useCallback((dir) => {
    dirRef.current = dir;
  }, []);

  return { world, setDir };
}