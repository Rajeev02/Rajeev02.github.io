// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBDWXCGnVzaJpbXvN6e2xufMyZ-z7jIC-E",
    authDomain: "visitor-management-syste-f6453.firebaseapp.com",
    projectId: "visitor-management-syste-f6453",
    storageBucket: "visitor-management-syste-f6453.appspot.com",
    messagingSenderId: "25684494269",
    appId: "1:25684494269:web:050f152f4dd0fb0c9134d4"
};

// Initialize Firebase App
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
