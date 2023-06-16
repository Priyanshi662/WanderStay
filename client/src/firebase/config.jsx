// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey:import.meta.env.VITE_APP_API_KEY,
    authDomain: import.meta.env.VITE_APP_DOMAIN,
    projectId: import.meta.env.VITE_APP_PROJECT_ID,
    storageBucket:import.meta.env.VITE_APP_BUCKET,
    messagingSenderId: import.meta.env.VITE_APP_SENDER_ID,
    appId: import.meta.env.VITE_APP_APP_ID,
    measurementId: import.meta.env.VITE_APP_MEASURE_ID
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage =getStorage();