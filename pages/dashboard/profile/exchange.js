import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import toast from "react-hot-toast"
import { ArrowDownUp, ChevronLeft } from "lucide-react"

import BalanceCard from "components/balance-card"
import Button from "components/ui/button"
import useAxiosAuth from "lib/hooks/useAxiosAuth"
import Navigation from "pages/layout/Navigation"
import { parseLime, parseUsdt } from "lib/utils/helper"

const Exchange = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const axiosAuth = useAxiosAuth()
  const [from, setFrom] = useState("LIME")
  const [to, setTo] = useState("USDT")
  const [amountFrom, setAmountFrom] = useState("")
  const [amountTo, setAmountTo] = useState("")
  const [limePrice, setLimePrice] = useState(1)
  const [limeBalance, setLimeBalance] = useState(0)
  const [usdtBalance, setUsdtBalance] = useState(0)
  const [isSwapping, setIsSwapping] = useState(false)
  const [refreshBalance, setRefreshBalance] = useState(0)

  useEffect(() => {
    if (session) {
      fetchBalanceAndPrice()
    }
  }, [session])

  const fetchBalanceAndPrice = async () => {
    try {
      const [{ data: balanceData }, { data: priceData }] = await Promise.all([
        axiosAuth.get("/api/user/balance/all"),
        axiosAuth.get("/api/token/lime/price")
      ])
      const limeBalance = parseLime(balanceData.lime)
      const usdtBalance = parseUsdt(balanceData.usdt)
      setLimeBalance(limeBalance)
      setUsdtBalance(usdtBalance)
      setLimePrice(priceData.price)
    } catch (error) {
      console.error("Failed to fetch data:", error)
      toast.error("Error fetching balance and price data.")
    }
  }

  const handleSwap = () => {
    const newFrom = to
    const newTo = from
    setFrom(newFrom)
    setTo(newTo)

    setAmountTo(amountFrom)
    setAmountFrom(amountTo)
  }

  const convertAmounts = (
    value,
    isFrom,
    fromCurrency = from,
    toCurrency = to
  ) => {
    const amount = parseFloat(value) || 0
    if (isFrom) {
      return fromCurrency === "LIME"
        ? (amount / limePrice).toLocaleString() // Convert LIME to USDT
        : (amount * limePrice).toLocaleString() // Convert USDT to LIME
    } else {
      return toCurrency === "LIME"
        ? (amount * limePrice).toLocaleString()
        : (amount / limePrice).toLocaleString()
    }
  }

  const handleAmountChange = (value, isFrom) => {
    if (isFrom) {
      setAmountFrom(value)
      const convertedValue = convertAmounts(value, true)
      setAmountTo(convertedValue)
    } else {
      setAmountTo(value)
      const convertedValue = convertAmounts(value, false)
      setAmountFrom(convertedValue)
    }
  }

  const setMaxAmount = (isFrom) => {
    if (isFrom) {
      const maxAmount = from === "LIME" ? limeBalance : usdtBalance
      setAmountFrom(maxAmount.toLocaleString())
      setAmountTo(convertAmounts(maxAmount, true))
    } else {
      const maxAmount = to === "LIME" ? limeBalance : usdtBalance
      setAmountTo(maxAmount.toLocaleString())
      setAmountFrom(convertAmounts(maxAmount, false))
    }
  }

  const swap = async () => {
    try {
      setIsSwapping(true)
      const res = await axiosAuth.post("/api/user/swap", {
        token_from: from.toLowerCase(),
        token_to: to.toLowerCase(),
        amount: parseFloat(amountFrom)
      })
      if (res.data.hash) {
        toast.success("Swap successful")
        setRefreshBalance((prev) => prev + 1)
        setAmountFrom("")
        setAmountTo("")
      } else {
        throw new Error("Error swapping tokens")
      }
    } catch (error) {
      console.error("Failed to swap tokens:", error)
      toast.error("Error swapping tokens")
    } finally {
      setIsSwapping(false)
    }
  }

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
          <BalanceCard compressed={true} fetchBalance={refreshBalance} />
        </div>
        <h1 className="text-xl w-full text-left text-[#1c1c1c] font-semibold mt-5">
          Swap
        </h1>
        <div className="bg-white  w-full rounded-3xl mt-5 shadow-lg p-5  flex flex-col items-center">
          <div className="relative flex flex-col items-center justify-center w-full gap-2">
            <button
              onClick={handleSwap}
              className="absolute top-1/2 left-1/2 transform z-10 -translate-x-1/2 -translate-y-1/2 bg-gray-200 border-[6px] border-white w-max h-max flex items-center justify-center rounded-md p-1"
            >
              <ArrowDownUp className="text-[#1c1c1c] w-[20px] h-[20px]" />
            </button>
            <div className="flex flex-col relative w-full  bg-gray-200 items-center px-3 pt-3 pb-6 rounded-2xl">
              <div className="flex items-center w-full">
                <input
                  type="text"
                  value={amountFrom}
                  onChange={(e) => handleAmountChange(e.target.value, true)}
                  placeholder="0.00"
                  className="flex-grow border bg-transparent text-[#1c1c1c] outline-none border-none rounded p-2 mr-2 text-lg"
                />
                <h1 className="text-2xl text-black font-bold">{from}</h1>
              </div>
              <div className="w-full flex justify-end px-2">
                <div className="w-max flex gap-2 items-center">
                  <div className="text-sm text-gray-600 ">
                    Balance:{" "}
                    {from === "LIME"
                      ? limeBalance.toLocaleString()
                      : usdtBalance.toLocaleString()}
                  </div>
                  <button
                    onClick={() => setMaxAmount(true)}
                    className=" text-gray-700 font-bold  pl-2  rounded focus:outline-none"
                  >
                    Max
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full  bg-gray-200 items-center px-3 pt-6 pb-3  rounded-2xl">
              <div className="flex items-center w-full">
                <input
                  type="text"
                  value={amountTo}
                  onChange={(e) => handleAmountChange(e.target.value, false)}
                  placeholder="0.00"
                  className="flex-grow border bg-transparent text-[#1c1c1c] outline-none border-none rounded p-2 mr-2 text-lg"
                />
                <h1 className="text-2xl text-black font-bold">{to}</h1>
              </div>
              <div className="w-full flex justify-end px-2">
                <div className="w-max flex  gap-2 items-center">
                  <div className="text-sm text-gray-600 ">
                    Balance:{" "}
                    {to === "LIME"
                      ? limeBalance.toLocaleString()
                      : usdtBalance.toLocaleString()}
                  </div>
                  <button
                    onClick={() => setMaxAmount(false)}
                    className=" text-gray-700 font-bold  pl-2  rounded focus:outline-none"
                  >
                    Max
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Button
            onClick={swap}
            loading={isSwapping}
            variant="primary"
            className="w-full mt-5"
          >
            Swap
          </Button>
        </div>
      </div>
    </Navigation>
  )
}

export default Exchange
