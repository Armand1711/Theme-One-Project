import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut as _signOut
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey:            "AIzaSyAwdAoBcNp5PMGv8M7b9Jro4GBf0nHOUW4",
  authDomain:        "masonic-bdac7.firebaseapp.com",
  projectId:         "masonic-bdac7",
  storageBucket:     "masonic-bdac7.firebasestorage.app",
  messagingSenderId: "977506836471",
  appId:             "1:977506836471:web:0aa23fdc6dfbe8aad858f2"
};

const fbApp = initializeApp(firebaseConfig);
const auth  = getAuth(fbApp);
const db    = getFirestore(fbApp);

// ── Auth ───────────────────────────────────────────────────────────────────
export const signUp         = (email, pw) => createUserWithEmailAndPassword(auth, email, pw);
export const signIn         = (email, pw) => signInWithEmailAndPassword(auth, email, pw);
export const signOut        = ()          => _signOut(auth);
export const onAuthChange   = (cb)        => onAuthStateChanged(auth, cb);
export const getCurrentUser = ()          => auth.currentUser;

// ── Firestore ──────────────────────────────────────────────────────────────
export async function saveUserProfile(uid, { name, email }) {
  await setDoc(doc(db, 'users', uid), {
    name,
    email,
    createdAt:        serverTimestamp(),
    completedPuzzles: 0
  });
}

export async function getUserProfile(uid) {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? snap.data() : null;
}

export async function syncProgress(uid, completedPuzzles) {
  await updateDoc(doc(db, 'users', uid), { completedPuzzles });
}
