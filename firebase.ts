import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYmwwAnfO3xS5nHlcauZBEWJt6TlYtH5g",
  authDomain: "chatgpt-clone-379111.firebaseapp.com",
  projectId: "chatgpt-clone-379111",
  storageBucket: "chatgpt-clone-379111.appspot.com",
  messagingSenderId: "154965795602",
  appId: "1:154965795602:web:92d051b59692fc6fa089cb",
  measurementId: "G-CGQYSLW1Q6"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig); // This is called a singleton pattern encoding
const db = getFirestore(app);

export{ db };
