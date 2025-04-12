import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDw582n7nRB41vHAIIwsMItNnfndOOFW-Y",
    authDomain: "tajammalati.firebaseapp.com",
    projectId: "tajammalati",
    storageBucket: "tajammalati.firebasestorage.app",
    messagingSenderId: "130487086074",
    appId: "1:130487086074:web:642a4106d625f25f1a5243",
    measurementId: "G-S16QMYGG9B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

export { auth, db };
