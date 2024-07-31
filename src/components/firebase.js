// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBH65EUzP9QDq3piIJwAl2oceNrgDjksDU",
  authDomain: "hyper-casual-gaming.firebaseapp.com",
  projectId: "hyper-casual-gaming",
  storageBucket: "hyper-casual-gaming.appspot.com",
  messagingSenderId: "1091499831541",
  appId: "1:1091499831541:web:5643dddc19d1fa1988d5bc",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;
