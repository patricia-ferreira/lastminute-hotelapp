# HotelApp

React Native app for browsing and booking hotels. Developed as part of a technical interview challenge.

---

## Features

* Displays hotels with images, price per night, city, and star ratings
* Responsive UI using percentage-based sizing for different screen sizes
* Dark/light theme support via React Navigation theming
* TypeScript for type safety and maintainability
* Uses environment variables for configuration

---

## Getting Started

### Prerequisites

* Node.js
* Yarn package manager
* Android Studio and/or Xcode (to run on emulator or physical devices)
* CocoaPods (for iOS native dependencies)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/patricia-ferreira/lastminute-hotelapp.git
cd lastminute-hotelapp
```

2. Install dependencies:

```bash
yarn install
```

3. For iOS, install CocoaPods dependencies:

```bash
cd ios && pod install && cd ..
```

---

### Running the App

Start the Metro bundler:

```bash
yarn start
```

In another terminal, run:

* Android emulator/device:

```bash
yarn android
```

* iOS simulator/device:

```bash
yarn ios
```

---

## Environment Variables

The app uses environment variables to manage configuration. Create a `.env` file in the project root with the following structure:

```
API_BASE_URL=https://api.example.com
```

Make sure to configure your `.env` file with the correct API endpoints and credentials.

---

## Project Structure

* `src/components` — reusable UI components (e.g., SafeImage)
* `src/screens` — app screens and views
* `src/utils` — utility functions such as price formatting
* `src/types` — TypeScript type definitions

---

## Notes

* Styling uses `react-native-responsive-screen` for adaptive sizing.

---

## Troubleshooting

If you encounter any issues:

* Verify your development environment is properly set up as per [React Native docs](https://reactnative.dev/docs/environment-setup).
* Delete `node_modules` and reinstall dependencies:

```bash
rm -rf node_modules
yarn install
```

* Reset Metro bundler cache:

```bash
yarn start --reset-cache
```

* For iOS, clean the build folder in Xcode if you face build errors.

---

## Testing

This project uses **Jest** for testing React Native components and logic, with **TypeScript** support.

### Running tests

Run all tests with:

```bash
yarn test
```

### Jest configuration details

* The Jest config uses the `react-native` preset and `babel-jest` to transform JavaScript and TypeScript files.
* The `transformIgnorePatterns` option is customized to allow transforming some React Native and third-party libraries (`react-native-reanimated`, `react-native-vector-icons`, `react-native-config`, etc.) that ship untranspiled code in ES modules format.
* Native modules such as `react-native-reanimated` and `react-native-localize` are mocked in `jest.setup.js` to avoid errors in the test environment.

### Mocking environment variables

Environment variables accessed via `react-native-config` are also transformed correctly due to the `transformIgnorePatterns` configuration.

### Notes

If you add other native modules that cause issues during tests, consider mocking them in `jest.setup.js`.

