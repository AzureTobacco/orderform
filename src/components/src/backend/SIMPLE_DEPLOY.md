# 🚀 Simple Deployment Guide - Step by Step

## Option 1: Railway.app (EASIEST - Recommended) ⭐

Railway is often easier than Render and auto-detects everything:

### Steps:
1. Go to **https://railway.app**
2. Sign up with GitHub (free)
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Choose your repo: **AzureTobacco/orderform**
6. Railway will auto-detect the backend!
7. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `JWT_SECRET` = (any random string)
   - `ADMIN_USERNAME` = `admin`
   - `ADMIN_PASSWORD` = (your password)
   - `DB_PATH` = `./database/orders.db`
8. Click **"Deploy"**
9. Wait 2-3 minutes
10. Copy your Railway URL (e.g., `https://your-app.railway.app`)
11. Update your forms with this URL

**That's it!** Railway handles everything automatically.

---

## Option 2: Render.com (If Railway doesn't work)

### Step-by-Step:

1. **Go to https://render.com**
2. **Sign up** (free)
3. **Click "New +"** → **"Web Service"** (NOT Static Site!)
4. **Connect GitHub** → Select repo: **AzureTobacco/orderform**

### Settings Tab:
- **Name:** `azure-tobacco-api`
- **Environment:** `Node`
- **Region:** Choose closest
- **Branch:** `main`
- **Root Directory:** `src/components/src/backend` ⚠️ **CRITICAL!**
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Make sure "Docker" is NOT checked**

### Environment Tab:
Click "Add Environment Variable" and add:

1. `NODE_ENV` = `production`
2. `JWT_SECRET` = `azure-tobacco-secret-2024`
3. `ADMIN_USERNAME` = `admin`
4. `ADMIN_PASSWORD` = (your secure password)
5. `DB_PATH` = `./database/orders.db`

**DO NOT add PORT** - Render sets this automatically!

### Deploy:
- Click **"Create Web Service"**
- Wait 2-3 minutes
- Copy your service URL

---

## Option 3: Keep It Local (Simplest for Testing)

If cloud deployment is too complicated, you can keep using it locally:

1. **Start backend locally:**
   ```bash
   cd src/components/src/backend
   npm start
   ```

2. **Use the forms:**
   - Order form: `distributor-order-form-standalone.html`
   - Admin dashboard: `admin-dashboard.html`
   - They're already configured to use `http://localhost:3000/api`

3. **Keep your computer on** when you need to use it

---

## 🔍 Troubleshooting

### "Build failed" error:
- Make sure Root Directory is: `src/components/src/backend`
- Make sure Build Command is: `npm install` (not `npm run build`)
- Make sure it's a **Web Service**, not Static Site

### "Cannot find module" error:
- Root Directory is wrong
- Should be: `src/components/src/backend`

### "Port error":
- Don't add PORT environment variable
- Platform sets this automatically

### Still not working?
**Try Railway first** - it's usually easier and auto-detects everything!

---

## ✅ After Deployment

Once your backend is deployed:

1. **Copy your service URL** (e.g., `https://your-app.railway.app` or `https://azure-tobacco-api.onrender.com`)

2. **Update your forms:**
   - Open `distributor-order-form-standalone.html`
   - Find: `window.API_BASE_URL = 'http://localhost:3000/api';`
   - Change to: `window.API_BASE_URL = 'https://your-service-url.com/api';`
   - Do the same for `admin-dashboard.html` and `index.html`

3. **Commit and push:**
   ```bash
   git add -A
   git commit -m "Update API URL to cloud server"
   git push
   ```

4. **Test:**
   - Try logging into admin dashboard
   - Submit a test order

---

## 🆘 Need More Help?

Tell me:
1. Which platform are you using? (Render/Railway)
2. What's the exact error message?
3. What step are you stuck on?

I can help you fix it!

