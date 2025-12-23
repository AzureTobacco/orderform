# 🚨 Manual Render Setup (If Auto-Detect Fails)

If Render is still having issues, set it up **manually** in the dashboard (don't use render.yaml):

## Step-by-Step Manual Setup:

### 1. Create New Web Service
- Go to Render dashboard
- Click "New +" → "Web Service"
- Connect GitHub repo: `AzureTobacco/orderform`

### 2. Basic Settings Tab:
- **Name:** `azure-tobacco-api`
- **Environment:** `Node`
- **Region:** Choose closest
- **Branch:** `main`
- **Root Directory:** `src/components/src/backend` ⚠️ **CRITICAL!**
- **Runtime:** `Node`
- **Build Command:** `npm install` (ONLY this, nothing else!)
- **Start Command:** `npm start`

### 3. Advanced Settings:
- **Docker:** Leave UNCHECKED (don't use Docker)
- **Auto-Deploy:** Checked (optional)

### 4. Environment Tab:
Add these variables:

```
NODE_ENV = production
JWT_SECRET = [Generate random string or use: azure-tobacco-secret-2024]
ADMIN_USERNAME = admin
ADMIN_PASSWORD = [Your secure password]
DB_PATH = ./database/orders.db
```

**DO NOT ADD:**
- ❌ PORT (Render sets this automatically)
- ❌ Any Docker-related variables

### 5. Deploy
- Click "Create Web Service"
- Wait for deployment (2-3 minutes)

## 🔍 If Still Failing:

### Check Build Logs:
1. Go to your service in Render
2. Click "Logs" tab
3. Look for the exact error message
4. Common issues:
   - "Cannot find module" → Root Directory wrong
   - "Build failed" → Check Root Directory
   - "Port error" → Remove PORT env var

### Alternative: Remove Dockerfile Temporarily
If Render keeps trying to use Docker:
1. Rename `Dockerfile` to `Dockerfile.backup`
2. Commit and push
3. Try deploying again

### Last Resort: Use Railway Instead
Railway is often easier:
1. Go to railway.app
2. New Project → Deploy from GitHub
3. Select repo
4. It auto-detects everything!

## ✅ What Should Work:

After setup, you should see in logs:
```
Server is running on http://localhost:XXXX
API endpoints available at http://localhost:XXXX/api
```

Then your service URL will be: `https://azure-tobacco-api.onrender.com`

