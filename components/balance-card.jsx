import { Wallet } from "lucide-react"
import React from "react"

const BalanceCard = ({ compressed }) => {
  return (
    <div className="w-full items-center bg-white text-[#1C1C1C] rounded-3xl p-5 flex  gap-3 shadow-md">
      <div className="border rounded-full h-[60px] bg-gray-300 w-[60px]">
        <img src="" alt="" className="w-full" />
      </div>
      <div
        className={`flex flex-1 flex-col ${
          compressed ? "items-end" : "items-start"
        }  justify-center`}
      >
        <h1 className="text-[16px]">Total Balance</h1>
        <h2 className="text-[24px] font-bold">$45,456</h2>
      </div>
      {!compressed && (
        <div className="bg-[#EBEBEB] p-4 rounded-full">
          <Wallet size={30} className="text-[#1C1C1C]" />
        </div>
      )}
    </div>
  )
}

export default BalanceCard
