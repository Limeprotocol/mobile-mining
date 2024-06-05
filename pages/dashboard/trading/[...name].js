import BalanceCard from "components/balance-card"
import Button from "components/ui/button"
import { ArrowRight, ChevronLeft } from "lucide-react"
import { useRouter } from "next/router"
import Navigation from "pages/layout/Navigation"
import React, { useEffect, useState } from "react"
import useAxiosAuth from "lib/hooks/useAxiosAuth"
import { useSession } from "next-auth/react"
import { parseLime } from "lib/utils/helper"
import toast from "react-hot-toast"

const Pool = () => {
  const router = useRouter()
  const [poolName, setPoolName] = useState("")
  const { data: session } = useSession()
  const axiosAuth = useAxiosAuth()
  const [pool, setPool] = useState({})
  const [amount, setAmount] = useState(null)
  const [limePrice, setLimePrice] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isDepositing, setIsDepositing] = useState(false)
  const [isWithdrawing, setIsWithdrawing] = useState(false)
  const [isApproving, setIsApproving] = useState(false)
  const [limeBalance, setLimeBalance] = useState(0)
  const [activeTab, setActiveTab] = useState("DEPOSIT")

  useEffect(() => {
    if (router.isReady && session) {
      const { name } = router.query
      setPoolName(name)
      getPrice()
      getLimeBalance()
      fetchPoolData(name)
    }
  }, [router.isReady, session])

  const fetchPoolData = async (name) => {
    try {
      setIsLoading(true)
      const res = await axiosAuth.get(`/api/pools/${name}/info`)
      const pool = res.data.data
      setPool(pool)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const deposit = async () => {
    try {
      setIsDepositing(true)
      const res = await axiosAuth.post(`/api/pools/${poolName}/deposit`, {
        amount: amount
      })
      if (res.data.hash) {
        toast.success(`Successully deposited ${amount} $LIME`)
        setAmount(null)
        await fetchPoolData(poolName)
        await getLimeBalance()
      } else {
        throw new Error("Error depositing $LIME")
      }
    } catch (error) {
      console.log(error)

      toast.error("Error depositing $LIME")
    } finally {
      setIsDepositing(false)
    }
  }

  const withdraw = async () => {
    try {
      setIsWithdrawing(true)
      const res = await axiosAuth.post(`/api/pools/${poolName}/withdraw`, {
        amount: amount
      })
      if (res.data.hash) {
        toast.success(`Successully withdrew ${amount} $LIME`)
        setAmount(null)
        await fetchPoolData(poolName)
        await getLimeBalance()
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

  const approve = async () => {
    try {
      setIsApproving(true)
      const res = await axiosAuth.post(`/api/pools/${poolName}/approve`)
      if (res.data.staked == true) {
        await fetchPoolData(poolName)
        await getLimeBalance()
      } else {
        throw new Error("Error approving token")
      }
    } catch (error) {
      console.log(error)
      toast.error("Error approving token")
    } finally {
      setIsApproving(false)
    }
  }

  const getLimeBalance = async () => {
    try {
      const res = await axiosAuth.get(`/api/user/balance/token`)
      const data = res.data.balance
      const balance = parseLime(data)
      setLimeBalance(balance)
    } catch (error) {
      console.log(error)
    }
  }

  const getPrice = async (pool) => {
    const res = await axiosAuth.get(`/api/token/lime/price`)
    setLimePrice(res.data.price)
  }

  function aprToDailyApr(apr) {
    return apr / 365
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
          <BalanceCard compressed={true} />
        </div>
        <div className="w-full bg-white p-4 shadow-lg mt-5 rounded-3xl">
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
                  <h1 className="uppercase text-[26px] font-bold">
                    {poolName} TERM
                  </h1>
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
                    <h2 className="text-[22px] font-bold">
                      {Math.ceil(pool.apr)}%
                    </h2>
                  </div>
                  <div className="flex flex-col items-end ml-5">
                    <h1 className="text-[18px] text-[#DFF26A]">TVL</h1>
                    <h2 className="text-[22px] font-bold">
                      {" "}
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
          <div className="flex flex-col px-4 pt-4 text-[#1c1c1c] w-full ">
            <div className="flex flex-col items-start justify-center">
              <h1 className="text-[18px]">YOUR DEPOSIT</h1>
              <div className="flex w-full justify-between items-center">
                <span className="font-bold text-[22px]">
                  {parseLime(pool?.userInfo?.amount).toLocaleString()}
                </span>
                <span className="font-bold text-[22px]">$LIME</span>
              </div>
              <p className="text-[12px] text-gray-400">
                $
                {Math.ceil(
                  parseLime(pool?.userInfo?.amount) / limePrice
                ).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white w-full  rounded-3xl mt-5 shadow-lg p-4 ">
          <div className="text-lg text-[#1c1c1c] font-semibold mb-4">
            Delegate $LIME
          </div>
          <div className="tab-selector mb-5  ">
            <div className="tabs-container rounded-full bg-gray-200">
              <button
                className={`tab ${activeTab === "DEPOSIT" ? "active" : ""}`}
                onClick={() => setActiveTab("DEPOSIT")}
              >
                DEPOSIT
              </button>
              <button
                className={`tab ${activeTab === "WITHDRAW" ? "active" : ""}`}
                onClick={() => setActiveTab("WITHDRAW")}
              >
                WITHDRAW
              </button>
              <div
                className={`highlight ${
                  activeTab === "DEPOSIT" ? "left" : "right"
                }`}
              ></div>
            </div>
          </div>
          <div className="flex flex-col bg-gray-200 items-center p-3 rounded-2xl">
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
                    activeTab == "DEPOSIT"
                      ? limeBalance
                      : parseLime(pool?.userInfo?.amount)
                  )
                }
                className=" text-gray-700 font-bold py-2 pl-4 pr-2 rounded focus:outline-none"
              >
                Max
              </button>
            </div>
            <div className="w-full flex justify-between px-2">
              <div className="text-sm text-gray-600 ">
                ${Math.ceil(amount / limePrice).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 ">
                Balance:{" "}
                {activeTab == "DEPOSIT"
                  ? limeBalance.toLocaleString()
                  : parseLime(pool?.userInfo?.amount).toLocaleString()}
              </div>
            </div>
          </div>
          {activeTab === "DEPOSIT" ? (
            <Button
              variant="primary"
              loading={isApproving || isDepositing}
              disabled={
                (pool?.limeApproved && amount === 0) ||
                pool?.userInfo?.amount > 0
              }
              onClick={pool?.limeApproved ? deposit : approve}
              className="w-full mt-5"
            >
              <span className="flex items-center justify-center">
                <span className="mr-2 font-bold text-[18px]">
                  {pool?.limeApproved ? "Deposit $LIME" : "Approve $LIME"}
                </span>
              </span>
            </Button>
          ) : (
            <Button
              variant="primary"
              loading={isWithdrawing}
              disabled={pool?.limeApproved && amount === 0}
              onClick={withdraw}
              className="w-full mt-5"
            >
              <span className="flex items-center justify-center">
                <span className="mr-2 font-bold text-[18px]">
                  Withdraw $LIME
                </span>
              </span>
            </Button>
          )}
        </div>
      </div>
    </Navigation>
  )
}

export default Pool
