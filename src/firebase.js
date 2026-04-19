import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPgSSBA0Vk06tNXvAZMX78FPS2c3ezOTM",
  authDomain: "edgecareer-29599.firebaseapp.com",
  projectId: "edgecareer-29599",
  storageBucket: "edgecareer-29599.firebasestorage.app",
  messagingSenderId: "268427012396",
  appId: "1:268427012396:web:198dcb16fb8ce2ecb86489",
  measurementId: "G-VQ4G444P4F"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
