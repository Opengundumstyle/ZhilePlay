import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDmTD2pJk7Z64cgtS3xoL6-U6QBpXgnrFM",
  authDomain: "zhileplay.firebaseapp.com",
  projectId: "zhileplay",
  storageBucket: "zhileplay.appspot.com",
  messagingSenderId: "155541271952",
  appId: "1:155541271952:web:4314065acdc4487819af15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider()
export default app