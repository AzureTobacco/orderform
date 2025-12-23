#!/bin/bash

# Script to update API URL in all HTML files after backend deployment

echo "🔧 Update API URL for Cloud Deployment"
echo ""
read -p "Enter your deployed backend URL (e.g., https://azure-tobacco-api.onrender.com): " API_URL

if [ -z "$API_URL" ]; then
    echo "❌ No URL provided. Exiting."
    exit 1
fi

# Remove trailing slash if present
API_URL=${API_URL%/}

# Update distributor-order-form-standalone.html
if [ -f "distributor-order-form-standalone.html" ]; then
    sed -i '' "s|window.API_BASE_URL = '.*'|window.API_BASE_URL = '${API_URL}/api'|g" distributor-order-form-standalone.html
    echo "✅ Updated distributor-order-form-standalone.html"
fi

# Update index.html
if [ -f "../index.html" ]; then
    sed -i '' "s|window.API_BASE_URL = '.*'|window.API_BASE_URL = '${API_URL}/api'|g" ../index.html
    echo "✅ Updated index.html"
fi

# Update admin-dashboard.html
if [ -f "admin-dashboard.html" ]; then
    sed -i '' "s|window.API_BASE_URL = '.*'|window.API_BASE_URL = '${API_URL}/api'|g" admin-dashboard.html
    echo "✅ Updated admin-dashboard.html"
fi

# Update root admin-dashboard.html if it exists
if [ -f "../admin-dashboard.html" ]; then
    sed -i '' "s|window.API_BASE_URL = '.*'|window.API_BASE_URL = '${API_URL}/api'|g" ../admin-dashboard.html
    echo "✅ Updated ../admin-dashboard.html"
fi

echo ""
echo "✨ All files updated!"
echo "📝 API URL set to: ${API_URL}/api"
echo ""
echo "Next steps:"
echo "1. Review the changes"
echo "2. Commit and push to GitHub:"
echo "   git add -A"
echo "   git commit -m 'Update API URL to cloud server'"
echo "   git push"
echo ""
