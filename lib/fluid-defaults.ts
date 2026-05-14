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
  { value: "final", label: "Fluido" },
  { value: "lava", label: "Lava" },
  { value: "dye", label: "Humo" },
]

export const FLUID_CAPABILITIES: FluidCapability[] = [
  {
    title: "Simulación de fluidos 2D",
    description: "Evolución del sistema mediante velocidad, presión y vorticidad en tiempo real.",
  },
  {
    title: "Pipeline de shaders en WebGL2",
    description: "Render final GPU con modos visuales alternativos para inspeccionar distintas lecturas del fluido.",
  },
  {
    title: "Control visual explicable",
    description: "Parámetros interactivos y degradación progresiva para una demo técnica presentable.",
  },
]
