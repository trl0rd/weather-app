import { createTheme, ThemeOptions } from "@mui/material/styles";

const getDesignTokens = (mode: "light" | "dark"): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // Light mode palette
          primary: {
            main: "#1976d2",
          },
          secondary: {
            main: "#dc004e",
          },
          background: {
            default: "#f5f5f5",
            paper: "#ffffff",
          },
        }
      : {
          // Dark mode palette
          primary: {
            main: "#90caf9",
          },
          secondary: {
            main: "#f48fb1",
          },
          background: {
            default: "#303030",
            paper: "#424242",
          },
        }),
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 500,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: "none",
        },
      },
    },
  },
});

export const getTheme = (mode: "light" | "dark") =>
  createTheme(getDesignTokens(mode));
