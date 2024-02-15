import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import React from "react"

const index = () => {
  const router = useRouter()
  const { data: session } = useSession()
  console.log(session)
  return (
    <main className={`flex min-h-screen flex-col items-center  p-24 `}>
      <h1>TEST 401 CALL</h1>

      <div className="flex flex-col gap-5">
        <button
          onClick={() => router.push("/login")}
          className="bg-blue-500 text-white p-4 rounded-md"
        >
          TEST
        </button>
        <button
          className="bg-blue-500 text-white p-4 rounded-md"
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
