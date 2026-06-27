import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBP1IwNR-RyNPMd53dPOEu4P76Tzoc7BR4",
  authDomain: "rajeev02-github-io.firebaseapp.com",
  projectId: "rajeev02-github-io",
  storageBucket: "rajeev02-github-io.firebasestorage.app",
  messagingSenderId: "640496958997",
  appId: "1:640496958997:web:730f609b80f2ac7e76d81c",
  measurementId: "G-DXTG46W2DK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
