# How to Publish Your Order Form on GitHub Pages

## Quick Steps:

### 1. Create GitHub Repository
- Go to https://github.com/new
- Repository name: `azure-order-form` (or any name you like)
- Choose **Public** (required for free GitHub Pages)
- **Don't** check "Initialize with README"
- Click "Create repository"

### 2. Connect Your Local Project to GitHub
After creating the repo, GitHub will show you a URL like:
`https://github.com/yourusername/azure-order-form.git`

Run these commands (replace with your actual URL):
```bash
cd /Users/tarek/Downloads/modern-erp-system
git remote add origin https://github.com/yourusername/azure-order-form.git
git branch -M main
git push -u origin main
```

### 3. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under "Source", select **Deploy from a branch**
5. Choose branch: **main**
6. Choose folder: **/ (root)**
7. Click **Save**

### 4. Access Your Form
After a few minutes, your form will be live at:
`https://yourusername.github.io/azure-order-form/distributor-order-form-standalone.html`

Or if you rename it to `index.html` in the root:
`https://yourusername.github.io/azure-order-form/`

## Alternative: Make it the Main Page

If you want the form to be the main page (easier URL), you can:
1. Copy `src/components/src/distributor-order-form-standalone.html` to the root as `index.html`
2. Push the changes
3. Access it at: `https://yourusername.github.io/azure-order-form/`

## Notes:
- The form works entirely in the browser (uses localStorage)
- No backend server needed
- Orders are saved in each user's browser
- Free hosting on GitHub Pages

