import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      if (token) return true // If there is a token, the user is authenticated
    },
  },
  pages: {
    signIn: "/login",
  },
})

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|sw|manifest|workbox-e43f5367|landing|android|ios|windows|favicon.ico|register|login|images|confirm-email|reset-password|send-reset-link).*)(.+)",
  ],
}
