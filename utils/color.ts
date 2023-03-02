import chroma from 'chroma-js'

const LIGHTNESS = [0.95, 0.85, 0.75, 0.65, 0.55, 0.45, 0.35, 0.25, 0.15, 0.05] as const
const COLOR_HUES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const

export type ColorHues = typeof COLOR_HUES[number]
export type ColorScale = Record<ColorHues, string>

/**
 * Função que gera escalas de cor
 *
 * @param baseColor Cor base para geração da escala de cores
 * @returns Objeto de escala de cores
 */
export const generateColorScale = (baseColor: string): ColorScale => {
  if (!chroma.valid(baseColor)) {
    throw new Error('Invalid Color')
  }

  const chromaColor = chroma(baseColor)

  const colorLightness = LIGHTNESS.map(l => chromaColor.set('hsl.l', l).hex())
  const linearScale = chroma.scale(colorLightness).correctLightness(true).colors(10)

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions, @typescript-eslint/prefer-reduce-type-parameter
  return linearScale.reduce((acc, color, index) => ({ ...acc, [COLOR_HUES[index]]: color }), {} as ColorScale)
}
