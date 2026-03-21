export function colorMixWithAlpha(cssVar: string, alpha: number) {
  const pct = Math.max(0, Math.min(100, Math.round(alpha * 100)))
  // Uses CSS Color Module Level 5 to keep it compatible with CSS variables.
  return `color-mix(in srgb, ${cssVar} ${pct}%, transparent)`
}

