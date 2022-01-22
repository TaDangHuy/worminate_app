// ----------------------------------------------------------------------

export default function Button(theme) {
  return {
    MuiButton: {
      styleOverrides: {
        sizeLarge: {
          height: 48,
        },

        outlinedInherit: {
          border: `1px solid ${theme.palette.grey[500_32]}`,
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        },
        textInherit: {
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        },
      },
    },
  };
}
