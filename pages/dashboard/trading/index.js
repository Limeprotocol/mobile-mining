import BalanceCard from "components/balance-card"
import Button from "components/ui/button"
import UniversalCard from "components/universal-card"
import useAxiosAuth from "lib/hooks/useAxiosAuth"
import { ArrowRight } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Navigation from "pages/layout/Navigation"
import React, { useEffect } from "react"

const index = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [price, setPrice] = React.useState(0)
  const axiosAuth = useAxiosAuth()
  const pools = [
    {
      name: "long"
    },
    {
      name: "mid"
    },
    {
      name: "short"
    }
  ]

  const getPrice = async (pool) => {
    const res = await axiosAuth.get(`/api/token/lime/price`)
    setPrice(res.data.price)
  }

  useEffect(() => {
    if (!session) return
    getPrice()
  }, [session])

  return (
    <Navigation>
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center   md:pb-0">
        <BalanceCard />
        <h1 className="text-[#1c1c1c] mt-5 mb-2 text-left w-full font-bold text-[22px]">
          Choose trading strategy
        </h1>
        <div className="grid w-full gap-6 md:grid-cols-2 grid-cols-1">
          {pools.map((pool, index) => (
            <div className="w-full shadow-lg bg-white rounded-3xl p-4">
              <UniversalCard key={index} name={pool.name} limePrice={price} />
              <Button
                onClick={() => router.push("/dashboard/trading/" + pool.name)}
                variant="primary"
                className="w-full mt-5"
              >
                <span className="flex items-center justify-center">
                  <span className="mr-2 font-bold text-[18px]">Choose</span>
                  <ArrowRight size={20} />
                </span>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Navigation>
  )
}

export default index
