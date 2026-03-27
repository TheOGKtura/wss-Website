require("dotenv").config();
const firebase = require("firebase/app");

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

firebase.initializeApp(firebaseConfig);

const {
    getAuth,
    signInWithEmailAndPassword,
    signOut
} = require('firebase/auth');

// Firebase Admin
const admin = require('firebase-admin');
const { initializeApp: initializeAdminApp } = require('firebase-admin/app')

const serviceAccount = require('../../creds.json');
const { dot } = require('node:test/reporters');

initializeAdminApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://wssthesis-default-rtdb.asia-southeast1.firebasedatabase.app"
});
  
const database = admin.database();

module.exports = { 
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  database, 
  admin 
};