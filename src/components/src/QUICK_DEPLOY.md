# ⚡ Quick Deploy - 5 Minutes

## 🚀 Deploy to Railway (Easiest)

### 1. Push to GitHub

```bash
cd /Users/tarek/Downloads/modern-erp-system/src/components/src
git init
git add .
git commit -m "Initial commit"
# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/azure-tobacco-orders.git
git push -u origin main
```

### 2. Deploy Backend to Railway

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Click on the service → Settings
6. Set **Root Directory** to: `backend`
7. Go to **Variables** tab, add:
   ```
   NODE_ENV=production
   JWT_SECRET=change-this-to-random-string
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=your-secure-password
   ```
8. Railway will auto-deploy
9. Copy your Railway domain (e.g., `https://azure-tobacco-api.railway.app`)

### 3. Deploy Frontend to Netlify

1. Go to https://netlify.com
2. Sign up with GitHub
3. Click "Add new site" → "Import an existing project"
4. Select your repository
5. Settings:
   - **Base directory**: `frontend`
   - **Publish directory**: `frontend`
6. Before deploying, update API URL:
   - Edit `frontend/login.html`
   - Find: `const API_BASE_URL = ...`
   - Change to: `const API_BASE_URL = 'https://YOUR-RAILWAY-DOMAIN.railway.app/api';`
   - Do the same in `frontend/order-form.html`
7. Deploy

### 4. Done! 🎉

Your app is live:
- Frontend: `https://your-site.netlify.app`
- Backend: `https://your-api.railway.app`

---

## 🔧 Update API URL Script

Run this to update API URLs in frontend files:

```bash
# Replace YOUR_RAILWAY_DOMAIN with your actual domain
cd frontend
sed -i '' "s|http://localhost:3000/api|https://YOUR_RAILWAY_DOMAIN.railway.app/api|g" login.html
sed -i '' "s|http://localhost:3000/api|https://YOUR_RAILWAY_DOMAIN.railway.app/api|g" order-form.html
```

---

## 📋 Pre-Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Backend deployed to Railway
- [ ] Environment variables set in Railway
- [ ] Frontend API URLs updated
- [ ] Frontend deployed to Netlify
- [ ] Test login works
- [ ] Test order creation works

---

## 🆘 Troubleshooting

**Backend won't deploy?**
- Check Railway logs
- Verify Root Directory is set to `backend`
- Check environment variables are set

**Frontend can't connect?**
- Verify API URL is correct in HTML files
- Check Railway domain is correct
- Check CORS is enabled (it is by default)

**Login doesn't work?**
- Check backend is running (visit Railway domain/api/health)
- Verify credentials: admin / your-secure-password
- Check browser console for errors






