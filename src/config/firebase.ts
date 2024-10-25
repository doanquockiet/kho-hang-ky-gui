// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from 'firebase/storage';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyATY0_iipijRY3HXAaIKdOv-O_HvVRfvfA",
    authDomain: "upload-mongos.firebaseapp.com",
    projectId: "upload-mongos",
    storageBucket: "upload-mongos.appspot.com",
    messagingSenderId: "654166349786",
    appId: "1:654166349786:web:733353a1faf499ded1d2e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
export default app;