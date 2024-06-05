import BottomMenu from "components/bottom-menu"
import SideMenu from "components/side-menu"
import React from "react"

const Navigation = ({ children }) => {
  return (
    <div className="bg-[#F7F6F6] overflow-y-hidden  fixed top-0 flex h-[100dvh] min-h-[100vh]  w-full flex-col md:flex-row  justify-start ">
      <BottomMenu />
      <SideMenu />
      <div className="overflow-y-scroll  w-full pb-28 px-3 pt-4">
        {children}
      </div>
    </div>
  )
}

export default Navigation
