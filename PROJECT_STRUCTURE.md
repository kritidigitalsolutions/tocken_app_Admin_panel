# Real Estate Admin Panel - Project Structure

**Project**: Real Estate Admin Panel  
**Last Updated**: January 15, 2026

---

## 📁 Complete Directory Structure

```
root/
├── .git/                           # Git repository
├── .gitignore                      # Git ignore file
├── API_DOCUMENTATION.md            # API routes documentation
├── PROJECT_STRUCTURE.md            # This file
│
├── backend/                        # Node.js Express Backend
│   ├── .env                        # Environment variables
│   ├── app.js                      # Express app setup
│   ├── server.js                   # Server entry point
│   ├── package.json                # Backend dependencies
│   ├── package-lock.json           # Dependency lock file
│   ├── node_modules/               # Installed packages
│   │
│   ├── config/                     # Configuration files
│   │   ├── cloudinary.js           # Cloudinary image service config
│   │   ├── db.js                   # Database connection
│   │   ├── firebase.js             # Firebase OTP service config
│   │   ├── multer.js               # File upload middleware
│   │   └── radies.js               # Redis cache config
│   │
│   ├── controllers/                # Business logic controllers
│   │   ├── auth.controller.js      # Public OTP authentication
│   │   ├── user.controller.js      # User profile management
│   │   ├── property.controller.js  # Property listing (user)
│   │   ├── lead.controller.js      # Lead creation (user)
│   │   ├── banner.controller.js    # Banner management
│   │   ├── faq.controller.js       # FAQ management
│   │   ├── legal.controller.js     # Legal pages management
│   │   │
│   │   ├── admin/                  # Admin-specific controllers
│   │   │   ├── dashboard.controller.js    # Dashboard analytics
│   │   │   ├── user.controller.js         # Admin user management
│   │   │   ├── property.controller.js     # Admin property management
│   │   │   ├── lead.controller.js        # Admin lead management
│   │   │   ├── faq.controller.js         # Admin FAQ management
│   │   │   ├── plan.controller.js        # Admin plan management
│   │   │   └── audit.controller.js       # Audit logs
│   │   │
│   │   ├── auth/                   # Admin authentication
│   │   │   └── adminAuth.controller.js   # Admin login
│   │   │
│   │   └── user/                   # User-specific features
│   │       ├── plan.controller.js        # User plan purchase
│   │       └── user.controller.js        # User profile management
│   │
│   ├── middleware/                 # Express middlewares
│   │   ├── auth.middleware.js      # JWT authentication check
│   │   ├── admin.middleware.js     # Admin role verification
│   │   ├── permission.middleware.js# Granular permission checks
│   │   ├── plan.middleware.js      # Plan verification
│   │   ├── cache.middleware.js     # Redis caching
│   │   ├── multer.middleware.js    # File upload handling
│   │   └── upload.js               # Upload utility
│   │
│   ├── models/                     # Database models
│   │   ├── user.model.js           # User schema
│   │   ├── admin.model.js          # Admin schema
│   │   ├── property.model.js       # Property listing schema
│   │   ├── lead.model.js           # Lead schema
│   │   ├── plans.model.js          # Subscription plan schema
│   │   ├── Banner.model.js         # Banner schema
│   │   ├── faq.model.js            # FAQ schema
│   │   ├── Legal.model.js          # Legal content schema
│   │   ├── OTP.model.js            # OTP schema
│   │   └── auditLog.model.js       # Audit log schema
│   │
│   ├── routes/                     # API route handlers
│   │   ├── auth.routes.js          # Public auth routes
│   │   ├── user.routes.js          # User routes
│   │   ├── property.routes.js      # User property routes
│   │   ├── lead.routes.js          # User lead routes
│   │   ├── faq.routes.js           # Public FAQ routes
│   │   ├── banner.routes.js        # Public banner routes
│   │   ├── legal.routes.js         # Public legal routes
│   │   │
│   │   ├── admin/                  # Admin routes
│   │   │   ├── index.js            # Admin routes aggregator
│   │   │   ├── dashboard.routes.js # Dashboard routes
│   │   │   ├── user.routes.js      # Admin user management routes
│   │   │   ├── property.routes.js  # Admin property management routes
│   │   │   ├── lead.routes.js      # Admin lead management routes
│   │   │   ├── faq.routes.js       # Admin FAQ management routes
│   │   │   ├── plan.routes.js      # Admin plan management routes
│   │   │   └── audit.routes.js     # Audit log routes
│   │   │
│   │   ├── auth/                   # Admin authentication
│   │   │   └── adminAuth.routes.js # Admin login route
│   │   │
│   │   └── user/                   # User specific routes
│   │       └── plan.routes.js      # User plan purchase routes
│   │
│   └── utils/                      # Utility functions
│       ├── auditLogger.js          # Audit log creation
│       ├── cacheInvalidator.js     # Cache management
│       ├── generateToken.js        # JWT token generation
│       ├── listingScore.js         # Property listing score calculation
│       ├── permissions.js          # Permission checking
│       └── premiumExpiry.js        # Premium property expiry handler
│
├── frontend/                       # React.js Frontend
│   ├── .gitignore                  # Git ignore
│   ├── package.json                # Frontend dependencies
│   ├── package-lock.json           # Dependency lock
│   ├── tailwind.config.js          # Tailwind CSS config
│   ├── postcss.config.js           # PostCSS config
│   ├── README.md                   # Frontend README
│   ├── node_modules/               # Installed packages
│   │
│   ├── public/                     # Static files
│   │   ├── index.html              # Main HTML file
│   │   ├── manifest.json           # PWA manifest
│   │   └── robots.txt              # SEO robots file
│   │
│   └── src/                        # Source code
│       ├── App.js                  # Main App component
│       ├── App.css                 # App styles
│       ├── index.js                # React entry point
│       ├── index.css               # Global styles
│       │
│       ├── api/                    # API call files
│       │   ├── api.js              # Base API instance
│       │   ├── admin.audit.api.js  # Admin audit API calls
│       │   ├── admin.dashboard.api.js # Admin dashboard API calls
│       │   ├── admin.lead.api.js   # Admin lead API calls
│       │   ├── admin.property.api.js # Admin property API calls
│       │   ├── banner.api.js       # Banner API calls
│       │   ├── dashboard.api.js    # User dashboard API calls
│       │   ├── faq.api.js          # FAQ API calls
│       │   ├── legal.api.js        # Legal API calls
│       │   ├── plans.js            # Plans API calls
│       │   └── user.api.js         # User API calls
│       │
│       ├── components/             # Reusable components
│       │   ├── ProtectedRoute.jsx  # Route protection wrapper
│       │   │
│       │   ├── common/             # Common/shared components
│       │   │   ├── Button.jsx      # Button component
│       │   │   ├── Loader.jsx      # Loading spinner
│       │   │   └── Permission.jsx  # Permission checker
│       │   │
│       │   ├── forms/              # Form components
│       │   │   └── (form files)
│       │   │
│       │   ├── modals/             # Modal components
│       │   │   └── (modal files)
│       │   │
│       │   └── tables/             # Table components
│       │       └── (table files)
│       │
│       ├── layout/                 # Layout components
│       │   ├── AdminLayout.jsx     # Admin panel layout wrapper
│       │   ├── Sidebar.jsx         # Sidebar navigation
│       │   └── Topbar.jsx          # Top navigation bar
│       │
│       ├── pages/                  # Page components
│       │   ├── Login.jsx           # Admin login page
│       │   │
│       │   └── admin/              # Admin pages
│       │       ├── audit/          # Audit logs pages
│       │       ├── banners/        # Banner management pages
│       │       ├── dashboard/      # Dashboard pages
│       │       ├── faqs/           # FAQ management pages
│       │       ├── leads/          # Lead management pages
│       │       ├── legal/          # Legal content pages
│       │       ├── plans/          # Plan management pages
│       │       ├── properties/     # Property management pages
│       │       └── users/          # User management pages
│       │
│       └── routes/                 # Route configuration
│           └── AdminRoutes.jsx     # Admin routes setup

```

---

## 📊 Project Statistics

### Backend
- **Routes**: 50+ API endpoints
- **Controllers**: 14 controller files
- **Models**: 10 database schemas
- **Middleware**: 7 custom middlewares
- **Config**: 5 external service configs

### Frontend
- **Pages**: 1 login + admin sections with 9 sub-categories
- **Components**: Reusable common, forms, modals, and tables
- **API Integrations**: 12+ API call files

---

## 🔑 Key Features

### Backend Features
- ✅ OTP-based user authentication
- ✅ Admin authentication with JWT
- ✅ Property listing management (user & admin)
- ✅ Lead management system
- ✅ Subscription plans
- ✅ Premium property listings
- ✅ FAQ management
- ✅ Banner management
- ✅ Legal pages (Privacy, Terms)
- ✅ Audit logging system
- ✅ Role-based access control
- ✅ Granular permissions
- ✅ Redis caching
- ✅ File uploads to Cloudinary

### Frontend Features
- ✅ Admin login
- ✅ Dashboard with analytics
- ✅ User management
- ✅ Property management
- ✅ Lead management
- ✅ Plan management
- ✅ FAQ management
- ✅ Banner management
- ✅ Audit logs
- ✅ Responsive design

---

## 🚀 Technologies Used

### Backend
- **Framework**: Express.js (Node.js)
- **Database**: MongoDB
- **Authentication**: JWT
- **File Storage**: Cloudinary
- **Cache**: Redis
- **OTP Service**: Firebase
- **Job Scheduler**: node-cron

### Frontend
- **Framework**: React.js
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **State Management**: (Context/Redux)

---

## 📝 Notes

- All sensitive data is stored in `.env` file
- Firebase credentials are environment-based for security
- Admin routes require authentication and admin role
- User routes require authentication
- Public routes are accessible without authentication
- Audit logs track all admin actions

#### Frontend Routing
- **Updated**: `frontend/src/routes/AdminRoutes.jsx`
  - Removed commented-out MyListings & MyLeads route imports
  - Cleaned up unused imports
  - Kept: All admin dashboard routes (Dashboard, Users, Plans, FAQs, Banners, Legal, Properties, Leads)

#### Frontend Pages
- **Updated**: `frontend/src/pages/users/Users.jsx`
  - Removed `activeTab` state management
  - Removed tab navigation UI (All Users / My Listings / My Leads)
  - Removed `loadListings()` function
  - Removed `loadLeads()` function
  - Simplified to display only "All Users" data
  - Removed conditional rendering for tab content
  - Kept: User fetching, blocking/unblocking functionality

### ➕ Added / Inserted Items
*No new files or features added in this update*

---

## 📋 Table of Contents

1. [Backend Structure](#backend-structure)
2. [Frontend Structure](#frontend-structure)
3. [Configuration Files](#configuration-files)
4. [Dependencies](#dependencies)
5. [Project Status](#project-status)

---

## 🔧 Backend Structure

### Root Files
```
backend/
├── app.js                              # Express app configuration
├── server.js                           # Main server entry point
├── package.json                        # Backend dependencies (Node.js)
└── gudeforOtpSendFrom Front end Setup.md  # Documentation
```

### Configuration Files (`config/`)
```
config/
├── cloudinary.js                       # Cloudinary cloud storage setup
├── db.js                               # MongoDB database connection
└── firebase.js                         # Firebase configuration
```

### Controllers (`controllers/`)

#### Main Controllers
```
controllers/
├── auth.controller.js                  # Authentication logic (login/signup)
├── banner.controller.js                # Banner management
├── faq.controller.js                   # FAQ management
├── legal.controller.js                 # Legal pages management
├── user.controller.js                  # User profile/general operations
```

#### Admin Controllers (`controllers/admin/`)
```
controllers/admin/
├── dashboard.controller.js             # Admin dashboard data
├── faq.controller.js                   # Admin FAQ management
├── plan.controller.js                  # Admin plans management
└── user.controller.js                  # Admin user management
```

#### Auth Controllers (`controllers/auth/`)
```
controllers/auth/
└── adminAuth.controller.js             # Admin authentication logic
```

#### User Controllers (`controllers/user/`)
```
controllers/user/
└── plan.controller.js                  # User plan management
```

### Firebase Configuration (`firebase/`)
```
firebase/
└── serviceAccountKey.json              # Firebase service account credentials
```

### Middleware (`middleware/`)
```
middleware/
├── admin.middleware.js                 # Admin authorization checks
├── auth.middleware.js                  # General authentication verification
└── plan.middleware.js                  # Plan-related access control
```

### Database Models (`models/`)
```
models/
├── admin.model.js                      # Admin user schema
├── Banner.model.js                     # Banner content schema
├── faq.model.js                        # FAQ entries schema
├── Legal.model.js                      # Legal documents schema
├── OTP.model.js                        # One-Time Password schema
├── plans.model.js                      # Real estate plans schema
└── user.model.js                       # Regular user schema
```

### API Routes (`routes/`)

#### Main Routes
```
routes/
├── auth.routes.js                      # General authentication endpoints
├── banner.routes.js                    # Banner CRUD endpoints
├── faq.routes.js                       # FAQ endpoints
├── legal.routes.js                     # Legal pages endpoints
└── user.routes.js                      # User profile endpoints
```

#### Admin Routes (`routes/admin/`)
```
routes/admin/
├── index.js                            # Admin routes aggregator
├── dashboard.routes.js                 # Admin dashboard endpoints
├── faq.routes.js                       # Admin FAQ management endpoints
├── plan.routes.js                      # Admin plan management endpoints
└── user.routes.js                      # Admin user management endpoints
```

#### Auth Routes (`routes/auth/`)
```
routes/auth/
└── adminAuth.routes.js                 # Admin authentication endpoints
```

#### User Routes (`routes/user/`)
```
routes/user/
└── plan.routes.js                      # User plan interaction endpoints
```

### Utilities (`utils/`)
```
utils/
└── generateToken.js                    # JWT token generation utility
```

---

## 🎨 Frontend Structure

### Root Files
```
frontend/
├── package.json                        # React dependencies
├── postcss.config.js                   # PostCSS configuration for Tailwind
├── tailwind.config.js                  # Tailwind CSS configuration
└── README.md                           # Frontend documentation
```

### Public Assets (`public/`)
```
public/
├── index.html                          # Main HTML file
├── manifest.json                       # PWA manifest
└── robots.txt                          # SEO robots file
```

### Source Code (`src/`)

#### Core Files
```
src/
├── App.js                              # Main React component
├── App.css                             # Global app styles
├── App.test.js                         # React component tests
├── index.js                            # React entry point
├── index.css                           # Global styles
├── reportWebVitals.js                  # Performance monitoring
└── setupTests.js                       # Test configuration
```

#### API Integration (`src/api/`)
```
src/api/
└── api.js                              # Axios configuration & API calls
```

#### Components (`src/components/`)
```
src/components/
├── Dashboard.jsx                       # Dashboard component
├── ProtectedRoute.jsx                  # Route protection wrapper
└── Sidebar.jsx                         # Navigation sidebar
```

#### Pages (`src/Page/`)
```
src/Page/
├── Dashboard.jsx                       # Dashboard page
├── Login.jsx                           # User login page
├── Orders.jsx                          # Orders listing page
├── Plans.jsx                           # Plans/properties page
└── Users.jsx                           # Users management page
```

#### Alternative Pages (`src/pages/`)
```
src/pages/
├── Dashboard.jsx                       # Dashboard page (duplicate)
├── Login.jsx                           # Login page (duplicate)
├── Orders.jsx                          # Orders page (duplicate)
├── Plans.jsx                           # Plans page (duplicate)
└── Users.jsx                           # Users page (duplicate)
```

---

## ⚙️ Configuration Files

### Backend Dependencies
```
Backend (Node.js + Express):
- bcryptjs: Password hashing
- cloudinary: Cloud image storage
- cors: Cross-Origin Resource Sharing
- dotenv: Environment variables
- express: Web framework
- firebase-admin: Firebase backend integration
- jsonwebtoken: JWT authentication
- mongoose: MongoDB ODM
- multer: File upload handling
- nodemon: Development auto-reload
```

### Frontend Dependencies
```
Frontend (React):
- react: UI framework
- react-dom: DOM rendering
- react-router-dom: Client-side routing
- axios: HTTP client
- react-scripts: Create React App scripts
- @testing-library/react: Testing utilities
- tailwindcss: Utility-first CSS framework
- postcss: CSS transformation
```

---

## 📊 Project Status

### Backend Status
| Component | Status | Notes |
|-----------|--------|-------|
| Authentication | ✅ Configured | JWT + Firebase Admin |
| Database | ✅ Configured | MongoDB via Mongoose |
| Cloud Storage | ✅ Configured | Cloudinary |
| User Management | ✅ Implemented | Basic CRUD + admin |
| Admin Panel | ✅ Implemented | Dashboard, FAQs, Plans, Users |
| Plans System | ✅ Implemented | User + Admin management |
| FAQs | ✅ Implemented | User + Admin management |
| Legal Pages | ✅ Implemented | User + Admin management |
| Banners | ✅ Implemented | User + Admin management |
| Middleware | ✅ Implemented | Auth, Admin, Plan protections |
| OTP System | ✅ Schema Ready | Model available |
| Documentation | 🗑️ Cleaned | OTP guide removed |

### Frontend Status
| Component | Status | Notes |
|-----------|--------|-------|
| React Setup | ✅ Configured | React 19.2.3 + React Router 7.12 |
| Styling | ✅ Configured | Tailwind CSS + PostCSS |
| API Integration | ✅ Set Up | Axios configured |
| Routing | ✅ Streamlined | Admin-only focus, user routes removed |
| Authentication | ✅ Implemented | Login page + Protected routes |
| Admin Pages | ✅ Implemented | Dashboard, Users, Plans, FAQs, Banners, Legal, Properties, Leads |
| Dashboard | ✅ Implemented | Admin dashboard |
| Sidebar Navigation | ✅ Implemented | Admin layout with navigation |
| Testing | 🗑️ Cleaned | Test files removed (non-essential) |
| User Routes | 🗑️ Removed | Focused on admin panel only |
| Duplicate Pages | ⚠️ Partial | Consolidated components, kept page structure organized |

---

## 🚀 Scripts & Commands

### Backend
```bash
npm start   # Run server in production
npm dev     # Run server with nodemon (development)
```

### Frontend
```bash
npm start   # Start development server
npm build   # Build for production
npm test    # Run tests
npm eject   # Eject from Create React App
```

---

## ⚠️ Known Issues & To-Do

### Completed Tasks (✅ January 14, 2026)
- [x] **Component Consolidation**: Removed duplicate components (Dashboard, Sidebar)
- [x] **User Routes Cleanup**: Removed UserRoutes.jsx and user-specific layouts
- [x] **Test Files Cleanup**: Removed App.test.js, setupTests.js (non-essential for project)
- [x] **Code Cleanup**: Removed unused imports and test configuration
- [x] **App.js Simplification**: Removed UserRoutes import and /user path
- [x] **Users Page Refactor**: Removed multi-tab functionality, focused on "All Users" view
- [x] **Documentation Removal**: Deleted OTP setup guide from backend root

### Remaining Items
- [ ] **Page Structure**: Old `src/Page/` folder still exists alongside `src/pages/` (consider full removal)
- [ ] **Environment variables (.env files)**: Setup documentation needed
- [ ] **API endpoint documentation**: Comprehensive API reference needed
- [ ] **Error handling standardization**: Consistent error handling patterns needed
- [ ] **CORS configuration review**: Verify CORS settings for production
- [ ] **User listing/leads feature**: Consider if user routes should be re-implemented in future
- [ ] **Testing infrastructure**: Re-add tests if needed for CI/CD pipeline

---

## 📁 Directory Tree Summary

```
demo-real-estate-site/
├── backend/
│   ├── config/         (3 files)
│   ├── controllers/    (8 files across 3 subdirs)
│   ├── firebase/       (1 file)
│   ├── middleware/     (3 files)
│   ├── models/         (7 files)
│   ├── routes/         (7 files across 3 subdirs)
│   ├── utils/          (1 file)
│   ├── app.js
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── public/         (3 files)
    ├── src/
    │   ├── api/        (multiple API files)
    │   ├── components/ (Reorganized - no duplicates)
    │   │   ├── common/
    │   │   ├── forms/
    │   │   ├── modals/
    │   │   ├── tables/
    │   │   └── ProtectedRoute.jsx
    │   ├── layout/     (AdminLayout, Topbar - UserLayout REMOVED)
    │   ├── pages/      (Organized by feature)
    │   │   ├── admin/
    │   │   ├── banners/
    │   │   ├── dashboard/
    │   │   ├── faqs/
    │   │   ├── legal/
    │   │   ├── plans/
    │   │   ├── users/
    │   │   ├── Dashboard.jsx
    │   │   ├── Login.jsx
    │   │   └── Orders.jsx
    │   ├── routes/     (AdminRoutes only - UserRoutes REMOVED)
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    ├── package.json
    ├── tailwind.config.js
    └── postcss.config.js
```

**Changes from Previous Structure:**
- ✅ UserRoutes.jsx removed (user routing consolidated/removed)
- ✅ UserLayout.jsx and UserSidebar.jsx removed
- ✅ Duplicate components removed (Dashboard.jsx, Sidebar.jsx from /components/)
- ✅ Test files removed (App.test.js, setupTests.js)
- ✅ reportWebVitals.js removed
- ✅ logo.svg removed

---

## 🔗 Key Integration Points

### Frontend → Backend
- API calls via `src/api/api.js`
- Authentication: `/auth/login` endpoint
- Protected routes: `ProtectedRoute.jsx`

### Backend → Database
- MongoDB connections via `config/db.js`
- Mongoose models in `models/` directory

### Backend → External Services
- Firebase: `config/firebase.js`
- Cloudinary: `config/cloudinary.js`

---

**Generated**: January 12, 2026  
**Last Updated**: January 14, 2026  
**Purpose**: Project structure documentation and status tracking  

---

### Summary of Changes (Jan 12 → Jan 14, 2026)

**Total Changes:**
- 🗑️ **Deleted**: 13 files (test files, unused components, user routes)
- ✏️ **Modified**: 4 files (App.js, index.js, AdminRoutes.jsx, Users.jsx)
- ➕ **Added**: 0 new files
- **Net Impact**: Cleaner, more focused admin-only panel with removed test infrastructure
