


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyB8mowfDCsypCV-jX363_vhcWq_Vp5O51M",
  authDomain: "sololzy.firebaseapp.com",
  projectId: "sololzy",
  storageBucket: "sololzy.firebasestorage.app",
  messagingSenderId: "957934439108",
  appId: "1:957934439108:web:896273abf7bd548cd4d791",
  measurementId: "G-T85PY29B1Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
export default app;