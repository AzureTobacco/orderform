# 🔍 How to Check Render Deploy Logs

## Step 1: View Logs
1. Go to your Render dashboard
2. Click on your service
3. Click the **"Logs"** tab
4. Look for the **red error messages**

## Step 2: Common Errors & Fixes

### Error: "Cannot find module"
**Fix:** Root Directory is wrong
- Should be: `src/components/src/backend`
- Check in Settings → Build & Deploy

### Error: "npm install failed"
**Fix:** Check if all dependencies are correct
- All dependencies are in package.json ✅

### Error: "Dockerfile not found"
**Fix:** Docker is still enabled
- Go to Settings → Disable Docker
- Make sure Environment is "Node"

### Error: "Build command failed"
**Fix:** Build Command is wrong
- Should be: `npm install`
- NOT: `npm run build` or `npm install && npm run build`

### Error: "Start command failed"
**Fix:** Start Command is wrong
- Should be: `npm start`
- NOT: `node server.js` (though this should work too)

## Step 3: Copy the Exact Error

Please copy the **exact error message** from the Logs tab and share it with me so I can help fix it!

The error message will tell us exactly what's wrong.

