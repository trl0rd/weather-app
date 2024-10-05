// types.ts

export type TemperatureUnit = "C" | "F";

export type ColorMode = "light" | "dark";

export interface WidgetData {
  id: string;
  type: "weather";
}

export interface WeatherData {
  temperature: number;
  condition: "sunny" | "cloudy" | "rainy";
}

export interface TemperatureUnitContextType {
  unit: TemperatureUnit;
  toggleUnit: () => void;
}

export interface ColorModeContextType {
  mode: ColorMode;
  toggleColorMode: () => void;
}

export interface WeatherWidgetProps {
  onRemove: () => void;
}

export interface UseWeatherDataResult {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
}

export interface UseLocalStorageResult<T> {
  storedValue: T;
  setValue: (value: T | ((val: T) => T)) => void;
}
