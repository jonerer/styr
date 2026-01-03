# styr

Desktop application for managing base directories, implemented in both Electron and Wails frameworks for comparison.

## Overview

This repository contains two implementations of the same application:
- **Electron version** (`electron/`) - Using Electron, React, and TypeScript
- **Wails version** (`wails/`) - Using Wails (Go + React), React, and TypeScript

Both versions provide identical functionality: managing a list of base directories with persistent storage.

## Features

Both implementations include:
- ⚡ Modern desktop application with React UI
- 📘 Full TypeScript support
- 🎨 Tailwind CSS v4 for styling
- 💾 Persistent storage (data saved between restarts)
- 🎨 Beautiful gradient UI
- 📁 Native directory picker dialog
- ➕ Add base directories
- ❌ Remove base directories

## Quick Start

### Electron Version

```bash
cd electron
yarn install
yarn dev
```

See [electron/README.md](electron/README.md) for detailed instructions.

### Wails Version

```bash
cd wails
cd frontend && npm install && cd ..
wails dev
```

See [wails/README.md](wails/README.md) for detailed instructions.

## Comparison

### Electron (`electron/`)

**Pros:**
- Mature ecosystem with extensive libraries
- Large community and resources
- Cross-platform consistency
- Easy web developer onboarding
- electron-store for simple data persistence

**Cons:**
- Large binary size (100+ MB)
- Higher memory usage (Node.js + Chromium)
- Slower startup time

**Tech Stack:**
- Electron
- React 19
- TypeScript 5.9
- Vite 7
- Tailwind CSS v4
- electron-store

### Wails (`wails/`)

**Pros:**
- Small binary size (10-20 MB)
- Low memory footprint
- Fast startup time
- Native Go performance
- Direct OS integration

**Cons:**
- Smaller ecosystem compared to Electron
- Platform-specific build requirements (GTK on Linux)
- Newer framework with fewer community resources

**Tech Stack:**
- Wails v2
- Go (backend)
- React
- TypeScript
- Vite
- Tailwind CSS v4
- JSON file storage

## Project Structure

```
styr/
├── electron/          # Electron implementation
│   ├── src/
│   ├── package.json
│   └── README.md
├── wails/            # Wails implementation
│   ├── app.go        # Go backend
│   ├── main.go       # Entry point
│   ├── frontend/     # React frontend
│   └── README.md
└── README.md         # This file
```

## Development

Each implementation is self-contained in its own directory. Navigate to the respective directory and follow the instructions in the local README.md file.

## Building

### Electron
```bash
cd electron
yarn build
yarn start
```

### Wails
```bash
cd wails
wails build
./build/bin/wails  # Run the built binary
```

## Storage Location

Data is persisted in different locations:

**Electron:**
- Uses `electron-store` which stores data in platform-specific locations
- Linux: `~/.config/styr/`
- macOS: `~/Library/Application Support/styr/`
- Windows: `%APPDATA%\styr\`

**Wails:**
- Uses JSON file storage
- Linux: `~/.config/styr-wails/basedirs.json`
- macOS: `~/Library/Application Support/styr-wails/basedirs.json`
- Windows: `%APPDATA%\styr-wails\basedirs.json`

## License

ISC