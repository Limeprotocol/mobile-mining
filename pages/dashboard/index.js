import BalanceCard from "components/balance-card"
import BottomMenu from "components/bottom-menu"
import MiningCard from "components/mining-card"
import PoolCarousel from "components/pool-carousel"
import RefModal from "components/refmodal"
import SideMenu from "components/side-menu"
import Button from "components/ui/button"
import useAxiosAuth from "lib/hooks/useAxiosAuth"
import { ArrowRight, Link, Loader2, Mail } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Navigation from "pages/layout/Navigation"
import React from "react"

const index = () => {
  const router = useRouter()
  const { data: session } = useSession()
  console.log(session)

  return (
    <Navigation>
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center    md:pb-0">
        <BalanceCard />
        <h1 className="text-[#1c1c1c] mt-5 mb-2 text-left w-full font-bold text-[22px]">
          Delegated Trading
        </h1>
        <div className="w-full bg-white p-4 rounded-3xl">
          <PoolCarousel />
          <Button
            onClick={() => router.push("/dashboard/trading")}
            variant="primary"
            className="w-full mt-5"
          >
            <span className="flex items-center justify-center">
              <span className="mr-2 font-bold text-[18px]">View all</span>
              <ArrowRight size={20} />
            </span>
          </Button>
        </div>
        <h1 className="text-[#1c1c1c] mt-5 mb-2 text-left w-full font-bold text-[22px]">
          Mobile Mining
        </h1>
        <div className="w-full bg-white p-4 rounded-3xl">
          <MiningCard />
          <Button
            onClick={() => router.push("/dashboard/mining")}
            variant="primary"
            className="w-full mt-5"
          >
            <span className="flex items-center justify-center">
              <span className="mr-2 font-bold text-[18px]">Start Mining</span>
              <ArrowRight size={20} />
            </span>
          </Button>
        </div>
      </div>
      {session && session.user.status == 0 && <RefModal />}
    </Navigation>
  )
}

export default index
