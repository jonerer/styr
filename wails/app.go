package main

import (
	"context"
	"encoding/json"
	"os"
	"path/filepath"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx      context.Context
	baseDirs []string
	dataFile string
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{
		baseDirs: []string{},
	}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	
	// Get the user config directory
	configDir, err := os.UserConfigDir()
	if err != nil {
		configDir = "."
	}
	
	// Create app config directory if it doesn't exist
	appConfigDir := filepath.Join(configDir, "styr-wails")
	os.MkdirAll(appConfigDir, 0755)
	
	// Set the data file path
	a.dataFile = filepath.Join(appConfigDir, "basedirs.json")
	
	// Load existing base directories
	a.loadBaseDirs()
}

// loadBaseDirs loads base directories from the JSON file
func (a *App) loadBaseDirs() {
	data, err := os.ReadFile(a.dataFile)
	if err != nil {
		// File doesn't exist yet, start with empty list
		a.baseDirs = []string{}
		return
	}
	
	err = json.Unmarshal(data, &a.baseDirs)
	if err != nil {
		a.baseDirs = []string{}
	}
}

// saveBaseDirs saves base directories to the JSON file
func (a *App) saveBaseDirs() error {
	data, err := json.Marshal(a.baseDirs)
	if err != nil {
		return err
	}
	
	return os.WriteFile(a.dataFile, data, 0644)
}

// GetBaseDirs returns all base directories
func (a *App) GetBaseDirs() []string {
	return a.baseDirs
}

// AddBaseDirResult represents the result of adding a base directory
type AddBaseDirResult struct {
	Success        bool   `json:"success"`
	AlreadyExists  bool   `json:"alreadyExists"`
}

// AddBaseDir adds a new base directory
func (a *App) AddBaseDir(dir string) AddBaseDirResult {
	// Check if directory already exists
	for _, d := range a.baseDirs {
		if d == dir {
			return AddBaseDirResult{
				Success:       true,
				AlreadyExists: true,
			}
		}
	}
	
	// Add the directory
	a.baseDirs = append(a.baseDirs, dir)
	
	// Save to file
	err := a.saveBaseDirs()
	if err != nil {
		return AddBaseDirResult{
			Success:       false,
			AlreadyExists: false,
		}
	}
	
	return AddBaseDirResult{
		Success:       true,
		AlreadyExists: false,
	}
}

// RemoveBaseDirResult represents the result of removing a base directory
type RemoveBaseDirResult struct {
	Success bool `json:"success"`
}

// RemoveBaseDir removes a base directory
func (a *App) RemoveBaseDir(dir string) RemoveBaseDirResult {
	// Filter out the directory
	newBaseDirs := []string{}
	for _, d := range a.baseDirs {
		if d != dir {
			newBaseDirs = append(newBaseDirs, d)
		}
	}
	
	a.baseDirs = newBaseDirs
	
	// Save to file
	err := a.saveBaseDirs()
	if err != nil {
		return RemoveBaseDirResult{Success: false}
	}
	
	return RemoveBaseDirResult{Success: true}
}

// BrowseDirectory opens a directory selection dialog
func (a *App) BrowseDirectory() string {
	dir, err := runtime.OpenDirectoryDialog(a.ctx, runtime.OpenDialogOptions{
		Title: "Select Directory",
	})
	
	if err != nil {
		return ""
	}
	
	return dir
}
