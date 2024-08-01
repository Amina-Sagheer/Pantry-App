// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// // Your Firebase configuration (replace with your actual test config)
// const firebaseConfig = {
//   apiKey: "AIzaSyDVfYLJfIMaELU4kiO7hysKTkLObgqxLjQ",
//   authDomain: "pantryapp-2c3b2.firebaseapp.com",
//   projectId: "pantryapp-2c3b2",
//   storageBucket: "pantryapp-2c3b2.appspot.com",
//   messagingSenderId: "1057145092574",
//   appId: "1:1057145092574:web:c034e0ad8cf0213160854f"
// };
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqVGPUF6GGNHbuA3_uIY59x_LWS46-Rio",
  authDomain: "pantry-app-867bc.firebaseapp.com",
  projectId: "pantry-app-867bc",
  storageBucket: "pantry-app-867bc.appspot.com",
  messagingSenderId: "1086558794191",
  appId: "1:1086558794191:web:498c4ff27d00e3407262ba"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { app, firestore };
