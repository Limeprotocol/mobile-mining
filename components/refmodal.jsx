import { Link, Loader2 } from "lucide-react"
import React from "react"
import Button from "./ui/button"
import { useRefreshToken } from "lib/hooks/useRefreshToken"
import useAxiosAuth from "lib/hooks/useAxiosAuth"

const RefModal = () => {
  const [referralCode, setReferralCode] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const refreshToken = useRefreshToken()
  const axiosAuth = useAxiosAuth()

  const updateUserInfo = async () => {
    setIsLoading(true)
    const res = await axiosAuth.post("api/user/status/update", {
      refcode: referralCode
    })
    if (res.status === 200) {
      console.log(res)
      await refreshToken()
      setIsLoading(false)
    } else {
      setIsLoading(false)
      alert("Invalid referral code")
    }
  }
  return (
    <div className="bg-primary mx-auto fixed z-[50] top-0 left-0 flex h-[100dvh] min-h-[100vh]  w-full flex-col md:justify-center justify-end ">
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
              To complete your registration, please enter your referral code
            </p>
          </div>
          <div className="relative rounded-xl bg-white pr-2 py-2">
            <div className="flex w-full items-center pl-5 ">
              <Link size={30} className="text-black" />
              <input
                type="text"
                className="w-full  appearance-none rounded-xl px-5 py-4 text-lg font-light text-gray-800 outline-none  "
                placeholder="Referral code"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Button
              onClick={() => updateUserInfo()}
              loading={isLoading}
              type="button"
              variant="black"
            >
              {!isLoading && <>Finish</>}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RefModal
