import { extendTheme } from 'native-base'
import { generateColorScale } from '../utils/color'

export const theme = extendTheme({
  config: {
    initialColorMode: 'light',
  },
  colors: {
    primary: generateColorScale('#6c63ff'),
    secondary: generateColorScale('#90caf9'),
  },
  fontConfig: {
    Montserrat: {
      100: {
        normal: 'Montserrat_100Thin',
        italic: 'Montserrat_100Thin_Italic',
      },
      200: {
        normal: 'Montserrat_200ExtraLight',
        italic: 'Montserrat_200ExtraLight_Italic',
      },
      300: {
        normal: 'Montserrat_300Light',
        italic: 'Montserrat_300Light_Italic',
      },
      400: {
        normal: 'Montserrat_400Regular',
        italic: 'Montserrat_400Regular_Italic',
      },
      500: {
        normal: 'Montserrat_500Medium',
        italic: 'Montserrat_500Medium_Italic',
      },
      600: {
        normal: 'Montserrat_600SemiBold',
        italic: 'Montserrat_600SemiBold_Italic',
      },
      700: {
        normal: 'Montserrat_700Bold',
        italic: 'Montserrat_700Bold_Italic',
      },
      800: {
        normal: 'Montserrat_800ExtraBold',
        italic: 'Montserrat_800ExtraBold_Italic',
      },
      900: {
        normal: 'Montserrat_900Black',
        italic: 'Montserrat_900Black_Italic',
      },
    },
  },
  fonts: {
    heading: 'Montserrat',
    body: 'Montserrat',
  },
  components: {
    Button: {
      baseStyle: {
        rounded: 'full',
      },
      defaultProps: {
        variant: 'solid',
        size: 'md',
        colorScheme: 'secondary',
      },
    },
    Input: {
      baseStyle: {
        bg: 'white',
      },
      defaultProps: {
        variant: 'rounded',
      },
    },
    Heading: {
      baseStyle: {
        color: 'primary.300',
      },
    },
  },
})

type CustomTheme = typeof theme

declare module 'native-base' {
  interface ITheme extends CustomTheme {}
}
