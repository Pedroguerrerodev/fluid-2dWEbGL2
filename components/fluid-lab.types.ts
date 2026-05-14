export type FluidViewMode = "final" | "lava" | "dye"

export type FluidSupportState = "full" | "limited"

export type FluidSettings = {
  viscosity: number
  dissipation: number
  inputForce: number
  vorticity: number
  splatRadius: number
  viewMode: FluidViewMode
}

export type FluidCapability = {
  title: string
  description: string
}
