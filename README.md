# Servix

## Description

Servix is a mobile app that helps users discover and connect with local service providers such as plumbers, electricians, cleaners, and painters. Users can browse service categories, search for providers by name, save favorites, view their current location, and submit service requests — all from a single, easy-to-use interface. The app persists user preferences locally so search terms, favorites, and submitted requests survive app restarts.

## Architecture

The project follows a feature-based architecture under `src/`, with each domain (home, favorites, requests) organized as an isolated vertical slice containing its own screens, hooks, services, and components. Shared UI is layered in `src/shared/` using a design system approach: **foundations** (design tokens), **elements** (primitives like Button and Typography), and **patterns** (composite components like ProviderCard). Cross-module imports use path aliases (`#features/*`, `#shared/*`) instead of deep relative paths. Navigation is handled by React Navigation bottom tabs, configured in a dedicated `src/navigation/` module and kept separate from screen rendering logic. Data persistence is managed through AsyncStorage service modules within each feature.

## Technologies

- **Expo SDK 56** — managed React Native workflow
- **React Native** with **TypeScript**
- **React Navigation** — bottom tab navigator
- **AsyncStorage** — local persistence for search, favorites, and requests
- **expo-location** — device location abstraction
- **Jest** + **React Native Testing Library** — component testing
- **ESLint**, **Prettier**, **Knip** — code quality and dead-code detection
- **GitHub Actions** — CI/CD pipeline

## Getting Started (Onboarding)

1. **Clone the repository** and ensure you have **Node.js 22+** and npm installed.
2. Install dependencies with `npm ci`.
3. Familiarize yourself with the project layout:
   - `src/features/` — domain-specific code (home, favorites, requests)
   - `src/shared/` — reusable design system (foundations, elements, patterns, data)
   - `src/navigation/` — tab navigator configuration
4. Import paths use aliases: `#features/*` and `#shared/*` (configured in `tsconfig.json` and `package.json`).
5. Run the app with `npm start`, then press `i` for iOS simulator or `a` for Android emulator.

## Installation

```bash
npm ci
```

## Running the App

```bash
npm start          # Start Expo dev server
npm run ios        # Start on iOS simulator
npm run android    # Start on Android emulator
npm run web        # Start in web browser
```

## Running Tests

```bash
npm test           # Run all tests once
npm run test:watch # Run tests in watch mode
```

## Linting & Formatting

```bash
npm run lint           # Run ESLint
npm run lint:fix       # Auto-fix ESLint issues
npm run format         # Format all files with Prettier
npm run format:check   # Check formatting without writing
npm run knip:check     # Check for unused exports and dependencies
npm run check          # Run lint + format check + knip (no tests)
```

## Environment Variables

None required. The app uses local AsyncStorage for all persistence and does not connect to external APIs. No `.env` files or API keys are needed.
