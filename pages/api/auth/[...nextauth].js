import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

import { auth, db } from "../../../firebaseConfig"
import {
  signInWithEmailAndPassword,
  setPersistence,
  localStoragePersistence,
} from "firebase/auth"

// import { doc, getDoc } from "firebase/firestore"

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 4 hours
  },
  providers: [
    GoogleProvider({
      clientId:
        "754767668367-v6bj2a3v1tb5v4ctu1d0g7tqe10at8ds.apps.googleusercontent.com",
      clientSecret: "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",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "token id_token",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        if (!credentials) return null

        try {
          if (
            !credentials.accessToken ||
            !credentials.refreshToken ||
            !credentials.uid
          ) {
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
          }
          return {
            id: credentials.uid,
            email: credentials.email,
            accessToken: credentials.accessToken,
            refreshToken: credentials.refreshToken,
          }
        } catch (error) {
          throw new Error(error.message)
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
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
      session.user.uid = token.uid
      session.user.email = token.email
      //   session.user.username = token.name
      session.user.accessToken = token.accessToken
      session.user.refreshToken = token.refreshToken
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
})
