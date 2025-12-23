# 🔧 Render Deployment Fix

If you're getting errors on Render, here are the correct settings:

## ✅ Correct Render Settings

When creating/editing your service on Render:

### Basic Settings:
- **Name:** `azure-tobacco-api`
- **Environment:** `Node`
- **Region:** Choose closest to you
- **Branch:** `main`
- **Root Directory:** `src/components/src/backend` ⚠️ **IMPORTANT!**
- **Build Command:** `npm install`
- **Start Command:** `npm start`

### Environment Variables:
Add these in the Render dashboard:

1. `NODE_ENV` = `production`
2. `JWT_SECRET` = (click "Generate" or use a random string)
3. `ADMIN_USERNAME` = `admin`
4. `ADMIN_PASSWORD` = (your secure password - set this!)
5. `DB_PATH` = `./database/orders.db`

**Note:** Don't set `PORT` - Render sets this automatically!

## 🐛 Common Errors & Fixes

### Error: "Cannot find module"
- **Fix:** Make sure Root Directory is set to `src/components/src/backend`

### Error: "Build failed"
- **Fix:** Check that Root Directory is correct
- **Fix:** Make sure all dependencies are in package.json (they are)

### Error: "Port already in use"
- **Fix:** Remove the PORT environment variable - Render handles this automatically

### Error: "Database not found"
- **Fix:** Make sure `DB_PATH` is set to `./database/orders.db`
- The database will be created automatically on first run

## 📝 Step-by-Step Fix

1. Go to your Render dashboard
2. Click on your service
3. Go to "Settings"
4. Scroll to "Build & Deploy"
5. Set **Root Directory** to: `src/components/src/backend`
6. Verify **Build Command:** `npm install`
7. Verify **Start Command:** `npm start`
8. Go to "Environment" tab
9. Add/verify all environment variables (see above)
10. Remove `PORT` if you added it
11. Click "Save Changes"
12. Go to "Manual Deploy" → "Deploy latest commit"

## ✅ After Fix

Once deployed successfully:
1. Copy your service URL (e.g., `https://azure-tobacco-api.onrender.com`)
2. Update your forms with the new API URL
3. Test the admin dashboard login

The updated `render.yaml` file has been fixed and pushed to GitHub!

