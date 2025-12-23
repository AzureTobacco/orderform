#!/bin/bash

# Azure ERP Deployment Script
# This script helps deploy the ERP to a server

set -e

echo "🚀 Azure Tobacco Industrial FZCO ERP - Deployment Script"
echo "=================================================="
echo ""

# Check if dist folder exists
if [ ! -d "dist" ]; then
    echo "📦 Building production bundle..."
    npm run build
    echo "✅ Build complete!"
else
    echo "✅ Build folder found"
fi

# Detect deployment target
echo ""
echo "Select deployment method:"
echo "1) Local preview"
echo "2) Copy to server (via SCP)"
echo "3) Docker build"
echo "4) Show build output location"
read -p "Enter choice [1-4]: " choice

case $choice in
    1)
        echo ""
        echo "🚀 Starting preview server..."
        npm run preview
        ;;
    2)
        read -p "Enter server IP/hostname: " server
        read -p "Enter username: " username
        read -p "Enter destination path [/var/www/erp]: " dest
        dest=${dest:-/var/www/erp}
        
        echo ""
        echo "📤 Copying files to $username@$server:$dest..."
        scp -r dist/* $username@$server:$dest/
        
        echo ""
        echo "✅ Files copied!"
        echo "⚠️  Don't forget to:"
        echo "   1. Configure web server (Nginx/Apache)"
        echo "   2. Set correct permissions"
        echo "   3. Restart web server"
        ;;
    3)
        echo ""
        echo "🐳 Building Docker image..."
        docker build -t azure-erp:latest .
        
        echo ""
        echo "✅ Docker image built!"
        echo "Run with: docker run -d -p 80:80 azure-erp:latest"
        ;;
    4)
        echo ""
        echo "📁 Build output location:"
        echo "   $(pwd)/dist"
        echo ""
        echo "📋 Contents:"
        ls -lh dist/ | head -10
        ;;
    *)
        echo "Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "✅ Deployment script complete!"







