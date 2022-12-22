import styled from '@emotion/styled'
import { ThemeOptions } from '@mui/material/styles/createTheme'

interface ICustomTheme extends ThemeOptions {
  palette: {
    text: {
      primary: string
    },
  }
}
export const BaseText = styled.div(
  (
    { theme }: { theme?: ICustomTheme }
  ) => ({
    color: theme?.palette?.text?.primary,
    transition: 'all 0.15s ease-in-out',
    whiteSpace: 'nowrap',
  }))
