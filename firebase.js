// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2iwmE-E88HZMSFpmn3K1EqyQRwgz1sl8",
  authDomain: "todolist-5322b.firebaseapp.com",
  databaseURL:
    "https://todolist-5322b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "todolist-5322b",
  storageBucket: "todolist-5322b.appspot.com",
  messagingSenderId: "152293201901",
  appId: "1:152293201901:web:ca35702359aaca4efcb9e4",
  measurementId: "G-3W9EM8P3PX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const mycollection = collection(db, "todos");
