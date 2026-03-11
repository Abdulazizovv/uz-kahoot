import clsx from "clsx"
import React from "react"

type Props = React.InputHTMLAttributes<HTMLInputElement>

const Input = ({ className, type = "text", ...otherProps }: Props) => (
  <input
    type={type}
    className={clsx(
      "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base font-medium text-slate-900 shadow-sm outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10",
      className,
    )}
    {...otherProps}
  />
)

export default Input
