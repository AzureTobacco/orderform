#!/bin/bash

# Azure Tobacco Backend Startup Script for macOS

cd "$(dirname "$0")"

# Open Terminal and run the startup script
osascript <<EOF
tell application "Terminal"
    activate
    do script "cd '$PWD' && chmod +x start-backend.sh && ./start-backend.sh"
end tell
EOF

