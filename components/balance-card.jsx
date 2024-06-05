import useAxiosAuth from "lib/hooks/useAxiosAuth"
import { parseLime, parseUsdt } from "lib/utils/helper"
import { Wallet } from "lucide-react"
import { useSession } from "next-auth/react"
import React, { useEffect, useState, useCallback } from "react"

const BalanceCard = ({ compressed, fetchBalance }) => {
  const [balance, setBalance] = useState(null) // Start with null
  const [loading, setLoading] = useState(true)
  const axiosAuth = useAxiosAuth()
  const { data: session } = useSession()

  useEffect(() => {
    // Load balance from localStorage when component mounts (client-side)
    const storedBalance = localStorage.getItem("balance")
    if (storedBalance) {
      setBalance(storedBalance) // Set balance from stored value if it exists
    }
  }, [])

  useEffect(() => {
    if (fetchBalance) {
      getBalance()
    }
  }, [fetchBalance])

  const getBalance = useCallback(async () => {
    setLoading(true)
    try {
      const res = await axiosAuth.get(`/api/user/balance/all`)
      const res2 = await axiosAuth.get(`/api/token/lime/price`)
      console.log(res2.data)
      const limeBalance = parseLime(res.data.lime) / res2.data.price
      console.log(limeBalance)

      const usdtBalance = parseUsdt(res.data.usdt)
      console.log(usdtBalance)
      const totalBalance = Math.ceil(limeBalance + usdtBalance)

      const formattedBalance = totalBalance.toLocaleString()

      // Compare with current balance and update only if different
      if (formattedBalance !== balance) {
        localStorage.setItem("balance", formattedBalance) // Store the new balance
        setBalance(formattedBalance)
      }
    } catch (error) {
      console.error("Failed to fetch balance:", error)
    } finally {
      setLoading(false)
    }
  }, [axiosAuth, balance])

  useEffect(() => {
    if (session) getBalance()
  }, [session, getBalance])

  return (
    <div className="w-full items-center bg-white text-[#1C1C1C] rounded-3xl p-5 flex gap-3 shadow-md">
      <div className="border rounded-full h-[60px] bg-gray-300 w-[60px]">
        <img src="" alt="" className="w-full" />
      </div>
      <div
        className={`flex flex-1 flex-col ${
          compressed ? "items-end" : "items-start"
        } justify-center`}
      >
        <h1 className="text-[16px]">Total Balance</h1>
        <h2 className="text-[24px] font-bold">${balance}</h2>
      </div>
      {!compressed && (
        <div className="bg-[#EBEBEB] p-4 rounded-full">
          <Wallet size={30} className="text-[#1C1C1C]" />
        </div>
      )}
    </div>
  )
}

export default BalanceCard
