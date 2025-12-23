# 🚀 Deploy Backend to Cloud Server (Recommended!)

Hosting your backend on a cloud server is **much easier** because:
- ✅ Always running (no need to start manually)
- ✅ Accessible from anywhere
- ✅ No local setup needed
- ✅ More reliable

## 🎯 Recommended Options (Free Tier Available):

### Option 1: Render.com (Easiest - Recommended) ⭐

**Free tier includes:**
- Free hosting
- Automatic deployments from GitHub
- SSL certificate included
- Easy setup

**Steps:**
1. Go to [render.com](https://render.com) and sign up (free)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: `AzureTobacco/orderform`
4. Configure:
   - **Name:** `azure-tobacco-api`
   - **Environment:** `Node`
   - **Build Command:** `cd src/components/src/backend && npm install`
   - **Start Command:** `cd src/components/src/backend && npm start`
   - **Root Directory:** `src/components/src/backend`
5. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `PORT` = `10000` (Render uses this port)
   - `JWT_SECRET` = (generate a random string)
   - `ADMIN_USERNAME` = `admin`
   - `ADMIN_PASSWORD` = (your secure password)
   - `DB_PATH` = `./database/orders.db`
6. Click "Create Web Service"
7. Wait 2-3 minutes for deployment
8. Copy your service URL (e.g., `https://azure-tobacco-api.onrender.com`)

**Update your forms:**
- Change API URL to: `https://your-service-name.onrender.com/api`

---

### Option 2: Railway.app (Also Easy)

**Free tier includes:**
- $5 free credit monthly
- Easy GitHub integration

**Steps:**
1. Go to [railway.app](https://railway.app) and sign up
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository: `AzureTobacco/orderform`
4. Railway will auto-detect the backend (it has `railway.json`)
5. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `JWT_SECRET` = (generate a random string)
   - `ADMIN_USERNAME` = `admin`
   - `ADMIN_PASSWORD` = (your secure password)
   - `DB_PATH` = `./database/orders.db`
6. Deploy!
7. Copy your service URL

**Update your forms:**
- Change API URL to your Railway URL

---

### Option 3: Fly.io (Free Tier)

**Steps:**
1. Install Fly CLI: `curl -L https://fly.io/install.sh | sh`
2. Sign up at [fly.io](https://fly.io)
3. In backend directory: `fly launch`
4. Follow prompts
5. Deploy: `fly deploy`

---

## 📝 After Deployment - Update Your Forms

Once your backend is deployed, you need to update the API URL in:

1. **Order Form** (`distributor-order-form-standalone.html` and `index.html`)
   - Find: `window.API_BASE_URL = 'http://localhost:3000/api';`
   - Change to: `window.API_BASE_URL = 'https://your-service-url.com/api';`

2. **Admin Dashboard** (`admin-dashboard.html`)
   - Find: `window.API_BASE_URL = 'http://localhost:3000/api';`
   - Change to: `window.API_BASE_URL = 'https://your-service-url.com/api';`

3. **Push to GitHub** so the changes go live

---

## 🔐 Security Notes

- Change the default admin password!
- Use a strong JWT_SECRET (random string)
- Never commit `.env` files to GitHub

---

## ✅ Benefits of Cloud Hosting

- **No local setup needed** - works on any device
- **Always available** - no need to keep your computer on
- **Automatic updates** - deploy from GitHub
- **Better performance** - dedicated server resources
- **SSL included** - secure HTTPS connections

---

## 🆘 Need Help?

If you get stuck, the Render.com option is the easiest - it has great documentation and support!

