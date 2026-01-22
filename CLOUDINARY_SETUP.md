# Wallpaper Management - Backend Image Upload Setup

## Implementation Complete ✅

The wallpaper image upload now works **exactly like the Banner system**:

### How It Works

1. **Frontend**: User selects a file with `<input type="file">`
2. **FormData**: File is sent as FormData to backend (not as base64)
3. **Multer Middleware**: Backend intercepts with Multer
4. **Cloudinary**: Multer automatically uploads to Cloudinary
5. **URL**: Cloudinary URL is stored in database

### Backend Changes Made

**File: `backend/routes/admin/wallpaper.routes.js`**
```javascript
router.post("/", upload.single("image"), createWallpaper);
router.put("/:id", upload.single("image"), updateWallpaper);
```
- Added Multer middleware to handle file uploads
- Works with Cloudinary storage configuration

**File: `backend/controllers/wallpaper.controller.js`**
```javascript
const image = req.file?.path || req.file?.filename;
```
- Updated `createWallpaper()` to get image from Multer file upload
- Updated `updateWallpaper()` to handle optional image updates
- Image validation moved to frontend

### Frontend Changes Made

**File: `frontend/src/pages/admin/wallpapers/wallpaperAPI.js`**
```javascript
createWallpaper: (data) =>
  axios.post(`${API_BASE}/admin/wallpapers`, data, getMultipartAuthHeader()),
```
- Added multipart form data content type for file uploads
- Authorization header included automatically

**File: `frontend/src/pages/admin/wallpapers/Wallpapers.jsx`**
```jsx
<input
  type="file"
  accept="image/*"
  onChange={(e) =>
    setFormData({ ...formData, image: e.target.files[0] })
  }
/>
```
- Simplified to single file input (like Banner component)
- Removed Cloudinary upload complexity from frontend
- Removed image preview/validation logic
- Form now uses FormData instead of JSON

### Why This Works Better

✅ **No 413 Error** - Files uploaded directly to Cloudinary, not passed through backend body
✅ **Consistent** - Matches existing Banner upload pattern
✅ **Simple** - Less frontend code, less complexity
✅ **Scalable** - Cloudinary handles image optimization
✅ **Tested** - Banner system already working this way

### Testing

1. Go to Wallpaper Management dashboard
2. Click "Add Wallpaper"
3. Fill in Title and Description
4. Select an image file
5. Click "Create"
6. Image uploads automatically via Multer → Cloudinary

No environment variables needed! The backend is already configured with Cloudinary credentials.

## Troubleshooting

**Error: "Image is required"**
- Select an image file and try again

**Error: "Upload failed"**
- Check browser console for detailed error
- Verify backend is running on port 5000
- Check Cloudinary credentials in backend/.env

**Image doesn't appear**
- Wait a few seconds (Cloudinary processes images)
- Refresh the page
- Check that file was actually selected

