#!/bin/bash

# Azure Tobacco Industrial FZCO ERP System Launcher
echo "🌌 Azure Tobacco Industrial FZCO ERP System"
echo "============================================="
echo ""

# Navigate to the project directory
cd "$(dirname "$0")"

echo "📍 Current directory: $(pwd)"
echo "🔧 Cleaning up any existing processes..."

# Kill any existing node/vite processes to avoid port conflicts
pkill -f "vite" 2>/dev/null || true
pkill -f "node.*5173" 2>/dev/null || true

echo "🚀 Starting ERP System..."
echo ""

# Start the development server
npm run dev

echo ""
echo "✅ ERP System launched!"
echo "🌐 Your system should be accessible at one of these URLs:"
echo "   • http://localhost:5173/"
echo "   • http://localhost:5174/"
echo "   • http://localhost:5175/"
echo ""
echo "Press Ctrl+C to stop the server"

# Keep the terminal open
read -p "Press Enter to close this window..." 