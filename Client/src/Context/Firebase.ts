import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_FB,
  authDomain: import.meta.env.VITE_AUDOM_FB,
  projectId: import.meta.env.VITE_PROJ_FB,
  storageBucket: import.meta.env.VITE_STORE_FB,
  messagingSenderId: import.meta.env.VITE_MESSAGE_FB,
  appId: import.meta.env.VITE_APPID_FB
};


export const app = initializeApp(firebaseConfig);