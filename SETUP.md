# SecureAuth - Detailed Setup Guide

This guide provides step-by-step instructions for setting up the SecureAuth application in development and production environments.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Environment Configuration](#environment-configuration)
4. [Database Setup](#database-setup)
5. [Email Configuration](#email-configuration)
6. [Running the Application](#running-the-application)
7. [Creating an Admin User](#creating-an-admin-user)
8. [Troubleshooting](#troubleshooting)
9. [Production Deployment](#production-deployment)

---

## Prerequisites

### Required Software

- **Node.js**: Version 18.0.0 or higher
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`

- **npm**: Comes with Node.js (version 9.0.0 or higher)
  - Verify installation: `npm --version`

- **MongoDB**: Local installation or MongoDB Atlas account
  - Local: [MongoDB Community Server](https://www.mongodb.com/try/download/community)
  - Cloud: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Free tier available)

- **Git**: For version control
  - Download from [git-scm.com](https://git-scm.com/)

### Optional Tools

- **MongoDB Compass**: GUI for MongoDB database management
- **Postman**: API testing tool
- **VS Code**: Recommended code editor

---

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/secureauth.git
cd secureauth
```

### 2. Install Server Dependencies

```bash
cd server
npm install
```

**Installed packages:**
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `bcrypt` - Password hashing
- `jsonwebtoken` - JWT authentication
- `nodemailer` - Email service
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variables
- `helmet` - Security headers
- `express-rate-limit` - Rate limiting

### 3. Install Client Dependencies

```bash
cd ../client
npm install
```

**Installed packages:**
- `react` - UI library
- `react-router-dom` - Routing
- `axios` - HTTP client
- `react-toastify` - Notifications
- `framer-motion` - Animations
- `tailwindcss` - CSS framework

---

## Environment Configuration

### Server Environment Variables

Create a `.env` file in the `/server` directory:

```bash
cd server
touch .env  # or manually create the file
```

**Required variables:**

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGO_URI=mongodb://localhost:27017/secureauth
# For MongoDB Atlas, use:
# MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/secureauth?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_min_32_chars

# Email Configuration (Gmail)
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=your_app_specific_password
```

### Client Environment Variables (Optional)

Create a `.env` file in the `/client` directory if you need to configure the API URL:

```env
VITE_API_URL=http://localhost:5000/api
```

**Note:** The client is configured to use `http://localhost:5000/api` by default in `src/services/api.js`.

---

## Database Setup

### Option 1: Local MongoDB

1. **Install MongoDB Community Server**
   - Follow installation instructions for your OS
   - Start MongoDB service:
     - **Windows**: MongoDB usually starts automatically as a service
     - **macOS**: `brew services start mongodb-community`
     - **Linux**: `sudo systemctl start mongod`

2. **Verify MongoDB is running**
   ```bash
   mongosh  # or mongo
   ```

3. **Update .env**
   ```env
   MONGO_URI=mongodb://localhost:27017/secureauth
   ```

### Option 2: MongoDB Atlas (Cloud)

1. **Create a MongoDB Atlas Account**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose the free tier (M0)
   - Select a cloud provider and region

3. **Configure Database Access**
   - Go to "Database Access"
   - Add a new database user
   - Set username and password (save these!)
   - Grant "Read and write to any database" permissions

4. **Configure Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - For development: "Allow Access from Anywhere" (0.0.0.0/0)
   - For production: Add specific IP addresses

5. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Update `.env`:
     ```env
     MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/secureauth?retryWrites=true&w=majority
     ```
   - Replace `<username>` and `<password>` with your credentials

---

## Email Configuration

SecureAuth uses Gmail SMTP for sending OTP codes. You need to create an **App Password** for security.

### Step 1: Enable 2-Factor Authentication

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification**

### Step 2: Generate App Password

1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
2. Select app: **Mail**
3. Select device: **Other (Custom name)** → Enter "SecureAuth"
4. Click **Generate**
5. Copy the 16-character password

### Step 3: Update .env

```env
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop  # The 16-character app password
```

### Testing Email Configuration

The OTP email will be sent when users:
- Register a new account
- Login to their account
- Request OTP resend

---

## Running the Application

### Development Mode

**Terminal 1 - Backend Server:**
```bash
cd server
npm run dev
```

The server will start on `http://localhost:5000`

**Terminal 2 - Frontend Client:**
```bash
cd client
npm run dev
```

The client will start on `http://localhost:5173`

### Access Points

- **Landing Page**: http://localhost:5173
- **Login**: http://localhost:5173/login
- **Register**: http://localhost:5173/register
- **API Base**: http://localhost:5000/api

### Verify Setup

1. Open http://localhost:5173
2. You should see the SecureAuth landing page
3. Click "Get Started" to register a new account
4. Check your email for the OTP code
5. Complete registration and login

---

## Creating an Admin User

By default, all registered users have the role `"user"`. To create an admin account:

### Method 1: Via MongoDB

1. **Connect to MongoDB**
   ```bash
   mongosh  # or mongo
   use secureauth
   ```

2. **Update a user to admin**
   ```javascript
   db.users.updateOne(
     { email: "admin@example.com" },
     { $set: { role: "admin" } }
   )
   ```

### Method 2: Via MongoDB Compass

1. Open MongoDB Compass
2. Connect to your database
3. Navigate to `secureauth` → `users` collection
4. Find the user you want to make admin
5. Edit the document and change `role` from `"user"` to `"admin"`
6. Save changes

### Method 3: Manually in Database

After registering a user through the app:
1. Complete the registration process
2. Use one of the methods above to change the role to `"admin"`
3. Log out and log back in
4. You'll be redirected to `/admin` instead of `/dashboard`

---

## Troubleshooting

### Common Issues

#### 1. "Cannot connect to MongoDB"

**Solution:**
- Verify MongoDB is running: `mongosh` or check services
- Check `MONGO_URI` in `.env` is correct
- For Atlas: Verify IP whitelist and credentials

#### 2. "OTP email not received"

**Solution:**
- Check spam/junk folder
- Verify `EMAIL_USER` and `EMAIL_PASS` in `.env`
- Ensure App Password is generated (not regular Gmail password)
- Check Gmail "Less secure app access" is disabled (use App Password instead)

#### 3. "JWT must be provided"

**Solution:**
- Clear browser localStorage
- Log out and log back in
- Verify `JWT_SECRET` is set in `.env`

#### 4. "Port 5000 already in use"

**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

#### 5. "Module not found" errors

**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 6. Frontend can't connect to backend

**Solution:**
- Verify backend is running on port 5000
- Check CORS configuration in `server/src/server.js`
- Update `baseURL` in `client/src/services/api.js` if needed

---

## Production Deployment

### Environment Variables for Production

Update your `.env` with production values:

```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://...  # Your production MongoDB URL
JWT_SECRET=<generate-a-strong-64-character-secret>
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=https://yourdomain.com  # For CORS
```

### Frontend Deployment (Vercel/Netlify)

1. **Build the frontend**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   npm install -g vercel
   vercel --prod
   ```

3. **Or deploy to Netlify**
   - Connect your GitHub repository
   - Build command: `npm run build`
   - Publish directory: `dist`

### Backend Deployment (Render/Railway)

1. **Update CORS in server.js**
   ```javascript
   app.use(cors({
     origin: 'https://yourdomain.com',  // Your frontend URL
     credentials: true
   }));
   ```

2. **Deploy to Render**
   - Connect your GitHub repository
   - Build command: `npm install`
   - Start command: `node src/server.js`
   - Set environment variables in dashboard

3. **Or deploy to Railway**
   - Connect your GitHub repository
   - Railway auto-detects the build configuration
   - Add environment variables in the Railway dashboard

### Update Frontend API URL

After deploying the backend, update the API URL in `client/src/services/api.js`:

```javascript
const api = axios.create({
  baseURL: 'https://your-backend-url.com/api',  // Update this
  headers: {
    'Content-Type': 'application/json',
  },
});
```

Rebuild and redeploy the frontend.

---

## Security Best Practices

1. **Never commit `.env` files** - Add to `.gitignore`
2. **Use strong JWT secrets** - At least 32 characters, random
3. **Enable HTTPS in production** - Use SSL/TLS certificates
4. **Implement rate limiting** - Already configured in the app
5. **Validate all inputs** - Server-side validation is crucial
6. **Regular dependency updates** - Run `npm audit` and `npm update`
7. **Use environment-specific configs** - Different values for dev/prod

---

## Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [JWT.io](https://jwt.io/) - JWT debugger
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

## Support

If you encounter any issues not covered in this guide:

1. Check the [GitHub Issues](https://github.com/yourusername/secureauth/issues)
2. Create a new issue with:
   - Error message
   - Steps to reproduce
   - Your environment (OS, Node version, etc.)

---

**Happy Coding! 🚀**
