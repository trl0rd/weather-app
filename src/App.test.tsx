import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom/extend-expect";

beforeEach(() => {
  Storage.prototype.getItem = jest.fn(() => null);
  Storage.prototype.setItem = jest.fn(() => null);
});

describe("Dashboard Component", () => {
  test("toggles temperature unit between Celsius and Fahrenheit", () => {
    render(<App />);

    const toggleUnitButton = screen.getByText(/Switch to °F/i);
    expect(toggleUnitButton).toBeInTheDocument();

    fireEvent.click(toggleUnitButton);

    expect(screen.getByText(/Switch to °C/i)).toBeInTheDocument();
  });

  test("toggles color mode between light and dark", () => {
    render(<App />);

    const toggleColorModeButton = screen.getByTestId("color-mode-toggle");

    expect(screen.getByTestId("color-mode-toggle")).toContainHTML(
      "Brightness4Icon"
    );

    fireEvent.click(toggleColorModeButton);

    expect(screen.getByTestId("color-mode-toggle")).toContainHTML(
      "Brightness7Icon"
    );
  });
});
