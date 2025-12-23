#!/bin/bash
# Script to update API URL in frontend files

if [ -z "$1" ]; then
    echo "Usage: ./update-api-url.sh https://your-backend-domain.com"
    exit 1
fi

API_URL="$1/api"

echo "Updating API URL to: $API_URL"

# Update login.html
sed -i '' "s|http://localhost:3000/api|$API_URL|g" frontend/login.html
sed -i '' "s|'/api'|'$API_URL'|g" frontend/login.html

# Update order-form.html
sed -i '' "s|http://localhost:3000/api|$API_URL|g" frontend/order-form.html
sed -i '' "s|'/api'|'$API_URL'|g" frontend/order-form.html

echo "✅ API URLs updated!"
echo "Files updated:"
echo "  - frontend/login.html"
echo "  - frontend/order-form.html"
