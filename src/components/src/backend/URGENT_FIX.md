# 🚨 URGENT: Render Service Has Docker Enabled

## The Problem:
Your Render service **was created with Docker enabled** in the dashboard. Even though we removed Docker files, Render is **still trying to use Docker** because the service settings say so.

**The error proves it:**
```
#1 [internal] load build definition from Dockerfile
error: failed to read dockerfile
```

## ✅ SOLUTION: You MUST Delete and Recreate

The service settings in Render dashboard **override** our config files. You **cannot** fix this by editing - you **must delete and recreate**.

---

## 🎯 Step-by-Step Fix:

### Step 1: DELETE Current Service
1. Go to **https://dashboard.render.com**
2. Click on **azure-tobacco-api** (your service)
3. Click **"Settings"** tab (left sidebar)
4. Scroll ALL the way down
5. Find **"Delete Service"** button (red, at bottom)
6. Click it and confirm

### Step 2: CREATE New Service
1. Click **"New +"** button (top right)
2. Select **"Web Service"** (NOT Static Site!)

### Step 3: Connect Repository
1. Select **"Build and deploy from a Git repository"**
2. Connect GitHub if not already
3. Select repository: **AzureTobacco/orderform**
4. Click **"Continue"**

### Step 4: Configure (CRITICAL!)
**When you see the configuration screen:**

**Name:**
- `azure-tobacco-api`

**Environment:**
- **MUST SELECT: `Node`** ⚠️ **NOT Docker!**
- If you see "Docker" as an option, **DO NOT select it!**
- Select **"Node"** from the dropdown

**Region:**
- Choose closest to you

**Branch:**
- `main`

**Root Directory:**
- `src/components/src/backend`

**Build Command:**
- `npm install`

**Start Command:**
- `npm start`

**⚠️ IMPORTANT:** Make sure **"Docker"** is **NOT checked** anywhere!

### Step 5: Add Environment Variables
Click **"Advanced"** → **"Add Environment Variable"**:

1. `NODE_ENV` = `production`
2. `JWT_SECRET` = `azure-secret-2024-change-me`
3. `ADMIN_USERNAME` = `admin`
4. `ADMIN_PASSWORD` = (your secure password)
5. `DB_PATH` = `./database/orders.db`

**DO NOT add PORT** - Render sets this automatically!

### Step 6: Create Service
1. Click **"Create Web Service"**
2. Wait 2-3 minutes
3. Check the logs - should see `npm install` and `npm start`, NOT Docker!

---

## ✅ Success Looks Like:

**Build logs should show:**
```
==> Cloning from GitHub
==> Checking out commit...
==> npm install
... (installing packages)
==> npm start
Server is running on http://localhost:XXXX
```

**NOT:**
```
❌ load build definition from Dockerfile
❌ failed to read dockerfile
```

---

## 🚀 MUCH EASIER: Use Railway Instead!

If Render keeps causing problems, **Railway is 10x easier**:

1. Go to **https://railway.app**
2. Sign up with GitHub (free)
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Choose: **AzureTobacco/orderform**
6. Railway **auto-detects Node.js** (no Docker!)
7. Add environment variables
8. Click **"Deploy"**
9. **Done!** Usually works first try!

Railway doesn't have this Docker issue - it just works!

---

## 🆘 Why This Happened:

When you first created the service, Render **auto-detected Docker** (because Dockerfile existed) and enabled it. Even though we removed Docker files, **the service settings still say "use Docker"**.

**The only way to fix:** Delete and recreate with **Node** selected from the start.

---

**Bottom line: Delete the service, recreate it, and make sure Environment is "Node" NOT "Docker"!**

