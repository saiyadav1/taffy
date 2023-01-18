import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
apiKey: "AIzaSyAhV4vJAkLcQ9U_kk2OtTXxDyMTHp0WlD0",
  authDomain: "taffy-a9c2d.firebaseapp.com",
  databaseURL: "https://taffy-a9c2d-default-rtdb.firebaseio.com",
  projectId: "taffy-a9c2d",
  storageBucket: "taffy-a9c2d.appspot.com",
  messagingSenderId: "448381700196",
  appId: "1:448381700196:web:3d267fba428d6275dcb771",
  measurementId: "G-NPTPY1V9E4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage=getStorage(app);


