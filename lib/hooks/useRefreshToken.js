import { useSession } from "next-auth/react"
import { auth } from "../../firebaseConfig"

export const useRefreshToken = () => {
  const { data: session, update } = useSession()

  const refreshToken = async () => {
    const res = await fetch(
      "https://securetoken.googleapis.com/v1/token?key=AIzaSyCHtatyVzbmil7AFq2UjO9c4w9HW5G8v2Q",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          grant_type: "refresh_token",
          refresh_token: session.user.refreshToken,
        }),
      }
    )
    const data = await res.json()
    console.log("refresh token", data)
    if (session) {
      session.accessToken = data.access_token

      await update({
        ...session,
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      })
    }
  }
  return refreshToken
}
