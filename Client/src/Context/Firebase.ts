import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_FB,
  authDomain: import.meta.env.VITE_AUDOM_FB,
  projectId: import.meta.env.VITE_PROJ_FB,
  storageBucket: import.meta.env.VITE_STORE_FB,
  messagingSenderId: import.meta.env.VITE_MESSAGE_FB,
  appId: import.meta.env.VITE_APPID_FB
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const store = firebase.storage();
const db = firebase.firestore();

export { auth, store, db };