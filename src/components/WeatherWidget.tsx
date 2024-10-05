import React from "react";
import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import { WbSunny, CloudQueue, Umbrella } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { useTemperatureUnit } from "../context/TemperatureUnitContext";
import { useWeatherData } from "../CustomHooks/hooks";
import { WeatherWidgetProps, WeatherData } from "../types";

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ onRemove }) => {
  const { weather, loading, error } = useWeatherData(40.7128, 74.006);
  const { unit } = useTemperatureUnit();

  const getWeatherIcon = (condition: WeatherData["condition"]) => {
    switch (condition) {
      case "sunny":
        return <WbSunny />;
      case "cloudy":
        return <CloudQueue />;
      case "rainy":
        return <Umbrella />;
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!weather) return null;

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" component="div">
            New York Weather
          </Typography>
          <IconButton onClick={onRemove} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        <Box display="flex" alignItems="center" mt={2}>
          {getWeatherIcon(weather.condition)}
          <Typography variant="h4" component="div" ml={1}>
            {weather.temperature}°{unit}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" mt={1}>
          {weather.condition.charAt(0).toUpperCase() +
            weather.condition.slice(1)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default React.memo(WeatherWidget);
