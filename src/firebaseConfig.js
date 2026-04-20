import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYbnytQDk6qRuWB3xClZcgmmZifqfxgGM",
  authDomain: "understand-anything-5cc40.firebaseapp.com",
  projectId: "understand-anything-5cc40",
  storageBucket: "understand-anything-5cc40.firebasestorage.app",
  messagingSenderId: "479908317751",
  appId: "1:479908317751:web:fe93b9e5509cdff6778db2",
  measurementId: "G-3MC6JMZWNV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics
const analytics = getAnalytics(app);

// Initialize Firebase Authentication
export const auth = getAuth(app);

export default app;
