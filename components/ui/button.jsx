import { Loader2, Lock } from "lucide-react"
import { useRouter } from "next/router"
import React from "react"

const Button = ({
  variant,
  className = "",
  children,
  icon,
  loading,
  locked,

  ...rest
}) => {
  // Base class for the button using Tailwind CSS
  let baseClass =
    "py-5 rounded-xl w-full font-medium text-sm flex items-center font-poppins justify-center gap-2 focus:outline focus:ring-none focus:outline-2 focus:outline-offset-2 	"

  // Determine variant class using Tailwind CSS
  let variantClass = ""
  switch (variant) {
    case "primary":
      variantClass =
        "bg-[#DFF26A] border-transparent border text-[#1C1C1C] font-bold text-[18px] "
      break
    case "outline":
      variantClass =
        "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 text-[18px] focus:ring-indigo-500"
      break
    case "black":
      variantClass =
        "bg-black  text-white hover:bg-gray-900 focus:outline-gray-900"
      break
    case "white":
      variantClass =
        "bg-white text-black hover:bg-gray-100 focus:ring-indigo-500"
      break
  }

  // Combine classes
  const classes =
    `${baseClass} relative disabled:opacity-80  ${variantClass} ${className}`.trim()

  return (
    <button className={classes} {...rest} disabled={rest.disabled || loading}>
      {locked && (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-[#1c1c1c]/20 text-primary font-bold text-[14px]">
          <div className="bg-black rounded-full p-2">
            <Lock size={18} />
          </div>
        </div>
      )}
      {icon && <span className="flex items-center justify-center">{icon}</span>}
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  )
}

export default Button
