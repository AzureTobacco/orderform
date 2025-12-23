# 🚀 Quick Start - Azure Tobacco Order System

## ✅ Backend is Running!

The backend server is now running on `http://localhost:3000`

## 📝 How to Login

### Step 1: Open the Login Page

**Option A: Direct File (Easiest)**
1. Navigate to: `frontend/login.html`
2. Double-click to open in your browser
3. The page should automatically connect to `http://localhost:3000/api`

**Option B: Local Web Server (Recommended)**
```bash
cd frontend
python3 -m http.server 8000
```
Then open: `http://localhost:8000/login.html`

### Step 2: Login Credentials

**Default Admin Account:**
- **Username**: `admin`
- **Password**: `admin123`

### Step 3: After Login

Once logged in, you'll be redirected to the order form where you can:
- Create new orders
- Save drafts
- Submit orders

## 🔧 If Login Doesn't Work

1. **Check Backend is Running**
   ```bash
   curl http://localhost:3000/api/health
   ```
   Should return: `{"status":"ok",...}`

2. **Check Browser Console**
   - Press F12
   - Go to Console tab
   - Look for error messages
   - You should see: `API Base URL: http://localhost:3000/api`

3. **Verify Credentials**
   - Username: `admin` (lowercase)
   - Password: `admin123` (lowercase)

4. **Check Network Tab**
   - Press F12 → Network tab
   - Try to login
   - Look for the `/api/auth/login` request
   - Check if it returns 200 (success) or an error

## 🆘 Still Having Issues?

See `TROUBLESHOOTING.md` for detailed solutions.

## 📋 Next Steps

1. Login with admin account
2. Create your first order
3. Register distributor accounts (if needed)
4. View monthly reconciliation

---

**Backend Status**: ✅ Running on port 3000
**Database**: ✅ SQLite initialized
**Admin User**: ✅ Created (admin/admin123)






