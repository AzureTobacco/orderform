# 🖥️ ERP Server Installation Guide
## Azure Tobacco Industrial FZCO ERP System

---

## 📋 **Quick Answer to Your Questions:**

### ✅ **Can you install on NAS?**
**YES!** Your ERP can run on NAS servers (Synology, QNAP, etc.) as static files.

### ✅ **Do you need Windows Server for SQL?**
**NO!** You can use:
- **PostgreSQL** (Linux/Mac/Windows - FREE)
- **MySQL/MariaDB** (Linux/Mac/Windows - FREE)
- **SQL Server** (requires Windows, but PostgreSQL is better and free)

**Recommendation:** Use PostgreSQL on Linux - it's industry standard and free!

---

## 🎯 **What Can Be Done NOW (Without Backend)**

### ✅ **Fully Working:**
1. ✅ Complete ERP UI interface
2. ✅ All modules and navigation
3. ✅ Light/Dark mode
4. ✅ Pitch Deck functionality
5. ✅ Responsive design
6. ✅ Static file deployment

### ⚠️ **Limited (Without Backend):**
- Data is mock/placeholder (not real)
- No user authentication
- No data persistence (uses browser localStorage)
- No file uploads
- No real-time updates

---

## 🚀 **Deployment Options**

### **Option 1: NAS Server (Synology/QNAP/etc.)**

#### **Prerequisites:**
- NAS with Web Station or Docker support
- SSH access (optional but recommended)

#### **Method A: Web Station (Easiest)**

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Copy to NAS:**
   - Connect to NAS via File Station or SFTP
   - Copy the entire `dist` folder to: `/web/erp/` (or your web directory)

3. **Configure Web Station:**
   - Open Web Station on your NAS
   - Create virtual host pointing to `/web/erp/dist`
   - Set document root to `/web/erp/dist`
   - Enable PHP (not needed, but won't hurt)

4. **Access:**
   - Visit: `http://your-nas-ip/erp/` or your configured domain

#### **Method B: Docker on NAS (Recommended)**

1. **Build Docker image:**
   ```bash
   docker build -t azure-erp .
   ```

2. **On NAS Docker:**
   - Go to Container Manager (Synology) or Container Station (QNAP)
   - Import the Docker image
   - Create container with port mapping: `80:80`
   - Start container

3. **Access:**
   - Visit: `http://your-nas-ip`

#### **Method C: Nginx on NAS (Advanced)**

1. **SSH into NAS:**
   ```bash
   ssh admin@your-nas-ip
   ```

2. **Copy built files:**
   ```bash
   # From your computer
   scp -r dist/* admin@your-nas-ip:/volume1/web/erp/
   ```

3. **Install Nginx (if not installed):**
   ```bash
   # On Synology
   sudo synopkg install nginx
   
   # Or use package manager
   ```

4. **Configure Nginx:**
   - Copy `nginx.conf` to NAS
   - Update path in config: `root /volume1/web/erp/dist;`
   - Restart Nginx

---

### **Option 2: Regular Linux Server (Ubuntu/Debian/CentOS)**

#### **Step 1: Install Nginx**

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nginx -y

# CentOS/RHEL
sudo yum install nginx -y
```

#### **Step 2: Build and Deploy**

```bash
# On your development machine
npm run build

# Copy to server
scp -r dist/* user@your-server-ip:/var/www/erp/
```

#### **Step 3: Configure Nginx**

```bash
# Copy nginx.conf to server
sudo cp nginx.conf /etc/nginx/sites-available/erp
sudo ln -s /etc/nginx/sites-available/erp /etc/nginx/sites-enabled/

# Update path in config
sudo nano /etc/nginx/sites-available/erp
# Change: root /var/www/erp/dist;

# Test and restart
sudo nginx -t
sudo systemctl restart nginx
```

#### **Step 4: Set Permissions**

```bash
sudo chown -R www-data:www-data /var/www/erp
sudo chmod -R 755 /var/www/erp
```

#### **Step 5: Configure Firewall**

```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow 22  # SSH
sudo ufw enable
```

---

### **Option 3: Docker on Any Server**

#### **Quick Deploy:**

```bash
# Clone/copy project to server
cd /opt/erp
git clone <your-repo> .  # or copy files

# Build and run
docker-compose up -d

# Check status
docker-compose ps
```

#### **Update ERP:**

```bash
# Pull latest code
git pull  # or copy new files

# Rebuild and restart
docker-compose down
docker-compose build
docker-compose up -d
```

---

### **Option 4: Windows Server**

#### **Using IIS:**

1. Install IIS on Windows Server
2. Build: `npm run build`
3. Copy `dist` folder to `C:\inetpub\wwwroot\erp\`
4. Configure IIS:
   - Create new website
   - Point to `C:\inetpub\wwwroot\erp\dist`
   - Add URL Rewrite rule for SPA routing (see below)

#### **URL Rewrite for IIS (web.config):**

Create `web.config` in `dist` folder:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="React Routes" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```

---

## 🗄️ **Database Options (For Future Backend)**

### **You DON'T Need Windows Server for SQL!**

#### **Option 1: PostgreSQL (Recommended - FREE)**

**Works on:**
- ✅ Linux (Ubuntu, Debian, CentOS)
- ✅ macOS
- ✅ Windows
- ✅ NAS servers (via Docker)

**Install on Linux:**
```bash
# Ubuntu/Debian
sudo apt install postgresql postgresql-contrib

# Start service
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

**Install on NAS (Docker):**
```yaml
# Already in docker-compose.yml
postgres:
  image: postgres:16-alpine
  environment:
    POSTGRES_DB: azure_erp
    POSTGRES_USER: erp_user
    POSTGRES_PASSWORD: your_password
```

#### **Option 2: MySQL/MariaDB (FREE)**

**Works on:**
- ✅ Linux
- ✅ macOS
- ✅ Windows
- ✅ NAS servers

**Install on Linux:**
```bash
sudo apt install mysql-server
# or
sudo apt install mariadb-server
```

#### **Option 3: SQL Server (Requires Windows)**

- ❌ Only works on Windows Server
- 💰 Requires license (except SQL Server Express)
- ❌ Not recommended (use PostgreSQL instead)

---

## 📦 **Installation Scripts**

### **Quick Install Script (Linux Server)**

Create `install.sh`:

```bash
#!/bin/bash

echo "🚀 Installing Azure ERP System..."

# Install Nginx
sudo apt update
sudo apt install nginx -y

# Create directory
sudo mkdir -p /var/www/erp
sudo chown -R $USER:$USER /var/www/erp

# Copy dist folder (run npm run build first on dev machine)
echo "Copy dist folder to /var/www/erp/dist"

# Configure Nginx
sudo cp nginx.conf /etc/nginx/sites-available/erp
sudo ln -s /etc/nginx/sites-available/erp /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default

# Test and restart
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx

echo "✅ Installation complete!"
echo "🌐 Access your ERP at: http://$(hostname -I | awk '{print $1}')"
```

---

## 🔧 **Current Deployment Status**

### **✅ Can Deploy NOW:**
- Frontend UI (fully functional)
- All modules and navigation
- Pitch Deck
- Light/Dark mode

### **⚠️ Will Be Mock Data:**
- Inventory (placeholder data)
- Orders (placeholder data)
- Reports (static charts)
- All module data (not connected to real database)

### **❌ Not Available Yet:**
- User authentication
- Real data storage
- File uploads
- Backend API
- Database integration

---

## 📋 **Installation Checklist**

### **Before Installation:**
- [ ] Built production files (`npm run build`)
- [ ] Chosen deployment method
- [ ] Server/NAS ready
- [ ] Network access configured

### **Installation Steps:**
- [ ] Copy `dist` folder to server
- [ ] Install web server (Nginx/IIS/Apache)
- [ ] Configure web server
- [ ] Set up SSL certificate (optional but recommended)
- [ ] Test access
- [ ] Configure firewall

### **Post-Installation:**
- [ ] Test all modules
- [ ] Verify responsive design
- [ ] Set up backups
- [ ] Configure domain name (optional)
- [ ] Set up monitoring (optional)

---

## 🌐 **Access Your ERP**

After installation, access via:
- **Local Network:** `http://server-ip`
- **NAS:** `http://nas-ip/erp/`
- **Domain:** `https://erp.yourcompany.com` (with SSL)

---

## 🔐 **Security Recommendations**

1. **SSL Certificate:**
   ```bash
   # Using Let's Encrypt (Free)
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

2. **Firewall:**
   ```bash
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw enable
   ```

3. **Regular Updates:**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

---

## 🎯 **Summary**

### **What You Can Do NOW:**
✅ Deploy frontend to any server/NAS  
✅ Access ERP via web browser  
✅ Use all UI features  
✅ Showcase to stakeholders  

### **What You'll Need LATER:**
⚠️ Backend API development  
⚠️ Database setup (PostgreSQL recommended)  
⚠️ Authentication system  
⚠️ Real data integration  

### **Best Setup for Production:**
1. **Frontend:** Linux server with Nginx (or NAS)
2. **Database:** PostgreSQL on Linux (not Windows SQL Server)
3. **Backend:** Node.js/Python API on Linux
4. **All FREE and open-source!**

---

## 📞 **Next Steps**

1. **Choose your deployment method**
2. **Run `npm run build`**
3. **Follow installation steps above**
4. **Test access**
5. **Plan backend development** (when ready)

**Your ERP frontend is ready to deploy! 🚀**







