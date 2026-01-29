# 📁 Token App Admin Panel - Project Structure

**Last Updated:** January 28, 2026  
**Version:** 2.0

---

## 🗂️ Root Directory Structure

```
tocken_app_Admin_panel/
├── 📁 backend/                     # Node.js Express API Server
├── 📁 frontend/                    # React.js Admin Panel
├── 📄 API_DOCUMENTATION.md         # Complete API Documentation
├── 📄 PROJECT_STRUCTURE.md         # This file
├── 📄 README.md                    # Project Overview
└── 📄 .gitignore                   # Git ignore rules
```

---

# 🖥️ Backend Structure

```
backend/
├── 📄 server.js                    # Entry point - starts the server
├── 📄 app.js                       # Express app configuration & routes
├── 📄 package.json                 # Dependencies
├── 📄 .env                         # Environment variables
├── 📄 vercel.json                  # Vercel deployment config
│
├── 📁 config/                      # ⚙️ Configuration Files
│   ├── 📄 db.js                    # MongoDB connection (Mongoose)
│   ├── 📄 firebase.js              # Firebase Admin SDK initialization
│   ├── 📄 multer.js                # Multer config for file uploads (memory storage)
│   ├── 📄 cloudinary.js            # ❌ Deprecated - replaced by Firebase
│   └── 📄 radies.js                # Redis cache configuration
│
├── 📁 firebase/                    # 🔥 Firebase Configuration
│   └── 📄 serviceAccountKey.json   # Firebase service account credentials
│
├── 📁 controllers/                 # 🎮 Business Logic Controllers
│   ├── 📄 auth.controller.js       # User OTP authentication (send/verify)
│   ├── 📄 user.controller.js       # User profile, privacy, deletion
│   ├── 📄 property.controller.js   # Property CRUD, photo upload (Firebase)
│   ├── 📄 propertyFilter.controller.js  # Property search & filtering
│   ├── 📄 bookmark.controller.js   # User bookmarks management
│   ├── 📄 notification.controller.js    # User notifications
│   ├── 📄 lead.controller.js       # Contact lead creation
│   ├── 📄 plan.controller.js       # Premium plans for users
│   ├── 📄 faq.controller.js        # FAQs listing
│   ├── 📄 feedback.controller.js   # User feedback submission
│   ├── 📄 banner.controller.js     # Banner display for users
│   ├── 📄 wallpaper.controller.js  # Wallpaper images (Firebase)
│   ├── 📄 aboutUs.controller.js    # About us content
│   ├── 📄 legal.controller.js      # Privacy policy & terms
│   │
│   ├── 📁 auth/                    # Admin Authentication
│   │   └── 📄 adminAuth.controller.js   # Admin login
│   │
│   └── 📁 admin/                   # 👑 Admin Controllers
│       ├── 📄 dashboard.controller.js   # Analytics & statistics
│       ├── 📄 user.controller.js        # User management (block/delete)
│       ├── 📄 property.controller.js    # Property approval/rejection
│       ├── 📄 lead.controller.js        # Lead management
│       ├── 📄 plan.controller.js        # Plan CRUD
│       ├── 📄 faq.controller.js         # FAQ CRUD
│       ├── 📄 feedback.controller.js    # Feedback management
│       ├── 📄 notification.controller.js# Push notification management
│       ├── 📄 banner.controller.js      # Banner CRUD (Firebase upload)
│       ├── 📄 bookmark.controller.js    # Bookmark analytics
│       ├── 📄 audit.controller.js       # Audit logs
│       └── 📄 deletionRequest.controller.js  # Account deletion requests
│
├── 📁 models/                      # 📊 MongoDB Schemas (Mongoose)
│   ├── 📄 user.model.js            # User schema (with username, privacy)
│   ├── 📄 property.model.js        # Property schema (geo-coordinates)
│   ├── 📄 admin.model.js           # Admin user schema
│   ├── 📄 OTP.model.js             # OTP storage
│   ├── 📄 Banner.model.js          # Banner schema (Firebase fileName)
│   ├── 📄 wallpaper.model.js       # Wallpaper schema (Firebase fileName)
│   ├── 📄 notification.model.js    # Notification schema
│   ├── 📄 lead.model.js            # Contact leads
│   ├── 📄 plans.model.js           # Premium plans
│   ├── 📄 faq.model.js             # FAQs
│   ├── 📄 feedback.model.js        # User feedback
│   ├── 📄 aboutUs.model.js         # About us content
│   ├── 📄 Legal.model.js           # Privacy & Terms
│   └── 📄 auditLog.model.js        # Admin action logs
│
├── 📁 routes/                      # 🛣️ API Routes
│   ├── 📄 auth.routes.js           # /api/auth/*
│   ├── 📄 user.routes.js           # /api/users/*
│   ├── 📄 property.routes.js       # /api/properties/*
│   ├── 📄 location.routes.js       # /api/location/*
│   ├── 📄 bookmark.routes.js       # /api/bookmarks/*
│   ├── 📄 notification.routes.js   # /api/notifications/*
│   ├── 📄 lead.routes.js           # /api/leads/*
│   ├── 📄 plan.routes.js           # /api/plans/*
│   ├── 📄 faq.routes.js            # /api/faqs/*
│   ├── 📄 feedback.routes.js       # /api/feedback/*
│   ├── 📄 banner.routes.js         # /api/banners/*
│   ├── 📄 wallpaper.routes.js      # /api/wallpapers/*
│   ├── 📄 legal.routes.js          # /api/legal/*
│   ├── 📄 aboutUs.routes.js        # /api/about-us/*
│   │
│   └── 📁 admin/                   # 👑 Admin Routes
│       ├── 📄 auth.routes.js       # /api/admin/auth/*
│       ├── 📄 dashboard.routes.js  # /api/admin/dashboard/*
│       ├── 📄 user.routes.js       # /api/admin/users/*
│       ├── 📄 property.routes.js   # /api/admin/properties/*
│       ├── 📄 lead.routes.js       # /api/admin/leads/*
│       ├── 📄 plan.routes.js       # /api/admin/plans/*
│       ├── 📄 faq.routes.js        # /api/admin/faqs/*
│       ├── 📄 feedback.routes.js   # /api/admin/feedbacks/*
│       ├── 📄 notification.routes.js    # /api/admin/notifications/*
│       ├── 📄 banner.route.js      # /api/admin/banners/*
│       ├── 📄 wallpaper.routes.js  # /api/admin/wallpapers/*
│       ├── 📄 bookmark.routes.js   # /api/admin/bookmarks/*
│       ├── 📄 aboutUs.routes.js    # /api/admin/about-us/*
│       ├── 📄 audit.routes.js      # /api/admin/audit/*
│       └── 📄 deletionRequest.routes.js  # /api/admin/deletion-requests/*
│
├── 📁 middleware/                  # 🛡️ Middleware Functions
│   ├── 📄 auth.middleware.js       # JWT token verification
│   ├── 📄 admin.middleware.js      # Admin role check
│   ├── 📄 permission.middleware.js # Permission-based access
│   ├── 📄 multer.middleware.js     # File upload (memory storage)
│   ├── 📄 upload.js                # Alternative upload config
│   ├── 📄 cache.middleware.js      # Redis caching
│   └── 📄 plan.middleware.js       # Plan verification
│
└── 📁 utils/                       # 🔧 Utility Functions
    ├── 📄 firebaseUpload.js        # ✅ Firebase Storage upload/delete
    ├── 📄 generateToken.js         # JWT token generation
    ├── 📄 listingScore.js          # Property listing score calculation
    ├── 📄 premiumExpiry.js         # Premium plan expiry check
    ├── 📄 permissions.js           # Permission definitions
    ├── 📄 auditLogger.js           # Admin action logging
    ├── 📄 cacheInvalidator.js      # Cache clearing
    └── 📄 fixDuplicateIndex.js     # MongoDB index fix utility
```

---

# 💻 Frontend Structure

```
frontend/
├── 📄 package.json                 # Dependencies (React, Axios, etc.)
├── 📄 tailwind.config.js           # Tailwind CSS configuration (if used)
│
└── 📁 src/
    ├── 📄 index.js                 # React entry point
    ├── 📄 index.css                # Global styles
    ├── 📄 App.js                   # Main app component with routes
    ├── 📄 App.css                  # App-level styles
    │
    ├── 📁 api/                     # 🌐 API Service Layer
    │   ├── 📄 api.js               # Axios instance configuration
    │   ├── 📄 authApi.js           # Admin authentication APIs
    │   ├── 📄 userApi.js           # User management APIs
    │   ├── 📄 propertyApi.js       # Property management APIs
    │   ├── 📄 bannerApi.js         # Banner APIs
    │   ├── 📄 wallpaperApi.js      # Wallpaper APIs
    │   ├── 📄 planApi.js           # Plan management APIs
    │   ├── 📄 faqApi.js            # FAQ APIs
    │   ├── 📄 feedbackApi.js       # Feedback APIs
    │   ├── 📄 leadApi.js           # Lead management APIs
    │   ├── 📄 notificationApi.js   # Notification APIs
    │   ├── 📄 bookmarkApi.js       # Bookmark APIs
    │   ├── 📄 dashboardApi.js      # Dashboard analytics APIs
    │   ├── 📄 legalApi.js          # Legal content APIs
    │   ├── 📄 aboutUsApi.js        # About us APIs
    │   └── 📄 deletionRequestApi.js # Account deletion APIs
    │
    ├── 📁 context/                 # 🔄 React Context
    │   ├── 📄 AuthContext.jsx      # Auth state management
    │   └── 📄 ThemeContext.jsx     # Dark/Light theme toggle
    │
    ├── 📁 components/              # 🧩 Reusable Components
    │   ├── 📄 ProtectedRoute.jsx   # Auth route wrapper
    │   ├── 📁 common/              # Common UI components
    │   │   ├── 📄 Button.jsx
    │   │   ├── 📄 Input.jsx
    │   │   ├── 📄 Modal.jsx
    │   │   └── 📄 Loader.jsx
    │   ├── 📁 forms/               # Form components
    │   ├── 📁 modals/              # Modal components
    │   └── 📁 tables/              # Table components
    │
    ├── 📁 layout/                  # 📐 Layout Components
    │   ├── 📄 AdminLayout.jsx      # Main admin layout with sidebar
    │   ├── 📄 Sidebar.jsx          # Admin navigation sidebar
    │   └── 📄 Header.jsx           # Top navigation bar
    │
    ├── 📁 pages/                   # 📄 Page Components
    │   ├── 📄 Login.jsx            # Admin login page
    │   │
    │   └── 📁 admin/               # 👑 Admin Pages
    │       ├── 📁 dashboard/       # Dashboard analytics
    │       ├── 📁 users/           # User management
    │       ├── 📁 properties/      # Property management & details
    │       ├── 📁 banners/         # Banner management
    │       ├── 📁 wallpapers/      # Wallpaper management & details
    │       ├── 📁 plans/           # Premium plan management
    │       ├── 📁 faqs/            # FAQ management
    │       ├── 📁 feedbacks/       # Feedback management
    │       ├── 📁 leads/           # Lead management
    │       ├── 📁 notifications/   # Notification management
    │       ├── 📁 bookmarks/       # Bookmark analytics
    │       ├── 📁 legal/           # Privacy & Terms editor
    │       ├── 📁 aboutUs/         # About us editor
    │       ├── 📁 audit/           # Audit log viewer
    │       └── 📁 deletionRequests/ # Account deletion requests
    │
    ├── 📁 routes/                  # 🛣️ Route Configuration
    │   └── 📄 routes.jsx           # App routes definition
    │
    └── 📁 utils/                   # 🔧 Utility Functions
        └── 📄 helpers.js           # Helper functions
```

---

## 🔧 Key Technologies

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework |
| **MongoDB** | Database (with Mongoose ODM) |
| **Firebase Storage** | Image/file storage (replaced Cloudinary) |
| **JWT** | Authentication tokens |
| **Multer** | File upload middleware (memory storage) |
| **Redis** | Caching (optional) |
| **Node-cron** | Scheduled tasks |

### Frontend
| Technology | Purpose |
|------------|---------|
| **React.js** | UI library |
| **React Router** | Client-side routing |
| **Axios** | HTTP client |
| **Lucide React** | Icon library |
| **Tailwind CSS** | Styling (if configured) |

---

## 🔥 Firebase Storage Integration

Images are now stored in **Firebase Storage** instead of Cloudinary:

```
Firebase Storage Buckets:
├── /banners/           # App banners
├── /wallpapers/        # Wallpaper images
└── /properties/        # Property photos
```

**Upload Flow:**
1. File uploaded via Multer (stored in memory as Buffer)
2. `uploadToFirebase()` uploads Buffer to Firebase Storage
3. File is made public, URL returned
4. `fileName` stored in DB for future deletion

---

## 🗄️ Database Schema Overview

### Collections:
| Collection | Purpose |
|------------|---------|
| `users` | App users (phone auth, profile) |
| `admins` | Admin users (email/password) |
| `properties` | Property listings |
| `banners` | App banners |
| `wallpapers` | Wallpaper images |
| `notifications` | Push notifications |
| `leads` | Contact leads |
| `plans` | Premium plans |
| `faqs` | Frequently asked questions |
| `feedbacks` | User feedback |
| `aboutuses` | About us content |
| `legals` | Privacy & Terms |
| `auditlogs` | Admin action logs |
| `otps` | OTP storage (temp) |

---

## 🚀 Running the Project

### Backend
```bash
cd backend
npm install
npm run dev      # Development (nodemon)
npm start        # Production
```

### Frontend
```bash
cd frontend
npm install
npm start        # Development (port 3000)
npm run build    # Production build
```

---

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_jwt_secret
FIREBASE_STORAGE_BUCKET=your-bucket.appspot.com
NODE_ENV=development
```

---

## 📊 API Base URLs

| Environment | Backend URL | Frontend URL |
|-------------|-------------|--------------|
| Development | http://localhost:5000 | http://localhost:3000 |
| Production | https://api.yourapp.com | https://admin.yourapp.com |

---

## ✅ Features Implemented

### User App APIs (Flutter)
- ✅ Phone OTP Authentication
- ✅ User Profile Management
- ✅ Property Listing (CRUD)
- ✅ Property Search & Filter
- ✅ Nearby Properties (Geospatial)
- ✅ Bookmarks
- ✅ Notifications
- ✅ Contact Leads
- ✅ Premium Plans
- ✅ Feedback System
- ✅ Phone Privacy Toggle
- ✅ Account Deletion Request
- ✅ Location Search

### Admin Panel (React)
- ✅ Admin Authentication
- ✅ Dashboard Analytics
- ✅ User Management (Block/Delete)
- ✅ Property Approval/Rejection
- ✅ Banner Management (Firebase)
- ✅ Wallpaper Management (Firebase)
- ✅ Plan Management
- ✅ FAQ Management
- ✅ Feedback Management
- ✅ Lead Management
- ✅ Notification Management
- ✅ Bookmark Analytics
- ✅ About Us Editor
- ✅ Privacy/Terms Editor
- ✅ Audit Logs
- ✅ Account Deletion Requests

---

**Documentation Generated:** January 28, 2026
