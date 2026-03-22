import { useEffect, useRef, useState } from "react";

/**
 * Animates an integer from 0 to `target` while `enabled` is true.
 * Uses ease-out quad for a natural slowdown at the end.
 */
export function useCountUp(
  target: number,
  durationMs: number,
  enabled: boolean
): number {
  const [value, setValue] = useState(0);
  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;

  useEffect(() => {
    if (!enabled) return;

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      if (!enabledRef.current) return;
      const elapsed = now - start;
      const t = Math.min(elapsed / durationMs, 1);
      const eased = 1 - (1 - t) ** 2;
      const next = Math.round(eased * target);
      setValue(next);

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    };

    setValue(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [enabled, target, durationMs]);

  return value;
}
