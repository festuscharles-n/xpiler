#!/bin/bash

# Create the bin directory if it doesn't exist
mkdir -p bin

echo "🔧 Building Go binaries for multiple platforms..."

# Build for Windows
echo "🚀 Building for Windows..."
GOOS=windows GOARCH=amd64 go build -o bin/xpiler-windows.exe go/xpiler.go

# Build for macOS
echo "🚀 Building for macOS..."
GOOS=darwin GOARCH=amd64 go build -o bin/xpiler-macos go/xpiler.go

# Build for Linux
echo "🚀 Building for Linux..."
GOOS=linux GOARCH=amd64 go build -o bin/xpiler-linux go/xpiler.go

echo "✅ All builds completed successfully!"
