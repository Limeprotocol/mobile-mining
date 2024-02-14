import Image from "next/image"
import { Inter } from "next/font/google"
import { useEffect, useState } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import useAxiosAuth from "lib/hooks/useAxiosAuth"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const [firebaseUser, setFirebaseUser] = useState(null)
  const axiosAuth = useAxiosAuth()

  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setFirebaseUser(user)
      } else {
        // User is signed out
        setFirebaseUser(null)
      }
    })
    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [])

  const handleTest = async () => {
    const res = await axiosAuth.post("/api/test401")
    // Handle the response
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1>TEST 401 CALL</h1>

      <div>
        <button
          onClick={handleTest}
          className="bg-blue-500 text-white p-4 rounded-md"
        >
          TEST
        </button>
      </div>
    </main>
  )
}
