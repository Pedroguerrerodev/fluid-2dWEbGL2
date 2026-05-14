"use client"

import { useState } from "react"

import { FluidControls } from "@/components/fluid-controls"
import type { FluidSettings, FluidSupportState } from "@/components/fluid-lab.types"
import OilShader from "@/components/oil-shader"
import { DEFAULT_FLUID_SETTINGS } from "@/lib/fluid-defaults"

export function FluidLab() {
  const [settings, setSettings] = useState<FluidSettings>(DEFAULT_FLUID_SETTINGS)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [supportState, setSupportState] = useState<FluidSupportState>("full")

  return (
    <main className="fluid-lab-page">
      <section className="fluid-hero">
        <OilShader settings={settings} onSupportChange={setSupportState} />

        <div className="fluid-hero__overlay">
          <h1>
            <span className="fluid-hero__brand">pedroguerrerodev</span>
            <span className="fluid-hero__brand fluid-hero__brand--suffix">.es</span>
          </h1>
          <p className="fluid-hero__copy">Donde el código se disuelve y la materia recuerda el movimiento.</p>
          <p className="fluid-hero__techline">WebGL2 · simulación de fluidos · shaders en tiempo real</p>
          <p className="fluid-hero__hint">Desliza o usa el cursor para interactuar</p>
          {supportState === "limited" ? (
            <p className="fluid-hero__fallback">
              Este navegador no soporta toda la ruta WebGL2 requerida. Se muestra una versión visual reducida.
            </p>
          ) : null}
        </div>

        <FluidControls
          settings={settings}
          isOpen={isPanelOpen}
          onOpenChange={setIsPanelOpen}
          onSettingChange={(key, value) => setSettings((current) => ({ ...current, [key]: value }))}
          onReset={() => setSettings(DEFAULT_FLUID_SETTINGS)}
        />
      </section>
    </main>
  )
}
