# 📬 Notification API - Postman Testing Guide

## Base URL
```
http://localhost:5000/api
```

---

## 🔐 Step 1: Get Admin Token

**First, login as admin to get JWT token:**

### Admin Login
```
POST /admin/auth/login
```

**Body (JSON):**
```json
{
  "email": "admin@realestate.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
  "admin": { ... }
}
```

**⚠️ IMPORTANT:** Copy the `token` value. Use it in all requests below as:
```
Authorization: Bearer <your-token-here>
```

---

## 📤 ADMIN APIs (Requires Admin Token)

### 1. Create Notification (Send to ALL users)

```
POST /admin/notifications
```

**Headers:**
```
Authorization: Bearer <admin-token>
Content-Type: application/json
```

**Body:**
```json
{
  "title": "Welcome to Real Estate App!",
  "message": "Thank you for joining our platform. Explore properties now!",
  "type": "GENERAL",
  "targetUserType": "ALL"
}
```

---

### 2. Create Notification (Send to specific user type)

```
POST /admin/notifications
```

**Body:**
```json
{
  "title": "Special Offer for Agents",
  "message": "Get 50% off on premium listings this week!",
  "type": "PROMOTIONAL",
  "targetUserType": "AGENT"
}
```

**Available targetUserType values:**
- `ALL` - All users
- `AGENT` - Only agents
- `BUILDER` - Only builders
- `INDIVIDUAL` - Individual users

---

### 3. Create Notification (Send to specific user)

```
POST /admin/notifications
```

**Body:**
```json
{
  "title": "Your Property is Approved!",
  "message": "Congratulations! Your property listing has been approved.",
  "type": "PROPERTY",
  "targetUserId": "USER_ID_HERE"
}
```

> Replace `USER_ID_HERE` with actual MongoDB user _id

---

### 4. Get All Notifications

```
GET /admin/notifications
```

**Optional Query Parameters:**
```
GET /admin/notifications?page=1&limit=20&type=GENERAL
```

---

### 5. Get Notification Statistics

```
GET /admin/notifications/stats
```

**Response:**
```json
{
  "success": true,
  "stats": {
    "total": 10,
    "active": 8,
    "inactive": 2,
    "recentWeek": 5,
    "byType": {
      "GENERAL": 4,
      "PROMOTIONAL": 3,
      "SYSTEM": 3
    },
    "byTargetType": {
      "ALL": 6,
      "AGENT": 2,
      "BUYER": 2
    }
  }
}
```

---

### 6. Get Single Notification

```
GET /admin/notifications/:id
```

Example:
```
GET /admin/notifications/678abc123def456
```

---

### 7. Update Notification

```
PUT /admin/notifications/:id
```

**Body:**
```json
{
  "title": "Updated Title",
  "message": "Updated message content",
  "isActive": false
}
```

---

### 8. Delete Notification

```
DELETE /admin/notifications/:id
```

---

## 📥 USER APIs (Requires User Token)

> **Note:** User APIs require user authentication token, not admin token.

### 1. Get My Notifications

```
GET /notifications
```

**Optional Query Parameters:**
```
GET /notifications?page=1&limit=20&unreadOnly=true
```

---

### 2. Get Unread Count

```
GET /notifications/unread-count
```

**Response:**
```json
{
  "success": true,
  "unreadCount": 5
}
```

---

### 3. Mark Single Notification as Read

```
PATCH /notifications/:id/read
```

---

### 4. Mark All Notifications as Read

```
PATCH /notifications/read-all
```

---

## 📋 Notification Types

| Type | Use Case |
|------|----------|
| `GENERAL` | General announcements |
| `PROPERTY` | Property related updates |
| `LEAD` | Lead notifications |
| `PLAN` | Subscription plan updates |
| `SYSTEM` | System notifications |
| `PROMOTIONAL` | Promotional offers |

---

## 🧪 Quick Test Steps

1. **Login as admin** → Copy token
2. **Create a test notification** → Use "Send to ALL" endpoint
3. **Check admin panel** → Go to `/admin/notifications`
4. **Verify in database** → Check MongoDB `notifications` collection

---

## 🔧 Postman Collection Setup

1. Create new Collection: `Real Estate Notifications`
2. Add Collection Variable: `baseUrl` = `http://localhost:5000/api`
3. Add Collection Variable: `adminToken` = (paste your token)
4. Use `{{baseUrl}}` and `{{adminToken}}` in requests

---

## ❓ Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| 401 Unauthorized | Missing/invalid token | Add `Authorization: Bearer <token>` header |
| 400 Bad Request | Missing title/message | Ensure required fields are provided |
| 404 Not Found | Invalid notification ID | Check if ID exists |
| 500 Server Error | Backend issue | Check backend console logs |

---

**Created:** January 19, 2026
**API Version:** 1.0
