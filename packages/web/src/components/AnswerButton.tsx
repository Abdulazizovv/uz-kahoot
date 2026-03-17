import clsx from "clsx"
import { ButtonHTMLAttributes, ElementType, PropsWithChildren } from "react"

type Props = PropsWithChildren &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    icon: ElementType
  }

const AnswerButton = ({
  className,
  icon: Icon,
  children,
  ...otherProps
}: Props) => (
  <button
    className={clsx(
      "shadow-inset group flex items-center gap-3 rounded-2xl px-5 py-6 text-left font-semibold text-white shadow-lg ring-1 ring-white/10 transition hover:brightness-110 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60",
      className,
    )}
    {...otherProps}
  >
    <Icon className="h-6 w-6 opacity-95 drop-shadow-md" />
    <span className="drop-shadow-md">{children}</span>
  </button>
)

export default AnswerButton
