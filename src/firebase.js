// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJTrHHXLW8aMasZN0qBuP8Z_YXG7Qe83I",
  authDomain: "react-chat-6e600.firebaseapp.com",
  projectId: "react-chat-6e600",
  storageBucket: "react-chat-6e600.appspot.com",
  messagingSenderId: "399711753919",
  appId: "1:399711753919:web:77b3e0c0308c8d3da6180a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
