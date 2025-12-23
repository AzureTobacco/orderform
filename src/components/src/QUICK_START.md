# Quick Start Guide

## Step 1: Setup Backend

```bash
cd backend
npm install
```

Create `.env` file:
```bash
cat > .env << EOF
PORT=3000
NODE_ENV=development
JWT_SECRET=change-this-to-a-random-string-in-production
DB_PATH=./database/orders.db
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
EOF
```

Start the server:
```bash
npm start
```

The backend will:
- ✅ Create the database automatically
- ✅ Create default admin user (admin/admin123)
- ✅ Start API on http://localhost:3000

## Step 2: Test the System

1. Open `frontend/login.html` in your browser
2. Login with:
   - Username: `admin`
   - Password: `admin123`
3. You'll be redirected to the order form
4. Create an order!

## Step 3: Create Distributor Accounts

Distributors can register themselves:
1. Go to login page
2. Click "Need an account? Register"
3. Fill in distributor information
4. Create account and login

## Default Admin Credentials

⚠️ **IMPORTANT**: Change these in production!

- Username: `admin`
- Password: `admin123`

## API Endpoints

- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register new distributor
- `GET /api/orders` - Get all orders (for current user)
- `POST /api/orders` - Create new order
- `GET /api/orders/reconciliation/:month` - Get monthly reconciliation

## Next Steps

1. **Change default password** - Update in `.env` file
2. **Set strong JWT_SECRET** - Use a random string generator
3. **Deploy** - See `DEPLOYMENT.md` for deployment options

## Troubleshooting

**Backend won't start?**
- Check if port 3000 is available
- Verify `.env` file exists
- Check Node.js version (requires Node 14+)

**Can't login?**
- Verify backend is running on port 3000
- Check browser console for errors
- Verify admin user was created (check database)

**Frontend can't connect?**
- Verify backend is running
- Check API_BASE_URL in frontend files
- Check CORS settings






