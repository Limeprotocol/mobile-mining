import BalanceCard from "components/balance-card"
import Button from "components/ui/button"
import useAxiosAuth from "lib/hooks/useAxiosAuth"
import { parseLime, parseUsdt } from "lib/utils/helper"
import { ChevronLeft, Copy } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Navigation from "pages/layout/Navigation"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"

const withdrawal = () => {
  const { data: session } = useSession()
  const [activeAsset, setActiveAsset] = useState("$LIME")
  const [refreshBalance, setRefreshBalance] = useState(0)
  const [destinationAddress, setDestinationAddress] = useState("")
  const [amount, setAmount] = useState("")
  const [limeBalance, setLimeBalance] = useState(0)
  const [usdtBalance, setUsdtBalance] = useState(0)
  const [limePrice, setLimePrice] = useState(1)
  const [loading, setLoading] = useState(false)
  const axiosAuth = useAxiosAuth()
  const router = useRouter()
  const [isWithdrawing, setIsWithdrawing] = useState(false)

  const getPrice = async (pool) => {
    const res = await axiosAuth.get(`/api/token/lime/price`)
    setLimePrice(res.data.price)
  }

  const getBalance = async () => {
    setLoading(true)
    try {
      const res = await axiosAuth.get(`/api/user/balance/all`)
      const res2 = await axiosAuth.get(`/api/token/lime/price`)
      const limeBalance = parseLime(res.data.lime) / res2.data.price
      const usdtBalance = parseUsdt(res.data.usdt)
      setLimePrice(res2.data.price)
      setLimeBalance(limeBalance.toLocaleString())
      setUsdtBalance(usdtBalance.toLocaleString())
    } catch (error) {
      console.error("Failed to fetch balance:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (session) {
      getBalance()
      getPrice()
    }
  }, [session])

  const withdraw = async () => {
    try {
      setIsWithdrawing(true)
      const res = await axiosAuth.post(
        `/api/user/withdraw/${activeAsset == "$LIME" ? "lime" : "usdt"}`,
        {
          amount: amount,
          recipient: destinationAddress
        }
      )
      if (res.data.hash) {
        setRefreshBalance(refreshBalance + 1)
        await getBalance()
        toast.success(`Successully withdrew ${amount} ${activeAsset} `)
        setAmount(null)
      } else {
        throw new Error("Error withdrawing token")
      }
    } catch (error) {
      console.log(error)
      toast.error("Error withdrawing token")
    } finally {
      setIsWithdrawing(false)
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
        <div className="text-xl text-[#1c1c1c] text-left w-full font-semibold mt-5 ">
          Withdraw
        </div>
        <div className="bg-white w-full  rounded-3xl mt-5 shadow-lg p-5 ">
          <div className=" mb-5  ">
            <div className="text-base text-[#1c1c1c] font-semibold mb-3">
              Asset
            </div>
            <div className="flex w-full gap-4">
              <div
                className={`tabs-container max-w-[25%] ${
                  activeAsset == "$LIME" && "bg-primary border-none"
                } rounded-full border`}
              >
                <button
                  onClick={() => setActiveAsset("$LIME")}
                  className={`tab  `}
                >
                  $LIME
                </button>
              </div>
              <div
                className={`tabs-container max-w-[25%] ${
                  activeAsset == "USDT" && "bg-primary border-none"
                } rounded-full border `}
              >
                <button
                  onClick={() => setActiveAsset("USDT")}
                  className={`tab  `}
                >
                  USDT
                </button>
              </div>
            </div>
          </div>
          <div className=" mb-5  ">
            <div className="text-base text-[#1c1c1c] font-semibold mb-3">
              Network
            </div>
            <div className="tabs-container max-w-[25%] !bg-primary  rounded-full ">
              <button className={`tab  `}>BEP20</button>
            </div>
          </div>
          <div className="text-base text-[#1c1c1c] font-semibold ">
            Recipient Address
          </div>
          <div className="flex flex-col bg-gray-200 mt-3 items-center p-3 rounded-2xl">
            <div className="flex w-full">
              <input
                type="text"
                placeholder="Enter the destination address"
                value={destinationAddress}
                onChange={(e) => setDestinationAddress(e.target.value)}
                className="flex-grow border bg-transparent text-[#1c1c1c] outline-none border-none rounded p-2 mr-2 text-lg"
              />
            </div>
          </div>
          <div className="text-base text-[#1c1c1c] mt-5 mb-3 font-semibold ">
            Withdrawal Amount
          </div>
          <div className="flex flex-col  bg-gray-200 items-center p-3 rounded-2xl">
            <div className="flex w-full">
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="flex-grow border bg-transparent text-[#1c1c1c] outline-none border-none rounded p-2 mr-2 text-lg"
              />
              <button
                onClick={() =>
                  setAmount(
                    activeAsset == "$LIME"
                      ? limeBalance.toLocaleString()
                      : usdtBalance.toLocaleString()
                  )
                }
                className=" text-gray-700 font-bold py-2 pl-4 pr-2 rounded focus:outline-none"
              >
                Max
              </button>
            </div>
            <div className="w-full flex justify-between px-2">
              <div className="text-sm text-gray-600 ">
                $
                {activeAsset == "$LIME"
                  ? Math.ceil(amount / limePrice).toLocaleString()
                  : amount && amount.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 ">
                Balance:{" "}
                {activeAsset == "$LIME"
                  ? limeBalance.toLocaleString()
                  : usdtBalance.toLocaleString()}
              </div>
            </div>
          </div>
          <Button
            onClick={withdraw}
            loading={isWithdrawing}
            variant="primary"
            className="w-full mt-5"
          >
            <span className="flex items-center justify-center">
              <span className="mr-2 font-bold text-[18px]">Withdraw</span>
            </span>
          </Button>
        </div>
      </div>
    </Navigation>
  )
}

export default withdrawal
