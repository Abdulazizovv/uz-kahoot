import { PlayerStatusDataMap } from "@eduarena/common/types/game/status"
import Loader from "@/components/Loader"
import { usePlayerStore } from "@/stores/player"
import { useQuestionStore } from "@/stores/question"

type Props = {
  data: PlayerStatusDataMap["WAIT"]
}

const Wait = ({ data: { text } }: Props) => {
  const { player } = usePlayerStore()
  const { questionStates } = useQuestionStore()

  return (
    <section className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-20 left-10 h-32 w-32 animate-bounce rounded-full bg-yellow-300 blur-3xl"></div>
        <div className="absolute top-40 right-20 h-40 w-40 animate-pulse rounded-full bg-pink-300 blur-3xl"></div>
        <div className="absolute bottom-20 left-1/4 h-36 w-36 animate-bounce rounded-full bg-purple-300 blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Loading Animation */}
        <div className="animate-bounce-slow">
          <Loader />
        </div>

        {/* Main Message Card */}
        <div className="animate-fade-in-up rounded-3xl bg-white/95 px-8 py-6 shadow-2xl ring-2 ring-amber-400/50 backdrop-blur-sm">
          <h2 className="text-center text-3xl font-bold text-gray-800 md:text-4xl lg:text-5xl">
            {text}
          </h2>
        </div>

        {/* Player Info Card */}
        {player?.username && (
          <div className="animate-fade-in flex items-center gap-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-4 shadow-xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/30 backdrop-blur-sm">
              <svg
                className="h-8 w-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-white/80">
                Sizning ismingiz
              </p>
              <p className="text-2xl font-bold text-white drop-shadow-lg">
                {player.username}
              </p>
            </div>
          </div>
        )}

        {/* Quiz Info Cards */}
        {questionStates && (
          <div className="grid w-full max-w-2xl grid-cols-2 gap-4">
            {/* Total Questions */}
            <div className="group animate-fade-in rounded-2xl bg-white/90 p-6 shadow-lg backdrop-blur-sm transition-all hover:scale-105">
              <div className="mb-3 flex justify-center">
                <div className="rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 p-3">
                  <svg
                    className="h-8 w-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                  </svg>
                </div>
              </div>
              <p className="mb-1 text-center text-sm font-medium text-gray-600">
                Jami savollar
              </p>
              <p className="text-center text-3xl font-bold text-gray-800">
                {questionStates.total}
              </p>
            </div>

            {/* Current Score */}
            <div className="group animate-fade-in rounded-2xl bg-white/90 p-6 shadow-lg backdrop-blur-sm transition-all hover:scale-105">
              <div className="mb-3 flex justify-center">
                <div className="rounded-full bg-gradient-to-br from-amber-500 to-orange-500 p-3">
                  <svg
                    className="h-8 w-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
              </div>
              <p className="mb-1 text-center text-sm font-medium text-gray-600">
                Sizning ballingiz
              </p>
              <p className="text-center text-3xl font-bold text-gray-800">
                {player?.points || 0}
              </p>
            </div>
          </div>
        )}

        {/* Tips Card */}
        <div className="animate-fade-in max-w-2xl rounded-2xl bg-blue-50/90 p-6 shadow-lg backdrop-blur-sm">
          <div className="mb-3 flex items-center gap-3">
            <div className="rounded-full bg-blue-500 p-2">
              <svg
                className="h-6 w-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800">Maslahat</h3>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="mt-1 text-amber-500">•</span>
              <span>Tezroq javob bersangiz, ko'proq ball olasiz</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-amber-500">•</span>
              <span>Har bir to'g'ri javob uchun ball yig'asiz</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-amber-500">•</span>
              <span>Diqqat bilan o'qing va o'ylab javob bering</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Wait
