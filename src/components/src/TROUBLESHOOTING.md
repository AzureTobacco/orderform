# Troubleshooting Login Issues

## Problem: Can't Login to Frontend

### Step 1: Check if Backend is Running

Open a terminal and run:
```bash
cd backend
npm start
```

You should see:
```
Server is running on http://localhost:3000
Connected to SQLite database
Database schema initialized
Default admin user created: admin / admin123
```

### Step 2: Verify Backend is Accessible

Open your browser and go to:
```
http://localhost:3000/api/health
```

You should see:
```json
{"status":"ok","message":"Azure Tobacco Order System API is running"}
```

### Step 3: Check Browser Console

1. Open `frontend/login.html` in your browser
2. Press F12 to open Developer Tools
3. Go to the Console tab
4. Try to login
5. Check for any error messages

Common errors:
- **"Failed to fetch"** - Backend is not running
- **"Network error"** - CORS issue or wrong API URL
- **"401 Unauthorized"** - Wrong username/password

### Step 4: Verify Default Credentials

Default admin credentials:
- **Username**: `admin`
- **Password**: `admin123`

⚠️ Make sure you're using these exact credentials (case-sensitive).

### Step 5: Check API URL

The frontend should connect to:
- **Local**: `http://localhost:3000/api`
- **Production**: `/api` (relative path)

If you're opening the HTML file directly (file://), it should automatically use `http://localhost:3000/api`.

### Step 6: Common Issues

#### Issue: "Cannot connect to server"
**Solution**: 
1. Make sure backend is running (`npm start` in backend folder)
2. Check if port 3000 is available
3. Try accessing `http://localhost:3000/api/health` directly

#### Issue: "CORS error"
**Solution**: 
- The backend has CORS enabled, but if you see CORS errors:
  - Make sure you're accessing the frontend via `http://localhost` not `file://`
  - Or use a local web server (see below)

#### Issue: "401 Unauthorized"
**Solution**:
- Verify username and password are correct
- Check if admin user was created (check backend console)
- Try registering a new account

#### Issue: "Network error or server not responding"
**Solution**:
- Backend is not running
- Port 3000 is blocked
- Firewall is blocking the connection

### Step 7: Run Frontend with Local Server (Recommended)

Instead of opening HTML files directly, use a local web server:

**Option 1: Python**
```bash
cd frontend
python3 -m http.server 8000
```
Then open: `http://localhost:8000/login.html`

**Option 2: Node.js http-server**
```bash
npm install -g http-server
cd frontend
http-server -p 8000
```
Then open: `http://localhost:8000/login.html`

**Option 3: VS Code Live Server**
- Install "Live Server" extension in VS Code
- Right-click on `login.html` → "Open with Live Server"

### Step 8: Check Database

If login still fails, check if the database was created:

```bash
cd backend
ls -la database/
```

You should see `orders.db` file.

### Step 9: Reset Admin User

If admin user doesn't exist, delete the database and restart:

```bash
cd backend
rm database/orders.db
npm start
```

The server will recreate the database and admin user.

### Still Having Issues?

1. Check backend console for errors
2. Check browser console (F12) for JavaScript errors
3. Verify all dependencies are installed: `cd backend && npm install`
4. Make sure Node.js version is 14 or higher: `node --version`






