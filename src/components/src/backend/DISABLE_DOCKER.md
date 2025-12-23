# 🚨 Fix: "Dockerfile: no such file or directory" Error

## The Problem:
Render is trying to use **Docker** but your service should use **Node.js** directly.

## ✅ Solution: Disable Docker in Render

### Step 1: Go to Your Service Settings
1. Open your Render dashboard
2. Click on your service (`azure-tobacco-api`)
3. Go to **Settings** tab

### Step 2: Disable Docker
1. Scroll down to **"Docker"** section
2. **UNCHECK** or **DISABLE** Docker
3. Make sure **"Use Docker"** is **OFF**

### Step 3: Verify Environment
1. In the same Settings page
2. Make sure **Environment** is set to: **`Node`**
3. **NOT** "Docker" or "Dockerfile"

### Step 4: Verify Build Settings
Scroll to **"Build & Deploy"** section:
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Root Directory:** `src/components/src/backend`

### Step 5: Save and Redeploy
1. Click **"Save Changes"**
2. Go to **"Manual Deploy"** → **"Deploy latest commit"**
3. Wait for deployment

---

## 🔄 Alternative: Delete and Recreate (If Above Doesn't Work)

If you can't find the Docker setting, **delete and recreate** the service:

### Delete Current Service:
1. Go to your service
2. Click **Settings**
3. Scroll to bottom
4. Click **"Delete Service"**

### Create New Service (Correctly):
1. Click **"New +"** → **"Web Service"**
2. Connect repo: `AzureTobacco/orderform`
3. **IMPORTANT:** When it asks about Docker, choose **"No"** or **"Node"**
4. Configure:
   - **Root Directory:** `src/components/src/backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** `Node` (NOT Docker!)
5. Add environment variables
6. Deploy

---

## ✅ What Should Happen:

After fixing, the build logs should show:
```
> npm install
... (installing packages)
> npm start
Server is running on http://localhost:XXXX
```

**NOT:**
```
❌ failed to read dockerfile
❌ docker build
```

---

## 🎯 Key Point:

Your backend is a **Node.js application**, not a Docker container. Render needs to run it directly with Node.js, not try to build a Docker image.

Make sure Docker is **disabled** in your Render service settings!

