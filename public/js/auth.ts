import { initializeApp } from "firebase/app";
import { getDatabase , ref, set, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyBmhC2TTnWDCIVGiK1fd-2fhUmYd4pR_U0",
  authDomain: "wssthesis.firebaseapp.com",
  databaseURL: "https://wssthesis-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "wssthesis",
  storageBucket: "wssthesis.firebasestorage.app",
  messagingSenderId: "16731226665",
  appId: "1:16731226665:web:a90e3b699ac95333851238",
  measurementId: "G-ZHR6V8XTKM",
};

const app = initializeApp(firebaseConfig);

// Services
const database = getDatabase(app);
const auth = getAuth(app);
