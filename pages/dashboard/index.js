import Button from "components/ui/button"
import useAxiosAuth from "lib/hooks/useAxiosAuth"
import { ArrowRight, Link, Loader2, Mail } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import React from "react"

const index = () => {
  const router = useRouter()
  const { data: session } = useSession()
  console.log(session)
  const axiosAuth = useAxiosAuth()
  const [referralCode, setReferralCode] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)

  const test401 = async () => {
    const res = await axiosAuth("/api/test401")
  }

  const updateUserInfo = async () => {
    const res = await axiosAuth.post("/user/status/update", {
      refCode: referralCode,
    })
    console.log(res)
  }

  return (
    <div className="bg-primary  fixed top-0 flex h-[100dvh] min-h-[100vh]  w-full flex-col justify-end md:justify-center ">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-5 px-5 pb-14 md:flex-row md:pb-0">
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
        {session && session.user.status == 0 && (
          <div className="bg-primary mx-auto fixed top-0 flex h-[100dvh] min-h-[100vh]  w-full flex-col md:justify-center justify-end ">
            <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-5 px-5 pb-14 md:flex-row md:pb-0">
              <div className="flex w-full items-center justify-center md:w-[50%]">
                <img
                  src="/images/1.svg"
                  alt="login"
                  className="w-full max-w-[300px]"
                />
              </div>
              <form
                onSubmit={updateUserInfo}
                className="mx-auto  w-full  space-y-4 rounded-xl md:max-w-[40%]    md:space-y-3"
              >
                <div className="items-starts mb-8 flex flex-col gap-3">
                  <h2 className="font-raleway mt-6 text-left text-4xl font-extrabold text-black">
                    Create an account
                  </h2>
                  <p className="text-lg font-light text-gray-800">
                    To complete your registration, please enter your referral
                    code
                  </p>
                </div>
                <div className="relative rounded-xl bg-white pr-2 py-2">
                  <div className="flex w-full items-center pl-5 ">
                    <Link size={30} className="text-black" />
                    <input
                      type="text"
                      className="w-full  appearance-none rounded-xl px-5 py-5 text-lg font-light text-gray-800 outline-none  "
                      placeholder="Referral code"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                    />
                    <Button
                      type="submit"
                      variant="black"
                      className="w-max px-5 py-4 "
                      icon={<ArrowRight />}
                    ></Button>
                  </div>
                </div>

                <div>
                  <Button
                    onClick={() => updateUserInfo()}
                    type="button"
                    variant="black"
                  >
                    {!isLoading && <>Finish</>}
                    {isLoading && (
                      <Loader2 className="animate-spin" size={20} />
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default index
