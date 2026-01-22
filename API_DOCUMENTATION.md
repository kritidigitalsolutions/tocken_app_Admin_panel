# API Documentation

**Last Updated**: January 21, 2026  
**Version**: 2.0  
**Status**: Production Ready

## Overview

This API provides endpoints for a comprehensive real estate platform supporting:
- User authentication & management
- Multi-type property listings (RENT, SELL, PG, Co-Living)
- Lead & booking management
- Subscription plans
- Notifications & feedback
- Admin dashboard features
- Audit logging for compliance

## BASE URL

```
http://localhost:5000/api
```

## Authentication

All API requests use either:
- **User Routes**: JWT token in Authorization header (`Bearer <token>`)
- **Admin Routes**: JWT token + Admin role verification
- **Public Routes**: No authentication required

---

## USER APIs

### Authentication
- `POST /auth/send-otp` - Send OTP to phone number
- `POST /auth/verify-otp` - Verify OTP and get JWT token

### User Profile 
- `GET /user/profile` - Get authenticated user profile
- `PATCH /user/profile` - Update user profile

### Properties
- `POST /properties` - Create new property listing
- `PUT /properties/:id` - Update property details
- `POST /properties/:id/submit` - Submit property for review
- `POST /properties/:id/photos` - Upload property photos
- `DELETE /properties/:id/photos/:publicId` - Delete specific photo
- `GET /properties` - Get user's properties (pagination supported)
- `GET /properties/:id` - Get property details

### Leads
- `POST /leads` - Create new lead/inquiry
- `GET /leads` - Get user's leads (pagination supported)
- `GET /leads/:id` - Get lead details

### Bookmarks / Favorites
- `GET /bookmarks` - Get all bookmarked properties (filter: `?category=RESIDENTIAL|COMMERCIAL|PG|Co-Living|Plot/Land`)
- `POST /bookmarks/:propertyId` - Add property to bookmarks
- `DELETE /bookmarks/:propertyId` - Remove property from bookmarks
- `GET /bookmarks/:propertyId/check` - Check if property is bookmarked

### Feedback
- `POST /feedback` - Submit feedback (public)
- `GET /feedback/my` - Get authenticated user's feedback submissions

### Plans
- `GET /plans` - Get all subscription plans with FAQs
- `POST /plans/buy` - Purchase a plan
- `GET /plans/my` - Get user's purchased plans

### Notifications
- `GET /notifications` - Get user notifications (with pagination)
- `GET /notifications?page=1&limit=20&unreadOnly=true` - Get with filters
- `GET /notifications/unread-count` - Get unread notification count
- `PATCH /notifications/:id/read` - Mark single notification as read
- `PATCH /notifications/read-all` - Mark all notifications as read

### FAQs
- `GET /faqs` - Get all FAQs

### Banners
- `GET /banners` - Get all active banners

### Legal
- `GET /legal/:type` - Get legal content (privacy, terms, etc.)

### About Us
- `GET /aboutUs` - Get about us content

---

## ADMIN APIs

**All admin endpoints require:**
- Authentication token in header
- Admin role verification
- Appropriate permissions

### Authentication
- `POST /admin/auth/login` - Admin login with email/password

### Dashboard
- `GET /admin/dashboard/analytics` - Get dashboard analytics & KPIs

### Users Management
- `GET /admin/users` - Get all users (with pagination & filters)
- `GET /admin/users/:id` - Get user details
- `PUT /admin/users/:id` - Update user details
- `PATCH /admin/users/:id/block` - Block/unblock user
- `DELETE /admin/users/:id` - Delete user permanently
- `PATCH /admin/users/:id/verify` - Manually verify user

### Properties Management
- `GET /admin/properties` - Get all properties (with pagination & filters)
- `GET /admin/properties/:id` - Get property details
- `PATCH /admin/properties/:id/status` - Update property status (ACTIVE, REJECTED, BLOCKED)
- `DELETE /admin/properties/:id` - Delete property (soft delete)
- `PATCH /admin/properties/:id/restore` - Restore soft-deleted property
- `PATCH /admin/properties/:id/premium` - Mark property as premium
- `PATCH /admin/properties/:id/remove-premium` - Remove premium status

### Leads Management
- `GET /admin/leads` - Get all leads (with pagination & filters)
- `GET /admin/leads/:id` - Get lead details
- `GET /admin/leads/property/:propertyId` - Get leads for specific property
- `PATCH /admin/leads/:id/status` - Update lead status
- `PATCH /admin/leads/:id/spam` - Mark lead as spam
- `DELETE /admin/leads/:id` - Delete lead

### FAQs Management
- `GET /admin/faqs` - Get all FAQs (with pagination)
- `POST /admin/faqs` - Create new FAQ
- `PUT /admin/faqs/:id` - Update FAQ
- `DELETE /admin/faqs/:id` - Delete FAQ

### Plans Management
- `GET /admin/plans` - Get all plans
- `POST /admin/plans` - Create new subscription plan
- `PUT /admin/plans/:id` - Update plan details
- `DELETE /admin/plans/:id` - Delete plan

### Banners Management
- `GET /admin/banners` - Get all banners
- `POST /admin/banners` - Create new banner
- `PUT /admin/banners/:id` - Update banner
- `PATCH /admin/banners/:id/toggle` - Toggle banner active/inactive
- `DELETE /admin/banners/:id` - Delete banner

### Bookmarks Management
- `GET /admin/bookmarks` - Get all bookmarks across all users
- `GET /admin/bookmarks/stats` - Get bookmark statistics

### Feedbacks Management
- `GET /admin/feedbacks` - Get all feedbacks with filters
- `GET /admin/feedbacks/stats` - Get feedback statistics by type and status
- `PATCH /admin/feedbacks/:id/status` - Update feedback status
- `DELETE /admin/feedbacks/:id` - Delete feedback
- `GET /admin/feedbacks/:id` - Get feedback details

### Notifications Management
- `GET /admin/notifications` - Get all notifications (with pagination)
- `POST /admin/notifications` - Create notification (send to ALL, user type, or individual)
- `GET /admin/notifications/stats` - Get notification statistics
- `GET /admin/notifications/:id` - Get single notification
- `PUT /admin/notifications/:id` - Update notification
- `DELETE /admin/notifications/:id` - Delete notification

### Deletion Requests
- `GET /admin/deletionRequests` - Get all deletion requests (with filters & pagination)
- `GET /admin/deletionRequests/:id` - Get single deletion request
- `PATCH /admin/deletionRequests/:id/status` - Update deletion request status
- `PATCH /admin/deletionRequests/:id/approve` - Approve deletion request
- `PATCH /admin/deletionRequests/:id/reject` - Reject deletion request

### About Us Management
- `GET /admin/aboutUs` - Get about us content
- `POST /admin/aboutUs` - Create about us content
- `PUT /admin/aboutUs/:id` - Update about us content
- `DELETE /admin/aboutUs/:id` - Delete about us content

### Legal Management
- `GET /admin/legal` - Get all legal pages
- `POST /admin/legal` - Create new legal page
- `PUT /admin/legal/:id` - Update legal page
- `DELETE /admin/legal/:id` - Delete legal page

### Audit Logs
- `GET /admin/audit` - Get all audit logs (with filters & pagination)
- `GET /admin/audit/:id` - Get audit log details

---

## Property Types Supported

### RENT / SELL
- **Residential**: Apartment, Builder Floor, Independent House, Villa, 1RK/Studio, Others
- **Commercial**: Retail Shop, Showroom, Warehouse, Office
- **Plot/Land** (SELL only): Plot, Land

### PG
- Single listing type for paying guest accommodations

### Co-Living
- Single listing type for roommate/room search

---

## Common Query Parameters

### Pagination
- `page` (default: 1)
- `limit` (default: 20, max: 100)

### User Filters
- `status=ACTIVE|BLOCKED|VERIFIED`
- `search=name|email|phone`

### Property Filters
- `status=ACTIVE|DRAFT|REJECTED|BLOCKED`
- `type=RENT|SELL|PG|Co-Living`
- `premium=true|false`

### Lead Filters
- `status=PENDING|CONTACTED|CONVERTED`
- `source=PROPERTY|DIRECT`

---

## Error Response Format

```json
{
  "success": false,
  "message": "Error description",
  "statusCode": 400
}
```

---

**API Version**: 2.0  
**Last Updated**: January 21, 2026  
**Status**: Production Ready
