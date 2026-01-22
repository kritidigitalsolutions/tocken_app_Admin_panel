# Firebase Authentication Test Application

**Last Updated**: January 21, 2026  
**Version**: 2.0  
**Purpose**: Firebase OTP Authentication Testing

## 📋 Overview

This is a test application for validating Firebase OTP authentication integration with the Real Estate platform. It provides a standalone interface to test user authentication flows before integration with the main frontend.

## 🎯 Features

- ✅ Firebase OTP authentication
- ✅ Phone number verification
- ✅ OTP code validation
- ✅ JWT token generation
- ✅ User profile retrieval
- ✅ Real-time authentication state management
- ✅ Error handling and validation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase project credentials

### Installation

```bash
cd firebase-auth-test
npm install
```

### Configuration

Create `.env.local` with Firebase credentials:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_API_URL=http://localhost:5000/api
```

### Running Development Server

```bash
npm start
```

Opens at `http://localhost:3000`

## 📁 Project Structure

```
firebase-auth-test/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
│
├── src/
│   ├── firebase.js           # Firebase initialization
│   ├── App.js                # Main app component
│   ├── App.css               # App styles
│   ├── index.js              # Entry point
│   ├── index.css             # Global styles
│   └── components/           # Test components
│
├── package.json
└── README.md
```

## 🔐 Authentication Flow

### OTP Authentication Process

1. **Phone Number Input**
   - User enters phone number
   - System sends OTP via SMS

2. **OTP Verification**
   - User receives 6-digit OTP code
   - Enters code in verification form
   - Firebase validates OTP

3. **JWT Token Generation**
   - After Firebase verification
   - Backend generates JWT token
   - Token stored in localStorage

4. **User Profile Access**
   - JWT token used for API requests
   - User profile retrieved from backend
   - Dashboard/admin access granted

## 🧪 Testing Scenarios

### Scenario 1: New User Registration
```
1. Enter phone number (with country code)
2. Receive OTP code
3. Enter OTP in form
4. Backend creates user profile
5. JWT token generated
6. Redirected to dashboard
```

### Scenario 2: Existing User Login
```
1. Enter phone number (registered)
2. Receive OTP code
3. Enter OTP in form
4. Backend validates user
5. JWT token generated
6. User redirected to app
```

### Scenario 3: Invalid OTP
```
1. Enter phone number
2. Receive OTP code
3. Enter incorrect OTP
4. Error message displayed
5. Can retry with new OTP
```

## 📦 Dependencies

### Core
- **react** (19.2.3) - UI framework
- **react-dom** (19.2.3) - DOM rendering
- **firebase** - Firebase SDK for authentication

### HTTP
- **axios** (1.13.2) - API requests

### UI
- **react-scripts** (5.0.1) - Create React App scripts

## 🔌 Firebase Integration

### Configuration File: `src/firebase.js`

```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // Firebase config from .env
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

### Firebase Auth Methods

- `signInWithPhoneNumber()` - Send OTP
- `confirmationResult.confirm()` - Verify OTP
- `onAuthStateChanged()` - Listen to auth state

## 🔗 API Integration

### Backend Endpoints Used

- `POST /auth/verify-otp` - Verify OTP with backend
- `GET /user/profile` - Fetch user profile
- `POST /admin/auth/login` - Admin authentication

### API Request Example

```javascript
const verifyOTP = async (firebaseUser) => {
  const response = await axios.post(`${API_URL}/auth/verify-otp`, {
    uid: firebaseUser.uid,
    phoneNumber: firebaseUser.phoneNumber,
    idToken: await firebaseUser.getIdToken()
  });
  
  localStorage.setItem('authToken', response.data.token);
};
```

## 🐛 Troubleshooting

### OTP Not Received
- Check phone number format
- Verify phone number is eligible for SMS
- Check Firebase quotas
- Wait 30 seconds before retrying

### Firebase Configuration Error
- Verify `.env.local` has correct Firebase credentials
- Ensure Firebase project is active
- Check API keys and permissions

### Backend Connection Failed
- Verify backend is running on port 5000
- Check API URL in `.env.local`
- Check browser console for CORS errors

### Token Invalid Error
- Token may have expired
- Re-authenticate and get new token
- Clear localStorage and retry

## 📝 Environment Variables

```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=xxx
REACT_APP_FIREBASE_AUTH_DOMAIN=xxx
REACT_APP_FIREBASE_PROJECT_ID=xxx
REACT_APP_FIREBASE_STORAGE_BUCKET=xxx
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=xxx
REACT_APP_FIREBASE_APP_ID=xxx

# Backend API
REACT_APP_API_URL=http://localhost:5000/api

# Environment
REACT_APP_ENV=development
```

## 🧪 Running Tests

```bash
npm test
```

## 🚢 Deployment

### Build
```bash
npm run build
```

### Production
- Deploy `build/` folder to hosting service
- Update `.env.local` with production API URL
- Enable Firebase authentication in production

## 📚 Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Authentication Guide](https://firebase.google.com/docs/auth)
- [React Firebase Integration](https://firebase.google.com/docs/web/setup)
- [OTP Authentication Best Practices](https://firebase.google.com/docs/phone-auth)

## 🤝 Integration Steps

To integrate this test app with main frontend:

1. Copy Firebase configuration from this app
2. Implement same authentication flow in main frontend
3. Use same JWT token storage and retrieval
4. Test with backend API endpoints
5. Validate user profile retrieval

## 📞 Notes

- This is a **test application only**
- Use for development and testing
- Not intended for production use
- Main frontend has Firebase auth already integrated
- Reference this for troubleshooting auth issues

---

**Application Version**: 2.0  
**Last Updated**: January 21, 2026  
**Status**: Testing & Validation Tool
