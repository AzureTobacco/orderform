# 🚀 How to Publish Your Order System

This guide shows you how to deploy your Azure Tobacco Order System to the cloud.

## 🎯 Recommended: Railway (Easiest & Free Tier Available)

### Step 1: Prepare Your Code

1. **Make sure everything is committed to Git:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Push to GitHub:**
   - Create a new repository on GitHub
   - Push your code:
     ```bash
     git remote add origin https://github.com/yourusername/azure-tobacco-orders.git
     git push -u origin main
     ```

### Step 2: Deploy to Railway

1. **Sign up for Railway:**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create New Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure the Service:**
   - Railway will auto-detect Node.js
   - Set the **Root Directory** to: `backend`
   - Set the **Start Command** to: `npm start`

4. **Set Environment Variables:**
   - Click on your service → Variables tab
   - Add these variables:
     ```
     NODE_ENV=production
     PORT=3000
     JWT_SECRET=your-random-secret-key-here-change-this
     ADMIN_USERNAME=admin
     ADMIN_PASSWORD=your-secure-password-here
     DB_PATH=./database/orders.db
     ```
   - Generate a random JWT_SECRET (you can use: `openssl rand -base64 32`)

5. **Deploy:**
   - Railway will automatically deploy
   - Wait for deployment to complete
   - Your API will be available at: `https://your-app-name.railway.app`

6. **Get Your API URL:**
   - Click on your service → Settings → Domains
   - Copy your Railway domain (e.g., `https://azure-tobacco-api.railway.app`)

### Step 3: Update Frontend for Production

1. **Update API URL in frontend files:**
   - Edit `frontend/login.html`
   - Edit `frontend/order-form.html`
   - Find this line:
     ```javascript
     const API_BASE_URL = window.location.origin.includes('localhost') 
         ? 'http://localhost:3000/api' 
         : '/api';
     ```
   - Change to:
     ```javascript
     const API_BASE_URL = 'https://your-railway-domain.railway.app/api';
     ```
   - Replace `your-railway-domain` with your actual Railway domain

2. **Deploy Frontend to Netlify (Free):**
   - Go to https://netlify.com
   - Sign up with GitHub
   - Click "Add new site" → "Import an existing project"
   - Select your GitHub repository
   - Set **Base directory** to: `frontend`
   - Set **Publish directory** to: `frontend`
   - Click "Deploy site"
   - Your frontend will be available at: `https://your-site.netlify.app`

3. **Update Frontend API URL:**
   - In Netlify, go to Site settings → Environment variables
   - Add: `REACT_APP_API_URL=https://your-railway-domain.railway.app/api`
   - Or manually update the API URL in your HTML files

---

## 🌐 Alternative: Render (Free Tier Available)

### Step 1: Deploy Backend

1. **Sign up for Render:**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create New Web Service:**
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `azure-tobacco-api`
     - **Environment**: `Node`
     - **Root Directory**: `backend`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`

3. **Set Environment Variables:**
   - Scroll down to "Environment Variables"
   - Add:
     ```
     NODE_ENV=production
     PORT=3000
     JWT_SECRET=your-random-secret-key
     ADMIN_USERNAME=admin
     ADMIN_PASSWORD=your-secure-password
     ```

4. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment
   - Your API URL: `https://azure-tobacco-api.onrender.com`

### Step 2: Deploy Frontend

1. **Create Static Site:**
   - Click "New" → "Static Site"
   - Connect your GitHub repository
   - Configure:
     - **Root Directory**: `frontend`
     - **Build Command**: (leave empty)
     - **Publish Directory**: `frontend`

2. **Update API URL:**
   - Update `frontend/login.html` and `frontend/order-form.html`
   - Change API_BASE_URL to your Render backend URL

---

## 🐳 Alternative: Heroku

### Step 1: Install Heroku CLI

```bash
# macOS
brew install heroku/brew/heroku

# Or download from: https://devcenter.heroku.com/articles/heroku-cli
```

### Step 2: Deploy Backend

```bash
cd backend
heroku login
heroku create azure-tobacco-orders
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=$(openssl rand -base64 32)
heroku config:set ADMIN_USERNAME=admin
heroku config:set ADMIN_PASSWORD=your-secure-password
git push heroku main
```

### Step 3: Deploy Frontend

- Use Netlify or Vercel for frontend
- Update API URL to your Heroku backend URL

---

## 📦 Alternative: VPS (DigitalOcean, AWS, etc.)

### Step 1: Setup Server

```bash
# SSH into your server
ssh user@your-server-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2
```

### Step 2: Deploy Backend

```bash
# Clone repository
git clone https://github.com/yourusername/azure-tobacco-orders.git
cd azure-tobacco-orders/backend

# Install dependencies
npm install

# Create .env file
nano .env
# Add your environment variables

# Start with PM2
pm2 start server.js --name azure-tobacco-api
pm2 save
pm2 startup
```

### Step 3: Setup Nginx

```bash
# Install Nginx
sudo apt install nginx

# Create config
sudo nano /etc/nginx/sites-available/azure-tobacco
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Backend API
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Frontend
    location / {
        root /path/to/frontend;
        try_files $uri $uri/ /index.html;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/azure-tobacco /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 4: Setup SSL

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## 🔐 Security Checklist Before Publishing

- [ ] Change default admin password
- [ ] Set a strong JWT_SECRET (use: `openssl rand -base64 32`)
- [ ] Enable HTTPS (SSL certificate)
- [ ] Update API URLs in frontend files
- [ ] Test login and order creation
- [ ] Backup database regularly

---

## 📝 Quick Deployment Checklist

1. ✅ Code pushed to GitHub
2. ✅ Backend deployed (Railway/Render/Heroku)
3. ✅ Environment variables set
4. ✅ Frontend API URL updated
5. ✅ Frontend deployed (Netlify/Vercel)
6. ✅ Test login works
7. ✅ Test order creation works
8. ✅ SSL/HTTPS enabled

---

## 🆘 Need Help?

- **Railway Issues**: Check Railway logs in dashboard
- **Render Issues**: Check Render logs in dashboard
- **Frontend Issues**: Check browser console (F12)
- **Backend Issues**: Check server logs

---

## 🎉 After Deployment

Your system will be available at:
- **Frontend**: `https://your-frontend-domain.com`
- **Backend API**: `https://your-backend-domain.com/api`

Users can:
1. Visit your frontend URL
2. Login or register
3. Create orders
4. View monthly reconciliation






