"use client"

import Button from "@/components/Button"
import Input from "@/components/Input"
import { generateStudentLogin, loginLocal, registerStudent } from "@/lib/local-auth"
import { useAuthStore } from "@/stores/auth"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import * as yup from "yup"

const loginSchema = yup.object().shape({
  login: yup.string().required("Login kiriting"),
  password: yup.string().required("Parol kiriting"),
})

const registerSchema = yup.object().shape({
  firstName: yup.string().required("Ism kiriting"),
  lastName: yup.string().required("Familya kiriting"),
  login: yup.string().required("Login kiriting"),
  password: yup.string().min(4, "Parol kamida 4 ta belgi").required("Parol kiriting"),
})

const AuthForm = () => {
  const [mode, setMode] = useState<"login" | "register">("login")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [loginValue, setLoginValue] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isLoginAuto, setIsLoginAuto] = useState(true)
  const [errors, setErrors] = useState<{
    firstName?: string
    lastName?: string
    login?: string
    password?: string
  }>({})

  const { login, setError } = useAuthStore()
  const router = useRouter()
  const prevModeRef = useRef(mode)

  useEffect(() => {
    if (prevModeRef.current === mode) return

    setErrors({})
    setError(null)
    setIsLoading(false)
    setPassword("")

    if (mode === "login") {
      setFirstName("")
      setLastName("")
      setIsLoginAuto(false)
    } else {
      setIsLoginAuto(true)
      setLoginValue(generateStudentLogin(firstName, lastName))
    }

    prevModeRef.current = mode
  }, [mode, setError, firstName, lastName])

  useEffect(() => {
    if (mode !== "register") return
    if (!isLoginAuto) return
    setLoginValue(generateStudentLogin(firstName, lastName))
  }, [mode, firstName, lastName, isLoginAuto])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (mode === "login") {
        await loginSchema.validate({ login: loginValue, password }, { abortEarly: false })
      } else {
        await registerSchema.validate(
          { firstName, lastName, login: loginValue, password },
          { abortEarly: false },
        )
      }
      setErrors({})
    } catch (validationError: any) {
      const next: any = {}
      validationError?.inner?.forEach?.((err: any) => {
        next[err.path as keyof typeof next] = err.message
      })
      setErrors(next)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const user =
        mode === "login"
          ? loginLocal({ login: loginValue, password })
          : registerStudent({ firstName, lastName, login: loginValue, password })

      login(user)
      toast.success(mode === "login" ? "Muvaffaqiyatli kirildi!" : "Ro'yxatdan o'tildi!")

      router.replace(user.user_type === "teacher" ? "/teacher/dashboard" : "/student/dashboard")
    } catch (error: any) {
      const errorMessage = error?.message || "Login yoki parol noto'g'ri"
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const inputClass =
    "border-white/10 bg-white/5 text-white placeholder:text-white/35 focus:border-cyan-300 focus:ring-cyan-300/15"

  return (
    <div className="glow-ring rounded-3xl border border-white/10 bg-slate-950/55 p-7 shadow-2xl backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-white/90">
            {mode === "login" ? "Tizimga kirish" : "Ro'yxatdan o'tish"}
          </h2>
          <p className="mt-1 text-sm text-white/60">
            {mode === "login"
              ? "Login/parol orqali kirish."
              : "Faqat student ro'yxatdan o'tadi (login auto)."}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-1">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${
              mode === "login" ? "bg-white text-slate-950" : "text-white/75 hover:bg-white/10"
            }`}
          >
            Kirish
          </button>
          <button
            type="button"
            onClick={() => setMode("register")}
            className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${
              mode === "register" ? "bg-white text-slate-950" : "text-white/75 hover:bg-white/10"
            }`}
          >
            Signup
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        {mode === "register" ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-white/70">Ism</label>
              <Input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Ism"
                disabled={isLoading}
                className={inputClass}
              />
              {errors.firstName ? <p className="mt-1 text-sm text-red-400">{errors.firstName}</p> : null}
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-white/70">Familya</label>
              <Input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Familya"
                disabled={isLoading}
                className={inputClass}
              />
              {errors.lastName ? <p className="mt-1 text-sm text-red-400">{errors.lastName}</p> : null}
            </div>
          </div>
        ) : null}

        <div>
          <label className="mb-2 block text-sm font-semibold text-white/70">Login</label>
          <div className="flex gap-2">
            <Input
              type="text"
              value={loginValue}
              onChange={(e) => {
                setIsLoginAuto(false)
                setLoginValue(e.target.value)
              }}
              placeholder={mode === "register" ? "Masalan: student1234" : "Login"}
              disabled={isLoading}
              className={inputClass}
            />
            {mode === "register" ? (
              <button
                type="button"
                onClick={() => {
                  setIsLoginAuto(true)
                  setLoginValue(generateStudentLogin(firstName, lastName))
                }}
                className="shrink-0 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/85 shadow-sm transition hover:bg-white/10 disabled:pointer-events-none disabled:opacity-60"
                disabled={isLoading}
              >
                Generate
              </button>
            ) : null}
          </div>
          {errors.login ? <p className="mt-1 text-sm text-red-400">{errors.login}</p> : null}
          {mode === "register" ? (
            <p className="mt-2 text-xs text-white/55">
              Loginni o'zingiz ham o'zgartira olasiz. Xohlasangiz `Generate` bilan yangi login oling.
            </p>
          ) : null}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-white/70">Parol</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Parol"
            disabled={isLoading}
            className={inputClass}
          />
          {errors.password ? <p className="mt-1 text-sm text-red-400">{errors.password}</p> : null}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-slate-950 hover:from-cyan-400 hover:to-fuchsia-400 disabled:opacity-50"
        >
          {isLoading ? "Tekshirilmoqda..." : mode === "login" ? "Kirish" : "Ro'yxatdan o'tish"}
        </Button>
      </form>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="text-xs leading-relaxed text-white/65">
          Teacher accountlar ro'yxatdan o'tmaydi — login/parol oldindan beriladi. Studentlar uchun login avtomatik
          generatsiya qilinadi (localStorage).
        </p>
      </div>
    </div>
  )
}

export default AuthForm

