# 🚀 Quick Start Guide - Backend Setup

Everything is already configured! Just follow these simple steps:

## Step 1: Start the Backend Server

### Option A: Double-click (Easiest - macOS)
1. Go to: `backend/start-backend.command`
2. Double-click the file
3. A terminal window will open and start the server

### Option B: Command Line
1. Open Terminal
2. Navigate to the backend folder:
   ```bash
   cd src/components/src/backend
   ```
3. Run the startup script:
   ```bash
   ./start-backend.sh
   ```

### Option C: Manual Start
```bash
cd src/components/src/backend
npm start
```

## Step 2: Verify Server is Running

You should see:
```
Server is running on http://localhost:3000
API endpoints available at http://localhost:3000/api
Default admin credentials: admin / admin123
```

## Step 3: Use the System

### For Distributors (Order Form):
1. Open `distributor-order-form-standalone.html` in your browser
2. Or visit: `https://azuretobacco.github.io/orderform/` (if published)
3. Fill out and submit orders - they'll be saved to the database!

### For Admin (View Orders):
1. Open `admin-dashboard.html` in your browser
2. Login with:
   - Username: `admin`
   - Password: `admin123`
3. View all orders and generate monthly reports

## What's Already Configured ✅

- ✅ Backend dependencies installed
- ✅ Database schema ready
- ✅ API endpoints configured
- ✅ Order form connected to API
- ✅ Admin dashboard ready
- ✅ Monthly reporting enabled

## Default Credentials

- **Admin Username:** `admin`
- **Admin Password:** `admin123`

⚠️ **Important:** Change the admin password in production!

## Troubleshooting

### Port 3000 already in use?
Edit `backend/.env` and change `PORT=3000` to a different port (e.g., `PORT=3001`)

### Can't connect to backend?
- Make sure the server is running
- Check that you see "Server is running" message
- Verify the API URL in the form files matches your server URL

### Database issues?
- The database file is created automatically at: `backend/database/orders.db`
- To reset, delete this file and restart the server

## Next Steps

1. **Start the backend** (see Step 1 above)
2. **Test the order form** - submit a test order
3. **Check the admin dashboard** - login and view your orders
4. **Generate monthly reports** - select a month in the dashboard

That's it! Everything is ready to go! 🎉

