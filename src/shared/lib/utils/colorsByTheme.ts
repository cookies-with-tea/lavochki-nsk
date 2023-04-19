import { PaletteMode } from '@mui/material'
import { ThemeOptions } from '@mui/material/styles/createTheme'

import { Colors } from '@/shared/constants'

import MontserratRegular from '@/assets/fonts/Montserrat/Montserrat-Regular.ttf'

export interface ICustomTheme extends ThemeOptions {
  palette: {
    mode: PaletteMode,
    primary: {
      main: Colors.ColorsDark | Colors.ColorsLight,
      secondary: Colors.ColorsDark | Colors.ColorsLight
    },
    background: {
      default: Colors.ColorsDark | Colors.ColorsLight
      body: Colors.BaseColors
    },
    subtext: Colors.BaseColors
    text: {
      primary: Colors.ColorsDark | Colors.ColorsLight
    }
  }
}

export const getColorsByTheme = (
  mode: PaletteMode
): ICustomTheme => <ICustomTheme>({
  typography: {
    fontFamily: 'Montserrat, Arial',
    h1: {
      fontSize: '64px',
      lineHeight: '75px',
      color: '#000',
    },
    h2: {
      fontSize: '36px',
      lineHeight: '36px',
      color: '#000',
      fontWeight: 500,
    },
    h3: {
      fontSize: '28px',
      lineHeight: '34px',
      color: '#000',
    },
    h4: {
      fontSize: '24px',
      lineHeight: '30px',
      color: '#000',
      fontWeight: 600,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Montserrat';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Montserrat'), local('Montserrat-Regular'), url(${MontserratRegular}) format('truetype');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
  },
  palette: {
    mode,
    ...(mode === 'light'
      ? {
        // palette values for light mode
        primary: {
          main: Colors.ColorsLight.BACKGROUND,
          secondary: Colors.ColorsLight.BACKGROUND
        },
        text: {
          primary: Colors.ColorsLight.TEXT,
        },
        subtext: Colors.BaseColors.BLACK,
        background: {
          default: Colors.ColorsLight.BACKGROUND,
          body: Colors.BaseColors.WHITE,
        },
      }
      : {
        // palette values for dark mode
        primary: {
          main: Colors.ColorsDark.PRIMARY,
        },
        text: {
          primary: Colors.ColorsDark.TEXT,
        },
        subtext: Colors.BaseColors.WHITE,
        background: {
          default: Colors.ColorsDark.BACKGROUND,
          body: Colors.BaseColors.BLACK_BACKGROUND,
        },
      }),
  },
})