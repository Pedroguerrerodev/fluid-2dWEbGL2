export const DYE_DEBUG_TONE = {
  alphaGamma: 0.62,
  alphaBoost: 1.35,
  minAlpha: 0.02,
  maxAlpha: 0.9,
  rgbWeight: 3.4,
  shadow: [0.01, 0.012, 0.016] as const,
  mid: [0.26, 0.29, 0.33] as const,
  highlight: [0.88, 0.91, 0.96] as const,
  tint: [0.16, 0.18, 0.22] as const,
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const t = clamp((value - edge0) / (edge1 - edge0), 0, 1)
  return t * t * (3 - 2 * t)
}

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t
}

export function getDyeDebugSignal(alpha: number) {
  const boostedAlpha = Math.pow(clamp(alpha, 0, 1.4), DYE_DEBUG_TONE.alphaGamma) * DYE_DEBUG_TONE.alphaBoost
  return smoothstep(DYE_DEBUG_TONE.minAlpha, DYE_DEBUG_TONE.maxAlpha, boostedAlpha)
}

export function getDyeDebugColor(alpha: number, rgbEnergy = 0) {
  const signal = getDyeDebugSignal(alpha)
  const glow = smoothstep(0, 1, signal * 0.82 + clamp(rgbEnergy, 0, 1) * 0.35)

  const color = DYE_DEBUG_TONE.shadow.map((shadowChannel, index) => {
    const midChannel = mix(shadowChannel, DYE_DEBUG_TONE.mid[index], signal)
    const highlightChannel = mix(midChannel, DYE_DEBUG_TONE.highlight[index], glow * signal)
    return highlightChannel + clamp(rgbEnergy, 0, 1) * DYE_DEBUG_TONE.tint[index]
  }) as [number, number, number]

  return { signal, glow, color }
}
