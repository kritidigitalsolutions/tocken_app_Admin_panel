# Real Estate Admin Panel - Project Structure

**Project**: Real Estate Admin Panel  
**Last Updated**: January 21, 2026
**Status**: Active Development

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
│   │   ├── multer.js               # File upload middleware
│   │   └── radies.js               # Redis cache config
│   │
│   ├── controllers/                # Business logic controllers
│   │   ├── auth.controller.js           # Public OTP authentication
│   │   ├── user.controller.js           # User profile management
│   │   ├── property.controller.js       # Property listing (user)
│   │   ├── propertyFilter.controller.js # Property filtering & search
│   │   ├── lead.controller.js           # Lead creation (user)
│   │   ├── banner.controller.js         # Banner management
│   │   ├── bookmark.controller.js       # Bookmark/favorite management
│   │   ├── notification.controller.js   # Notification management
│   │   ├── feedback.controller.js       # Feedback/review management
│   │   ├── plan.controller.js           # Plan management
│   │   ├── faq.controller.js            # FAQ management
│   │   ├── legal.controller.js          # Legal pages management
│   │   ├── aboutUs.controller.js        # About Us pages management
│   │   │
│   │   ├── admin/                       # Admin-specific controllers (12 files)
│   │   │   ├── dashboard.controller.js       # Dashboard analytics
│   │   │   ├── user.controller.js            # Admin user management
│   │   │   ├── property.controller.js        # Admin property management
│   │   │   ├── lead.controller.js            # Admin lead management
│   │   │   ├── faq.controller.js             # Admin FAQ management
│   │   │   ├── plan.controller.js            # Admin plan management
│   │   │   ├── audit.controller.js           # Audit logs
│   │   │   ├── banner.controller.js          # Admin banner management
│   │   │   ├── bookmark.controller.js        # Admin bookmark management
│   │   │   ├── notification.controller.js    # Admin notification management
│   │   │   ├── feedback.controller.js        # Admin feedback management
│   │   │   └── deletionRequest.controller.js # Deletion request handling
│   │   │
│   │   ├── auth/                        # Admin authentication
│   │   │   └── adminAuth.controller.js  # Admin login
│   │
│   ├── middleware/                 # Express middlewares
│   │   ├── auth.middleware.js      # JWT authentication check
│   │   ├── admin.middleware.js     # Admin role veri (13 files)
│   │   ├── user.model.js           # User schema
│   │   ├── admin.model.js          # Admin schema
│   │   ├── property.model.js       # Property listing schema (multi-type support)
│   │   ├── lead.model.js           # Lead schema
│   │   ├── plans.model.js          # Subscription plan schema
│   │   ├── Banner.model.js         # Banner schema
│   │   ├── faq.model.js            # FAQ schema
│   │   ├── Legal.model.js          # Legal content schema
│   │   ├── notification.model.js   # Notification schema
│   │   ├── OTP.model.js            # OTP schema
│   │   ├── auditLog.model.js       # Audit log schema
│   │   ├── feedback.model.js       # Feedback schema
│   │   └── aboutUs.model.js        # About Us contentlisting schema
│   │   ├── lead.model.js           # Lead schema
│   │   ├── plans.model.js          # Subscription plan schema
│   │   ├── Banner.model.js         # Banner schema
│   │   ├── faq.model.js            # FAQ schema
│   │   ├── Legal.model.js          # Legal content schema
│   │   ├── OTP.model.js            # OTP schema (12 + 15 admin routes)
│   │   ├── auth.routes.js              # Public auth routes
│   │   ├── user.routes.js              # User routes
│   │   ├── property.routes.js          # User property routes
│   │   ├── lead.routes.js              # User lead routes
│   │   ├── faq.routes.js               # Public FAQ routes
│   │   ├── banner.routes.js            # Public banner routes
│   │   ├── bookmark.routes.js          # Public bookmark routes
│   │   ├── notification.routes.js      # User notification routes
│   │   ├── feedback.routes.js          # User feedback routes
│   │   ├── plan.routes.js              # Public plan routes
│   │   ├── legal.routes.js             # Public legal routes
│   │   ├── aboutUs.routes.js           # Public about us routes
│   │   │
│   │   ├── admin/                      # Admin routes (15 files)
│   │   │   ├── index.js                # Admin routes aggregator
│   │   │   ├── dashboard.routes.js     # Dashboard routes
│   │   │   ├── user.routes.js          # Admin user management routes
│   │   │   ├── property.routes.js      # Admin property management routes
│   │   │   ├── lead.routes.js          # Admin lead management routes
│   │   │   ├── faq.routes.js           # Admin FAQ management routes
│   │   │   ├── plan.routes.js          # Admin plan management routes
│   │   │   ├── audit.routes.js         # Audit log routes
│   │   │   ├── banner.route.js         # Admin banner routes
│   │   │   ├── bookmark.routes.js      # Admin bookmark management routes
│   ├── middleware/                 # Express middlewares (5+ files)
│   │   ├── auth.middleware.js      # JWT authentication verification
│   │   ├── admin.middleware.js     # Admin role verification
│   │   ├── permission.middleware.js# Granular permission checks
│   │   ├── plan.middleware.js      # Plan verification
│   │   ├── cache.middleware.js     # Redis caching
│   │   ├── multer.middleware.js    # File upload handling
│   │   └── upload.js               # Upload utility
│   │
│   │   │   ├── notification.routes.js  # Admin notification routes
│   │   │   ├── feedback.routes.js      # Admin feedback routes
│   │   │   ├── auth.routes.js          # Admin auth routes
│   │   │   ├── deletionRequest.routes.js # Deletion request routes
│   │   │   └── aboutUs.routes.js       # Admin about us
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
│   API Endpoints**: 70+ endpoints across all features
- **Controllers**: 27 controller files (15 main + 12 admin)
- **Models**: 13 database schemas
- **Middleware**: 7 custom middlewares
- **Routes**: 27 route files (12 main + 15 admin)
- **Config**: 4 external service configs (DB, Cloudinary, Redis, Multer)
- **Utilities**: 6 helper functions

### Frontend
- **Pages**: 1 login page + 11 admin dashboard sections (Dashboard, Users, Properties, Leads, Plans, FAQs, Banners, Legal, Notifications, Feedbacks, About Us, Audit Logs, Deletion Requests)
- **Components**: Common components, forms, modals, tables, layout components
- **API Integrations**: 12+ API call modules
- **Styling**: Tailwind CSS with PostCSSn routes setup

```

---

## 📊 Project Statistics
 (Firebase)
- ✅ Admin authentication with JWT
- ✅ Multi-type property listing (RENT, SELL, PG, Co-Living)
- ✅ Advanced property filtering & search
- ✅ Lead management system
- ✅ Bookmark/favorite properties
- ✅ Notification system (push & in-app)
- ✅ Feedback & review management
- ✅ Subscription plans
- ✅ Premium property listings
- ✅ FAQ management
- ✅ Banner management
- ✅ Legal pages (Privacy, Terms, About Us)
- ✅ Deletion request handling
- ✅ Audit logging system
- ✅ Role-based access control (RBAC)
- ✅ Granular permissions system
- ✅ Redis caching for performance
- ✅ File uploads to Cloudinary
- ✅ Scheduled tasks (node-cron)

### Frontend Features
- ✅ Admin login with JWT
- ✅ Dashboard with analytics & KPIs
- ✅ User management (view, block, delete)
- ✅ Property management (view, status, premium, restore)
- ✅ Lead management & spam handling
- ✅ Plan management (create, update, delete)
- ✅ FAQ management (create, update, delete)
- ✅ Banner management with toggle
- ✅ Notification management
- ✅ Feedback & review moderation
- ✅ Runtime**: Node.js v18+
- **Framework**: Express.js 5.2.1
- **Database**: MongoDB with Mongoose 9.1.2 ODM
- **Authentication**: JWT (jsonwebtoken 9.0.3)
- **Password**: bcryptjs 3.0.3
- **File Storage**: Cloudinary 2.8.0
- **File Upload**: Multer 2.0.2 with Cloudinary storage
- **Cache**: Redis
- **Job Scheduler**: node-cron 4.2.1
- **CORS**: cors 2.8.5
- **Environment**: dotenv 17.2.3
- **Development**: nodemon 3.1.11

### Frontend
- **Framework**: React 19.2.3
- **Routing**: React Router DOM 7.12.0
- **Styling**: Tailwind CSS 3.4.19 with PostCSS 8.5.6
- **HTTP Client**: Axios 1.13.2
- **UI Components**: Lucide React 0.562.0
- **Notifications**: React Hot Toast 2.6.0
- **Build Tool**: Create React App (react-scripts 5.0.1)
- **Testing**: @testing-library/react 16.3.1
- **State Management**: React Context API (built-in
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
- **Job Scheduler**: node-cron

### Frontend
- **Framework**: React.js
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **State Management**: (Context/Redux)

---

## 📝 Notes

- All sensitive data is stored in `.env` file
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
└── multer.js                           # Multer file upload setup
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
| Authentication | ✅ Configured | JWT |
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
| Documentation | ✅ Cleaned | Firebase removed |

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
    │   ├── index.js21, 2026  
**Purpose**: Project structure documentation and status tracking  
**Version**: 2.0 (Comprehensive multi-feature real estate platform)
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
- ✅ logo.svg removed21, 2026)

**Complete Platform Features:**
- ✅ Multi-listing property types (RENT, SELL, PG, Co-Living)
- ✅ Advanced user management & authentication
- ✅ Lead & booking system
- ✅ Subscription plans
- ✅ Notification & feedback system
- ✅ Admin dashboard with analytics
- ✅ Audit logging for compliance
- ✅ Role-based access control
- ✅ File uploads to cloud storage
- ✅ Caching for performance
- ✅ Responsive admin interface

**Documentation Status**: All markdown files updated with current accurate project structure and capabilities as of January 21, 2026.
- API calls via `src/api/api.js`
- Authentication: `/auth/login` endpoint
- Protected routes: `ProtectedRoute.jsx`

### Backend → Database
- MongoDB connections via `config/db.js`
- Mongoose models in `models/` directory

### Backend → External Services
- Cloudinary: `config/cloudinary.js`

---

**Generated**: January 12, 2026  
**Last Updated**: January 22, 2026  
**Purpose**: Project structure documentation and status tracking  

---

### Summary of Changes (Jan 12 → Jan 14, 2026)

**Total Changes:**
- 🗑️ **Deleted**: 13 files (test files, unused components, user routes)
- ✏️ **Modified**: 4 files (App.js, index.js, AdminRoutes.jsx, Users.jsx)
- ➕ **Added**: 0 new files
- **Net Impact**: Cleaner, more focused admin-only panel with removed test infrastructure
