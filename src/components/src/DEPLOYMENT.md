# Deployment Guide - Azure Tobacco Order System

This guide will help you deploy the full-stack order management system with authentication and database.

## Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env and set your JWT_SECRET and admin credentials
npm start
```

The backend will:
- Create the SQLite database automatically
- Create a default admin user (username: admin, password: admin123)
- Start the API server on port 3000

### 2. Frontend Setup

The frontend files are in the `frontend/` directory:
- `login.html` - Login/Registration page
- `order-form.html` - Order form (requires authentication)

Open `login.html` in your browser to start.

## Deployment Options

### Option 1: Deploy to Railway (Recommended - Free Tier Available)

1. **Create Railway Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Deploy Backend**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Railway will auto-detect Node.js
   - Set environment variables in Railway dashboard:
     ```
     JWT_SECRET=your-random-secret-key-here
     ADMIN_USERNAME=admin
     ADMIN_PASSWORD=your-secure-password
     NODE_ENV=production
     PORT=3000
     ```

3. **Deploy Frontend**
   - Railway can serve static files
   - Or use a separate service like Vercel/Netlify for frontend

### Option 2: Deploy to Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   heroku login
   ```

2. **Create Heroku App**
   ```bash
   cd backend
   heroku create azure-tobacco-orders
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set JWT_SECRET=your-random-secret-key
   heroku config:set ADMIN_USERNAME=admin
   heroku config:set ADMIN_PASSWORD=your-secure-password
   heroku config:set NODE_ENV=production
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

5. **Deploy Frontend**
   - Use Heroku's static site buildpack
   - Or deploy to Netlify/Vercel

### Option 3: Deploy to DigitalOcean App Platform

1. **Create App**
   - Go to DigitalOcean App Platform
   - Connect your GitHub repository
   - Select Node.js
   - Set environment variables
   - Deploy

### Option 4: Deploy to Render

1. **Create Web Service**
   - Go to https://render.com
   - New Web Service
   - Connect GitHub repo
   - Set build command: `cd backend && npm install`
   - Set start command: `cd backend && npm start`
   - Set environment variables
   - Deploy

### Option 5: VPS Deployment (Ubuntu/Debian)

1. **SSH into your server**
   ```bash
   ssh user@your-server-ip
   ```

2. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Clone repository**
   ```bash
   git clone your-repo-url
   cd your-repo
   ```

4. **Setup backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   nano .env  # Edit environment variables
   ```

5. **Install PM2 (Process Manager)**
   ```bash
   sudo npm install -g pm2
   pm2 start server.js --name azure-tobacco-api
   pm2 save
   pm2 startup
   ```

6. **Setup Nginx (Reverse Proxy)**
   ```bash
   sudo apt install nginx
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

       # Frontend static files
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

7. **Setup SSL (Let's Encrypt)**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

## Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=3000
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
DB_PATH=./database/orders.db
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
```

**Important**: Change `JWT_SECRET` to a random string in production!

## Frontend Configuration

Update the API URL in `frontend/login.html` and `frontend/order-form.html`:

```javascript
const API_BASE_URL = window.location.origin.includes('localhost') 
    ? 'http://localhost:3000/api' 
    : '/api';  // Use relative path in production
```

If your frontend and backend are on different domains, set:
```javascript
const API_BASE_URL = 'https://your-backend-domain.com/api';
```

## Database Backup

The SQLite database is stored in `backend/database/orders.db`. 

To backup:
```bash
cp backend/database/orders.db backup-$(date +%Y%m%d).db
```

To restore:
```bash
cp backup-YYYYMMDD.db backend/database/orders.db
```

## Security Checklist

- [ ] Change default admin password
- [ ] Set a strong JWT_SECRET
- [ ] Enable HTTPS (SSL certificate)
- [ ] Set up firewall rules
- [ ] Regular database backups
- [ ] Keep dependencies updated
- [ ] Use environment variables (never commit .env)

## Troubleshooting

### Backend won't start
- Check if port 3000 is available
- Verify .env file exists and has correct values
- Check database directory permissions

### Frontend can't connect to API
- Verify API_BASE_URL is correct
- Check CORS settings in backend
- Verify backend is running

### Authentication fails
- Check JWT_SECRET matches between requests
- Verify token expiration (default: 7 days)
- Check user exists in database

## Support

For issues or questions, check:
- Backend logs: `pm2 logs azure-tobacco-api` (if using PM2)
- Browser console for frontend errors
- Network tab for API request/response details






