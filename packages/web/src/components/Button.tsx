import clsx from "clsx"
import { ButtonHTMLAttributes, PropsWithChildren } from "react"

type Props = ButtonHTMLAttributes<HTMLButtonElement> & PropsWithChildren

const Button = ({ children, className, ...otherProps }: Props) => (
  <button
    className={clsx(
      "inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800 disabled:pointer-events-none disabled:opacity-60",
      className,
    )}
    {...otherProps}
  >
    {children}
  </button>
)

export default Button
