# SecureAuth

> **Next-generation authentication system with multi-factor verification and enterprise-grade security**

SecureAuth is a modern, full-stack authentication platform built with the MERN stack, featuring military-grade encryption, OTP-based multi-factor authentication, role-based access control, and real-time security monitoring.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![React](https://img.shields.io/badge/react-19.2.0-blue)

## ✨ Features

### 🔐 Security
- **Military-Grade Encryption**: AES-256 encryption with bcrypt password hashing
- **Multi-Factor Authentication**: OTP verification via email with configurable expiration
- **JWT Token Management**: Secure, stateless authentication with automatic expiration
- **Rate Limiting**: Built-in protection against brute-force attacks
- **IP & User Agent Tracking**: Comprehensive login attempt logging

### 👥 User Management
- **Role-Based Access Control (RBAC)**: Admin and User roles with distinct permissions
- **User Registration & Verification**: Secure account creation with email OTP verification
- **Profile Management**: User dashboard with account information
- **Admin Dashboard**: System-wide user management and activity logs

### 🎨 Modern UI/UX
- **Beautiful Landing Page**: Professional marketing page with animated SVG graphics
- **Dark Theme Design**: High-tech aesthetic with cyan/blue accent colors
- **Responsive Layout**: Mobile-first design that works on all devices
- **Smooth Animations**: Powered by Framer Motion for fluid user interactions
- **Modals & Forms**: Professional contact forms and legal documentation

### 📊 Admin Features
- **User Database**: Complete overview of all registered users
- **Activity Logs**: Real-time monitoring of login attempts and security events
- **IP Tracking**: View login locations and detect suspicious activity
- **User Roles Management**: Easily identify admins vs. regular users

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with hooks and modern features
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library for smooth transitions
- **React Router** - Client-side routing
- **React Toastify** - Beautiful notification system
- **Axios** - HTTP client with interceptors

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Fast, minimalist web framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - Elegant MongoDB object modeling
- **JWT** - Secure token-based authentication
- **Bcrypt** - Password hashing algorithm
- **Nodemailer** - Email delivery for OTP codes
- **Helmet** - Security middleware for HTTP headers
- **CORS** - Cross-origin resource sharing

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- MongoDB (local or Atlas)
- Gmail account (for OTP emails)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/secureauth.git
   cd secureauth
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # In /server directory, create .env file
   cp .env.example .env
   ```

4. **Run the application**
   ```bash
   # Terminal 1 - Start backend (from /server)
   npm run dev

   # Terminal 2 - Start frontend (from /client)
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## 📁 Project Structure

```
secureauth/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Page components
│   │   │   ├── Landing.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── OTPVerify.jsx
│   │   │   ├── DashboardUser.jsx
│   │   │   └── DashboardAdmin.jsx
│   │   ├── services/      # API integration
│   │   │   └── api.js
│   │   ├── App.jsx        # Root component
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles
│   └── package.json
│
├── server/                # Node.js backend
│   ├── src/
│   │   ├── models/        # Mongoose schemas
│   │   │   ├── User.js
│   │   │   ├── OTP.js
│   │   │   └── Log.js
│   │   ├── routes/        # API endpoints
│   │   │   ├── auth.js
│   │   │   ├── user.js
│   │   │   └── admin.js
│   │   ├── middleware/    # Express middleware
│   │   │   └── authMiddleware.js
│   │   ├── utils/         # Helper functions
│   │   │   └── sendOTP.js
│   │   └── server.js      # Express app
│   ├── .env               # Environment variables
│   └── package.json
│
└── README.md
```

## 🔑 Environment Variables

See [SETUP.md](./SETUP.md) for detailed configuration instructions.

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login (sends OTP)
- `POST /api/auth/verify-otp` - Verify OTP and get JWT
- `POST /api/auth/resend-otp` - Resend OTP code

### User
- `GET /api/user/me` - Get current user profile (Protected)

### Admin
- `GET /api/admin/users` - Get all users (Admin only)
- `GET /api/admin/logs` - Get activity logs (Admin only)

## 🔒 Security Features

- **Password Hashing**: Bcrypt with 10 salt rounds
- **JWT Tokens**: 24-hour expiration with HTTP-only cookies (recommended)
- **OTP Expiration**: 5-minute validity window
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS Protection**: Configured for specific origins
- **Helmet**: Security headers automatically applied
- **Input Validation**: Server-side validation for all endpoints

## 🎨 UI Screenshots

### Landing Page
Modern, professional landing page with animated hero section and feature cards.

### Authentication Flow
1. **Login** - Split-screen design with security-focused visual
2. **OTP Verification** - Clean, centered verification interface
3. **Dashboard** - Role-specific dashboards with real-time data

## 🚢 Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy the /dist folder
```

### Backend (Render/Railway/Heroku)
```bash
cd server
# Set environment variables on platform
# Deploy from /server directory
```

### Database (MongoDB Atlas)
- Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Update `MONGO_URI` in environment variables

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- JWT authentication patterns
- MERN stack community
- Tailwind CSS team
- Framer Motion library

---

**Built with ❤️ and secure coding practices**
