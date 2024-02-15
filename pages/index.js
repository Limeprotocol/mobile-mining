import Button from "components/ui/button"
import { useRouter } from "next/router"

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-[100dvh] fixed w-full top-0 flex md:items-center items-end px-5 md:py-0 py-16 font-poppins justify-center bg-primary">
      <div className="w-full max-w-7xl flex md:flex-row flex-col   mx-auto">
        <div className="md:w-[50%] w-full flex items-center justify-center"></div>
        <div className="md:w-[50%] w-full  flex items-center justify-center">
          <div className="md:max-w-md   w-full space-y-10 md:space-y-8    rounded-xl">
            <div className="flex flex-col items-starts gap-3">
              <h2 className="mt-6 text-left text-4xl font-extrabold font-raleway text-black">
                Secure your financial future with us.
              </h2>
              <p className="text-gray-800 text-lg font-light">
                Your financial future, our priority. Secure your finances with
                our trusted banking services.
              </p>
            </div>
            <div className="flex gap-5">
              <Button onClick={() => router.push("/login")} variant="black">
                Log in
              </Button>
              <Button onClick={() => router.push("/register")} variant="white">
                Register
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
