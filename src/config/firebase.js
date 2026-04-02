require("dotenv").config();
const firebase = require("firebase/app");

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  databaseURL: process.env.FIREBASE_DATABASE_URL
};

firebase.initializeApp(firebaseConfig);

const {
  getAuth,
  signInWithEmailAndPassword,
  signOut
} = require('firebase/auth');

const {
  getDatabase,
  ref,
  get,
  child,
  increment,
  push,
  set,
  update,
  runTransaction,
  onChildAdded,
  onValue
} = require('firebase/database');

// Firebase Admin
const admin = require('firebase-admin');
const { initializeApp: initializeAdminApp } = require('firebase-admin/app')

const serviceAccount = require('../../creds.json');
const { dot } = require('node:test/reporters');

initializeAdminApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});
  
const adminDatabase = admin.database();

module.exports = { 
  getAuth,
  signInWithEmailAndPassword,
  signOut,

  getDatabase,
  ref,
  get,
  child,
  increment,
  push,
  set,
  update,
  runTransaction,
  onChildAdded,
  onValue,
  
  adminDatabase, 
  admin 
};