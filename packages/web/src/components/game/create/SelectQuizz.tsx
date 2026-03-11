import { QuizzWithId } from "@eduarena/common/types/game"
import Button from "@/components/Button"
import clsx from "clsx"
import { useState } from "react"
import toast from "react-hot-toast"

type Props = {
  quizzList: QuizzWithId[]
  onSelect: (_id: string) => void
}

const SelectQuizz = ({ quizzList, onSelect }: Props) => {
  const [selected, setSelected] = useState<string | null>(null)

  const handleSelect = (id: string) => () => {
    if (selected === id) {
      setSelected(null)
    } else {
      setSelected(id)
    }
  }

  const handleSubmit = () => {
    if (!selected) {
      toast.error("Iltimos, test to'plamini tanlang")

      return
    }

    onSelect(selected)
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold text-slate-900">
          Savollar to&apos;plamini tanlang
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          O&apos;yin uchun test mavzusini tanlang.
        </p>
      </div>

      <div className="w-full space-y-2">
        {quizzList.map((quizz) => (
          <button
            key={quizz.id}
            className={clsx(
              "flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-left shadow-sm transition hover:bg-slate-50",
              selected === quizz.id && "border-slate-900 ring-4 ring-slate-900/10",
            )}
            onClick={handleSelect(quizz.id)}
          >
            <span className="text-sm font-semibold text-slate-900">
              {quizz.subject}
            </span>

            <span
              className={clsx(
                "flex h-5 w-5 items-center justify-center rounded-full border border-slate-300",
                selected === quizz.id && "border-slate-900 bg-slate-900",
              )}
              aria-hidden="true"
            >
              {selected === quizz.id && (
                <span className="h-2 w-2 rounded-full bg-white" />
              )}
            </span>
          </button>
        ))}
      </div>
      <Button onClick={handleSubmit}>Tanlash</Button>
    </div>
  )
}

export default SelectQuizz
