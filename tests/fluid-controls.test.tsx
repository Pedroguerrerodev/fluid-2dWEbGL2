import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { FluidControls } from "@/components/fluid-controls"
import { DEFAULT_FLUID_SETTINGS } from "@/lib/fluid-defaults"

describe("FluidControls", () => {
  it("starts collapsed and opens on demand", () => {
    render(
      <FluidControls
        settings={DEFAULT_FLUID_SETTINGS}
        isOpen={false}
        onOpenChange={vi.fn()}
        onSettingChange={vi.fn()}
        onReset={vi.fn()}
      />,
    )

    expect(screen.getByRole("button", { name: "Explorar" })).toBeInTheDocument()
    expect(screen.queryByText("Viscosidad")).not.toBeInTheDocument()
  })

  it("renders sliders and reset action when expanded", () => {
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

    expect(screen.getByText("Viscosidad")).toBeInTheDocument()
    fireEvent.click(screen.getByRole("button", { name: "Restablecer" }))
    expect(onReset).toHaveBeenCalledTimes(1)
  })
})
