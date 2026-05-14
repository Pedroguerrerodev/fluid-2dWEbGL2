"use client"

import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"

import type { FluidSettings } from "@/components/fluid-lab.types"
import { Button } from "@/components/ui/button"
import { Field, FieldContent, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { FLUID_VIEW_OPTIONS } from "@/lib/fluid-defaults"
import { formatFluidValue } from "@/lib/fluid-format"

type FluidControlsProps = {
  settings: FluidSettings
  isOpen: boolean
  onOpenChange: (next: boolean) => void
  onSettingChange: <K extends keyof FluidSettings>(key: K, value: FluidSettings[K]) => void
  onReset: () => void
}

const SLIDERS: Array<{
  key: keyof Pick<FluidSettings, "viscosity" | "dissipation" | "inputForce" | "vorticity" | "splatRadius">
  label: string
  min: number
  max: number
  step: number
}> = [
  { key: "viscosity", label: "Viscosidad", min: 0.1, max: 1.2, step: 0.01 },
  { key: "dissipation", label: "Disipación", min: 0.2, max: 2.4, step: 0.01 },
  { key: "inputForce", label: "Fuerza de entrada", min: 0.2, max: 2, step: 0.01 },
  { key: "vorticity", label: "Vorticidad", min: 0, max: 40, step: 1 },
  { key: "splatRadius", label: "Radio de perturbación", min: 0.1, max: 0.8, step: 0.01 },
]

export function FluidControls({ settings, isOpen, onOpenChange, onSettingChange, onReset }: FluidControlsProps) {
  return (
    <div className="fluid-controls">
      <Button type="button" onClick={() => onOpenChange(!isOpen)} aria-expanded={isOpen} className="fluid-controls__trigger">
        <span>{isOpen ? "Cerrar" : "Explorar"}</span>
        {isOpen ? (
          <ChevronDownIcon data-icon="inline-end" className="fluid-controls__trigger-arrow" />
        ) : (
          <ChevronUpIcon data-icon="inline-end" className="fluid-controls__trigger-arrow" />
        )}
      </Button>

      {isOpen ? (
        <div className="fluid-controls__panel">
          <div className="fluid-controls__panel-head">
            <p className="fluid-controls__eyebrow">Ajustes en tiempo real</p>
            <Button type="button" variant="ghost" size="sm" onClick={onReset} className="fluid-controls__reset">
              Restablecer
            </Button>
          </div>

          <FieldGroup className="fluid-controls__group-list">
            {SLIDERS.map((slider) => (
              <Field key={slider.key} className="fluid-control-field">
                <FieldLabel className="fluid-control-label">
                  <span>{slider.label}</span>
                  <span className="fluid-control-value">{formatFluidValue(slider.key, settings[slider.key])}</span>
                </FieldLabel>
                <FieldContent>
                  <Slider
                    min={slider.min}
                    max={slider.max}
                    step={slider.step}
                    value={[settings[slider.key]]}
                    onValueChange={([nextValue]) => onSettingChange(slider.key, nextValue)}
                    className="fluid-control-slider"
                  />
                </FieldContent>
              </Field>
            ))}

            <Field className="fluid-control-field">
              <FieldLabel className="fluid-control-label">
                <span>Modo visual</span>
              </FieldLabel>
              <FieldContent>
                <Select
                  value={settings.viewMode}
                  onValueChange={(value) => onSettingChange("viewMode", value as FluidSettings["viewMode"])}
                >
                  <SelectTrigger className="fluid-controls__select">
                    <SelectValue placeholder="Seleccionar modo" />
                  </SelectTrigger>
                  <SelectContent className="fluid-controls__select-content">
                    <SelectGroup>
                      {FLUID_VIEW_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value} className="fluid-controls__select-item">
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FieldContent>
            </Field>
          </FieldGroup>
        </div>
      ) : null}
    </div>
  )
}
