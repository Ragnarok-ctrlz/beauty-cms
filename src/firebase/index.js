// src/firebase/index.js
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'


// Remplacez par vos identifiants Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAldMhUSkckrIga9N-VqnWw_B0I8xn9a6Q",
  authDomain: "beauty-cms-863c7.firebaseapp.com",
  projectId: "beauty-cms-863c7",
  storageBucket: "beauty-cms-863c7.firebasestorage.app",
  messagingSenderId: "754478591541",
  appId: "1:754478591541:web:f8f831219168af40e54b7c",
  measurementId: "G-60QYTB0570"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig)

// Export des services Firebase
export const db = getFirestore(app)
export const auth = getAuth(app)
export default app
