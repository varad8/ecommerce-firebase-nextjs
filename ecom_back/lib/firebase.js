import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAyj4h5bEPOsxHss6kSWDn5lWYSv-PQWMM",
  authDomain: "ecommerce-next-fd4bf.firebaseapp.com",
  projectId: "ecommerce-next-fd4bf",
  storageBucket: "ecommerce-next-fd4bf.appspot.com",
  messagingSenderId: "99832485384",
  appId: "1:99832485384:web:bf08df41487f57fa1723bd",
  measurementId: "G-8PNYLHRSPT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// export const db = getFirestore(app); // Initialize Firestore
export const storage = getStorage(app); // Initialize Storage

export default auth;
