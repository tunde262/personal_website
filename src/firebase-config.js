// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAX2Mnrv5jHAuNq_bartyZSSxM5scN4Nyw",
  authDomain: "foxytunde.firebaseapp.com",
  projectId: "foxytunde",
  storageBucket: "foxytunde.appspot.com",
  messagingSenderId: "294078367958",
  appId: "1:294078367958:web:3ac3e9d29104b85b592177"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);