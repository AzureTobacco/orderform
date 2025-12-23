# Backend Setup Guide

This guide explains how to set up the backend server so that:
1. Orders submitted through the form are saved to a database
2. You can view all orders through the admin dashboard
3. You can generate monthly reports

## Quick Setup

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=3000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
DB_PATH=./database/orders.db
NODE_ENV=production
```

### 3. Start the Backend Server

```bash
npm start
```

The server will start on `http://localhost:3000`

### 4. Configure the Order Form to Use the API

In your `distributor-order-form-standalone.html` file, add this script tag before the closing `</body>` tag:

```html
<script>
    window.API_BASE_URL = 'http://localhost:3000/api'; // Change to your server URL
</script>
```

Or if deploying to production, use your production server URL:
```html
<script>
    window.API_BASE_URL = 'https://your-backend-server.com/api';
</script>
```

### 5. Access the Admin Dashboard

1. Open `admin-dashboard.html` in your browser
2. Login with your admin credentials (from `.env` file)
3. View all orders and generate monthly reports

## Deploying to Production

### Option 1: Deploy Backend to Railway/Render/Heroku

1. Push your backend code to GitHub
2. Connect to Railway/Render/Heroku
3. Set environment variables in the platform
4. Update the API URL in your form to point to the deployed backend

### Option 2: Deploy Backend to Your Own Server

1. Install Node.js on your server
2. Clone the repository
3. Install dependencies: `npm install`
4. Set up environment variables
5. Use PM2 or similar to keep the server running:
   ```bash
   npm install -g pm2
   pm2 start server.js
   pm2 save
   pm2 startup
   ```

## Features

### Public Order Submission
- Distributors can submit orders without authentication
- Orders are automatically linked to distributor information
- Orders are saved to SQLite database

### Admin Dashboard
- View all orders from all distributors
- Filter by month for monthly reports
- See order details including:
  - Customer information
  - Product range (Gold Line / Black Line)
  - Packaging type (American 250g / American 100g / Australian 100g)
  - Quantities and pricing
  - Order totals

### Monthly Reports
- Total orders count
- Total revenue
- Processed vs pending orders
- Detailed order breakdown

## Database Schema

The database automatically creates these tables:
- `users` - Distributor and admin accounts
- `orders` - Order headers
- `order_items` - Individual line items with range and packaging

## Security Notes

- Change the default admin password immediately
- Use a strong JWT_SECRET in production
- Consider adding rate limiting for public endpoints
- Enable HTTPS in production
- Regularly backup the database file (`orders.db`)

## Troubleshooting

### Orders not saving to database
- Check that the backend server is running
- Verify the API_BASE_URL is correct in the form
- Check browser console for errors
- Verify CORS is enabled in the backend (it should be by default)

### Can't login to admin dashboard
- Verify admin credentials in `.env` file
- Check that the backend is running
- Verify the API_BASE_URL in admin-dashboard.html

### Database errors
- Delete `orders.db` to reset the database (will lose all data)
- Check file permissions on the database directory

