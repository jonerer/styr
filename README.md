# styr

An Electron desktop application with React and TypeScript that displays "Hello World".

## Features

- ⚡ **Electron** - Cross-platform desktop application framework
- ⚛️ **React 19** - Modern UI with TypeScript
- 📘 **TypeScript 5.9** - Full type safety with modern features
- 🚀 **Vite 7** - Lightning-fast development server and optimized builds
- 🎨 **Beautiful UI** - Gradient background with centered text

## Prerequisites

- Node.js (v20 or higher recommended)
- npm

## Installation

```bash
npm install
```

## Usage

### Development Mode

Run the app with hot module replacement:

```bash
npm run dev
```

This will:
1. Start the Vite dev server on http://localhost:5173
2. Launch the Electron app automatically
3. Enable hot reloading for instant updates

### Build for Production

Build the application:

```bash
npm run build
```

This creates:
- `dist/` - Compiled Electron main process
- `dist-renderer/` - Optimized React bundle

### Run Production Build

After building, start the app:

```bash
npm start
```

## Project Structure

```
styr/
├── src/
│   ├── main.ts        # Electron main process
│   ├── App.tsx        # Main React component
│   └── renderer.tsx   # React renderer entry point
├── index.html         # HTML template
├── vite.config.ts     # Vite configuration
├── tsconfig.json      # TypeScript configuration
└── package.json       # Project dependencies and scripts
```

## Technology Stack

- **Electron** - Desktop application framework
- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **tsx** - TypeScript execution with type stripping

## Scripts

- `npm run dev` - Start development mode
- `npm run build` - Build for production
- `npm start` - Run the built application
- `npm run dev:vite` - Start Vite dev server only
- `npm run dev:electron` - Start Electron only (requires Vite running)