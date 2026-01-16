# API Documentation

## USER APIs

### Authentication
- `POST /api/auth/send-otp`
- `POST /api/auth/verify-otp`

### User
- `POST /api/user`
- `POST /api/user/upload-profile`

### Properties
- `POST /api/properties`
- `PUT /api/properties/:id`
- `POST /api/properties/:id/submit`
- `POST /api/properties/:id/photos`
- `DELETE /api/properties/:id/photos/:publicId`

### Leads
- `POST /api/leads`  

### Plans
- `GET /api/plans/plans`
- `POST /api/plans/buy`

### FAQs
- `GET /api/faqs`

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

### Properties Management
- `GET /api/admin/properties`
- `GET /api/admin/properties/:id`
- `PATCH /api/admin/properties/:id/status`
- `DELETE /api/admin/properties/:id`
- `PATCH /api/admin/properties/:id/restore`
- `PATCH /api/admin/properties/:id/premium`
- `PATCH /api/admin/properties/:id/remove-premium`

### Leads Management
- `GET /api/admin/leads`
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

### Audit Logs
- `GET /api/admin/audit`
