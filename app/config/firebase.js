import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// require('dotenv').config();

// const firebaseConfig = {
//   apiKey: "AIzaSyB4sV7E9Wwp6PJSz-bVthtd3oNrbGyyrko",
//   authDomain: "chat-room-efb9b.firebaseapp.com",
//   projectId: "chat-room-efb9b",
//   storageBucket: "chat-room-efb9b.appspot.com",
//   messagingSenderId: "71458941494",
//   appId: "1:71458941494:web:e6daecab16177e7c854697",
// };

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
