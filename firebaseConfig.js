import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCHtatyVzbmil7AFq2UjO9c4w9HW5G8v2Q",
  authDomain: "progetto-recupero-4ff23.firebaseapp.com",
  projectId: "progetto-recupero-4ff23",
  storageBucket: "progetto-recupero-4ff23.appspot.com",
  messagingSenderId: "754767668367",
  appId: "1:754767668367:web:761ec632202698a4a9fcfa",
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
// Set the authentication state persistence
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    // Persistence is set. You can now authenticate a user.
  })
  .catch((error) => {
    console.error("Error setting Firebase auth persistence:", error)
  })

export { db, auth }
