// ----------------------
//  FIREBASE IMPORTS
// ----------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// ----------------------
//  YOUR FIREBASE CONFIG
// ----------------------
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
// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// ----------------------
//  REGISTER USER
// ----------------------
if (document.getElementById("regBtn")) {
  document.getElementById("regBtn").onclick = async () => {

    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const pass = document.getElementById("regPassword").value;

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, pass);
      const uid = userCred.user.uid;

      await setDoc(doc(db, "users", uid), {
        name: name,
        email: email,
        phone: ""
      });

      alert("Account Created!");
      window.location.href = "profile.html";

    } catch (err) {
      alert(err.message);
    }
  };
}


// ----------------------
//  LOGIN USER
// ----------------------
if (document.getElementById("loginBtn")) {
  document.getElementById("loginBtn").onclick = async () => {

    const email = document.getElementById("loginEmail").value;
    const pass = document.getElementById("loginPassword").value;

    try {
      await signInWithEmailAndPassword(auth, email, pass);
      alert("Login Successful!");
      window.location.href = "profile.html";

    } catch (err) {
      alert(err.message);
    }
  };
}


// ----------------------
//  PROFILE PAGE LOAD
// ----------------------
async function loadProfile(user) {
  if (!user) return;

  const uid = user.uid;

  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    const data = snap.data();

    document.getElementById("profileName").innerText = data.name;
    document.getElementById("profileEmail").innerText = data.email;
    document.getElementById("nameInput").value = data.name;
    document.getElementById("emailInput").value = data.email;
    document.getElementById("phoneInput").value = data.phone;
  }
}


// ----------------------
//  AUTH STATE LISTENER
// ----------------------
onAuthStateChanged(auth, (user) => {
  const inProfile = window.location.pathname.includes("profile.html");
  const inLogin = window.location.pathname.includes("login.html");

  if (user) {
    if (inProfile) loadProfile(user);
  }

  if (!user && inProfile) {
    window.location.href = "login.html";
  }
});


// ----------------------
//  LOGOUT FUNCTION
// ----------------------
window.logoutUser = async () => {
  await signOut(auth);
  window.location.href = "login.html";
};
