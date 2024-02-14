import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { auth, db } from "../../../firebaseConfig"
import {
  signInWithEmailAndPassword,
  setPersistence,
  localStoragePersistence,
} from "firebase/auth"

// import { doc, getDoc } from "firebase/firestore"

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "john.doe@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) return null

        try {
          await setPersistence(auth, localStoragePersistence)
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          )
          const user = userCredential.user
          //   const docRef = doc(db, "users", user.uid)
          //   const docSnap = await getDoc(docRef)

          if (user) {
            return {
              id: user.uid,
              email: user.email,
              accessToken: user.stsTokenManager.accessToken,
              refreshToken: user.stsTokenManager.refreshToken,
              //   name: docSnap.data().username,
            }
          }
        } catch (error) {
          console.log("EEORRRRR")
          throw new Error(error.message) // This will display an error message on the sign in form
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // If user is signed in, add their details to the JWT token
      if (user) {
        token.uid = user.id
        token.email = user.email
        // token.name = user.name
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
      }
      return token
    },
    async session({ session, token }) {
      // Pass the user details from the JWT token to the session
      session.user.uid = token.uid
      session.user.email = token.email
      //   session.user.username = token.name
      session.user.accessToken = token.accessToken
      session.user.refreshToken = token.refreshToken
      return session
    },
  },
  pages: {
    signIn: "/login", // Your custom sign-in page
    error: "/login", // Your custom error page
  },
  // You might need to add other NextAuth configurations here
})
