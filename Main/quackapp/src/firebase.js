import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGdTDVS9NELVWrDU35NuB6xWTvW31Kx_8",
  authDomain: "auth-developement-5d7b0.firebaseapp.com",
  projectId: "auth-developement-5d7b0",
  storageBucket: "auth-developement-5d7b0.appspot.com",
  messagingSenderId: "512071870517",
  appId: "1:512071870517:web:9284d7df037bf4c52fa97c",
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db = getDatabase(app);
export const storeDB = getFirestore(app);

// export default app;
