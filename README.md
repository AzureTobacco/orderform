# AZUREERP - Azure Tobacco Industrial FZCO ERP System

## 🚀 Quick Start

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
```

### Deploy

**Quick Deploy:**
```bash
./deploy.sh
```

**Manual Deploy:**
- Copy `dist` folder to your server
- See `SERVER_INSTALLATION_GUIDE.md` for detailed instructions

## 📦 Deployment Options

1. **NAS Server** (Synology/QNAP) - See `SERVER_INSTALLATION_GUIDE.md`
2. **Linux Server** - Nginx/Apache
3. **Windows Server** - IIS (copy `web.config` to `dist` folder)
4. **Docker** - `docker-compose up -d`
5. **Cloud Hosting** - Vercel, Netlify, AWS, etc.

## 📚 Documentation

- **Server Installation:** `SERVER_INSTALLATION_GUIDE.md`
- **Deployment Guide:** `DEPLOYMENT_GUIDE.md`

## ⚠️ Current Status

✅ **Frontend:** Fully functional UI
⚠️ **Backend:** Not yet implemented (using mock data)
⚠️ **Database:** Not yet configured

## 🗄️ Database Options

- **PostgreSQL** (Recommended - FREE, works on Linux/Mac/Windows)
- **MySQL/MariaDB** (FREE)
- **SQL Server** (Windows only, not recommended)

**You DON'T need Windows Server for SQL!** PostgreSQL works great on Linux.

## 🎯 Next Steps

1. Deploy frontend to server/NAS
2. Plan backend API development
3. Set up database (PostgreSQL recommended)
4. Integrate backend with frontend

---

For detailed installation instructions, see `SERVER_INSTALLATION_GUIDE.md`
