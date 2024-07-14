import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCCQmhNnnMJDFsyayVSnHqsPSZww4jM6YA",
  authDomain: "news-57f42.firebaseapp.com",
  projectId: "news-57f42",
  storageBucket: "news-57f42.appspot.com",
  messagingSenderId: "813634162700",
  appId: "1:813634162700:web:ba30129729b7ab0c8cde29"
};


const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const googleProvider=new GoogleAuthProvider(app)
export const database=getFirestore(app)