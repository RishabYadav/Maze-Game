#!/bin/bash

# Maze Solver & Visualizer - Setup Script
# This script helps set up the React Native project

echo "🧩 Maze Solver & Visualizer - Setup Script"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18 or higher."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js is installed: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✅ npm is installed: $(npm -v)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# iOS Setup (only on macOS)
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo ""
    echo "🍎 Setting up iOS (macOS detected)..."
    
    if command -v pod &> /dev/null; then
        echo "📦 Installing CocoaPods dependencies..."
        cd ios
        pod install
        cd ..
        echo "✅ iOS setup complete!"
    else
        echo "⚠️  CocoaPods not found. Please install with: sudo gem install cocoapods"
    fi
else
    echo ""
    echo "ℹ️  Skipping iOS setup (not on macOS)"
fi

# Android Setup Check
echo ""
echo "🤖 Android Setup Check..."
if [ -d "$ANDROID_HOME" ] || [ -d "$ANDROID_SDK_ROOT" ]; then
    echo "✅ Android SDK found"
else
    echo "⚠️  Android SDK not found. Please install Android Studio and set ANDROID_HOME"
fi

echo ""
echo "=========================================="
echo "✅ Setup complete!"
echo ""
echo "To run the app:"
echo "  iOS:     npm run ios"
echo "  Android: npm run android"
echo "  Web:     npm run web"
echo ""
echo "To start Metro bundler:"
echo "  npm start"
echo ""
echo "Happy coding! 🚀"
