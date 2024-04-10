import React from "react"

const MiningCard = () => {
  return (
    <div className="   bg-[#1c1c1c] text-white  flex flex-col  w-full h-max">
      <div className="w-full p-5 justify-between flex">
        <h1 className="uppercase text-[26px] font-bold">USDT / $LIME</h1>
      </div>
      <div className="w-[90%] mx-auto h-[1px] bg-white/30 rounded-full" />
      <div className="w-full justify-between p-5 flex">
        <div className="flex flex-col items-start">
          <h1 className="text-[18px] text-[#DFF26A]">APY</h1>
          <h2 className="text-[22px] font-bold">2300%</h2>
        </div>
        <div className="flex flex-col items-end ml-5">
          <h1 className="text-[18px] text-[#DFF26A]">TVL</h1>
          <h2 className="text-[22px] font-bold">$32423423</h2>
        </div>
      </div>
    </div>
  )
}

export default MiningCard
