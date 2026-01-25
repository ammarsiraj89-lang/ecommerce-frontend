// /script/firebase-auth.js
import { 
  initializeApp 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


// ---------------- FIREBASE CONFIG ----------------
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeSNIxXzWSjjrI0FouZjQZIN2-6wH-a2Y",
  authDomain: "comfort-desk.firebaseapp.com",
  databaseURL: "https://comfort-desk-default-rtdb.firebaseio.com",
  projectId: "comfort-desk",
  storageBucket: "comfort-desk.firebasestorage.app",
  messagingSenderId: "109687131068",
  appId: "1:109687131068:web:f42451da43c01ac5e479b9",
  measurementId: "G-ZJVVZYYNET"
};
// --------------------------------------------------

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// 🔹 REGISTER
export function registerUser(name, email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}


// 🔹 LOGIN
export function loginUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}


// 🔹 LOGOUT
export function logoutUser() {
  return signOut(auth);
}


// 🔹 AUTH STATE LISTENER
export function watchUser(callback) {
  onAuthStateChanged(auth, callback);
}
