import BalanceCard from "components/balance-card"
import Button from "components/ui/button"
import { ArrowRight, ChevronLeft } from "lucide-react"
import { useRouter } from "next/router"
import Navigation from "pages/layout/Navigation"
import React, { useEffect, useState } from "react"

const Pool = () => {
  const router = useRouter()
  const [poolName, setPoolName] = useState("")

  const poolInfo = {
    daily: 1.97,
    apy: 54180,
    tvl: 5456234,
    lock: 20,
    commission: 7,
  }

  useEffect(() => {
    const { name } = router.query
    if (name) {
      setPoolName(name)
    }
  }, [router.isReady])

  return (
    <Navigation>
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center   md:pb-0">
        <div className="flex items-center w-full">
          <div className="w-[30%]">
            <ChevronLeft
              onClick={() => router.back()}
              className="cursor-pointer text-[#1c1c1c] w-[50px] h-[50px]"
            />
          </div>
          <BalanceCard compressed={true} />
        </div>
        <div className="w-full bg-white p-4 shadow-lg mt-5 rounded-3xl">
          <div className="embla__slide rounded-2xl  bg-[#1c1c1c] text-white  flex flex-col  w-full h-max">
            <div className="w-full p-5 justify-between flex">
              <h1 className="uppercase text-[26px] font-bold">
                {poolName} TERM
              </h1>
              <div className="bg-[#DFF26A] rounded-full text-[#1c1c1c] px-3 py-1.5">
                <span className="font-bold mr-1 text-[14px]">
                  {poolInfo.daily}%
                </span>
                <span className="text-[11px]">/day</span>
              </div>
            </div>
            <div className="w-[90%] mx-auto h-[1px] bg-white/30 rounded-full" />
            <div className="w-full justify-between px-5 py-2 flex">
              <div className="flex flex-col items-start">
                <h1 className="text-[18px] text-[#DFF26A]">APY</h1>
                <h2 className="text-[22px] font-bold">{poolInfo.apy}%</h2>
              </div>
              <div className="flex flex-col items-end ml-5">
                <h1 className="text-[18px] text-[#DFF26A]">TVL</h1>
                <h2 className="text-[22px] font-bold">${poolInfo.tvl}</h2>
              </div>
            </div>
            <div className="w-full justify-between px-5 pt-1 pb-4 flex">
              <div className="flex flex-col items-start">
                <h1 className="text-[18px] text-[#DFF26A]">LOCK PERIOD</h1>
                <h2 className="text-[22px] font-bold">{poolInfo.lock}%</h2>
              </div>
              <div className="flex flex-col items-end ml-5">
                <h1 className="text-[18px] text-[#DFF26A]">COMMISSION</h1>
                <h2 className="text-[22px] font-bold">
                  ${poolInfo.commission}
                </h2>
              </div>
            </div>
          </div>
          <div className="flex flex-col px-4 pt-4 text-[#1c1c1c] w-full ">
            <div className="flex flex-col items-start justify-center">
              <h1 className="text-[18px]">YOUR DEPOSIT</h1>
              <div className="flex w-full justify-between items-center">
                <span className="font-bold text-[22px]">0.00</span>
                <span className="font-bold text-[22px]">$LIME</span>
              </div>
              <p className="text-[12px] text-gray-400">$0.00</p>
            </div>
          </div>
        </div>
        <div className="bg-white w-full  rounded-3xl mt-5 shadow-lg p-4 ">
          <div className="text-lg text-[#1c1c1c] font-semibold mb-4">
            Delegate $TOKEN
          </div>
          <div className="flex flex-col bg-gray-200 items-center p-3 rounded-2xl">
            <div className="flex w-full">
              <input
                type="text"
                placeholder="0.00"
                className="flex-grow border bg-transparent text-[#1c1c1c] outline-none border-none rounded p-2 mr-2 text-lg"
              />
              <button className=" text-gray-700 font-bold py-2 px-4 rounded focus:outline-none">
                Max
              </button>
            </div>
            <div className="w-full flex justify-between px-2">
              <div className="text-sm text-gray-600 ">$0.00</div>
              <div className="text-sm text-gray-600 ">Balance: {0.0}</div>
            </div>
          </div>
          <Button variant="primary" className="w-full mt-5">
            <span className="flex items-center justify-center">
              <span className="mr-2 font-bold text-[18px]">Confirm</span>
              <ArrowRight size={20} />
            </span>
          </Button>
        </div>
      </div>
    </Navigation>
  )
}

export default Pool
