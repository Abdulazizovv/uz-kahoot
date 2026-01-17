import clsx from "clsx"
import { ButtonHTMLAttributes, PropsWithChildren } from "react"

type Props = ButtonHTMLAttributes<HTMLButtonElement> & PropsWithChildren

const Button = ({ children, className, ...otherProps }: Props) => (
  <button
    className={clsx(
      "btn-shadow w-full rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 p-3 text-lg font-bold text-white transition-all hover:from-orange-600 hover:to-amber-600 hover:shadow-lg",
      className,
    )}
    {...otherProps}
  >
    <span>{children}</span>
  </button>
)

export default Button
