import { Home, Pickaxe, RefreshCcwDot, Sparkles, Wallet } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"

const BottomMenu = () => {
  const router = useRouter()
  const pages = [
    {
      name: "Home",
      icon: <Home className="w-[18px] h-[18px]" />,
      link: "/dashboard"
    },
    {
      name: "Mining",
      icon: <Pickaxe className="w-[18px] h-[18px]" />,
      link: "/dashboard/mining"
    },
    {
      name: "Trading",
      icon: <RefreshCcwDot className="w-[18px] h-[18px]" />,
      link: "/dashboard/trading"
    },
    {
      name: "Earnings",
      icon: <Sparkles className="w-[18px] h-[18px]" />,
      link: "/dashboard/earnings"
    },
    {
      name: "Profile",
      icon: <Wallet className="w-[18px] h-[18px]" />,
      link: "/dashboard/profile"
    }
  ]

  return (
    <div
      className="fixed md:hidden z-[50] bottom-0
    w-full bg-white  border-t border-black/5 shadow-lg text-[#1c1c1c] flex  justify-between items-center    
  "
    >
      {pages.map((page, index) => (
        <div
          key={index}
          className={`flex flex-col w-full items-center pt-4 pb-8  ${
            router.asPath.split("/")[2] === page.link.split("/")[2]
              ? "border-primary border-t-4 "
              : "text-gray-500 border-t-2 border-transparent"
          } `}
        >
          <Link href={page.link}>
            <p
              className={` 
               flex flex-col items-center justify-center gap-1.5`}
            >
              <span className="text-[20px]">{page.icon}</span>
              <span className="text-[14px]">{page.name}</span>
            </p>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default BottomMenu
