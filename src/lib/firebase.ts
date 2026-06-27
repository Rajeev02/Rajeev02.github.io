import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace these placeholder values with your actual Firebase project config
// You can find these in your Firebase Console -> Project Settings -> General -> Web App
const firebaseConfig = {
  apiKey: "AIzaSy_YOUR_API_KEY_HERE_PLEASE_REPLACE",
  authDomain: "rajeev02-github-io.firebaseapp.com",
  projectId: "rajeev02-github-io",
  storageBucket: "rajeev02-github-io.firebasestorage.app",
  messagingSenderId: "640496958997",
  appId: "1:640496958997:web:PLEASE_REPLACE_WITH_ACTUAL_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
