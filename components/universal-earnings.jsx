import { Lock } from "lucide-react"
import React, { useEffect, useState } from "react"
import Button from "./ui/button"
import useAxiosAuth from "lib/hooks/useAxiosAuth"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { parseLime, parseUsdt } from "lib/utils/helper"
import toast from "react-hot-toast"

const UniversalEarnings = ({ name, type, limePrice }) => {
  const { data: session } = useSession()
  const axiosAuth = useAxiosAuth()
  const [pool, setPool] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [isWithdrawing, setIsWithdrawing] = useState(false)

  useEffect(() => {
    if (session) {
      if (type === "MINING") {
        fetchMiningData()
      } else {
        fetchPoolData(name)
      }
    }
  }, [session])

  const fetchMiningData = async () => {
    try {
      const res = await axiosAuth.get(`/api/pools/mining/info`)
      const pool = res.data.data
      setPool(pool)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchPoolData = async (name) => {
    try {
      const res = await axiosAuth.get(`/api/pools/${name}/info`)
      const pool = res.data.data
      setPool(pool)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  function formatCountdown(seconds) {
    if (seconds >= 24 * 3600) {
      const days = Math.floor(seconds / (24 * 3600))
      return `${days} day${days > 1 ? "s" : ""}`
    } else if (seconds >= 3600) {
      const hours = Math.floor(seconds / 3600)
      const minutes = Math.floor((seconds % 3600) / 60)
      return `${hours} hour${hours > 1 ? "s" : ""} ${minutes} minute${
        minutes > 1 ? "s" : ""
      }`
    } else if (seconds >= 60) {
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = seconds % 60
      return `${minutes} minute${
        minutes > 1 ? "s" : ""
      } ${remainingSeconds} second${remainingSeconds > 1 ? "s" : ""}`
    } else {
      return `${seconds} second${seconds > 1 ? "s" : ""}`
    }
  }

  const withdraw = async (poolName) => {
    try {
      setIsWithdrawing(true)
      const url =
        type === "MINING"
          ? `/api/pools/mining/withdraw`
          : `/api/pools/${poolName}/withdraw`
      const res = await axiosAuth.post(url, { amount: 0 })

      if (res.data.hash) {
        toast.success(`Successfully claimed $LIME`)
        type === "MINING"
          ? await fetchMiningData()
          : await fetchPoolData(poolName)
      } else {
        throw new Error("Error withdrawing token")
      }
    } catch (error) {
      console.error(error)
      toast.error("Error withdrawing token")
    } finally {
      setIsWithdrawing(false)
    }
  }

  if (pool?.pendingReward && pool?.pendingReward != 0) {
    return (
      <div className="w-full shadow-lg bg-white rounded-3xl p-4">
        <div className="embla__slide rounded-2xl border text-white flex flex-col w-full h-max">
          <div className="w-full bg-[#1c1c1c] rounded-t-2xl px-5 py-3 items-center justify-between flex">
            <h1 className="uppercase text-[26px] font-bold">{name}</h1>
            <div className="bg-[#DFF26A] flex h-max py-2 items-center rounded-full text-[#1c1c1c] px-3 ">
              {pool?.userInfo?.unlock !== 0 ? (
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
          <div className="w-full gap-2 flex-col bg-white rounded-b-2xl text-[#1c1c1c] px-5 pb-5 py-3 flex">
            <div className="flex justify-between">
              <h1 className="font-bold text-[22px]">
                {parseLime(pool.pendingReward).toLocaleString()}
              </h1>

              <h1 className="text-[18px]">$LIME</h1>
            </div>
            <p className="text-[12px] text-gray-300">
              ${Math.ceil(parseLime(pool.pendingReward) / limePrice)}
            </p>
            <div className="w-[100%] mx-auto h-[1px] bg-black/30 my-2 rounded-full" />
            <div className="flex justify-between ">
              <h1 className="text-[18px]">Unlocks in:</h1>
              <h1 className="text-[18px]">
                {formatCountdown(pool?.userInfo?.unlock)}
              </h1>
            </div>
            <div className="flex gap-4">
              <Button
                variant="primary"
                onClick={() => withdraw(name)}
                loading={isWithdrawing}
                disabled={pool?.userInfo?.unlock !== 0 && true}
                className="w-full mt-3 !font-bold !text-[16px]"
                locked={pool?.userInfo?.unlock !== 0 && true}
              >
                Claim
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UniversalEarnings
