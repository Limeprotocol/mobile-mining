import useAxiosAuth from "lib/hooks/useAxiosAuth"
import { parseLime } from "lib/utils/helper"
import { useSession } from "next-auth/react"
import React, { useEffect, useState } from "react"

const UniversalCard = ({ name, limePrice }) => {
  const { data: session } = useSession()
  const axiosAuth = useAxiosAuth()
  const [pool, setPool] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const fetchPoolData = async () => {
    const res = await axiosAuth.get(`/api/pools/${name}/info`)
    const pool = res.data.data
    setPool(pool)
    setIsLoading(false)
  }

  useEffect(() => {
    if (!session) return
    fetchPoolData()
  }, [session])

  function aprToDailyApr(apr) {
    return apr / 365
  }
  return (
    <div className="embla__slide rounded-2xl  bg-[#1c1c1c] text-white  flex flex-col  w-full h-max">
      {isLoading ? (
        <div className="animate-pulse">
          <div className="w-full p-5 justify-between flex">
            <div className="bg-gray-700 rounded h-10 w-1/2"></div>
            <div className="bg-gray-700 rounded-full h-10 w-20"></div>
          </div>
          <div className="w-[90%] mx-auto h-[1px] bg-white/30 rounded-full"></div>
          <div className="w-full justify-between pt-5 pb-4 px-5 flex">
            <div className="flex flex-col items-start">
              <div className="bg-gray-700 rounded h-[21px] w-16 mb-2"></div>
              <div className="bg-gray-700 rounded h-5 w-12"></div>
            </div>
            <div className="flex flex-col items-end ml-5">
              <div className="bg-gray-700 rounded h-[21px] w-16 mb-2"></div>
              <div className="bg-gray-700 rounded h-5 w-24"></div>
            </div>
          </div>
          <div className="w-full justify-between px-5 pb-5 flex">
            <div className="flex flex-col items-start">
              <div className="bg-gray-700 rounded h-[21px] w-16 mb-2"></div>
              <div className="bg-gray-700 rounded h-5 w-12"></div>
            </div>
            <div className="flex flex-col items-end ml-5">
              <div className="bg-gray-700 rounded h-[21px] w-16 mb-2"></div>
              <div className="bg-gray-700 rounded h-5 w-24"></div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="w-full p-5 justify-between flex">
            <h1 className="uppercase text-[26px] font-bold">{name} TERM</h1>
            <div className="bg-[#DFF26A] rounded-full text-[#1c1c1c] px-3 py-1.5">
              <span className="font-bold mr-1 text-[14px]">
                {" "}
                {aprToDailyApr(pool.apr).toFixed(1)}%
              </span>
              <span className="text-[11px]">/day</span>
            </div>
          </div>
          <div className="w-[90%] mx-auto h-[1px] bg-white/30 rounded-full" />
          <div className="w-full justify-between px-5 py-2 flex">
            <div className="flex flex-col items-start">
              <h1 className="text-[18px] text-[#DFF26A]">APR</h1>
              <h2 className="text-[22px] font-bold">{Math.ceil(pool.apr)}%</h2>
            </div>
            <div className="flex flex-col items-end ml-5">
              <h1 className="text-[18px] text-[#DFF26A]">TVL</h1>
              <h2 className="text-[22px] font-bold">
                ${" "}
                {Math.ceil(
                  parseLime(pool.totalStaked) / limePrice
                ).toLocaleString()}
              </h2>
            </div>
          </div>
          <div className="w-full justify-between px-5 pt-1 pb-4 flex">
            <div className="flex flex-col items-start">
              <h1 className="text-[18px] text-[#DFF26A]">LOCK PERIOD</h1>
              <h2 className="text-[22px] font-bold">
                {Math.floor(pool?.timelock / (3600 * 24))} days
              </h2>
            </div>
            <div className="flex flex-col items-end ml-5">
              <h1 className="text-[18px] text-[#DFF26A]">FEES</h1>
              <h2 className="text-[22px] font-bold">
                {(pool?.fees?.deposit * 100) / 1000}%
              </h2>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default UniversalCard
