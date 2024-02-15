import Button from "components/ui/button";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div className="font-poppins bg-primary fixed top-0 flex min-h-[100dvh] w-full items-end justify-center px-5 py-16 md:items-center md:py-0">
      <div className="mx-auto flex w-full max-w-7xl flex-col   md:flex-row">
        <div className="flex w-full items-center justify-center md:w-[50%]"></div>
        <div className="flex w-full  items-center justify-center md:w-[50%]">
          <div className="w-full   space-y-10 rounded-xl md:max-w-md    md:space-y-8">
            <div className="items-starts flex flex-col gap-3">
              <h2 className="font-raleway mt-6 text-left text-4xl font-extrabold text-black">
                Secure your financial future with us.
              </h2>
              <p className="text-lg font-light text-gray-800">
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
  );
}
