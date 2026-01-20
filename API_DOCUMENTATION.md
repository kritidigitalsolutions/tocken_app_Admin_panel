# API Documentation

## USER APIs

### Authentication
- `POST /api/auth/send-otp`
- `POST /api/auth/verify-otp`

### User Profile 
- `GET /api/user/profile` - Get authenticated user profile
- `PATCH /api/user/profile` - Update user profile

### Properties
- `POST /api/properties`
- `PUT /api/properties/:id`
- `POST /api/properties/:id/submit`
- `POST /api/properties/:id/photos`
- `DELETE /api/properties/:id/photos/:publicId`

### Leads
- `POST /api/leads`

### Bookmarks / Favorites
- `GET /api/bookmarks` - Get all bookmarked properties (filter: `?category=RESIDENTIAL|COMMERCIAL|PG|Co-Living|Plot/Land`)
- `POST /api/bookmarks/:propertyId` - Add property to bookmarks
- `DELETE /api/bookmarks/:propertyId` - Remove property from bookmarks
- `GET /api/bookmarks/:propertyId/check` - Check if property is bookmarked

### Feedback
- `POST /api/feedback` - Submit feedback (public)
- `GET /api/feedback/my` - Get authenticated user's feedback submissions

### Plans
- `GET /api/plans` - Get all plans with FAQs
- `POST /api/plans/buy` - Purchase a plan

### FAQs
- `GET /api/faqs`

### Banners
- `GET /api/banners` - Get all active banners

### Legal
- `GET /api/legal/:type`

---

## ADMIN APIs

### Authentication
- `POST /api/admin/auth/login`

### Dashboard
- `GET /api/admin/dashboard/analytics`

### Users Management
- `GET /api/admin/users`
- `PUT /api/admin/users/:id`
- `PATCH /api/admin/users/:id/block` - Block a user
- `DELETE /api/admin/users/:id` - Delete a user

### Properties Management
- `GET /api/admin/properties`
- `GET /api/admin/properties/:id`
- `PATCH /api/admin/properties/:id/status`
- `DELETE /api/admin/properties/:id`
|
- `PATCH /api/admin/properties/:id/restore`
- `PATCH /api/admin/properties/:id/premium`
- `PATCH /api/admin/properties/:id/remove-premium`

### Leads Management
- `GET /api/admin/leads`
|
- `GET /api/admin/leads/property/:propertyId`
- `PATCH /api/admin/leads/:id/status`
- `PATCH /api/admin/leads/:id/spam`

### FAQs Management
- `GET /api/admin/faqs`
- `POST /api/admin/faqs`
- `PUT /api/admin/faqs/:id`
- `DELETE /api/admin/faqs/:id`

### Plans Management
- `GET /api/admin/plans`
- `POST /api/admin/plans`
- `PUT /api/admin/plans/:id`
- `DELETE /api/admin/plans/:id`

### Banners Management
- `GET /api/admin/banners`
- `POST /api/admin/banners`
- `PUT /api/admin/banners/:id`
- `PATCH /api/admin/banners/:id/toggle`
- `DELETE /api/admin/banners/:id`

### Bookmarks Management
- `GET /api/admin/bookmarks` - Get all bookmarks across all users (filter: `?category=RESIDENTIAL|COMMERCIAL|PG|Co-Living|Plot/Land`)
- `GET /api/admin/bookmarks/stats` - Get bookmark statistics

### Feedbacks Management
- `GET /api/admin/feedbacks` - Get all feedbacks (filters: `?type=REPORT_PROBLEM|QUESTION|SUGGESTION|COMPLIMENT|OTHER&status=PENDING|REVIEWED|RESOLVED|CLOSED`)
- `GET /api/admin/feedbacks/stats` - Get feedback statistics by type and status
- `PATCH /api/admin/feedbacks/:id/status` - Update feedback status (body: `{ status: "PENDING|REVIEWED|RESOLVED|CLOSED", adminNotes?: "string" }`)
- `DELETE /api/admin/feedbacks/:id` - Delete a feedback

### Audit Logs
- `GET /api/admin/audit`
