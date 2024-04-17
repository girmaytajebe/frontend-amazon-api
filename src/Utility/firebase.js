// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
//use authotication
import {getAuth}  from 'firebase/auth';
import 'firebase/compat/firestore'
import 'firebase/compat/auth'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBChOpsqMJYUXHM8fpzAtDFZs9WEBZmRjE",
  authDomain: "api-clone-1f628.firebaseapp.com",
  projectId: "api-clone-1f628",
  storageBucket: "api-clone-1f628.appspot.com",
  messagingSenderId: "753555774592",
  appId: "1:753555774592:web:2dd8146fbe43b2522f5a65",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth( app);
export const db= app.firestore();
