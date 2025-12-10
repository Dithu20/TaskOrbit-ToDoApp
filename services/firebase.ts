import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDEdcgkihzEBbcIXdllCLhd5x3rd16emCQ",
  authDomain: "native-ecf22.firebaseapp.com",
  projectId: "native-ecf22",
  storageBucket: "native-ecf22.firebasestorage.app",
  messagingSenderId: "313208491342",
  appId: "1:313208491342:web:c020d549d7093f17fb621f"
};


const app = initializeApp(firebaseConfig);

// Export Auth
export const auth = getAuth(app);

// Export Firestore
export const db = getFirestore(app);
export default app;