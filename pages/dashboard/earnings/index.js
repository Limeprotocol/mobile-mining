import React, { useState } from "react"
import Navigation from "pages/layout/Navigation"
import UniversalEarnings from "components/universal-earnings"
import BalanceCard from "components/balance-card"
import { Info } from "lucide-react"

const index = () => {
  const [activeTab, setActiveTab] = useState("MINING")

  const pools = [
    {
      name: "LONG TERM",
      tokenAmount: "0.00",
      timeLeft: "0 Days",
      locked: false,
    },
    {
      name: "MID TERM",
      tokenAmount: "0.00",
      timeLeft: "0 Days",
      locked: true,
    },
    {
      name: "SHORT TERM",
      tokenAmount: "0.00",
      timeLeft: "0 Days",
      locked: false,
    },
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
              <span className="h-max leading-none">0.00</span>
              <span className="text-[18px] leading-none text-primary font-normal">
                $LIME
              </span>
            </h1>
            <p className="text-[12px] text-gray-300">$151.00</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pools.map((pool, index) => (
            <div className="w-full shadow-lg bg-white rounded-3xl p-4">
              <UniversalEarnings key={index} {...pool} />
            </div>
          ))}
        </div>
      </div>
    </Navigation>
  )
}

export default index
