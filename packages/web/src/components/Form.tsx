import { PropsWithChildren } from "react"

const Form = ({ children }: PropsWithChildren) => (
  <div className="z-10 mx-auto flex w-full max-w-md flex-col gap-4 rounded-xl bg-white p-6 shadow-xl">
    {children}
  </div>
)

export default Form
