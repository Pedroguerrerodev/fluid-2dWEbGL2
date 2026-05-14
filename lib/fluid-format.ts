import type { FluidSettings, FluidViewMode } from "@/components/fluid-lab.types"
import { FLUID_VIEW_OPTIONS } from "@/lib/fluid-defaults"

export function formatFluidValue(key: keyof FluidSettings, value: number | FluidViewMode) {
  if (typeof value === "string") return getFluidViewLabel(value)
  if (key === "inputForce") return `${Math.round(value * 100)}%`
  if (key === "vorticity") return `${Math.round(value)}`
  if (key === "splatRadius") return `${value.toFixed(2)}x`
  return value.toFixed(2)
}

export function getFluidViewLabel(mode: FluidViewMode) {
  return FLUID_VIEW_OPTIONS.find((option) => option.value === mode)?.label ?? mode
}
