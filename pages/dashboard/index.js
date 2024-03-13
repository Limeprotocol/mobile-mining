import useAxiosAuth from "lib/hooks/useAxiosAuth"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import React from "react"

const index = () => {
  const router = useRouter()
  const { data: session } = useSession()
  console.log(session)
  const axiosAuth = useAxiosAuth()

  const test401 = async () => {
    const res = await axiosAuth("/api/test401")
  }

  return (
    <main className={`flex min-h-screen flex-col items-center  p-24 `}>
      <h1>TEST 401 CALL</h1>

      <div className="flex flex-col gap-5">
        <button
          onClick={() => test401()}
          className="rounded-md bg-blue-500 p-4 text-white"
        >
          TEST
        </button>
        <button
          className="rounded-md bg-blue-500 p-4 text-white"
          onClick={async () =>
            await signOut({
              redirect: true,
              callbackUrl: "/login",
            })
          }
        >
          LOGOUT
        </button>
      </div>
    </main>
  )
}

export default index
