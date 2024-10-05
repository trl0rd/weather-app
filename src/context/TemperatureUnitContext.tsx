import React, { createContext, useState, useMemo, useContext } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { getTheme } from "../Theme/theme";
import {
  ColorModeContextType,
  TemperatureUnitContextType,
  ColorMode,
  TemperatureUnit,
} from "../types";

const ColorModeContext = createContext<ColorModeContextType | undefined>(
  undefined
);

export const ColorModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<ColorMode>("light");

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    [mode]
  );

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => {
  const context = useContext(ColorModeContext);
  if (context === undefined) {
    throw new Error("useColorMode must be used within a ColorModeProvider");
  }
  return context;
};

const TemperatureUnitContext = createContext<
  TemperatureUnitContextType | undefined
>(undefined);

export const TemperatureUnitProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [unit, setUnit] = useState<TemperatureUnit>("C");

  const value = useMemo(
    () => ({
      unit,
      toggleUnit: () => setUnit((prev) => (prev === "C" ? "F" : "C")),
    }),
    [unit]
  );

  return (
    <TemperatureUnitContext.Provider value={value}>
      {children}
    </TemperatureUnitContext.Provider>
  );
};

export const useTemperatureUnit = () => {
  const context = useContext(TemperatureUnitContext);
  if (context === undefined) {
    throw new Error(
      "useTemperatureUnit must be used within a TemperatureUnitProvider"
    );
  }
  return context;
};
