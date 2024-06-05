import React, { useEffect, useState } from "react"
import Navigation from "pages/layout/Navigation"
import BalanceCard from "components/balance-card"
import useAxiosAuth from "lib/hooks/useAxiosAuth"
import { useSession } from "next-auth/react"
import { parseLime, parseUsdt } from "lib/utils/helper"
import { Copy } from "lucide-react"
import Button from "components/ui/button"
import toast from "react-hot-toast"
import { useRouter } from "next/router"

const index = () => {
  const axiosAuth = useAxiosAuth()
  const [usdtBalance, setUsdtBalance] = useState(0)
  const [limeBalance, setLimeBalance] = useState(0)
  const [convertedLime, setConvertedLime] = useState(0)
  const [limePrice, setLimePrice] = useState(1)
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const getBalance = async () => {
    setLoading(true)
    try {
      const res = await axiosAuth.get(`/api/user/balance/all`)
      const res2 = await axiosAuth.get(`/api/token/lime/price`)
      const limeBalance = parseLime(res.data.lime)
      const convertedLime = parseLime(res.data.lime) / res2.data.price
      const usdtBalance = parseUsdt(res.data.usdt)
      setLimePrice(res2.data.price)
      setLimeBalance(limeBalance.toLocaleString())
      setConvertedLime(convertedLime.toLocaleString())
      setUsdtBalance(usdtBalance.toLocaleString())
    } catch (error) {
      console.error("Failed to fetch balance:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (session) getBalance()
  }, [session])

  return (
    <Navigation>
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center   md:pb-0">
        <BalanceCard compressed={false} />
        <div className="w-full shadow-lg bg-white rounded-3xl mt-5 p-4">
          <div className="bg-[#1c1c1c] flex flex-col gap-1.5 p-5 rounded-3xl text-white">
            <h1 className=" text-[18px] flex justify-between ">
              <span>Your Assets</span>
              <span className="border rounded-full text-black bg-white py-2 px-3">
                <img src="/images/info.svg" size={16} />
              </span>
            </h1>
            <h1 className="text-[28px] flex items-end gap-2 font-bold">
              <span className="h-max leading-none">{usdtBalance}</span>
              <span className="text-[18px] leading-none text-primary font-normal">
                USDT
              </span>
            </h1>
            <h1 className="text-[28px] mt-2 flex items-end gap-2 font-bold">
              <span className="h-max leading-none">{limeBalance}</span>
              <span className="text-[18px] leading-none text-primary font-normal">
                $LIME
              </span>
            </h1>
            <p className="text-[12px] text-gray-300"> ${convertedLime}</p>
          </div>
        </div>
      </div>
      <div className="w-full p-3 mt-5 shadow-lg bg-white flex justify-between items-center rounded-3xl">
        <button
          onClick={() => router.push("/dashboard/profile/withdraw")}
          className="w-full cursor-pointer border-r bg-white gap-1 text-black flex flex-col items-center justify-center"
        >
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 9C11.4477 9 11 9.44771 11 10V15.5856L9.70711 14.2928C9.3166 13.9024 8.68343 13.9024 8.29292 14.2928C7.90236 14.6834 7.90236 15.3165 8.29292 15.7071L11.292 18.7063C11.6823 19.0965 12.3149 19.0968 12.7055 18.707L15.705 15.7137C16.0955 15.3233 16.0955 14.69 15.705 14.2996C15.3145 13.909 14.6814 13.909 14.2908 14.2996L13 15.5903V10C13 9.44771 12.5523 9 12 9Z"
              fill="#0F0F0F"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M21 1C22.6569 1 24 2.34315 24 4V8C24 9.65685 22.6569 11 21 11H19V20C19 21.6569 17.6569 23 16 23H8C6.34315 23 5 21.6569 5 20V11H3C1.34315 11 0 9.65685 0 8V4C0 2.34315 1.34315 1 3 1H21ZM22 8C22 8.55228 21.5523 9 21 9H19V7H20C20.5523 7 21 6.55229 21 6C21 5.44772 20.5523 5 20 5H4C3.44772 5 3 5.44772 3 6C3 6.55229 3.44772 7 4 7H5V9H3C2.44772 9 2 8.55228 2 8V4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V8ZM7 7V20C7 20.5523 7.44772 21 8 21H16C16.5523 21 17 20.5523 17 20V7H7Z"
              fill="#0F0F0F"
            />
          </svg>
          <h1 className="font-bold">Withdraw</h1>
        </button>
        <button
          onClick={() => router.push("/dashboard/profile/exchange")}
          className="w-full cursor-pointer bg-white gap-1 text-black flex flex-col items-center justify-center"
        >
          <svg
            width="25px"
            height="25px"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.757 7.19271C16.3812 5.54691 14.3129 4.5 12 4.5C7.85786 4.5 4.5 7.85786 4.5 12C4.5 12.5121 4.55133 13.0123 4.64913 13.4956M19.3004 10.2738C19.4309 10.828 19.5 11.4059 19.5 12C19.5 16.1421 16.1421 19.5 12 19.5C9.61377 19.5 7.48782 18.3856 6.1142 16.6489"
              stroke="#000000"
              stroke-linecap="round"
            />
            <path
              d="M18.125 5.5V7.5H16.125"
              stroke="#000000"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.875 16.5L5.875 16.5V18.5"
              stroke="#000000"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path d="M12 8V16" stroke="#000000" stroke-linecap="round" />
            <path
              d="M13.8102 10.1516C13.6905 9.62158 13.0066 9.0317 12.0063 9.03169C11.0061 9.03168 10.2366 9.68143 10.2366 10.5022C10.2366 12.3659 13.947 11.4084 13.947 13.5713C13.947 14.3531 13.0065 15.0161 12.0063 15.0161C11.0062 15.0161 10.3135 14.4006 10.1084 13.7423"
              stroke="#000000"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <h1 className="font-bold">Exchange</h1>
        </button>
      </div>
      <div className="text-xl text-[#1c1c1c] font-semibold mt-5 mb-4">
        Your Wallet
      </div>
      <div className="bg-white w-full  rounded-3xl mt-5 shadow-lg p-5 ">
        <div className=" mb-5  ">
          <div className="text-base text-[#1c1c1c] font-semibold mb-3">
            Network
          </div>
          <div className="tabs-container max-w-[25%] !bg-primary  rounded-full ">
            <button className={`tab  `}>BEP20</button>
          </div>
        </div>
        <div className="text-base text-[#1c1c1c] font-semibold ">Address</div>
        <div className="flex flex-col bg-gray-200 mt-3 items-center p-3 rounded-2xl">
          <div className="flex w-full">
            <input
              type="text"
              value={session?.user?.address}
              placeholder="0.00"
              className="flex-grow border bg-transparent text-[#1c1c1c] outline-none border-none rounded p-2 mr-2 text-lg"
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(session?.user?.address)
                toast.success("Address copied to clipboard")
              }}
              className=" text-gray-700 font-bold py-2 pl-4 pr-2 rounded focus:outline-none"
            >
              <Copy size={20} />
            </button>
          </div>
        </div>
        <Button
          onClick={() => {
            navigator.clipboard.writeText(session?.user?.address)
            toast.success("Address copied to clipboard")
          }}
          variant="primary"
          className="w-full mt-5"
        >
          <span className="flex items-center justify-center">
            <span className="mr-2 font-bold text-[18px]">Copy Address</span>
          </span>
        </Button>
      </div>
      <Button
        onClick={() => router.push("/api/auth/signout")}
        variant="outline"
        className="w-full mt-5"
      >
        Logout
      </Button>
    </Navigation>
  )
}

export default index
