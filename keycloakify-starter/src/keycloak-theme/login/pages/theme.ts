import { extendTheme } from '@mui/joy/styles';
// eslint-disable-next-line camelcase

const theme = extendTheme({
  fontFamily: {
    display: 'Roboto', // applies to `h1`–`h4`
    body: 'Roboto', // applies to `title-*` and `body-*`
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: '#E9F3F2',
          100: '#D6EAE9',
          200: '#DEE3E6',
          300: '#C7CCD2',
          400: '#91969C',
          500: '#555E68',
          600: '#32383E',
          700: '#171A1C',
          800: '#0B0D0E',
          900: '#0B0D0E',
          solidBg: 'var(--joy-palette-primary-500)',
          solidHoverBg: 'var(--joy-palette-primary-600)',
        },
        focusVisible: 'rgba(3, 102, 214, 0.3)',
        text: {
          tertiary: 'var(--joy-palette-primary-500)',
        },
      },
    },
  },

  components: {
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.color === 'primary' && {
            backgroundColor: 'primary.solidBg',
          }),
        }),
      },
    },
    JoyListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          '&.Mui-selected': {
            backgroundColor: 'var(--joy-palette-primary-100)',
          },
          '&:not(.Mui-selected)': {
            '&:hover': {
              backgroundColor: 'var(--joy-palette-primary-50)',
            },
          },
        },
      },
    },
  },
});
export default theme;
