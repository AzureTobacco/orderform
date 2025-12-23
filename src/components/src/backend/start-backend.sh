#!/bin/bash

# Azure Tobacco Backend Startup Script

echo "🚀 Starting Azure Tobacco Order System Backend..."
echo ""

# Navigate to backend directory
cd "$(dirname "$0")"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚙️  Creating .env file..."
    cat > .env << EOF
PORT=3000
NODE_ENV=development
JWT_SECRET=azure-tobacco-secret-key-2024-production-change-me
DB_PATH=./database/orders.db
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
EOF
    echo "✅ .env file created with default settings"
    echo ""
fi

# Start the server
echo "🌐 Starting server on http://localhost:3000"
echo "📝 Admin credentials: admin / admin123"
echo "🔗 API available at: http://localhost:3000/api"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm start

