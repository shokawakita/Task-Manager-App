import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_Qm6StS58bWGguHRC0dHcULPPRONvVX8",
  authDomain: "task-manager-fb3b0.firebaseapp.com",
  projectId: "task-manager-fb3b0",
  storageBucket: "task-manager-fb3b0.appspot.com",
  messagingSenderId: "610963763081",
  appId: "1:610963763081:web:1c21a28572f9d85563bb58",
  measurementId: "G-PLTBX4RC04"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth };
export default db;
