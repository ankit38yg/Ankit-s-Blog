import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ankit-s-blog.firebaseapp.com",
  projectId: "ankit-s-blog",
  storageBucket: "ankit-s-blog.firebasestorage.app",
  messagingSenderId: "468230055908",
  appId: "1:468230055908:web:a37b6970aec3e7011fc9f1",
};
export const app = initializeApp(firebaseConfig);
