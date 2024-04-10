import { Home, Pickaxe, RefreshCcwDot, Sparkles, Wallet } from "lucide-react"
import Link from "next/link"
import React from "react"

const SideMenu = () => {
  const pages = [
    {
      name: "Home",
      icon: <Home className="w-[18px] h-[18px]" />,
      link: "/dashboard",
    },
    {
      name: "Mining",
      icon: <Pickaxe className="w-[18px] h-[18px]" />,
      link: "/dashboard/mining",
    },
    {
      name: "Trading",
      icon: <RefreshCcwDot className="w-[18px] h-[18px]" />,
      link: "/dashboard/trading",
    },
    {
      name: "Earnings",
      icon: <Sparkles className="w-[18px] h-[18px]" />,
      link: "/dashboard/earnings",
    },
    {
      name: "Profile",
      icon: <Wallet className="w-[18px] h-[18px]" />,
      link: "/dashboard/profile",
    },
  ]

  return (
    <div
      className="left-0 py-8  hidden md:flex min-w-[200px] max-w-[200px] bg-white h-[100dvh] flex-1 border-t border-black/5 shadow-lg text-[#1c1c1c] px-4 gap-2  flex-col items-start   
  "
    >
      {pages.map((page, index) => (
        <div
          key={index}
          className="flex hover:bg-gray-100 w-full py-3 rounded-lg px-1.5 flex-col items-start"
        >
          <Link href={page.link}>
            <p className="flex flex-row items-center justify-center gap-2">
              <span className="text-[20px]">{page.icon}</span>
              <span className="text-[14px]">{page.name}</span>
            </p>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default SideMenu
