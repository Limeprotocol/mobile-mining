import { Lock } from "lucide-react"
import React from "react"
import Button from "./ui/button"

const UniversalEarnings = ({ name, tokenAmount, timeLeft, locked }) => {
  return (
    <div className="embla__slide rounded-2xl  border text-white  flex flex-col  w-full h-max">
      <div className="w-full bg-[#1c1c1c] rounded-t-2xl px-5 py-3 items-center justify-between flex">
        <h1 className="uppercase text-[26px] font-bold">{name}</h1>
        <div className="bg-[#DFF26A] flex h-max py-2 items-center rounded-full  text-[#1c1c1c] px-3 ">
          {locked ? (
            <span className="font-bold gap-2 flex items-center text-[12px]">
              <Lock size={16} />
              LOCKED
            </span>
          ) : (
            <span className="font-bold gap-2 flex items-center text-[12px]">
              CLAIM
            </span>
          )}
        </div>
      </div>

      <div className="w-full gap-2 flex-col bg-white rounded-b-2xl text-[#1c1c1c]  px-5 pb-5 py-3 flex">
        <div className="flex justify-between">
          <h1 className="font-bold text-[22px]">{tokenAmount}</h1>
          <h1 className="text-[18px]">$LIME</h1>
        </div>
        <p className="text-[12px] text-gray-300">$151.00</p>
        <div className="w-[100%] mx-auto h-[1px] bg-black/30 my-2 rounded-full" />
        <div className="flex justify-between ">
          <h1 className="text-[18px]">Unlocks in:</h1>
          <h1 className="text-[18px]">{timeLeft}</h1>
        </div>
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="w-full mt-3 !font-bold !text-[16px]"
            locked={locked}
          >
            Claim
          </Button>
          <Button
            variant="primary"
            className="w-full mt-3 !font-bold !text-[16px]"
            locked={locked}
          >
            Compound
          </Button>
        </div>
      </div>
    </div>
  )
}

export default UniversalEarnings
