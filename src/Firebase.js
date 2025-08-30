// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAF2avmGUoEg0z3BYsajyfKuoDYjgQSHJw",
  authDomain: "task-manager-effaa.firebaseapp.com",
  projectId: "task-manager-effaa",
  storageBucket: "task-manager-effaa.firebasestorage.app",
  messagingSenderId: "969436585000",
  appId: "1:969436585000:web:80b655ad4352fed78f291d",
  measurementId: "G-QM5XDB1XFX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// initialize services
const auth = getAuth(app);
const db = getFirestore(app);

// export to use in components
export { auth, db };
