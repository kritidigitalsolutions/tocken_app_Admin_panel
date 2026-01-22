# 🖼️ Wallpaper Management - Complete Setup Guide

## ✅ Backend Implementation

### 1. **Database Model** (`backend/models/wallpaper.model.js`)
```javascript
- title: String (required)
- description: String (optional)
- image: String (required) - Cloudinary URL
- category: Enum ["Home", "Property", "Promo", "Seasonal"]
- displayOrder: Number (for sorting)
- status: Enum ["Active", "Inactive"]
- views: Number (auto-incremented on view)
- timestamps: createdAt, updatedAt
```

### 2. **API Endpoints**

#### **Public APIs (No Auth Required)**

**GET all wallpapers (Active only)**
```
GET /api/wallpapers
Query Params:
  - status: "Active" (default)
  - category: "Home" | "Property" | "Promo" | "Seasonal"
  - page: 1
  - limit: 10
  - sort: "-createdAt"

Response:
{
  "success": true,
  "wallpapers": [...],
  "pagination": { "total": 10, "page": 1, "pages": 1 }
}
```

**GET single wallpaper**
```
GET /api/wallpapers/:id

Response:
{
  "success": true,
  "wallpaper": { ... }
}
```

---

#### **Admin APIs (Auth Required)**

**GET all wallpapers (includes Inactive)**
```
GET /api/admin/wallpapers
Headers:
  Authorization: Bearer YOUR_ADMIN_TOKEN
```

**CREATE wallpaper**
```
POST /api/admin/wallpapers
Headers:
  Authorization: Bearer YOUR_ADMIN_TOKEN
  Content-Type: application/json

Body:
{
  "title": "Summer Home",
  "description": "Beautiful summer wallpaper",
  "image": "https://res.cloudinary.com/...",
  "category": "Home",
  "displayOrder": 1,
  "status": "Active"
}

Response:
{
  "success": true,
  "message": "Wallpaper created successfully",
  "wallpaper": { ... }
}
```

**UPDATE wallpaper**
```
PUT /api/admin/wallpapers/:id
Headers:
  Authorization: Bearer YOUR_ADMIN_TOKEN

Body: (all fields optional)
{
  "title": "Updated Title",
  "status": "Active",
  ...
}
```

**DELETE wallpaper**
```
DELETE /api/admin/wallpapers/:id
Headers:
  Authorization: Bearer YOUR_ADMIN_TOKEN
```

**BULK update status**
```
PUT /api/admin/wallpapers/bulk/status
Headers:
  Authorization: Bearer YOUR_ADMIN_TOKEN

Body:
{
  "ids": ["id1", "id2", "id3"],
  "status": "Active"
}
```

---

## 📮 Postman Testing Guide

### **1. Get All Wallpapers (Public)**
```
Method: GET
URL: http://localhost:5000/api/wallpapers?status=Active&category=Home&page=1&limit=10

Expected Response:
{
  "success": true,
  "wallpapers": [
    {
      "_id": "...",
      "title": "Home Wallpaper 1",
      "description": "...",
      "image": "https://...",
      "category": "Home",
      "displayOrder": 1,
      "status": "Active",
      "views": 42,
      "createdAt": "...",
      "updatedAt": "..."
    }
  ],
  "pagination": { "total": 5, "page": 1, "pages": 1 }
}
```

### **2. Create Wallpaper (Admin)**
```
Method: POST
URL: http://localhost:5000/api/admin/wallpapers
Headers:
  Content-Type: application/json
  Authorization: Bearer YOUR_ADMIN_TOKEN

Body:
{
  "title": "Summer Collection",
  "description": "Beautiful summer landscapes",
  "image": "https://res.cloudinary.com/your-cloud/image/upload/v123/summer.jpg",
  "category": "Home",
  "displayOrder": 1,
  "status": "Active"
}
```

### **3. Update Wallpaper (Admin)**
```
Method: PUT
URL: http://localhost:5000/api/admin/wallpapers/WALLPAPER_ID
Headers:
  Content-Type: application/json
  Authorization: Bearer YOUR_ADMIN_TOKEN

Body:
{
  "title": "Updated Summer Collection",
  "displayOrder": 2,
  "status": "Active"
}
```

### **4. Delete Wallpaper (Admin)**
```
Method: DELETE
URL: http://localhost:5000/api/admin/wallpapers/WALLPAPER_ID
Headers:
  Authorization: Bearer YOUR_ADMIN_TOKEN
```

### **5. Bulk Update Status (Admin)**
```
Method: PUT
URL: http://localhost:5000/api/admin/wallpapers/bulk/status
Headers:
  Content-Type: application/json
  Authorization: Bearer YOUR_ADMIN_TOKEN

Body:
{
  "ids": ["id1", "id2", "id3"],
  "status": "Inactive"
}
```

---

## 🎨 Frontend Implementation

### **Components Created:**
1. **`Wallpapers.jsx`** - Main admin dashboard
2. **`wallpaperAPI.js`** - API service module

### **Features:**
✅ View all wallpapers (grid layout)  
✅ Filter by category (Home, Property, Promo, Seasonal)  
✅ Search wallpapers by title  
✅ Create new wallpaper with form  
✅ Edit existing wallpaper  
✅ Delete wallpaper (with confirmation)  
✅ Status toggle (Active/Inactive)  
✅ View count display  
✅ Pagination support  

### **Sidebar Navigation:**
- Added "Wallpapers" menu item in Admin Sidebar
- Navigation route: `/admin/wallpapers`
- Icon: Wallpaper (from lucide-react)

---

## 🔄 Workflow

1. **Create Category-based Wallpapers**
   - Home: General app wallpapers
   - Property: Property showcase images
   - Promo: Promotional content
   - Seasonal: Holiday/seasonal images

2. **Admin Panel Usage:**
   - Navigate to Sidebar > Wallpapers
   - Click "Add Wallpaper" button
   - Upload image to Cloudinary first, get URL
   - Fill in details (title, description, category, etc.)
   - Set display order and status
   - Click "Create"

3. **User Side:**
   - Users see wallpapers via public API
   - Wallpapers automatically track views
   - Filter by category available

---

## 📝 Important Notes

- Only **"Active"** wallpapers visible to users
- Admins can see all wallpapers (Active & Inactive)
- View count increments every time wallpaper is fetched
- Display order determines sorting (ascending by default)
- Image must be valid Cloudinary URL
- Category filtering available in admin panel
- Bulk status update for efficiency

---

**🚀 Ready to use! Backend, Frontend, and Sidebar integration complete.**
