// const admin = require("firebase-admin");
// const path = require("path");
// const fs = require("fs");

// let serviceAccount;
// let isFirebaseInitialized = false;

// // Try to load from environment variable first
// if (process.env.FIREBASE_SERVICE_ACCOUNT) {
//   try {
//     serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
//     admin.initializeApp({
//       credential: admin.credential.cert(serviceAccount),
//     });
//     isFirebaseInitialized = true;
//   } catch (e) {
//     console.warn("⚠️  Invalid FIREBASE_SERVICE_ACCOUNT JSON in .env - Firebase disabled");
//   }
// } else {
//   // Fall back to local file if it exists
//   const keyPath = path.join(__dirname, "../firebase/serviceAccountKey.json");
//   if (fs.existsSync(keyPath)) {
//     try {
//       serviceAccount = require(keyPath);
//       admin.initializeApp({
//         credential: admin.credential.cert(serviceAccount),
//       });
//       isFirebaseInitialized = true;
//     } catch (e) {
//       console.warn("⚠️  Failed to initialize Firebase with local key - Firebase disabled");
//     }
//   } else {
//     console.warn("⚠️  Firebase credentials not found - Firebase disabled for development");
//     console.warn("   Set FIREBASE_SERVICE_ACCOUNT in .env or add serviceAccountKey.json to enable Firebase");
//   }
// }

// module.exports = isFirebaseInitialized ? admin : null;


const admin = require("firebase-admin");
const serviceAccount = require("../firebase/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
