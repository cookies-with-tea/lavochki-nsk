import { Box, ThemeOptions } from '@mui/material'
import styled from '@emotion/styled'
export interface ICustomTheme extends ThemeOptions {
  palette: {
    primary: {
      main: string,
      secondary: string
    },
    background: {
      default: string
    },
    subtext: string
    text: {
      primary: string
    }
  }
}
export const StyledSidebar = styled(Box)(
  (
    { theme }: { theme?: ICustomTheme }
  ) => ({
    backgroundColor: theme?.palette.background.default,
    padding: '50px 35px 60px 30px',
    boxShadow: '5px 5px 20px rgba(188, 188, 188, 0.25)',
    height: '100%',

    '.sidebar__title': {
      color: theme?.palette.text.primary,
    },

    a: {
      color: theme?.palette.subtext,
    }
  })
)
