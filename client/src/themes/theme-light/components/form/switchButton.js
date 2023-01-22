import colors from '../../base/colors'

const { background } = colors

const switchButton = {
  styleOverrides: {
    root: {
      width: '68px',
      height: '48px',
    },

    switchBase: {
      padding: 15,
      '&.Mui-checked': {
        paddingLeft: 15,
        '& + .MuiSwitch-track': {
          background: background.custom.toggle,
          opacity: 1,
        },
      },
    },

    thumb: {
      width: '18px',
      height: '18px',
      boxShadow: 'none',
      background: background.default,
    },

    track: {
      borderRadius: '9999px',
    },
  },
}

export default switchButton
