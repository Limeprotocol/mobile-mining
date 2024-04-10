import BalanceCard from "components/balance-card"
import Button from "components/ui/button"
import UniversalCard from "components/universal-card"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/router"
import Navigation from "pages/layout/Navigation"
import React from "react"

const index = () => {
  const router = useRouter()
  const pools = [
    {
      name: "long",
      daily: 1.97,
      apy: 54180,
      tvl: 5456234,
      lock: 20,
      commission: 7,
    },
    {
      name: "mid",
      daily: 1.97,
      apy: 54180,
      tvl: 5456234,
      lock: 30,
      commission: 5,
    },
    {
      name: "short",
      daily: 1.97,
      apy: 54180,
      tvl: 5456234,
      lock: 40,
      commission: 3,
    },
  ]
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
              <UniversalCard
                key={index}
                name={pool.name}
                daily={pool.daily}
                apy={pool.apy}
                tvl={pool.tvl}
                lock={pool.lock}
                commission={pool.commission}
              />
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
