import { FLUID_CAPABILITIES } from "@/lib/fluid-defaults"

const FLOW_STEPS = [
  {
    title: "Entrada",
    description: "El puntero inyecta fuerza y materia en el sistema.",
  },
  {
    title: "Simulación",
    description: "El fluido evoluciona mediante velocidad, presión y vorticidad.",
  },
  {
    title: "Render",
    description: "El resultado se representa en tiempo real con shaders y tratamiento visual orgánico.",
  },
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
