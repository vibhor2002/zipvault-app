import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAXUF-lfPMGG09tl_-w_LZRPVWfcv95LEs",
    authDomain: "dropbox-app-c11a0.firebaseapp.com",
    projectId: "dropbox-app-c11a0",
    storageBucket: "dropbox-app-c11a0.appspot.com",
    messagingSenderId: "185436456752",
    appId: "1:185436456752:web:f0015cdc22189accedaaf5"
  };
   
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };