#!/bin/bash

# Azure Tobacco Industrial FZCO ERP System Startup Script
echo "🌌 Starting Azure Tobacco Industrial FZCO ERP System..."
echo "📍 Navigating to project directory..."

cd /Users/tarek/Downloads/modern-erp-system

echo "🔧 Checking for existing processes..."
# Kill any existing Vite processes to avoid port conflicts
pkill -f "vite" 2>/dev/null || true

echo "🚀 Starting development server..."
npm run dev

echo "✅ ERP System should be running at http://localhost:5173/"
echo "   If port 5173 is busy, check the terminal output for the actual port" 