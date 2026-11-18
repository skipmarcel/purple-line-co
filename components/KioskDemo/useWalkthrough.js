'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { TOTAL, REDUCED_MOTION_TIME, RESTART_DEMO_EVENT } from './timeline';

/**
 * Drives the walkthrough clock with requestAnimationFrame.
 * - Pauses while the demo is off screen (pass the element to observe).
 * - Starts paused, on the ID step, for visitors who prefer reduced motion.
 * - Restarts from the beginning when Hero's "Watch a check-in" fires RESTART_DEMO_EVENT.
 */
export default function useWalkthrough(targetRef) {
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(true);
  const visible = useRef(true);
  const last = useRef(null);

  // Reduced motion: don't autoplay
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setPlaying(false);
      setTime(REDUCED_MOTION_TIME);
    }
  }, []);

  // Pause when scrolled out of view
  useEffect(() => {
    const el = targetRef.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([entry]) => { visible.current = entry.isIntersecting; });
    io.observe(el);
    return () => io.disconnect();
  }, [targetRef]);

  // The clock
  useEffect(() => {
    if (!playing) return undefined;
    let raf;
    const tick = (now) => {
      if (last.current == null) last.current = now;
      const dt = Math.min(200, now - last.current);
      last.current = now;
      if (visible.current) setTime((t) => (t + dt) % TOTAL);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      last.current = null;
    };
  }, [playing]);

  const toggle = useCallback(() => setPlaying((p) => !p), []);
  const restart = useCallback(() => {
    setTime(0);
    setPlaying(true);
  }, []);

  // "Watch a check-in" button in the hero
  useEffect(() => {
    window.addEventListener(RESTART_DEMO_EVENT, restart);
    return () => window.removeEventListener(RESTART_DEMO_EVENT, restart);
  }, [restart]);

  return { time, playing, toggle, restart };
}
