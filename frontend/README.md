# Frontend - Real Estate Admin Panel

**Last Updated**: January 21, 2026  
**Version**: 2.0  
**Technology**: React 19.2.3 + Tailwind CSS

## 📋 Overview

This is the frontend for the Real Estate Admin Panel, built with **React 19** and styled with **Tailwind CSS**. It provides an intuitive interface for administrators to manage properties, users, leads, plans, and other platform features.

## 🎯 Features

### Admin Dashboard
- **Dashboard Analytics**: View KPIs, user stats, property stats, and revenue metrics
- **User Management**: View, search, filter, block, and delete users
- **Property Management**: Create, update, delete, approve, and manage property listings
- **Lead Management**: Track leads, mark as spam, update status
- **Plan Management**: Create and manage subscription plans
- **FAQ Management**: Create, update, and publish FAQs
- **Banner Management**: Create, update, toggle, and publish banners
- **Notification Management**: Send notifications to users or groups
- **Feedback Moderation**: Review and manage user feedback
- **Deletion Requests**: Handle user account deletion requests
- **About Us**: Manage about us content
- **Audit Logs**: Track all admin actions and system activities
- **Bookmark Statistics**: View property bookmark analytics

### Technical Features
- ✅ Protected routes with JWT authentication
- ✅ Role-based access control
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Pagination and filtering
- ✅ Error handling and validation
- ✅ Toast notifications for user feedback
- ✅ Loading states and spinners
- ✅ Modal dialogs for confirmations
- ✅ Table components with sorting

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
cd frontend
npm install
```

### Running Development Server

```bash
npm start
```

The app will open at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

Creates a production-ready build in the `build/` folder.

## 📁 Project Structure

```
frontend/
├── public/                    # Static assets
│   ├── index.html            # Main HTML file
│   ├── manifest.json         # PWA manifest
│   └── robots.txt            # SEO robots file
│
├── src/
│   ├── api/                  # API integration modules
│   │   ├── api.js            # Axios configuration & base setup
│   │   ├── admin.audit.api.js
│   │   ├── admin.dashboard.api.js
│   │   ├── admin.lead.api.js
│   │   ├── admin.property.api.js
│   │   ├── banner.api.js
│   │   ├── dashboard.api.js
│   │   ├── faq.api.js
│   │   ├── legal.api.js
│   │   ├── plans.js
│   │   └── user.api.js
│   │
│   ├── components/           # Reusable React components
│   │   ├── ProtectedRoute.jsx   # Route protection wrapper
│   │   ├── common/              # Common/shared components
│   │   │   ├── Button.jsx
│   │   │   ├── Loader.jsx
│   │   │   └── Permission.jsx
│   │   ├── forms/               # Form components
│   │   ├── modals/              # Modal components
│   │   └── tables/              # Table components
│   │
│   ├── layout/               # Layout components
│   │   ├── AdminLayout.jsx   # Main admin layout wrapper
│   │   ├── Sidebar.jsx       # Navigation sidebar
│   │   └── Topbar.jsx        # Top navigation bar
│   │
│   ├── pages/                # Page components
│   │   ├── Login.jsx         # Admin login page
│   │   └── admin/            # Admin dashboard sections
│   │       ├── aboutUs/      # About Us management
│   │       ├── audit/        # Audit logs
│   │       ├── banners/      # Banner management
│   │       ├── bookmarks/    # Bookmark statistics
│   │       ├── dashboard/    # Dashboard
│   │       ├── deletionRequests/ # Deletion requests
│   │       ├── faqs/         # FAQ management
│   │       ├── feedbacks/    # Feedback moderation
│   │       ├── leads/        # Lead management
│   │       ├── legal/        # Legal content
│   │       ├── notifications/# Notification management
│   │       ├── plans/        # Plan management
│   │       ├── properties/   # Property management
│   │       └── users/        # User management
│   │
│   ├── routes/               # Route configuration
│   │   └── AdminRoutes.jsx   # Admin routes setup
│   │
│   ├── App.js               # Main App component
│   ├── App.css              # App global styles
│   ├── index.js             # React entry point
│   └── index.css            # Global styles
│
├── package.json             # Dependencies
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
└── README.md                # This file
```

## 🔧 Available Scripts

### `npm start`
Runs the app in development mode with hot reload.

### `npm run build`
Builds the app for production. Optimizes for best performance.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run eject`
⚠️ **One-way operation** - Ejects from Create React App (not recommended)

## 📦 Dependencies

### Core
- **react** (19.2.3) - UI framework
- **react-dom** (19.2.3) - DOM rendering
- **react-router-dom** (7.12.0) - Client-side routing
- **axios** (1.13.2) - HTTP client for API calls

### Styling
- **tailwindcss** (3.4.19) - Utility-first CSS framework
- **postcss** (8.5.6) - CSS transformation
- **autoprefixer** (10.4.23) - Browser compatibility

### UI & Components
- **lucide-react** (0.562.0) - Icon library
- **react-hot-toast** (2.6.0) - Toast notifications
- **clsx** (2.1.1) - Conditional className utility

### Testing
- **@testing-library/react** (16.3.1) - React testing utilities
- **@testing-library/jest-dom** (6.9.1) - DOM matchers
- **@testing-library/user-event** (13.5.0) - User event simulation

## 🔐 Authentication

The frontend uses JWT-based authentication:

1. Admin logs in via `/login` page
2. Credentials are sent to `POST /admin/auth/login`
3. JWT token is received and stored in localStorage
4. Token is automatically included in all subsequent API requests
5. Protected routes verify token and redirect to login if invalid

## 🛣️ Routing

All routes are admin-only and protected:

```
/login                          - Admin login
/admin/dashboard                - Dashboard
/admin/users                    - User management
/admin/properties               - Property management
/admin/leads                    - Lead management
/admin/plans                    - Plan management
/admin/faqs                     - FAQ management
/admin/banners                  - Banner management
/admin/notifications            - Notification management
/admin/feedbacks                - Feedback moderation
/admin/about-us                 - About Us content
/admin/legal                    - Legal content
/admin/bookmarks                - Bookmark statistics
/admin/deletion-requests        - Deletion requests
/admin/audit                    - Audit logs
```

## 🎨 Styling

### Tailwind CSS
The project uses Tailwind CSS for styling. Configuration:
- **tailwind.config.js** - Theme customization
- **postcss.config.js** - PostCSS plugin setup

### Custom Styles
- **App.css** - Application-wide styles
- **index.css** - Global styles and resets

## 🔌 API Integration

API calls are centralized in the `src/api/` directory:

```javascript
// Example: Fetching users
import { getUsersAPI } from '../api/user.api';

const fetchUsers = async () => {
  const response = await getUsersAPI({ page: 1, limit: 20 });
  // response.data contains results
};
```

### API Configuration
- **Base URL**: `http://localhost:5000/api`
- **Authentication**: JWT Bearer token in header
- **Error Handling**: Centralized error responses

## 📱 Responsive Design

The admin panel is fully responsive:
- **Desktop** (1024px+): Full layout with sidebar
- **Tablet** (768px-1023px): Collapsible sidebar
- **Mobile** (< 768px): Mobile-optimized view

## ⚠️ Environment Variables

Create a `.env.local` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

## 🧪 Testing

```bash
npm test
```

Tests use React Testing Library for component testing.

## 🚢 Deployment

### Build
```bash
npm run build
```

### Production Deployment
- The `build/` folder contains the production-ready files
- Deploy to hosting service (Vercel, Netlify, AWS, etc.)
- Ensure backend API is accessible from deployed domain

### Environment Configuration
Update `.env.local` with production API URL before building:

```env
REACT_APP_API_URL=https://api.yourdomain.com
```

## 🐛 Troubleshooting

### Port 3000 Already in Use
```bash
PORT=3001 npm start
```

### CORS Errors
- Ensure backend is running on `http://localhost:5000`
- Check backend CORS configuration

### API Calls Failing
- Verify backend is running
- Check if JWT token is expired (login again)
- Check browser console for detailed error messages

### Styling Not Applied
```bash
npm run build  # Rebuild if Tailwind classes not showing
```

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Guide](https://tailwindcss.com/docs)
- [React Router Guide](https://reactrouter.com)
- [Axios Documentation](https://axios-http.com)

## 🤝 Contributing

When adding new features:

1. Create feature branch: `git checkout -b feature/your-feature`
2. Follow existing code structure
3. Test changes locally
4. Submit pull request with description

## 📝 Notes

- Always include error handling in API calls
- Use protected routes for admin-only pages
- Keep components reusable and modular
- Follow React best practices (hooks, functional components)
- Use Tailwind classes for styling consistency

## 📞 Support

For issues or questions:
- Check existing documentation
- Review error messages in browser console
- Contact the development team

---

**Frontend Version**: 2.0  
**Last Updated**: January 21, 2026  
**Status**: Production Ready
