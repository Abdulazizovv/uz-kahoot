"use client"

import { predefinedTeachers } from "@/lib/predefined-teachers"
import type { User } from "@/services/auth"

type StoredStudent = {
  id: string
  login: string
  password: string
  first_name: string
  last_name: string
  created_at: string
}

const studentsKey = "eduarena:students:v1"

const loadStudents = (): StoredStudent[] => {
  try {
    const raw = localStorage.getItem(studentsKey)
    if (!raw) return []
    const parsed = JSON.parse(raw) as StoredStudent[]
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter((s) => s && typeof s.login === "string" && typeof s.password === "string")
      .map((s) => ({
        id: String(s.id ?? ""),
        login: String(s.login),
        password: String(s.password),
        first_name: String(s.first_name ?? ""),
        last_name: String(s.last_name ?? ""),
        created_at: String(s.created_at ?? ""),
      }))
  } catch {
    return []
  }
}

const saveStudents = (students: StoredStudent[]) => {
  localStorage.setItem(studentsKey, JSON.stringify(students))
}

const normalizeLogin = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9_]/g, "")

const randomDigits = (n: number) =>
  Array.from({ length: n }, () => Math.floor(Math.random() * 10)).join("")

export const getAllTakenLogins = () => {
  const students = loadStudents().map((s) => s.login)
  const teachers = predefinedTeachers.map((t) => t.login)
  return new Set([...students, ...teachers].map((x) => normalizeLogin(x)))
}

export const generateStudentLogin = (firstName: string, lastName: string) => {
  const baseRaw = `${firstName}.${lastName}`.toLowerCase()
  const base = normalizeLogin(baseRaw) || "student"
  const taken = getAllTakenLogins()

  for (let i = 0; i < 20; i += 1) {
    const candidate = `${base}${randomDigits(4)}`
    if (!taken.has(candidate)) return candidate
  }

  // Fallback (extremely unlikely)
  return `${base}${Date.now().toString().slice(-6)}`
}

export const registerStudent = (input: {
  firstName: string
  lastName: string
  login: string
  password: string
}): User => {
  const login = normalizeLogin(input.login)
  if (!login) {
    throw new Error("Login bo'sh bo'lmasligi kerak")
  }

  const password = input.password.trim()
  if (password.length < 4) {
    throw new Error("Parol kamida 4 ta belgidan iborat bo'lsin")
  }

  const taken = getAllTakenLogins()
  if (taken.has(login)) {
    throw new Error("Bu login band. Boshqasini tanlang yoki generatsiya qiling.")
  }

  const students = loadStudents()
  const newStudent: StoredStudent = {
    id: crypto.randomUUID(),
    login,
    password,
    first_name: input.firstName.trim(),
    last_name: input.lastName.trim(),
    created_at: new Date().toISOString(),
  }
  saveStudents([...students, newStudent])

  const user: User = {
    id: newStudent.id,
    phone_number: "",
    first_name: newStudent.first_name,
    last_name: newStudent.last_name,
    email: "",
    user_type: "student",
    phone_verified: true,
  }

  return user
}

export const loginLocal = (input: { login: string; password: string }): User => {
  const login = normalizeLogin(input.login)
  const password = input.password

  if (!login || !password) {
    throw new Error("Login va parolni kiriting")
  }

  const teacher = predefinedTeachers.find((t) => normalizeLogin(t.login) === login)
  if (teacher) {
    if (teacher.password !== password) throw new Error("Login yoki parol noto'g'ri")
    return {
      id: `teacher:${teacher.login}`,
      phone_number: "",
      first_name: teacher.first_name,
      last_name: teacher.last_name,
      email: "",
      user_type: "teacher",
      phone_verified: true,
    }
  }

  const students = loadStudents()
  const student = students.find((s) => normalizeLogin(s.login) === login)
  if (!student || student.password !== password) {
    throw new Error("Login yoki parol noto'g'ri")
  }

  return {
    id: student.id,
    phone_number: "",
    first_name: student.first_name,
    last_name: student.last_name,
    email: "",
    user_type: "student",
    phone_verified: true,
  }
}

