# Laboratorio de Simulación de Fluidos — Design Spec

Fecha: 2026-05-14
Proyecto: `C:/Users/Usuario/Desktop/layout-word-manipulation`

## Objetivo

Convertir la demo actual en una pieza independiente, visualmente espectacular y técnicamente explicable, orientada a mostrar capacidades reales en simulación de fluidos 2D, WebGL2 y shaders en tiempo real.

La pieza no debe sentirse como un fondo decorativo ni como una demo genérica sacada de un generador. Debe leerse como un laboratorio técnico premium: impacta visualmente primero y, después, demuestra control, criterio y conocimiento.

## Público

Clientes potenciales en general:

- agencias y estudios
- startups y producto digital
- marcas o equipos que necesiten experiencias visuales interactivas

El lenguaje debe ser claro para gente no especializada, pero sin perder rigor técnico.

## Posicionamiento

La pieza se presenta como una demo técnica independiente, no como sección de portfolio.

Su propuesta es:

> Mostrar una simulación de fluidos interactiva, espectacular y navegable, explicando de forma breve qué parte corre en GPU, qué parámetros se controlan y qué capacidades técnicas demuestra.

## Dirección visual

### Intención

“Laboratorio técnico explicable por dentro, espectacular por fuera”.

### Estética

- líquida
- orgánica
- oscura
- impactante
- técnica, pero no fría

### Reglas visuales

- fondo negro profundo o grafito
- protagonismo total del canvas en el primer viewport
- fluido orgánico con reflejos y tratamiento visual llamativo
- evitar look “demo arcoíris genérica”
- evitar estética gamer
- evitar UI invasiva
- interfaz mínima, premium y técnica

## Arquitectura de la página

La pieza será una single-page independiente con 3 capas claras.

### 1. Viewport principal

Elementos visibles:

- canvas fullscreen como protagonista
- título principal
- subtítulo técnico-comercial
- hint de interacción
- acción para abrir controles

Principio:

- primero impacta
- después explica

### 2. Capa de control

Panel desplegable, colapsado por defecto.

Debe permitir modificar parámetros reales de la simulación y el render sin ensuciar la pantalla inicial.

### 3. Capa explicativa

Bloques cortos por debajo o integrados de forma secundaria:

- cómo funciona
- qué demuestra

El texto debe ser breve, útil y orientado a valor profesional.

## Contenido visible

### Hero

#### Título

`Laboratorio de Simulación de Fluidos`

#### Subtítulo

`Una demo técnica interactiva construida con WebGL2 y shaders en tiempo real para mostrar simulación de fluidos, control visual y render GPU en navegador.`

#### Hint

`Arrastra para alterar el flujo`

#### Acción principal

`Abrir controles`

## Funcionalidad visible

### Controles del panel

El panel desplegable debe incluir un set corto, pero serio:

- viscosidad
- disipación
- fuerza de entrada
- vorticidad
- radio de perturbación
- modo visual

Se prioriza claridad sobre exceso de parámetros. La interfaz debe demostrar control real sin parecer una consola de depuración interna.

### Modos visuales

- Final
- Velocidad
- Presión
- Dye

Estos modos son obligatorios porque convierten la pieza en un laboratorio explicable y hacen visible el pipeline interno.

### Microinteracciones

- hint inicial de arrastre
- panel colapsado por defecto
- transición suave al abrir/cerrar
- respuesta inmediata al cambiar sliders
- botón de reset para volver al estado base

## Explicación técnica visible

### Bloque “Cómo funciona”

Contenido:

- **Entrada**: el puntero inyecta fuerza y materia en el sistema
- **Simulación**: el fluido evoluciona mediante velocidad, presión y vorticidad
- **Render**: el resultado se representa en tiempo real con shaders y tratamiento visual orgánico

### Bloque “Qué demuestra”

Contenido:

- simulación de fluidos 2D en navegador
- pipeline de shaders en WebGL2
- render en tiempo real con GPU
- parámetros interactivos y vistas de depuración
- criterio de performance y degradación progresiva

## Capacidades que debe comunicar

La pieza debe dejar claro que demuestra:

- dominio de simulación de fluidos 2D
- comprensión del pipeline gráfico
- uso de WebGL2 y shaders para render en tiempo real
- capacidad de diseñar interacción técnica explicable
- criterio de producto para hacer una demo compleja entendible por clientes

## Decisiones de producto

- pieza independiente
- idioma en castellano
- foco principal en simulación de fluidos
- soporte técnico explícito de WebGL2 y shaders
- estética líquida y orgánica
- presentación visual espectacular
- panel de control desplegable
- modos de depuración visibles para explicar el sistema

## Restricciones

- no debe sentirse como fondo decorativo de portfolio
- no debe parecer una demo artística sin contexto
- no debe sobrecargarse con texto técnico largo
- no debe depender de UI permanente sobre el canvas
- no debe convertirse en una herramienta de ingeniería densa

## Enfoque recomendado

Se adopta el enfoque **laboratorio técnico balanceado**:

- fuerte impacto visual
- controles reales
- explicabilidad breve
- suficiente profundidad técnica para generar confianza

No se busca un sandbox excesivamente complejo ni una pieza comercial vacía.

## Testing y verificación esperados

La implementación deberá comprobar:

- interacción por puntero fluida
- apertura/cierre correcta del panel
- actualización inmediata de parámetros
- cambio entre vistas `Final`, `Velocidad`, `Presión` y `Dye`
- legibilidad del hero y del panel
- compatibilidad razonable en desktop
- fallback visual cuando WebGL2 o extensiones no estén disponibles
- comportamiento responsable en rendimiento

## Siguiente paso

Crear el plan de implementación de esta demo, descomponiendo:

1. rebranding visual de la demo actual
2. refactor del shader/demo para exponer parámetros controlables
3. sistema de modos visuales/debug
4. UI del panel desplegable
5. bloques explicativos y copy
6. estrategia de performance y fallback
