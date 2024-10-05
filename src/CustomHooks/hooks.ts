import { useState, useEffect } from "react";
import {
  WeatherData,
  UseWeatherDataResult,
  UseLocalStorageResult,
} from "../types";

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): UseLocalStorageResult<T> => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return { storedValue, setValue };
};

const API_KEY = "e4f09722ec2f293492f3f3a780e740e5";

export const useWeatherData = (
  lat: number,
  lon: number
): UseWeatherDataResult => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
          throw new Error("Weather data fetch failed");
        }

        const data = await response.json();

        const weatherData: WeatherData = {
          temperature: Math.round(data.main.temp),
          condition: mapWeatherCondition(data.weather[0].main),
        };

        setWeather(weatherData);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setLoading(false);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 600000); // Update every 10 minutes

    return () => clearInterval(interval);
  }, [lat, lon]);

  return { weather, loading, error };
};

function mapWeatherCondition(apiCondition: string): WeatherData["condition"] {
  switch (apiCondition.toLowerCase()) {
    case "clear":
      return "sunny";
    case "clouds":
      return "cloudy";
    case "rain":
    case "drizzle":
    case "thunderstorm":
      return "rainy";
    default:
      return "cloudy";
  }
}
