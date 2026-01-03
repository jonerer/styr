# Styr - Wails Implementation

A Wails desktop application with React and TypeScript that manages base directories.

## Features

- 🚀 **Wails** - Fast, lightweight desktop application framework using Go and Web technologies
- ⚛️ **React** - Modern UI with TypeScript
- 📘 **TypeScript** - Full type safety
- ⚡ **Vite** - Fast development server and optimized builds
- 🎨 **Tailwind CSS v4** - Utility-first CSS framework
- 🐹 **Go Backend** - Fast, efficient backend with native system dialogs
- 💾 **Persistent Storage** - Settings saved between restarts using JSON file storage
- 🎨 **Beautiful UI** - Gradient background with modern design (matching Electron version)

## Prerequisites

- Go 1.22 or higher
- Node.js (v16 or higher)
- npm or yarn
- Platform-specific requirements:
  - **Linux**: `gtk3` and `webkit2gtk` libraries
    ```bash
    # Ubuntu/Debian
    sudo apt install libgtk-3-dev libwebkit2gtk-4.0-dev
    
    # Fedora
    sudo dnf install gtk3-devel webkit2gtk3-devel
    
    # Arch
    sudo pacman -S gtk3 webkit2gtk
    ```
  - **macOS**: No additional dependencies required
  - **Windows**: No additional dependencies required

## Installation

Install the Wails CLI if you haven't already:

```bash
go install github.com/wailsapp/wails/v2/cmd/wails@latest
```

Install frontend dependencies:

```bash
cd frontend
npm install
```

## Usage

### Development Mode

Run the app in development mode with hot reload:

```bash
wails dev
```

This will:
1. Start the Vite dev server
2. Launch the application with hot reloading
3. Enable debugging features

### Build for Production

Build the application for your current platform:

```bash
wails build
```

This creates a production-ready binary in the `build/bin` directory.

### Build for Multiple Platforms

```bash
# Build for Windows (from any platform)
wails build -platform windows/amd64

# Build for macOS (requires macOS)
wails build -platform darwin/universal

# Build for Linux
wails build -platform linux/amd64
```

## Project Structure

```
wails/
├── main.go                    # Application entry point
├── app.go                     # Backend logic (base directories management)
├── frontend/                  # React frontend
│   ├── src/
│   │   ├── App.tsx           # Main React component
│   │   ├── BaseDirsManager.tsx # Base directories UI component
│   │   ├── main.tsx          # React entry point
│   │   └── style.css         # Tailwind CSS imports
│   ├── wailsjs/              # Auto-generated TypeScript bindings
│   ├── package.json
│   ├── vite.config.ts
│   └── postcss.config.js
├── build/                     # Build output directory
├── wails.json                # Wails project configuration
└── go.mod                    # Go dependencies
```

## Technology Stack

- **Wails** - Desktop application framework
- **Go** - Backend language
- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS framework
- **PostCSS** - CSS transformation

## Data Storage

The Wails version stores base directories in a JSON file located at:
- **Linux**: `~/.config/styr-wails/basedirs.json`
- **macOS**: `~/Library/Application Support/styr-wails/basedirs.json`
- **Windows**: `%APPDATA%\styr-wails\basedirs.json`

## Comparison with Electron Version

The Wails implementation provides the same functionality as the Electron version but with:
- **Smaller binary size**: Wails apps are typically 10-20 MB vs 100+ MB for Electron
- **Lower memory usage**: Native Go backend uses less memory than Node.js
- **Faster startup**: No Node.js runtime to initialize
- **Native system dialogs**: Direct OS integration without additional dependencies
- **Different storage**: JSON file instead of electron-store (functionally equivalent)

Both implementations provide identical UI and user experience for managing base directories.

## Commands

- `wails dev` - Start development mode with hot reload
- `wails build` - Build production binary
- `wails doctor` - Check system requirements
- `wails generate module` - Regenerate TypeScript bindings after Go changes

## Development Notes

After modifying `app.go` (the backend), you need to regenerate the TypeScript bindings:

```bash
wails generate module
```

This updates the files in `frontend/wailsjs/` to match your Go backend API.
