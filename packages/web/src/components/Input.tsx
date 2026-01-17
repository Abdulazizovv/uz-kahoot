import clsx from "clsx"
import React from "react"

type Props = React.InputHTMLAttributes<HTMLInputElement>

const Input = ({ className, type = "text", ...otherProps }: Props) => (
  <input
    type={type}
    className={clsx(
      "w-full rounded-lg border-2 border-gray-200 p-3 text-lg font-medium transition-all outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200",
      className,
    )}
    {...otherProps}
  />
)

export default Input
