// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";
//The above imports are for accessing only database and authentication from the firebase library 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY, //"AIzaSyBRdMUe2HcPqDTaMLwA77wuurnDGo21E98",
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN, //"caffiend-b8da7.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID, //"caffiend-b8da7",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET, //"caffiend-b8da7.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID, //"866149226766",
  appId: import.meta.env.VITE_FIREBASE_APPID //"1:866149226766:web:890257e341995ae638df5f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)