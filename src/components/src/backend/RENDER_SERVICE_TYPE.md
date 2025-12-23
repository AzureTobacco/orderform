# ⚠️ Important: Backend Service Type in Render

## 🎯 You Need: **Web Service** (NOT Static Site!)

### ❌ DON'T Choose: "Static Site"
- Static sites are for HTML/CSS/JS files only
- They can't run Node.js servers
- They can't handle API requests
- This is why you're getting build errors!

### ✅ DO Choose: "Web Service"
- This runs Node.js applications
- Can handle API requests
- Runs your server.js file
- This is what you need!

## 📋 Correct Render Setup:

### Step 1: Service Type
When creating in Render:
- Click **"New +"**
- Select **"Web Service"** ← This is the correct one!
- NOT "Static Site"

### Step 2: Configuration
- **Environment:** `Node`
- **Root Directory:** `src/components/src/backend`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

## 🔍 How to Tell the Difference:

**Static Site:**
- For frontend files (HTML, CSS, JS)
- No server running
- Just serves files
- Example: Your order form HTML files

**Web Service:**
- Runs a server (Node.js, Python, etc.)
- Handles API requests
- Processes data
- Example: Your backend API

## ✅ Your Setup:

1. **Backend (API):** Deploy as **Web Service** on Render
   - This runs your server.js
   - Handles order submissions
   - Stores data in database

2. **Frontend (Forms):** Already on GitHub Pages as **Static Site**
   - Your order form HTML
   - Admin dashboard HTML
   - These are already working!

## 🎯 Summary:

- **Backend = Web Service** (Node.js server)
- **Frontend = Static Site** (HTML files - already on GitHub Pages)

Make sure you're creating a **Web Service** in Render, not a Static Site!

