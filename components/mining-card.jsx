import React, { useEffect, useState } from "react"
import useAxiosAuth from "lib/hooks/useAxiosAuth"
import { useSession } from "next-auth/react"
import { parseLime, parseUsdt } from "lib/utils/helper"

const MiningCard = () => {
  const { data: session } = useSession()
  const axiosAuth = useAxiosAuth()
  const [pool, setPool] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const fetchPoolData = async () => {
    const res = await axiosAuth.get(`/api/pools/mining/info`)
    const pool = res.data.data
    setPool(pool)
    setIsLoading(false)
  }

  useEffect(() => {
    if (!session) return
    fetchPoolData()
  }, [session])

  return (
    <div className="   bg-[#1c1c1c] text-white rounded-xl  flex flex-col  w-full h-max">
      {isLoading ? (
        <div className="animate-pulse">
          <div className="w-full p-5 justify-between flex">
            <div className="bg-gray-700 rounded h-10 w-1/2"></div>
          </div>
          <div className="w-[90%] mx-auto h-[1px] bg-white/30 rounded-full"></div>
          <div className="w-full justify-between p-5 flex">
            <div className="flex flex-col items-start">
              <div className="bg-gray-700 rounded h-[23px] w-16 mb-2"></div>
              <div className="bg-gray-700 rounded h-7 w-12"></div>
            </div>
            <div className="flex flex-col items-end ml-5">
              <div className="bg-gray-700 rounded h-[23px] w-16 mb-2"></div>
              <div className="bg-gray-700 rounded h-7 w-24"></div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="w-full p-5 justify-between flex">
            <h1 className="uppercase text-[26px] font-bold">USDT / $LIME</h1>
          </div>
          <div className="w-[90%] mx-auto h-[1px] bg-white/30 rounded-full" />
          <div className="w-full justify-between p-5 flex">
            <div className="flex flex-col items-start">
              <h1 className="text-[18px] text-[#DFF26A]">APR</h1>
              <h2 className="text-[22px] font-bold">{Math.ceil(pool.apr)}%</h2>
            </div>
            <div className="flex flex-col items-end ml-5">
              <h1 className="text-[18px] text-[#DFF26A]">TVL</h1>
              <h2 className="text-[22px] font-bold">
                $ {parseLime(pool.totalStaked).toLocaleString()}
              </h2>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default MiningCard
