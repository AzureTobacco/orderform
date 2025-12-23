# Azure Tobacco Distributor Order System - Backend

Backend API server for the Azure Tobacco distributor order management system.

## Features

- User authentication with JWT tokens
- Role-based access control (Admin/Distributor)
- Order management (CRUD operations)
- Monthly order reconciliation
- SQLite database
- RESTful API

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
- `JWT_SECRET`: Change to a secure random string
- `ADMIN_USERNAME`: Admin username (default: admin)
- `ADMIN_PASSWORD`: Admin password (default: admin123)

4. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## Default Credentials

- **Username**: admin
- **Password**: admin123

⚠️ **Change these in production!**

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register new distributor
- `GET /api/auth/me` - Get current user info

### Orders
- `GET /api/orders` - Get all orders (for current user)
- `GET /api/orders/all` - Get all orders (admin only)
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Delete order
- `GET /api/orders/reconciliation/:month` - Get monthly reconciliation (format: YYYY-MM)

## Authentication

All order endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-token>
```

## Deployment

### Option 1: Deploy to Heroku

1. Create a Heroku app
2. Set environment variables in Heroku dashboard
3. Deploy:
```bash
git push heroku main
```

### Option 2: Deploy to Railway

1. Connect your GitHub repository
2. Railway will auto-detect Node.js
3. Set environment variables in Railway dashboard
4. Deploy automatically on push

### Option 3: Deploy to DigitalOcean/Render

1. Create a new Node.js app
2. Set environment variables
3. Deploy from GitHub or via CLI

## Environment Variables

- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)
- `JWT_SECRET`: Secret key for JWT tokens
- `DB_PATH`: Path to SQLite database file
- `ADMIN_USERNAME`: Default admin username
- `ADMIN_PASSWORD`: Default admin password






