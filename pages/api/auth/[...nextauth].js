import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

import { auth, db } from "../../../firebaseConfig"
import {
  signInWithEmailAndPassword,
  setPersistence,
  localStoragePersistence
} from "firebase/auth"
import axios from "lib/axios"

// import { doc, getDoc } from "firebase/firestore"

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60 // 4 hours
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
          response_type: "token id_token"
        }
      }
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
            !credentials.user_uid ||
            !credentials.address ||
            !credentials.code ||
            !credentials.status
          ) {
            const userCredential = await signInWithEmailAndPassword(
              auth,
              credentials.email,
              credentials.password
            )
            console.log("userCredential", userCredential)
            const res = await axios.post(
              "api/user/create",
              {},
              {
                headers: {
                  Authorization: `Bearer ${userCredential.user.stsTokenManager.accessToken}`
                }
              }
            )
            const data = res.data.user_info
            const user = userCredential.user

            if (user) {
              return {
                user_uid: data.user_uid,
                address: data.address,
                code: data.code,
                status: data.status,
                accessToken: user.stsTokenManager.accessToken,
                refreshToken: user.stsTokenManager.refreshToken
              }
            }
          }
          return {
            user_id: credentials.user_uid,
            address: credentials.address,
            code: credentials.code,
            status: credentials.status,
            accessToken: credentials.accessToken,
            refreshToken: credentials.refreshToken
          }
        } catch (error) {
          console.log("error", error)
          throw new Error(error.message)
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session, ...user }
      }
      if (user) {
        token.user_uid = user.user_uid
        token.address = user.address
        token.code = user.code
        token.status = user.status
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
      }
      return token
    },
    async session({ session, token }) {
      session.user.user_uid = token.user_uid
      session.user.address = token.address
      session.user.code = token.code
      session.user.status = token.status
      session.user.accessToken = token.accessToken
      session.user.refreshToken = token.refreshToken
      console.log("session", session)
      return session
    }
  },
  pages: {
    signIn: "/login"
  }
})
