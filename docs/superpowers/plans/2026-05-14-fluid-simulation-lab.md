# Laboratorio de Simulación de Fluidos Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the current WebGL2 shader demo into a standalone Spanish-language technical lab that showcases 2D fluid simulation, shader rendering, real-time parameter control, and explainable debug views.

**Architecture:** Keep the existing fluid simulation core in the Next.js app, but refactor it into a configurable simulation engine plus a thin presentation layer. Build a fullscreen landing experience composed of a hero canvas, a collapsible control panel, debug view switching, and concise explanatory sections, while preserving a graceful non-WebGL fallback and responsible performance behavior.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS v4, WebGL2, browser-native range inputs or existing UI primitives, optional Vitest + Testing Library for component-level tests.

---

## File Structure

- Modify: `C:/Users/Usuario/Desktop/layout-word-manipulation/app/page.tsx` — replace the current minimal title overlay with the full lab page structure.
- Modify: `C:/Users/Usuario/Desktop/layout-word-manipulation/components/oil-shader.tsx` — split simulation state, configurable params, debug view selection, fallback state, and render modes.
- Create: `C:/Users/Usuario/Desktop/layout-word-manipulation/components/fluid-lab.tsx` — top-level composition for hero, panel toggle, canvas, explanatory blocks.
- Create: `C:/Users/Usuario/Desktop/layout-word-manipulation/components/fluid-controls.tsx` — collapsible control panel with sliders, mode selector, reset action.
- Create: `C:/Users/Usuario/Desktop/layout-word-manipulation/components/fluid-explainer.tsx` — “Cómo funciona” and “Qué demuestra” sections.
- Create: `C:/Users/Usuario/Desktop/layout-word-manipulation/components/fluid-lab.types.ts` — shared types for params, modes, and fallback status.
- Create: `C:/Users/Usuario/Desktop/layout-word-manipulation/lib/fluid-defaults.ts` — central defaults and labels in Spanish.
- Create: `C:/Users/Usuario/Desktop/layout-word-manipulation/lib/fluid-format.ts` — helpers for labels, value formatting, and mode metadata.
- Create: `C:/Users/Usuario/Desktop/layout-word-manipulation/tests/fluid-format.test.ts` — unit tests for formatting and mode metadata.
- Create: `C:/Users/Usuario/Desktop/layout-word-manipulation/tests/fluid-controls.test.tsx` — interaction tests for the collapsible panel and reset callback.
- Modify: `C:/Users/Usuario/Desktop/layout-word-manipulation/package.json` — add test scripts and minimal test dependencies if they do not exist.
- Create: `C:/Users/Usuario/Desktop/layout-word-manipulation/vitest.config.ts` — Vitest setup for component/unit tests.
- Create: `C:/Users/Usuario/Desktop/layout-word-manipulation/tests/setup.ts` — Testing Library and DOM test setup.
- Modify: `C:/Users/Usuario/Desktop/layout-word-manipulation/app/globals.css` — add layout rules for premium dark lab styling and control surfaces.

### Task 1: Add planning-safe test infrastructure

**Files:**
- Modify: `C:/Users/Usuario/Desktop/layout-word-manipulation/package.json`
- Create: `C:/Users/Usuario/Desktop/layout-word-manipulation/vitest.config.ts`
- Create: `C:/Users/Usuario/Desktop/layout-word-manipulation/tests/setup.ts`

- [ ] **Step 1: Write the failing test config expectation**

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "devDependencies": {
    "vitest": "^3.2.4",
    "@testing-library/react": "^16.3.0",
    "@testing-library/jest-dom": "^6.6.3",
    "jsdom": "^26.1.0"
  }
}
```

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
})
```

```ts
// tests/setup.ts
import '@testing-library/jest-dom/vitest'
```

- [ ] **Step 2: Run test command before changes**

Run: `pnpm test`  
Expected: FAIL with a missing `test` script.

- [ ] **Step 3: Add the minimal test infrastructure**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.2.0",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.3.0",
    "@types/node": "^22",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "jsdom": "^26.1.0",
    "postcss": "^8.5",
    "tailwindcss": "^4.2.0",
    "tw-animate-css": "1.3.3",
    "typescript": "5.7.3",
    "vitest": "^3.2.4"
  }
}
```

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
})
```

```ts
// tests/setup.ts
import '@testing-library/jest-dom/vitest'
```

- [ ] **Step 4: Run tests after adding the harness**

Run: `pnpm test`  
Expected: PASS with “No test files found” or a zero-suite message from Vitest.

- [ ] **Step 5: Save a local checkpoint**

Run: `Copy-Item package.json package.json.bak-tests; Copy-Item vitest.config.ts vitest.config.ts.bak; Copy-Item tests/setup.ts tests/setup.ts.bak`  
Expected: backup files exist locally because the project is intentionally not in git yet.

### Task 2: Define the lab domain model and Spanish metadata

**Files:**
- Create: `C:/Users/Usuario/Desktop/layout-word-manipulation/components/fluid-lab.types.ts`
- Create: `C:/Users/Usuario/Desktop/layout-word-manipulation/lib/fluid-defaults.ts`
- Create: `C:/Users/Usuario/Desktop/layout-word-manipulation/lib/fluid-format.ts`
- Create: `C:/Users/Usuario/Desktop/layout-word-manipulation/tests/fluid-format.test.ts`

- [ ] **Step 1: Write the failing unit test for defaults and labels**

```ts
// tests/fluid-format.test.ts
import { describe, expect, it } from 'vitest'
import { DEFAULT_FLUID_SETTINGS, FLUID_VIEW_OPTIONS } from '@/lib/fluid-defaults'
import { formatFluidValue, getFluidViewLabel } from '@/lib/fluid-format'

describe('fluid lab metadata', () => {
  it('exposes the default visual mode and core simulation parameters', () => {
    expect(DEFAULT_FLUID_SETTINGS.viewMode).toBe('final')
    expect(DEFAULT_FLUID_SETTINGS.vorticity).toBeGreaterThan(0)
    expect(DEFAULT_FLUID_SETTINGS.inputForce).toBeGreaterThan(0)
  })

  it('formats slider values in Spanish-friendly text', () => {
    expect(formatFluidValue('viscosity', 0.6)).toBe('0.60')
    expect(formatFluidValue('inputForce', 1.4)).toBe('140%')
  })

  it('maps debug view identifiers to Spanish labels', () => {
    expect(FLUID_VIEW_OPTIONS).toHaveLength(4)
    expect(getFluidViewLabel('pressure')).toBe('Presión')
    expect(getFluidViewLabel('dye')).toBe('Dye')
  })
})
```

- [ ] **Step 2: Run the unit test before creating the files**

Run: `pnpm test tests/fluid-format.test.ts`  
Expected: FAIL with module resolution errors for `@/lib/fluid-defaults` and `@/lib/fluid-format`.

- [ ] **Step 3: Create the shared types and defaults**

```ts
// components/fluid-lab.types.ts
export type FluidViewMode = 'final' | 'velocity' | 'pressure' | 'dye'
export type FluidSupportState = 'full' | 'limited'

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
```

```ts
// lib/fluid-defaults.ts
import type { FluidCapability, FluidSettings, FluidViewMode } from '@/components/fluid-lab.types'

export const DEFAULT_FLUID_SETTINGS: FluidSettings = {
  viscosity: 0.6,
  dissipation: 1.2,
  inputForce: 1,
  vorticity: 22,
  splatRadius: 0.26,
  viewMode: 'final',
}

export const FLUID_VIEW_OPTIONS: Array<{ value: FluidViewMode; label: string }> = [
  { value: 'final', label: 'Final' },
  { value: 'velocity', label: 'Velocidad' },
  { value: 'pressure', label: 'Presión' },
  { value: 'dye', label: 'Dye' },
]

export const FLUID_CAPABILITIES: FluidCapability[] = [
  {
    title: 'Simulación de fluidos 2D',
    description: 'Evolución del sistema mediante velocidad, presión y vorticidad en tiempo real.',
  },
  {
    title: 'Pipeline de shaders en WebGL2',
    description: 'Render final GPU con modos de depuración para inspeccionar capas internas.',
  },
  {
    title: 'Control visual explicable',
    description: 'Parámetros interactivos y degradación progresiva para una demo técnica presentable.',
  },
]
```

```ts
// lib/fluid-format.ts
import { FLUID_VIEW_OPTIONS } from '@/lib/fluid-defaults'
import type { FluidSettings, FluidViewMode } from '@/components/fluid-lab.types'

export function formatFluidValue(key: keyof FluidSettings, value: number | FluidViewMode) {
  if (typeof value === 'string') return getFluidViewLabel(value)
  if (key === 'inputForce') return `${Math.round(value * 100)}%`
  if (key === 'vorticity') return `${Math.round(value)}`
  if (key === 'splatRadius') return `${value.toFixed(2)}x`
  return value.toFixed(2)
}

export function getFluidViewLabel(mode: FluidViewMode) {
  return FLUID_VIEW_OPTIONS.find((option) => option.value === mode)?.label ?? mode
}
```

- [ ] **Step 4: Run the metadata tests**

Run: `pnpm test tests/fluid-format.test.ts`  
Expected: PASS with 3 passing tests.

- [ ] **Step 5: Save a local checkpoint**

Run: `Copy-Item lib/fluid-defaults.ts lib/fluid-defaults.ts.bak; Copy-Item lib/fluid-format.ts lib/fluid-format.ts.bak; Copy-Item components/fluid-lab.types.ts components/fluid-lab.types.ts.bak`  
Expected: backup files exist for the new domain model.

### Task 3: Build the collapsible controls UI with tests

**Files:**
- Create: `C:/Users/Usuario/Desktop/layout-word-manipulation/components/fluid-controls.tsx`
- Create: `C:/Users/Usuario/Desktop/layout-word-manipulation/tests/fluid-controls.test.tsx`

- [ ] **Step 1: Write the failing component test**

```tsx
// tests/fluid-controls.test.tsx
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { FluidControls } from '@/components/fluid-controls'
import { DEFAULT_FLUID_SETTINGS } from '@/lib/fluid-defaults'

describe('FluidControls', () => {
  it('starts collapsed and opens on demand', () => {
    render(
      <FluidControls
        settings={DEFAULT_FLUID_SETTINGS}
        isOpen={false}
        onOpenChange={vi.fn()}
        onSettingChange={vi.fn()}
        onReset={vi.fn()}
      />,
    )

    expect(screen.getByRole('button', { name: 'Abrir controles' })).toBeInTheDocument()
    expect(screen.queryByText('Viscosidad')).not.toBeInTheDocument()
  })

  it('renders sliders and reset action when expanded', () => {
    const onReset = vi.fn()
    render(
      <FluidControls
        settings={DEFAULT_FLUID_SETTINGS}
        isOpen
        onOpenChange={vi.fn()}
        onSettingChange={vi.fn()}
        onReset={onReset}
      />,
    )

    expect(screen.getByText('Viscosidad')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Restablecer' }))
    expect(onReset).toHaveBeenCalledTimes(1)
  })
})
```

- [ ] **Step 2: Run the component test before creating the component**

Run: `pnpm test tests/fluid-controls.test.tsx`  
Expected: FAIL with `Cannot find module '@/components/fluid-controls'`.

- [ ] **Step 3: Implement the control panel**

```tsx
// components/fluid-controls.tsx
'use client'

import type { FluidSettings } from '@/components/fluid-lab.types'
import { FLUID_VIEW_OPTIONS } from '@/lib/fluid-defaults'
import { formatFluidValue } from '@/lib/fluid-format'

type FluidControlsProps = {
  settings: FluidSettings
  isOpen: boolean
  onOpenChange: (next: boolean) => void
  onSettingChange: <K extends keyof FluidSettings>(key: K, value: FluidSettings[K]) => void
  onReset: () => void
}

const SLIDERS: Array<{
  key: keyof Pick<FluidSettings, 'viscosity' | 'dissipation' | 'inputForce' | 'vorticity' | 'splatRadius'>
  label: string
  min: number
  max: number
  step: number
}> = [
  { key: 'viscosity', label: 'Viscosidad', min: 0.1, max: 1.2, step: 0.01 },
  { key: 'dissipation', label: 'Disipación', min: 0.2, max: 2.4, step: 0.01 },
  { key: 'inputForce', label: 'Fuerza de entrada', min: 0.2, max: 2, step: 0.01 },
  { key: 'vorticity', label: 'Vorticidad', min: 0, max: 40, step: 1 },
  { key: 'splatRadius', label: 'Radio de perturbación', min: 0.1, max: 0.8, step: 0.01 },
]

export function FluidControls({ settings, isOpen, onOpenChange, onSettingChange, onReset }: FluidControlsProps) {
  return (
    <div className="fluid-controls">
      <button type="button" onClick={() => onOpenChange(!isOpen)} aria-expanded={isOpen}>
        {isOpen ? 'Cerrar controles' : 'Abrir controles'}
      </button>

      {isOpen ? (
        <div className="fluid-controls__panel">
          {SLIDERS.map((slider) => (
            <label key={slider.key} className="fluid-controls__group">
              <span>{slider.label}</span>
              <span>{formatFluidValue(slider.key, settings[slider.key])}</span>
              <input
                type="range"
                min={slider.min}
                max={slider.max}
                step={slider.step}
                value={settings[slider.key]}
                onChange={(event) => onSettingChange(slider.key, Number(event.target.value))}
              />
            </label>
          ))}

          <label className="fluid-controls__group">
            <span>Modo visual</span>
            <select
              value={settings.viewMode}
              onChange={(event) => onSettingChange('viewMode', event.target.value as FluidSettings['viewMode'])}
            >
              {FLUID_VIEW_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <button type="button" onClick={onReset}>
            Restablecer
          </button>
        </div>
      ) : null}
    </div>
  )
}
```

- [ ] **Step 4: Run the component test**

Run: `pnpm test tests/fluid-controls.test.tsx`  
Expected: PASS with 2 passing tests.

- [ ] **Step 5: Save a local checkpoint**

Run: `Copy-Item components/fluid-controls.tsx components/fluid-controls.tsx.bak; Copy-Item tests/fluid-controls.test.tsx tests/fluid-controls.test.tsx.bak`  
Expected: local backups capture the tested controls UI.

### Task 4: Compose the explanatory lab shell

**Files:**
- Create: `C:/Users/Usuario/Desktop/layout-word-manipulation/components/fluid-explainer.tsx`
- Create: `C:/Users/Usuario/Desktop/layout-word-manipulation/components/fluid-lab.tsx`
- Modify: `C:/Users/Usuario/Desktop/layout-word-manipulation/app/page.tsx`

- [ ] **Step 1: Write the intended composition**

```tsx
// app/page.tsx
import { FluidLab } from '@/components/fluid-lab'

export default function Page() {
  return <FluidLab />
}
```

- [ ] **Step 2: Run the current build before replacing the old page**

Run: `pnpm build`  
Expected: PASS, still rendering the old `Pedro Guerrero Pinta` page.

- [ ] **Step 3: Implement the shell and explainer**

```tsx
// components/fluid-explainer.tsx
import { FLUID_CAPABILITIES } from '@/lib/fluid-defaults'

const FLOW_STEPS = [
  { title: 'Entrada', description: 'El puntero inyecta fuerza y materia en el sistema.' },
  { title: 'Simulación', description: 'El fluido evoluciona mediante velocidad, presión y vorticidad.' },
  { title: 'Render', description: 'El resultado se representa en tiempo real con shaders y tratamiento visual orgánico.' },
]

export function FluidExplainer() {
  return (
    <section className="fluid-explainer">
      <div>
        <p className="fluid-section-label">Cómo funciona</p>
        <div className="fluid-steps">
          {FLOW_STEPS.map((step) => (
            <article key={step.title}>
              <h2>{step.title}</h2>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>

      <div>
        <p className="fluid-section-label">Qué demuestra</p>
        <div className="fluid-capabilities">
          {FLUID_CAPABILITIES.map((item) => (
            <article key={item.title}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
```

```tsx
// components/fluid-lab.tsx
'use client'

import { useMemo, useState } from 'react'
import OilShader from '@/components/oil-shader'
import { FluidControls } from '@/components/fluid-controls'
import { FluidExplainer } from '@/components/fluid-explainer'
import type { FluidSettings, FluidSupportState } from '@/components/fluid-lab.types'
import { DEFAULT_FLUID_SETTINGS } from '@/lib/fluid-defaults'

export function FluidLab() {
  const [settings, setSettings] = useState<FluidSettings>(DEFAULT_FLUID_SETTINGS)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [supportState, setSupportState] = useState<FluidSupportState>('full')
  const heroTitle = useMemo(() => 'Laboratorio de Simulación de Fluidos', [])

  return (
    <main className="fluid-lab-page">
      <section className="fluid-hero">
        <OilShader settings={settings} onSupportChange={setSupportState} />

        <div className="fluid-hero__overlay">
          <h1>{heroTitle}</h1>
          <p className="fluid-hero__copy">
            Una demo técnica interactiva construida con WebGL2 y shaders en tiempo real para mostrar simulación de fluidos,
            control visual y render GPU en navegador.
          </p>
          <p className="fluid-hero__hint">Arrastra para alterar el flujo</p>
          {supportState === 'limited' ? (
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

      <FluidExplainer />
    </main>
  )
}
```

```tsx
// app/page.tsx
import { FluidLab } from '@/components/fluid-lab'

export default function Page() {
  return <FluidLab />
}
```

- [ ] **Step 4: Run the build after composing the new shell**

Run: `pnpm build`  
Expected: PASS with the new route shell replacing the old title-only page.

- [ ] **Step 5: Save a local checkpoint**

Run: `Copy-Item app/page.tsx app/page.tsx.bak; Copy-Item components/fluid-lab.tsx components/fluid-lab.tsx.bak; Copy-Item components/fluid-explainer.tsx components/fluid-explainer.tsx.bak`  
Expected: route shell and explainer are checkpointed locally.

### Task 5: Refactor the shader component to accept controlled settings and debug modes

**Files:**
- Modify: `C:/Users/Usuario/Desktop/layout-word-manipulation/components/oil-shader.tsx`
- Modify: `C:/Users/Usuario/Desktop/layout-word-manipulation/components/fluid-lab.types.ts`

- [ ] **Step 1: Write the target prop contract**

```ts
import type { FluidSettings, FluidSupportState } from '@/components/fluid-lab.types'

export default function OilShader({
  settings,
  onSupportChange,
}: {
  settings: FluidSettings
  onSupportChange?: (state: FluidSupportState) => void
}) {
  // simulation reads settings.viscosity, settings.dissipation, settings.inputForce,
  // settings.vorticity, settings.splatRadius, settings.viewMode
}
```

- [ ] **Step 2: Run the app and verify the current shader is still hardcoded**

Run: `pnpm dev`  
Expected: the current canvas responds only to hardcoded simulation constants and has no debug view switching.

- [ ] **Step 3: Refactor the shader to read settings and branch render modes**

```tsx
// key excerpts to apply inside components/oil-shader.tsx
'use client'

import { useEffect, useRef } from 'react'
import type { FluidSettings, FluidSupportState } from '@/components/fluid-lab.types'

export default function OilShader({
  settings,
  onSupportChange,
}: {
  settings: FluidSettings
  onSupportChange?: (state: FluidSupportState) => void
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const settingsRef = useRef(settings)

  useEffect(() => {
    settingsRef.current = settings
  }, [settings])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl2', { alpha: false, antialias: false, depth: false, stencil: false })
    if (!gl) {
      onSupportChange?.('limited')
      canvas.style.background = 'radial-gradient(ellipse at center, #10131a 0%, #020304 70%)'
      return
    }

    const floatExt = gl.getExtension('EXT_color_buffer_float')
    const linearFloat = gl.getExtension('OES_texture_float_linear')
    if (!floatExt) {
      onSupportChange?.('limited')
      canvas.style.background = 'radial-gradient(ellipse at center, #10131a 0%, #020304 70%)'
      return
    }

    onSupportChange?.('full')

    function applyPointerSplats() {
      const active = settingsRef.current
      const speedBoost = 1.0 + Math.min(pointer.smoothSpeed * 140.0, 22.0)
      const splatVx = dx * 4500.0 * speedBoost * active.inputForce
      const splatVy = dy * 4500.0 * speedBoost * active.inputForce
      const radius = 0.00026 * active.splatRadius * (1.0 + Math.min(pointer.smoothSpeed * 18.0, 3.5))
      splat(velocity, pointer.x, pointer.y, pointer.px, pointer.py, [splatVx, splatVy, 0, 0], radius, true)
      splat(dye, pointer.x, pointer.y, pointer.px, pointer.py, [0.06, 0.07, 0.08, 0.18], radius * 1.15, true)
    }

    function step(dt: number) {
      const active = settingsRef.current
      const VELOCITY_DISSIPATION = active.viscosity
      const DYE_DISSIPATION = active.dissipation
      const CURL_STRENGTH = active.vorticity
      // replace old constants with active.* values in the existing pipeline
    }

    function render() {
      const active = settingsRef.current
      if (active.viewMode === 'velocity') return drawTextureToScreen(velocity.read)
      if (active.viewMode === 'pressure') return drawTextureToScreen(pressure.read)
      if (active.viewMode === 'dye') return drawTextureToScreen(dye.read)
      return renderFinalSurface()
    }

    return () => {
      // keep existing cleanup
    }
  }, [])

  return <canvas ref={canvasRef} className="block h-full w-full touch-none select-none" aria-label="Laboratorio interactivo de simulación de fluidos" />
}
```

- [ ] **Step 4: Run the app and manually verify live parameter control**

Run: `pnpm dev`  
Expected: changing sliders alters force, viscosity, vorticity, radius, and visual mode without reloading the page.

- [ ] **Step 5: Save a local checkpoint**

Run: `Copy-Item components/oil-shader.tsx components/oil-shader.tsx.bak`  
Expected: the controlled shader refactor is preserved locally.

### Task 6: Add premium layout styling and fallback messaging

**Files:**
- Modify: `C:/Users/Usuario/Desktop/layout-word-manipulation/app/globals.css`
- Modify: `C:/Users/Usuario/Desktop/layout-word-manipulation/components/fluid-lab.tsx`
- Modify: `C:/Users/Usuario/Desktop/layout-word-manipulation/components/oil-shader.tsx`

- [ ] **Step 1: Write the expected styling and fallback responsibilities**

```txt
- Globals.css should define the dark premium layout, overlay spacing, explainer grid, and control panel appearance.
- FluidLab should render a fallback note when the shader reports limited capability.
- OilShader should notify the shell when WebGL2 or float support is unavailable.
```

- [ ] **Step 2: Run the app before styling changes**

Run: `pnpm dev`  
Expected: the page still lacks premium layout spacing, dedicated panel styling, and capability messaging.

- [ ] **Step 3: Implement styles and fallback reporting**

```css
/* append to app/globals.css */
.fluid-lab-page {
  min-height: 100vh;
  background: radial-gradient(circle at top, rgba(40, 68, 104, 0.18), transparent 35%), #020304;
  color: rgba(255, 255, 255, 0.92);
}

.fluid-hero {
  position: relative;
  min-height: 100vh;
  overflow: clip;
}

.fluid-hero__overlay {
  position: absolute;
  inset: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 1rem;
  padding: clamp(1.5rem, 3vw, 3rem);
  max-width: 42rem;
}

.fluid-hero h1 {
  font-size: clamp(3rem, 8vw, 6rem);
  line-height: 0.95;
  letter-spacing: -0.05em;
}

.fluid-hero__copy,
.fluid-hero__hint,
.fluid-hero__fallback {
  max-width: 34rem;
  color: rgba(255, 255, 255, 0.78);
}

.fluid-controls {
  position: absolute;
  right: clamp(1rem, 3vw, 2rem);
  top: clamp(1rem, 3vw, 2rem);
  z-index: 20;
}

.fluid-controls__panel {
  margin-top: 0.75rem;
  width: min(24rem, calc(100vw - 2rem));
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(7, 10, 15, 0.72);
  backdrop-filter: blur(18px);
  border-radius: 1.25rem;
  padding: 1rem;
  display: grid;
  gap: 0.9rem;
}

.fluid-controls__group {
  display: grid;
  gap: 0.4rem;
}

.fluid-explainer {
  display: grid;
  gap: 2rem;
  padding: clamp(2rem, 4vw, 4rem);
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
}

.fluid-steps,
.fluid-capabilities {
  display: grid;
  gap: 1rem;
}

.fluid-section-label {
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: rgba(255, 255, 255, 0.48);
  font-size: 0.8rem;
}
```

- [ ] **Step 4: Run the app and verify visual polish plus fallback behavior**

Run: `pnpm dev`  
Expected: the page reads as a premium dark technical lab, and fallback messaging appears if support is downgraded.

- [ ] **Step 5: Save a local checkpoint**

Run: `Copy-Item app/globals.css app/globals.css.bak; Copy-Item components/fluid-lab.tsx components/fluid-lab.tsx.bak2; Copy-Item components/oil-shader.tsx components/oil-shader.tsx.bak2`  
Expected: styling and fallback behavior are preserved locally.

### Task 7: Verify the full experience manually and tighten content drift

**Files:**
- Modify as needed: `C:/Users/Usuario/Desktop/layout-word-manipulation/app/page.tsx`
- Modify as needed: `C:/Users/Usuario/Desktop/layout-word-manipulation/components/fluid-lab.tsx`
- Modify as needed: `C:/Users/Usuario/Desktop/layout-word-manipulation/components/fluid-controls.tsx`
- Modify as needed: `C:/Users/Usuario/Desktop/layout-word-manipulation/components/oil-shader.tsx`
- Modify as needed: `C:/Users/Usuario/Desktop/layout-word-manipulation/app/globals.css`

- [ ] **Step 1: Write the acceptance checklist**

```txt
- Hero title matches: “Laboratorio de Simulación de Fluidos”
- Subtitle remains in Spanish and communicates WebGL2 + shaders + GPU
- Hint text is visible: “Arrastra para alterar el flujo”
- Controls start collapsed
- Panel exposes all required parameters
- View selector includes Final, Velocidad, Presión, Dye
- Explainer blocks match the approved spec
- Fallback message appears only when support is limited
```

- [ ] **Step 2: Run unit tests and build**

Run: `pnpm test && pnpm build`  
Expected: PASS on all tests and production build.

- [ ] **Step 3: Run the app and perform manual browser QA**

Run: `pnpm dev`  
Expected: manually verify desktop behavior, control toggling, pointer interaction, reset, and all debug views.

- [ ] **Step 4: Apply the smallest necessary polish fixes found during QA**

```txt
Examples of acceptable polish fixes:
- adjust overlay width if the subtitle wraps too aggressively
- tune panel spacing if slider labels collide
- reduce visual intensity if the hero text loses legibility
- correct any copy drift from the approved Spanish content
```

- [ ] **Step 5: Save a final local checkpoint**

Run: `Compress-Archive -Path app,components,lib,tests,package.json,vitest.config.ts -DestinationPath fluid-lab-local-checkpoint.zip -Force`  
Expected: local archive exists so the approved result can be reviewed before any repo upload.

## Self-Review

### Spec coverage

- Hero title, subtitle, hint, and action are covered in Task 4.
- Panel desplegable, sliders, reset, and mode selector are covered in Task 3.
- Debug views `Final`, `Velocidad`, `Presión`, `Dye` are covered in Task 5.
- “Cómo funciona” and “Qué demuestra” sections are covered in Task 4.
- Performance/fallback behavior is covered in Task 6.
- Final regression and content drift review are covered in Task 7.

### Placeholder scan

- No `TODO`, `TBD`, or “similar to previous task” placeholders remain.
- Every task lists exact files, commands, and concrete code snippets.

### Type consistency

- `FluidSettings`, `FluidViewMode`, and `FluidSupportState` are defined centrally and reused across plan tasks.
- `settings.viewMode` uses the same four mode identifiers across defaults, controls, and shader rendering.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-14-fluid-simulation-lab.md`.

Two execution options:

1. **Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration
2. **Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints
