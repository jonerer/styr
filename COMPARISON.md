# Electron vs Wails Comparison

This document provides a detailed comparison between the two implementations of the Styr application.

## Implementation Overview

Both implementations provide identical functionality:
- Manage a list of base directories
- Add directories via native file browser dialog
- Remove directories from the list
- Persist data between application restarts
- Modern, responsive UI with Tailwind CSS

## Architecture Comparison

### Electron Implementation

**Architecture:**
- Main Process: Node.js (TypeScript)
- Renderer Process: React + TypeScript + Vite
- IPC Communication: Electron's `ipcMain` and `ipcRenderer`
- Storage: electron-store (JSON-based, platform-aware)

**Process Model:**
- Multi-process architecture (main + renderer)
- Chromium rendering engine
- V8 JavaScript engine
- Node.js integration

### Wails Implementation

**Architecture:**
- Backend: Go
- Frontend: React + TypeScript + Vite
- Communication: Direct method binding via Wails runtime
- Storage: Custom JSON file (platform-aware paths)

**Process Model:**
- Single-process architecture
- Platform-native WebView (WebKit/WebView2/WebKitGTK)
- Go runtime
- No Node.js dependency

## Code Comparison

### Lines of Code

- **Electron**
  - Source code: 274 lines (TypeScript/TSX)
  - Backend: 119 lines (main.ts)
  - Frontend: 155 lines (React components)

- **Wails**
  - Source code: 308 lines total
  - Backend: 187 lines (Go)
  - Frontend: 121 lines (React components)

### Backend Comparison

**Electron (main.ts):**
```typescript
// Uses Electron APIs
import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import Store from 'electron-store';

// IPC handlers for communication
ipcMain.handle('basedirs:get', () => {
  return store.get('baseDirs', []);
});
```

**Wails (app.go):**
```go
// Uses native Go and Wails runtime
import "github.com/wailsapp/wails/v2/pkg/runtime"

// Direct method exposure
func (a *App) GetBaseDirs() []string {
  return a.baseDirs
}
```

### Frontend Comparison

Both implementations use nearly identical React components. The main difference is in how they call backend methods:

**Electron:**
```typescript
const dirs = await window.baseDirsAPI.getBaseDirs();
```

**Wails:**
```typescript
import { GetBaseDirs } from '../wailsjs/go/main/App';
const dirs = await GetBaseDirs();
```

## Performance Characteristics

### Bundle Size

- **Electron Frontend**: 216 KB (built)
- **Wails Frontend**: 188 KB (built)
- **Difference**: ~13% smaller for Wails

### Binary Size (Estimated)

- **Electron**: 100-150 MB (includes Chromium + Node.js)
- **Wails**: 10-20 MB (includes Go runtime + WebView)
- **Difference**: ~10x smaller for Wails

### Memory Usage (Estimated)

- **Electron**: 80-150 MB baseline (multiple processes)
- **Wails**: 30-60 MB baseline (single process)
- **Difference**: ~50% less memory for Wails

### Startup Time (Estimated)

- **Electron**: 1-2 seconds (initialize Chromium + Node.js)
- **Wails**: 0.3-0.8 seconds (native WebView)
- **Difference**: ~3x faster for Wails

## Platform Support

### Electron
- ✅ Windows 7+ (full support)
- ✅ macOS 10.11+ (full support)
- ✅ Linux (all distributions)
- ✅ Consistent behavior across platforms

### Wails
- ✅ Windows 10+ (WebView2)
- ✅ macOS 10.13+ (WebKit)
- ✅ Linux (WebKitGTK - requires system libraries)
- ⚠️ Platform-specific rendering differences

## Development Experience

### Electron
**Pros:**
- Familiar web development workflow
- Extensive ecosystem (npm packages)
- Rich debugging tools (Chrome DevTools)
- Hot reload works seamlessly
- Large community and resources

**Cons:**
- Larger binary sizes
- More complex build/packaging
- Multiple process debugging
- Higher memory overhead

### Wails
**Pros:**
- Simple architecture
- Type-safe Go backend
- Smaller binary sizes
- Fast compilation
- Native performance

**Cons:**
- Smaller ecosystem
- Requires Go knowledge
- Linux requires system dependencies
- Smaller community

## Build & Distribution

### Electron
```bash
# Development
yarn dev

# Build
yarn build
electron-builder
```

- Package size: 100-150 MB per platform
- Supports auto-update mechanisms
- Well-established distribution channels

### Wails
```bash
# Development
wails dev

# Build
wails build -platform windows/amd64
wails build -platform darwin/universal
wails build -platform linux/amd64
```

- Package size: 10-20 MB per platform
- Manual update mechanisms
- Simpler distribution (single binary)

## Storage Implementation

### Electron (electron-store)
- Location: Platform-specific app data directory
- Format: JSON
- Features: Atomic writes, schema validation, defaults
- Size: ~50 KB npm package

### Wails (Custom JSON)
- Location: Platform-specific config directory
- Format: JSON
- Features: Simple read/write, manual file management
- Size: ~50 lines of Go code

Both implementations achieve the same result with similar reliability.

## Use Case Recommendations

### Choose Electron When:
- You need maximum cross-platform consistency
- You have complex Node.js dependencies
- You need access to the full npm ecosystem
- You want extensive debugging tools
- Binary size is not a concern
- You're familiar with Node.js/JavaScript ecosystem

### Choose Wails When:
- Binary size matters (mobile, IoT, limited bandwidth)
- Memory usage is critical
- You prefer Go for backend logic
- You want faster startup times
- You need native performance
- You're familiar with Go ecosystem
- You don't need Node.js-specific features

## Conclusion

Both implementations are valid choices for desktop applications. The decision between Electron and Wails depends on your specific requirements:

- **Electron** excels in ecosystem maturity, cross-platform consistency, and developer familiarity
- **Wails** excels in performance, binary size, and resource efficiency

For the Styr application (a simple directory manager), both implementations work equally well, demonstrating that either framework can handle typical desktop application requirements. The choice comes down to team expertise, distribution constraints, and performance priorities.
