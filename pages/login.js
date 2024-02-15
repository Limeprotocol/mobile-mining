// pages/auth/login.js
import { useEffect, useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/router"
import Button from "components/ui/button"
import { ArrowRight, ChevronLeft, Key, Loader2, Mail } from "lucide-react"
import { browserPopupRedirectResolver, signInWithPopup } from "firebase/auth"
import { auth, provider } from "../firebaseConfig"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const result = await signIn("credentials", {
        redirect: false, // Prevent NextAuth from redirecting automatically
        email,
        password,
      })
      if (result.ok) {
        router.push("/dashboard")
      } else {
        alert(result.error)
      }
    } catch (error) {
      console.error("An unexpected error happened:", error)
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
      setIsLoading(true)
      const res = await signInWithPopup(
        auth,
        provider,
        browserPopupRedirectResolver
      )

      const user = await signIn("credentials", {
        accessToken: res.user.accessToken,
        email: res.user.email,
        uid: res.user.uid,
        refreshToken: res.user.stsTokenManager.refreshToken,
        redirect: false,
      })

      router.push("/dashboard")
    } catch (error) {
      console.error("An unexpected error happened:", error)
    } finally {
      setIsLoading(false)
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
        <div className="md:w-[50%] w-full flex items-center justify-center">
          <img
            src="/images/1.svg"
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
                Welcome Back
              </h2>
              <p className="text-gray-800 text-lg font-light">
                Log in using your email and password or just continue with your
                Google account.
              </p>
            </div>
            <div className="rounded-xl relative bg-white pr-3">
              <div className="w-full flex items-center pl-5 ">
                <Mail size={30} className="text-black" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-xl py-6 px-5 outline-none w-full text-lg font-light text-gray-800  "
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="black"
                  className="px-5 w-max "
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
                {!isLoading && (
                  <>
                    <div className="w-[18px]">
                      <svg role="img" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        />
                      </svg>
                    </div>
                    Continue with Google
                  </>
                )}
                {isLoading && <Loader2 className="animate-spin" size={20} />}
              </Button>
            </div>
          </form>
        )}
        {step == 2 && (
          <form
            onSubmit={handleSubmit}
            className="md:max-w-[40%]  mx-auto  w-full space-y-4 md:space-y-3    rounded-xl"
          >
            <div className="flex flex-col items-starts gap-3 mb-8">
              <h2 className="mt-6 text-left text-4xl font-extrabold font-raleway text-black">
                Welcome Back
              </h2>
              <p className="text-gray-800 text-lg font-light">
                Log in using your email and password or just continue with your
                Google account.
              </p>
            </div>
            <div className="rounded-xl relative bg-white pr-3">
              <div className="w-full flex items-center pl-5 ">
                <Key size={30} className="text-black" />
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    focus="true"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-xl py-6 px-5 outline-none w-full text-lg font-light text-gray-800  "
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button
                  type="submit"
                  variant="black"
                  className="px-5 w-max "
                  onClick={handleSubmit}
                  icon={
                    !isLoading ? (
                      <ArrowRight />
                    ) : (
                      <Loader2 className="animate-spin" size={30} />
                    )
                  }
                ></Button>
              </div>
            </div>
            {step == 1 && (
              <>
                {" "}
                <p className="w-full text-center text-black">Or</p>
                <div>
                  <Button type="button" variant="black">
                    Continue with Google
                  </Button>
                </div>{" "}
              </>
            )}
          </form>
        )}
      </div>
    </div>
  )
}
