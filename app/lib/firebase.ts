// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKbzRQd-rkar8pDbJ3DiUDq6NzIOZ_kRk",
  authDomain: "listivo-3d135.firebaseapp.com",
  projectId: "listivo-3d135",
  storageBucket: "listivo-3d135.firebasestorage.app",
  messagingSenderId: "35454103900",
  appId: "1:35454103900:web:28e6b38c60227e08971199",
  measurementId: "G-YYGMNK5685"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);