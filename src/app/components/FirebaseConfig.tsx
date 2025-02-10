// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDh2wnhvl5atip7iCsppAg3XcvdXyXc3q0",
  authDomain: "the-fool-s-guild.firebaseapp.com",
  projectId: "the-fool-s-guild",
  storageBucket: "the-fool-s-guild.firebasestorage.app",
  messagingSenderId: "682416458683",
  appId: "1:682416458683:web:e63f5abb48513f45e3d29e",
  measurementId: "G-8709Q1RCVE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
