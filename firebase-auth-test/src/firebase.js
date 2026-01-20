// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQg1yPIwVR5-ENfPWSRK20Sdd13TYW93I",
  authDomain: "fir-webapp-b7a0c.firebaseapp.com",
  databaseURL: "https://fir-webapp-b7a0c-default-rtdb.firebaseio.com",
  projectId: "fir-webapp-b7a0c",
  storageBucket: "fir-webapp-b7a0c.firebasestorage.app",
  messagingSenderId: "802147609266",
  appId: "1:802147609266:web:42ee2fa877c10b4f7cf7ab",
  measurementId: "G-RFFD0ST5MK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// const analytics = getAnalytics(app);