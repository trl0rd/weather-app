# Weather Dashboard

This project is a React-based dashboard application that displays weather widgets for a hardcoded location (New York). Users can add and remove weather widgets, and switch between Celsius and Fahrenheit temperature units.

## Features

- Add and remove weather widgets
- Display current weather information (temperature and condition)
- Switch between Celsius and Fahrenheit
- Responsive design for desktop and mobile devices
- State persistence using localStorage

## Technologies Used

- React
- TypeScript
- Material-UI
- React Context API
- localStorage for state persistence

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/trl0rd/weather-app.git
   ```

2. Navigate to the project directory:

   ```
   cd weather-dashboard
   ```

3. Install dependencies:
   ```
   npm install
   ```

### Running the Application

1. Start the development server:

   ```
   npm start
   ```

2. Open your browser and visit `http://localhost:3000` to view the application.

## Usage

- Click the "Add Weather Widget" button to add a new weather widget to the dashboard.
- Click the close icon on a widget to remove it from the dashboard.
- Click the "Switch to °F" or "Switch to °C" button to toggle between Celsius and Fahrenheit for all widgets.

## Testing

To run the tests :

```
npm test
```

## Building for Production

To create a production build:

```
npm run build
```

This will create a `build` folder with the optimized and minified production-ready application.
