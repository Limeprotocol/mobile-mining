import { useSession } from "next-auth/react"
import axios from "lib/axios"

export const useRefreshToken = () => {
  const { data: session, update } = useSession()

  const refreshToken = async () => {
    const res = await fetch(
      `https://securetoken.googleapis.com/v1/token?key=AIzaSyBMmiJYxuL5yckunhAOB_OayYOqV6q_LQc`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          grant_type: "refresh_token",
          refresh_token: session.user.refreshToken
        })
      }
    )
    const { access_token, refresh_token } = await res.json()
    const userData = await axios.post(
      "api/user/create",
      {},
      {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }
    )
    const data = userData.data.user_info

    if (session) {
      session.accessToken = access_token
      session.refreshToken = refresh_token
      session.user.user_uid = data.user_uid
      session.user.address = data.address
      session.user.code = data.code
      session.user.status = data.status

      await update({
        ...session,
        accessToken: access_token,
        refreshToken: refresh_token,
        user_uid: data.user_uid,
        address: data.address,
        code: data.code,
        status: data.status
      })
    }
  }
  return refreshToken
}
