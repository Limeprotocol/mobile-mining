import { useRouter } from "next/router"
import React from "react"

const Button = ({ variant, className = "", children, icon, ...rest }) => {
  // Base class for the button using Tailwind CSS
  let baseClass =
    "py-5 rounded-xl w-full font-medium text-sm flex items-center font-poppins justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2"

  // Determine variant class using Tailwind CSS
  let variantClass = ""
  switch (variant) {
    case "primary":
      variantClass =
        "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500"
      break
    case "outline":
      variantClass =
        "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-indigo-500"
      break
    case "black":
      variantClass =
        "bg-black  text-white hover:bg-gray-900 focus:ring-gray-900"
      break
    case "white":
      variantClass =
        "bg-white text-black hover:bg-gray-100 focus:ring-indigo-500"
      break
  }

  // Combine classes
  const classes = `${baseClass} ${variantClass} ${className}`.trim()

  return (
    <button className={classes} {...rest}>
      {icon && <span className="flex items-center justify-center">{icon}</span>}
      {children}
    </button>
  )
}

export default Button
