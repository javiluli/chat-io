import { createTheme } from '@mui/material'

import boxShadows from './base/boxShadows'
import colors from './base/colors'
import globals from './base/globals'
import typography from './base/typography'
import cardHeader from './components/card/cardHeader'
import switchButton from './components/form/switchButton'
import linearGradient from './functions/linearGradient'

export default createTheme({
  palette: { ...colors },
  typography: { ...typography },
  boxShadows: { ...boxShadows },
  functions: {
    linearGradient,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ...globals,
      },
    },

    MuiCardHeader: { ...cardHeader },
    MuiSwitch: { ...switchButton },
  },
})
