// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDVfYLJfIMaELU4kiO7hysKTkLObgqxLjQ",
  authDomain: "pantryapp-2c3b2.firebaseapp.com",
  projectId: "pantryapp-2c3b2",
  storageBucket: "pantryapp-2c3b2.appspot.com",
  messagingSenderId: "1057145092574",
  appId: "1:1057145092574:web:c034e0ad8cf0213160854f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { app, firestore };
