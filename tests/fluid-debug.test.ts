import { describe, expect, it } from "vitest"

import { getDyeDebugColor, getDyeDebugSignal } from "@/lib/fluid-debug"

describe("dye debug tone mapping", () => {
  it("keeps empty zones near black", () => {
    const { signal, color } = getDyeDebugColor(0)

    expect(signal).toBe(0)
    expect(color[0]).toBeLessThan(0.02)
    expect(color[2]).toBeLessThan(0.03)
  })

  it("lifts low dye alpha enough to read over a dark background", () => {
    const lowSignal = getDyeDebugSignal(0.12)
    const mediumSignal = getDyeDebugSignal(0.32)

    expect(lowSignal).toBeGreaterThan(0.1)
    expect(mediumSignal).toBeGreaterThan(lowSignal)
  })

  it("brightens high alpha into a premium metallic highlight", () => {
    const { color: lowColor } = getDyeDebugColor(0.12)
    const { color: highColor } = getDyeDebugColor(0.95, 0.18)

    expect(highColor[0]).toBeGreaterThan(lowColor[0])
    expect(highColor[1]).toBeGreaterThan(lowColor[1])
    expect(highColor[2]).toBeGreaterThan(0.7)
  })
})
