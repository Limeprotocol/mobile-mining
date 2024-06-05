import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  GoogleAuthProvider,
} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBMmiJYxuL5yckunhAOB_OayYOqV6q_LQc",
  authDomain: "limeprotocol-cd9cf.firebaseapp.com",
  projectId: "limeprotocol-cd9cf",
  storageBucket: "limeprotocol-cd9cf.appspot.com",
  messagingSenderId: "428410915701",
  appId: "1:428410915701:web:c4ab40df1361e6ecfb213c",
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: "select_account",
})

export { db, auth, provider }
