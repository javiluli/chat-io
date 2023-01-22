import colors from '../../base/colors'
import linearGradient from '../../functions/linearGradient'

const { gradients, background } = colors

const switchButton = {
  styleOverrides: {
    root: {
      width: '68px',
      height: '48px',
    },

    switchBase: {
      padding: 15,
    },

    thumb: {
      width: '18px',
      height: '18px',
      boxShadow: 'none',
      background: background.default,
    },

    track: {
      backgroundImage: linearGradient(gradients.primary.main, gradients.primary.state),
      borderRadius: '9999px',
      opacity: 1,
    },
  },
}

export default switchButton
