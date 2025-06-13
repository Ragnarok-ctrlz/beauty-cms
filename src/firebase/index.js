// src/firebase/index.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'  // ← Base de données
import { getAuth } from 'firebase/auth'            // ← Authentification

const firebaseConfig = {
  apiKey: "AIzaSyCEdGLAwyRKd42H4oEvm3g7ki4j-L_6VII",
  authDomain: "beautifyme-e8d76.firebaseapp.com",
  projectId: "beautifyme-e8d76",
  storageBucket: "beautifyme-e8d76.firebasestorage.app",
  messagingSenderId: "967735076113",
  appId: "1:967735076113:web:b56a51e68eb8737ed318b0",
  measurementId: "G-PBYHC0HNKF"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app)  // ← Commenté
export const auth = getAuth(app)       // ← Utilisé
export default app