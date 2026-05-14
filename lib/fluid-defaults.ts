import type { FluidCapability, FluidSettings, FluidViewMode } from "@/components/fluid-lab.types"

export const DEFAULT_FLUID_SETTINGS: FluidSettings = {
  viscosity: 0.6,
  dissipation: 1.2,
  inputForce: 1,
  vorticity: 22,
  splatRadius: 0.26,
  viewMode: "final",
}

export const FLUID_VIEW_OPTIONS: Array<{ value: FluidViewMode; label: string }> = [
  { value: "final", label: "Final" },
  { value: "velocity", label: "Velocidad" },
  { value: "pressure", label: "Presión" },
  { value: "dye", label: "Dye" },
]

export const FLUID_CAPABILITIES: FluidCapability[] = [
  {
    title: "Simulación de fluidos 2D",
    description: "Evolución del sistema mediante velocidad, presión y vorticidad en tiempo real.",
  },
  {
    title: "Pipeline de shaders en WebGL2",
    description: "Render final GPU con modos de depuración para inspeccionar capas internas.",
  },
  {
    title: "Control visual explicable",
    description: "Parámetros interactivos y degradación progresiva para una demo técnica presentable.",
  },
]
