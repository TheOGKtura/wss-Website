
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyBmhC2TTnWDCIVGiK1fd-2fhUmYd4pR_U0",
  authDomain: "wssthesis.firebaseapp.com",
  projectId: "wssthesis",
  storageBucket: "wssthesis.firebasestorage.app",
  messagingSenderId: "16731226665",
  appId: "1:16731226665:web:a90e3b699ac95333851238",
  databaseURL: "https://wssthesis-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);

import {
    getDatabase,
    ref,
    child,
    onValue,
    get,
    set,
    update,
    remove
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js"

const db = getDatabase();