"use client"

import Button from "@/components/Button"
import Input from "@/components/Input"
import { authService } from "@/services/auth"
import { useAuthStore } from "@/stores/auth"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
import * as yup from "yup"

const otpSchema = yup.object().shape({
  otp: yup
    .string()
    .required("OTP kodini kiriting")
    .matches(/^\d{5}$/, "OTP kod 5 xonali raqam bo'lishi kerak"),
})

const AuthForm = () => {
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ otp?: string }>({})

  const { login, setLoading, setError } = useAuthStore()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await otpSchema.validate({ otp }, { abortEarly: false })
      setErrors({})
    } catch (validationError: any) {
      const newErrors: { otp?: string } = {}
      validationError.inner.forEach((err: any) => {
        newErrors[err.path as keyof typeof newErrors] = err.message
      })
      setErrors(newErrors)
      return
    }

    setIsLoading(true)
    setLoading(true)
    setError(null)

    try {
      const response = await authService.verifyOTP(otp)
      login(
        { access: response.access, refresh: response.refresh },
        response.user,
      )

      toast.success("Muvaffaqiyatli kirildi!")

      // Role based redirect - window.location ishlatish production uchun
      if (response.user.user_type === "student") {
        window.location.href = "/student/dashboard"
      } else if (response.user.user_type === "teacher") {
        window.location.href = "/teacher/dashboard"
      }
    } catch (error: any) {
      console.error("Auth error:", error)
      const errorMessage =
        error.response?.data?.detail || "OTP kod noto'g'ri yoki muddati tugagan"
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
      setLoading(false)
    }
  }

  const handleRequestOTP = () => {
    // Telegram bot ga havola
    window.open("https://t.me/eduarena_robot", "_blank")
    toast.success("Telegram bot orqali OTP kodini oling")
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-lg border border-white/20 bg-white/10 p-8 backdrop-blur-sm">
        <h2 className="mb-6 text-center text-2xl font-bold text-white">
          Tizimga kirish
        </h2>

        <div className="mb-6 text-center">
          <p className="mb-4 text-gray-300">
            Telegram bot orqali OTP kodini oling
          </p>
          <Button
            onClick={handleRequestOTP}
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
          >
            Telegram Bot ga o'tish
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="otp"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              5 xonali OTP kod
            </label>
            <Input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 5))
              }
              placeholder="12345"
              className="w-full text-center text-2xl tracking-widest"
              maxLength={5}
              disabled={isLoading}
            />
            {errors.otp && (
              <p className="mt-1 text-sm text-red-400">{errors.otp}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading || otp.length !== 5}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
          >
            {isLoading ? "Tekshirilmoqda..." : "Kirish"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            OTP kod 5 daqiqa davomida amal qiladi
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthForm
