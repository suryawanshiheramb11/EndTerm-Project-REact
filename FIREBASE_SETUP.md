# Firebase Google Sign-In Setup Guide

## Overview
This app now includes Firebase authentication with Google Sign-In. Follow these steps to get it working.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter a project name (e.g., "antigravity-study-app")
4. Continue through the setup steps
5. Once created, click on your project

## Step 2: Enable Google Sign-In

1. In Firebase Console, go to **Authentication** (left sidebar)
2. Click on the **Sign-in method** tab
3. Click on **Google**
4. Toggle the **Enable** switch
5. Select a **Project support email**
6. Click **Save**

## Step 3: Create a Web App in Firebase

1. In Firebase Console, click the **Web** icon (</> symbol)
2. Register your app with a name like "Antigravity Study App"
3. Check the boxes for Firebase Hosting (optional)
4. Click **Register app**
5. Copy the Firebase config object - you'll need this next

## Step 4: Get Your Firebase Credentials

In the Firebase config object you just copied, you'll see:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## Step 5: Set Up Environment Variables

1. In the project root directory, create a `.env.local` file (or rename `.env.example` to `.env.local`)
2. Add your Firebase credentials:

```
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

## Step 6: Configure Authorized Domains (for Production)

1. In Firebase Authentication > Sign-in method > Google settings
2. Scroll to "Authorized domains"
3. Add your domain when deploying to production

For local development with `localhost`, it should already be added.

## Step 7: Test the Setup

1. Run the development server:
   ```bash
   npm run dev
   ```

2. The app should now show a login page with Google Sign-In button
3. Click "Sign in with Google"
4. Complete the Google authentication flow
5. You should be redirected to the study app

## Features Added

✅ **Google Sign-In** - Users can sign in with their Google accounts
✅ **Authentication Context** - Global auth state management
✅ **Protected Routes** - App requires authentication
✅ **User Profile** - User avatar and name displayed in navbar
✅ **Logout Button** - Users can sign out from the user menu

## Project Structure

```
src/
├── firebaseConfig.js          # Firebase configuration
├── context/
│   └── AuthContext.jsx        # Auth state management
├── components/
│   ├── Login.jsx              # Login page with Google Sign-In
│   ├── Login.css              # Login page styles
│   ├── Navbar.jsx             # Updated with user profile
│   └── Navbar.css             # User profile styles
└── App.jsx                    # Updated with auth logic
```

## Troubleshooting

### "Firebase config is not valid" error
- Check that all environment variables are correctly set in `.env.local`
- Make sure there are no extra spaces or quotes

### Google Sign-In button not working
- Verify Google authentication is enabled in Firebase Console
- Check that authorized domains include `localhost:5173` (or your local dev URL)
- Clear browser cache and try again

### "This app is not authorized to use Firebase" error
- Double-check your Firebase project ID in `.env.local`
- Verify the app is registered in Firebase Console

### User not staying logged in after page refresh
- This is normal Firebase behavior during initial setup
- Make sure you've enabled persistence in the AuthContext

## Next Steps

You can now:
- Save user data to Firestore
- Add user preferences/study history
- Create user-specific learning paths
- Add more OAuth providers (GitHub, Microsoft, etc.)

## Additional Resources

- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-variables.html)
- [React + Firebase Tutorial](https://www.youtube.com/results?search_query=react+firebase+google+signin)
