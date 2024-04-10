import React from "react"
import Button from "./ui/button"
import { ArrowRight } from "lucide-react"

const UniversalCard = ({ name, daily, apy, tvl, lock, commission }) => {
  return (
    <div className="embla__slide rounded-2xl  bg-[#1c1c1c] text-white  flex flex-col  w-full h-max">
      <div className="w-full p-5 justify-between flex">
        <h1 className="uppercase text-[26px] font-bold">{name} TERM</h1>
        <div className="bg-[#DFF26A] rounded-full text-[#1c1c1c] px-3 py-1.5">
          <span className="font-bold mr-1 text-[14px]">{daily}%</span>
          <span className="text-[11px]">/day</span>
        </div>
      </div>
      <div className="w-[90%] mx-auto h-[1px] bg-white/30 rounded-full" />
      <div className="w-full justify-between px-5 py-2 flex">
        <div className="flex flex-col items-start">
          <h1 className="text-[18px] text-[#DFF26A]">APY</h1>
          <h2 className="text-[22px] font-bold">{apy}%</h2>
        </div>
        <div className="flex flex-col items-end ml-5">
          <h1 className="text-[18px] text-[#DFF26A]">TVL</h1>
          <h2 className="text-[22px] font-bold">${tvl}</h2>
        </div>
      </div>
      <div className="w-full justify-between px-5 pt-1 pb-4 flex">
        <div className="flex flex-col items-start">
          <h1 className="text-[18px] text-[#DFF26A]">LOCK PERIOD</h1>
          <h2 className="text-[22px] font-bold">{lock}%</h2>
        </div>
        <div className="flex flex-col items-end ml-5">
          <h1 className="text-[18px] text-[#DFF26A]">COMMISSION</h1>
          <h2 className="text-[22px] font-bold">${commission}</h2>
        </div>
      </div>
    </div>
  )
}

export default UniversalCard
