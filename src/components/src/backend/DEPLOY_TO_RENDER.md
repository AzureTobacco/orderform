# 🚀 Quick Deploy to Render.com (Step-by-Step)

## Step 1: Sign Up
1. Go to https://render.com
2. Click "Get Started for Free"
3. Sign up with GitHub (easiest way)

## Step 2: Create New Web Service
1. Click "New +" button (top right)
2. Select "Web Service"
3. Connect your GitHub account if not already connected
4. Select repository: **AzureTobacco/orderform**

## Step 3: Configure Service
Fill in these settings:

**Basic Settings:**
- **Name:** `azure-tobacco-api`
- **Region:** Choose closest to you
- **Branch:** `main`
- **Root Directory:** `src/components/src/backend`
- **Environment:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

**Environment Variables:**
Click "Add Environment Variable" and add:

1. `NODE_ENV` = `production`
2. `PORT` = `10000` (Render uses this port automatically, but set it to be safe)
3. `JWT_SECRET` = (click "Generate" or use a random string like `my-super-secret-jwt-key-2024`)
4. `ADMIN_USERNAME` = `admin`
5. `ADMIN_PASSWORD` = (choose a strong password!)
6. `DB_PATH` = `./database/orders.db`

## Step 4: Deploy
1. Click "Create Web Service"
2. Wait 2-3 minutes for deployment
3. You'll see "Live" when it's ready
4. Copy your service URL (looks like: `https://azure-tobacco-api.onrender.com`)

## Step 5: Update Your Forms
Once deployed, you need to update the API URL:

**Option A: Use the script (easiest):**
```bash
cd src/components/src
./update-api-url.sh
# Enter your Render URL when prompted
```

**Option B: Manual update:**
1. Open `distributor-order-form-standalone.html`
2. Find: `window.API_BASE_URL = 'http://localhost:3000/api';`
3. Change to: `window.API_BASE_URL = 'https://your-service-name.onrender.com/api';`
4. Do the same for `admin-dashboard.html` and `index.html`
5. Commit and push to GitHub

## Step 6: Test
1. Open your admin dashboard
2. Try logging in - it should work!
3. Submit a test order through the form

## ✅ Done!
Your backend is now running 24/7 in the cloud!

---

## 🔄 Auto-Deploy
Render automatically deploys when you push to GitHub. Just:
1. Make changes
2. `git push`
3. Render deploys automatically!

## 💰 Cost
- **Free tier:** 750 hours/month (enough for always-on)
- **Paid tier:** $7/month for more resources (optional)

## 🆘 Troubleshooting
- **Build fails?** Check the logs in Render dashboard
- **Can't connect?** Make sure CORS is enabled (it is by default)
- **Database issues?** The database file is created automatically

