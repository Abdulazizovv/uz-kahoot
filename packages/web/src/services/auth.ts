import env from "@eduarena/web/env"
import ky from "ky"

const API_BASE = env.NEXT_PUBLIC_API_URL

export interface User {
  id: string
  phone_number: string
  first_name: string
  last_name: string
  email: string
  user_type: "student" | "teacher"
  phone_verified: boolean
}

export interface TokenResponse {
  access: string
  refresh: string
  user: User
}

export interface RequestOTPRequest {
  user_id: string
}

export interface VerifyOTPRequest {
  otp: string
}

export interface RefreshTokenRequest {
  refresh: string
}

export interface RefreshTokenResponse {
  access: string
}

class AuthService {
  private ky = ky.create({
    prefixUrl: API_BASE,
    headers: {
      "Content-Type": "application/json",
    },
  })

  async requestOTP(userId: string): Promise<void> {
    await this.ky.post("api/auth/telegram/request-otp/", {
      json: { user_id: userId },
    })
  }

  async verifyOTP(otp: string): Promise<TokenResponse> {
    const response = await this.ky.post("api/auth/telegram/verify-otp/", {
      json: { otp },
    })
    return response.json()
  }

  async refreshToken(refresh: string): Promise<RefreshTokenResponse> {
    const response = await this.ky.post("api/auth/token/refresh/", {
      json: { refresh },
    })
    return response.json()
  }

  setAuthToken(token: string) {
    this.ky = ky.create({
      prefixUrl: API_BASE,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
  }
}

export const authService = new AuthService()
