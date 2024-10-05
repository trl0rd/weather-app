import React, { useState, useEffect } from "react";
import { Box, Button, Grid, IconButton, CssBaseline } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import WeatherWidget from "./components/WeatherWidget";
import {
  TemperatureUnitProvider,
  useTemperatureUnit,
} from "./context/TemperatureUnitContext";
import { ColorModeProvider, useColorMode } from "./context/ColormodeContext";
import { WidgetData } from "./types";

const Dashboard: React.FC = () => {
  const [widgets, setWidgets] = useState<WidgetData[]>(() => {
    const savedWidgets = localStorage.getItem("dashboardWidgets");
    return savedWidgets ? JSON.parse(savedWidgets) : [];
  });

  const { mode, toggleColorMode } = useColorMode();

  useEffect(() => {
    localStorage.setItem("dashboardWidgets", JSON.stringify(widgets));
  }, [widgets]);

  const addWeatherWidget = () => {
    const newWidget: WidgetData = {
      id: `weather-${Date.now()}`,
      type: "weather",
    };
    setWidgets([...widgets, newWidget]);
  };

  const removeWidget = (id: string) => {
    setWidgets(widgets.filter((widget) => widget.id !== id));
  };
  const { unit, toggleUnit } = useTemperatureUnit();

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Button
          variant="contained"
          onClick={addWeatherWidget}
          data-testid="add-widget-button"
        >
          Add Weather Widget
        </Button>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button onClick={toggleUnit} size="small">
            Switch to °{unit === "C" ? "F" : "C"}
          </Button>
          <IconButton
            onClick={toggleColorMode}
            color="inherit"
            data-testid="color-mode-toggle"
          >
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Box>
      <Grid container spacing={3}>
        {widgets.map((widget) => (
          <Grid item xs={12} sm={6} md={4} key={widget.id}>
            <WeatherWidget onRemove={() => removeWidget(widget.id)} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const App: React.FC = () => {
  return (
    <ColorModeProvider>
      <TemperatureUnitProvider>
        <CssBaseline />
        <Dashboard />
      </TemperatureUnitProvider>
    </ColorModeProvider>
  );
};

export default App;
