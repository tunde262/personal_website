// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyXXWO_AK-dwvAjXEpW8QwQ4Pf0O8LT7o",
  authDomain: "mycontacts-9ba5a.firebaseapp.com",
  databaseURL: "https://mycontacts-9ba5a.firebaseio.com",
  projectId: "mycontacts-9ba5a",
  storageBucket: "mycontacts-9ba5a.appspot.com",
  messagingSenderId: "948479636144",
  appId: "1:948479636144:web:b62fbff7dfe9e981550175"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 
export const db = getFirestore(app);
export const auth = getAuth(app);
export  const provider = new GoogleAuthProvider();
export const storage = getStorage(app);