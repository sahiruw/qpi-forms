import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore, doc, getDoc, setDoc, initializeFirestore, persistentLocalCache} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  };


// Initialize Firebase
if (!getApps().length) {
  console.log("Initializing Firebase");
  const app = initializeApp(firebaseConfig);

  console.log("Initializing Firestore");
  initializeFirestore(app, {
    persistence: persistentLocalCache,
  });
  console.log("Firebase Initialized");
}

const app = getApp();

const db = getFirestore(app);
const store = getStorage(app);


export { db, store };
// module.exports = { db, store };
