import { PropsWithChildren } from "react"

const Form = ({ children }: PropsWithChildren) => (
  <div className="z-10 mx-auto flex w-full max-w-md flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
    {children}
  </div>
)

export default Form
