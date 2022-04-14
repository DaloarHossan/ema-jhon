// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from "firebase/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5hwl2v-EE20vWvhCsd6DDu6BddXnhsPw",
  authDomain: "ema-jhon-90716.firebaseapp.com",
  projectId: "ema-jhon-90716",
  storageBucket: "ema-jhon-90716.appspot.com",
  messagingSenderId: "752082631319",
  appId: "1:752082631319:web:66a22cebe903a5625007d2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth =getAuth(app);

export default auth;