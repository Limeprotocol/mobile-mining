import { useEffect, useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/router"
import Button from "components/ui/button"
import { ArrowRight, ChevronLeft, Key, Link, Loader2, Mail } from "lucide-react"
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth, provider } from "../firebaseConfig"
import toast from "react-hot-toast"

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [referralCode, setReferralCode] = useState("")
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    setIsLoading(true)
    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      setIsLoading(false)
      return
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      toast.success("Account created successfully")
      await signIn("credentials", {
        redirect: false,
        email,
        password,
      })
      router.push("/dashboard")
    } catch (error) {
      toast.error(error.message.split(":")[1])
      console.error(
        "An unexpected error happened:",
        error.message.split(":")[1]
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmitEmail = async (e) => {
    e.preventDefault()
    setStep(2)
  }

  const handleGoolgeSignIn = async () => {
    try {
      const res = await signInWithPopup(auth, provider)

      await signIn("credentials", {
        accessToken: res.user.accessToken,
        email: res.user.email,
        uid: res.user.uid,
        refreshToken: res.user.stsTokenManager.refreshToken,
        redirect: false,
      })
      router.push("/dashboard")
    } catch (error) {
      console.error("An unexpected error happened:", error)
    }
  }

  return (
    <div className="bg-primary  w-full fixed min-h-[100vh] h-[100dvh] top-0  flex flex-col justify-end md:justify-center ">
      <div className="w-full max-w-7xl gap-5 flex md:flex-row items-center flex-col pb-14 md:pb-0 px-5 mx-auto">
        <Button
          variant="black"
          className="w-max px-5 absolute top-5 left-5"
          onClick={() => router.push("/")}
          icon={<ChevronLeft />}
        ></Button>

        <div className="md:w-[50%] hidden md:flex w-full  items-center justify-center">
          <img
            src="/images/2.svg"
            alt="login"
            className="w-full max-w-[300px]"
          />
        </div>

        {step == 1 && (
          <form
            onSubmit={handleSubmitEmail}
            className="md:max-w-[40%]  mx-auto  w-full space-y-4 md:space-y-3    rounded-xl"
          >
            <div className="flex flex-col items-starts gap-3 mb-8">
              <h2 className="mt-6 text-left text-4xl font-extrabold font-raleway text-black">
                Create an account
              </h2>
              <p className="text-gray-800 text-lg font-light">
                Log in using your email and password or just continue with your
                Google account.
              </p>
            </div>
            <div className=" relative  ">
              <div className="w-full flex items-center bg-white rounded-xl pr-2 py-2  pl-5 ">
                <Mail size={30} className="text-black" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-xl py-3 px-5 outline-none w-full text-lg font-light text-gray-800  "
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  type="button"
                  variant="black"
                  className="px-5 py-4 w-max "
                  onClick={() => setStep(2)}
                  icon={<ArrowRight />}
                ></Button>
              </div>
            </div>

            <p className="w-full text-center text-black">Or</p>
            <div>
              <Button
                onClick={() => handleGoolgeSignIn()}
                type="button"
                variant="black"
              >
                <div className="w-[18px]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_30_328)">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M20 10.2222C20 9.39994 19.9319 8.79993 19.7846 8.17773H10.2041V11.8888H15.8276C15.7143 12.8111 15.1021 14.1999 13.7415 15.1332L13.7224 15.2575L16.7516 17.5572L16.9614 17.5778C18.8888 15.8333 20 13.2666 20 10.2222Z"
                        fill="#4285F4"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.2041 20C12.9591 20 15.272 19.1111 16.9614 17.5778L13.7414 15.1332C12.8798 15.7221 11.7233 16.1333 10.2041 16.1333C7.50568 16.1333 5.21546 14.3889 4.39903 11.9778L4.2794 11.9877L1.12958 14.3766L1.08838 14.4888C2.76636 17.7555 6.21311 20 10.2041 20Z"
                        fill="#34A853"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4.3991 11.9778C4.18371 11.3556 4.059 10.6889 4.059 10C4.059 9.31111 4.18365 8.64445 4.38777 8.02224L4.38208 7.8897L1.19284 5.4624L1.08851 5.51106C0.396918 6.86664 0.00012207 8.38884 0.00012207 9.99997C0.00012207 11.6111 0.396979 13.1332 1.08851 14.4888L4.39916 11.9777"
                        fill="#FBBC04"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.2041 3.86658C12.1202 3.86658 13.4126 4.67772 14.1496 5.35555L17.0294 2.59998C15.2608 0.988861 12.9591 0 10.2041 0C6.21311 0 2.76642 2.24442 1.08838 5.51107L4.3877 8.02225C5.21546 5.61115 7.50568 3.86664 10.2041 3.86664"
                        fill="#EA4335"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_30_328">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                Continue with Google
              </Button>
            </div>
          </form>
        )}
        {step == 2 && (
          <div className="md:max-w-[40%]  mx-auto  w-full space-y-4 md:space-y-3    rounded-xl">
            <div className="flex flex-col items-starts gap-3 mb-8">
              <h2 className="mt-6 text-left text-4xl font-extrabold font-raleway text-black">
                Create an account
              </h2>
              <p className="text-gray-800 text-lg font-light">
                Log in using your email and password or just continue with your
                Google account.
              </p>
            </div>
            <div className=" relative  ">
              <div className="flex flex-col gap-3  ">
                <div className="w-full flex bg-white rounded-xl items-center pl-5 ">
                  <Key size={24} className="text-black" />
                  <div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      focus="true"
                      autoComplete="current-password"
                      required
                      className="appearance-none rounded-xl  py-5 px-5 outline-none w-full text-lg font-light text-gray-800  "
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full flex bg-white rounded-xl items-center pl-5 ">
                  <Key size={24} className="text-black" />
                  <div>
                    <input
                      id="confirm-password"
                      name="confirm-password"
                      type="password"
                      focus="true"
                      required
                      className="appearance-none rounded-xl py-5 px-5 outline-none w-full text-lg font-light text-gray-800  "
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full bg-white flex rounded-xl items-center pl-5 ">
                  <Link size={24} className="text-black" />
                  <div>
                    <input
                      id="referralCode"
                      name="referralCode"
                      type="text"
                      focus="true"
                      className="appearance-none rounded-xl py-5 px-5 outline-none w-full text-lg font-light text-gray-800  "
                      placeholder="Referral code (optional)"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="button"
              variant="black"
              className="px-5  w-full "
              onClick={() => handleSubmit()}
              icon={
                !isLoading ? (
                  "Register"
                ) : (
                  <Loader2 className="animate-spin" size={24} />
                )
              }
            ></Button>
          </div>
        )}
      </div>
    </div>
  )
}
