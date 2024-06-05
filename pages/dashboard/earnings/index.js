import React, { useEffect, useState } from "react"
import Navigation from "pages/layout/Navigation"
import UniversalEarnings from "components/universal-earnings"
import BalanceCard from "components/balance-card"
import useAxiosAuth from "lib/hooks/useAxiosAuth"
import { useSession } from "next-auth/react"

const index = () => {
  const [activeTab, setActiveTab] = useState("MINING")
  const { data: session } = useSession()
  const axiosAuth = useAxiosAuth()
  const [limePrice, setLimePrice] = useState(0)
  const [totalEarnings, setTotalEarnings] = useState(0)

  const getPriceAndRewards = async (pool) => {
    const res = await axiosAuth.get(`/api/token/lime/price`)
    const res2 = await axiosAuth.get(`/api/pools/all/rewards`)

    setTotalEarnings(res2.data.totalEarnings)
    setLimePrice(res.data.price)
  }

  useEffect(() => {
    if (session) getPriceAndRewards()
  }, [session])

  const pools =
    activeTab === "TRADING"
      ? [
          {
            name: "long",
            tokenAmount: "0.00",
            timeLeft: "0 Days",
            locked: false
          },
          {
            name: "mid",
            tokenAmount: "0.00",
            timeLeft: "0 Days",
            locked: true
          },
          {
            name: "short",
            tokenAmount: "0.00",
            timeLeft: "0 Days",
            locked: false
          }
        ]
      : [
          {
            name: "USDT / $LIME",
            tokenAmount: "0.00",
            timeLeft: "0 Days",
            locked: false
          }
        ]

  return (
    <Navigation>
      <div className="flex gap-5 flex-col w-full">
        <BalanceCard />
        <div className="tab-selector shadow-lg bg-white rounded-3xl p-4">
          <div className="tabs-container rounded-full bg-gray-200">
            <button
              className={`tab ${activeTab === "MINING" ? "active" : ""}`}
              onClick={() => setActiveTab("MINING")}
            >
              MINING
            </button>
            <button
              className={`tab ${activeTab === "TRADING" ? "active" : ""}`}
              onClick={() => setActiveTab("TRADING")}
            >
              TRADING
            </button>
            <div
              className={`highlight ${
                activeTab === "MINING" ? "left" : "right"
              }`}
            ></div>
          </div>
        </div>
        <div className="w-full shadow-lg bg-white rounded-3xl p-4">
          <div className="bg-[#1c1c1c] flex flex-col gap-1.5 p-5 rounded-3xl text-white">
            <h1 className=" text-[18px] flex justify-between ">
              <span>Total Earnings</span>
              <span className="border rounded-full text-black bg-white py-2 px-3">
                <img src="/images/info.svg" size={16} />
              </span>
            </h1>
            <h1 className="text-[28px] flex items-end gap-2 font-bold">
              <span className="h-max leading-none">
                {Math.ceil(totalEarnings).toLocaleString()}
              </span>
              <span className="text-[18px] leading-none text-primary font-normal">
                $LIME
              </span>
            </h1>
            <p className="text-[12px] text-gray-300">
              ${Math.ceil(totalEarnings / limePrice).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pools.map((pool, index) => (
            <UniversalEarnings
              key={pool.name}
              {...pool}
              type={activeTab}
              limePrice={limePrice}
            />
          ))}
        </div>
      </div>
    </Navigation>
  )
}

export default index
