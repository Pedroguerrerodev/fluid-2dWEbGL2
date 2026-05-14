import { describe, expect, it } from "vitest"

import { DEFAULT_FLUID_SETTINGS, FLUID_VIEW_OPTIONS } from "@/lib/fluid-defaults"
import { formatFluidValue, getFluidViewLabel } from "@/lib/fluid-format"

describe("fluid lab metadata", () => {
  it("exposes the default visual mode and core simulation parameters", () => {
    expect(DEFAULT_FLUID_SETTINGS.viewMode).toBe("final")
    expect(DEFAULT_FLUID_SETTINGS.vorticity).toBeGreaterThan(0)
    expect(DEFAULT_FLUID_SETTINGS.inputForce).toBeGreaterThan(0)
  })

  it("formats slider values in Spanish-friendly text", () => {
    expect(formatFluidValue("viscosity", 0.6)).toBe("0.60")
    expect(formatFluidValue("inputForce", 1.4)).toBe("140%")
  })

  it("maps debug view identifiers to Spanish labels", () => {
    expect(FLUID_VIEW_OPTIONS).toHaveLength(4)
    expect(getFluidViewLabel("pressure")).toBe("Presión")
    expect(getFluidViewLabel("dye")).toBe("Dye")
  })
})
