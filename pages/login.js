// pages/auth/login.js
import Button from "components/ui/button";
import { browserPopupRedirectResolver, signInWithPopup } from "firebase/auth";
import { ArrowRight, ChevronLeft, Key, Loader2, Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { auth, provider } from "../firebaseConfig";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false, // Prevent NextAuth from redirecting automatically
        email,
        password,
      });
      if (result.ok) {
        router.push("/dashboard");
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error("An unexpected error happened:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleGoolgeSignIn = async () => {
    try {
      setIsLoading(true);
      const res = await signInWithPopup(
        auth,
        provider,
        browserPopupRedirectResolver,
      );

      const user = await signIn("credentials", {
        accessToken: res.user.accessToken,
        email: res.user.email,
        uid: res.user.uid,
        refreshToken: res.user.stsTokenManager.refreshToken,
        redirect: false,
      });

      router.push("/dashboard");
    } catch (error) {
      console.error("An unexpected error happened:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-primary  fixed top-0 flex h-[100dvh] min-h-[100vh]  w-full flex-col justify-end md:justify-center ">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-5 px-5 pb-14 md:flex-row md:pb-0">
        <Button
          variant="black"
          className="absolute left-5 top-5 w-max px-5"
          onClick={() => router.push("/")}
          icon={<ChevronLeft />}
        ></Button>
        <div className="flex w-full items-center justify-center md:w-[50%]">
          <img
            src="/images/1.svg"
            alt="login"
            className="w-full max-w-[300px]"
          />
        </div>
        {step == 1 && (
          <form
            onSubmit={handleSubmitEmail}
            className="mx-auto  w-full  space-y-4 rounded-xl md:max-w-[40%]    md:space-y-3"
          >
            <div className="items-starts mb-8 flex flex-col gap-3">
              <h2 className="font-raleway mt-6 text-left text-4xl font-extrabold text-black">
                Welcome Back
              </h2>
              <p className="text-lg font-light text-gray-800">
                Log in using your email and password or just continue with your
                Google account.
              </p>
            </div>
            <div className="relative rounded-xl bg-white pr-2">
              <div className="flex w-full items-center pl-5 ">
                <Mail size={30} className="text-black" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full appearance-none rounded-xl px-5 py-5 text-lg font-light text-gray-800 outline-none  "
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="black"
                  className="w-max px-5 py-4 "
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
            className="mx-auto  w-full  space-y-4 rounded-xl md:max-w-[40%]    md:space-y-3"
          >
            <div className="items-starts mb-8 flex flex-col gap-3">
              <h2 className="font-raleway mt-6 text-left text-4xl font-extrabold text-black">
                Welcome Back
              </h2>
              <p className="text-lg font-light text-gray-800">
                Insert the password for the email address <b>{email}</b>
              </p>
            </div>
            <div className="relative rounded-xl bg-white pr-2">
              <div className="flex w-full items-center pl-5 ">
                <Key size={30} className="text-black" />
                <div className="w-full">
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
                    className="w-full  appearance-none rounded-xl px-5 py-5 text-lg font-light text-gray-800 outline-none  "
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button
                  type="submit"
                  variant="black"
                  className="w-max px-5 py-4 "
                  onClick={handleSubmit}
                  icon={
                    !isLoading ? (
                      <ArrowRight />
                    ) : (
                      <Loader2 className="animate-spin" size={24} />
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
  );
}
