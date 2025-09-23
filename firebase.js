import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Replace with your Firebase config from the console
const firebaseConfig = {
  apiKey: "AIzaSyCvRXUfsiB1J1UPruMwpXznrAd7xmWSEqk",
  authDomain: "locallens-26154.firebaseapp.com",
  projectId: "locallens-26154",
  storageBucket: "locallens-26154.firebasestorage.app",
  messagingSenderId: "20604457776",
  appId: "1:20604457776:web:870c9f3e8c4b54e4aeaef5",
  measurementId: "G-4VXRD2F525"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, app };