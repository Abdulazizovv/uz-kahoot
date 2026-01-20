"use client"

import Header from "@/components/teacher/Header"
import Sidebar from "@/components/teacher/Sidebar"
import {
  groupsService,
  studentsService,
  type GroupStatistics,
  type Student,
  type StudentGroup,
} from "@/services/api"
import { useEffect, useState } from "react"

export default function TeacherGroupsPage() {
  // State management
  const [groups, setGroups] = useState<StudentGroup[]>([])
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null)
  const [students, setStudents] = useState<Student[]>([])
  const [statistics, setStatistics] = useState<GroupStatistics | null>(null)
  const [loading, setLoading] = useState(true)
  const [studentsLoading, setStudentsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [gradeFilter, setGradeFilter] = useState<number | null>(null)

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [editingGroup, setEditingGroup] = useState<StudentGroup | null>(null)

  // Form states
  const [formData, setFormData] = useState({ name: "", grade: 1 })
  const [formErrors, setFormErrors] = useState<{
    name?: string
    grade?: string
  }>({})
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load groups on mount
  useEffect(() => {
    loadGroups()
  }, [gradeFilter])

  // Load students when group selected
  useEffect(() => {
    if (selectedGroupId) {
      loadStudents(selectedGroupId)
      loadStatistics(selectedGroupId)
    } else {
      setStudents([])
      setStatistics(null)
    }
  }, [selectedGroupId])

  // API calls
  const loadGroups = async () => {
    try {
      setLoading(true)
      setError(null)
      const params: any = { ordering: "grade,name" }
      if (gradeFilter) params.grade = gradeFilter

      const data = await groupsService.getAll(params)
      setGroups(data)

      if (data.length > 0 && !selectedGroupId) {
        setSelectedGroupId(data[0].id)
      } else if (data.length === 0) {
        setSelectedGroupId(null)
      }
    } catch (err: any) {
      console.error("Guruhlarni yuklashda xatolik:", err)
      setError(
        err?.response?.data?.message ||
          "Guruhlarni yuklashda xatolik yuz berdi",
      )
    } finally {
      setLoading(false)
    }
  }

  const loadStudents = async (groupId: string) => {
    try {
      setStudentsLoading(true)
      console.log("Loading students for group ID:", groupId)
      const data = await studentsService.getByGroup(groupId)
      console.log("Loaded students:", data)
      setStudents(data || [])
    } catch (err) {
      console.error("Talabalarni yuklashda xatolik:", err)
      setStudents([])
    } finally {
      setStudentsLoading(false)
    }
  }

  const loadStatistics = async (groupId: string) => {
    try {
      const data = await groupsService.getStatistics(groupId)
      setStatistics(data)
    } catch (err) {
      console.error("Statistikani yuklashda xatolik:", err)
      setStatistics(null)
    }
  }

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      setSubmitting(true)
      const newGroup = await groupsService.create({
        name: formData.name.trim(),
        grade: formData.grade,
      })
      setGroups([...groups, newGroup])
      setSelectedGroupId(newGroup.id)
      closeCreateModal()
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Guruh yaratishda xatolik yuz berdi",
      )
    } finally {
      setSubmitting(false)
    }
  }

  const handleUpdateGroup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingGroup || !validateForm()) return

    try {
      setSubmitting(true)
      const updated = await groupsService.update(editingGroup.id, {
        name: formData.name.trim(),
        grade: formData.grade,
      })
      setGroups(groups.map((g) => (g.id === updated.id ? updated : g)))
      closeEditModal()
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Guruhni yangilashda xatolik yuz berdi",
      )
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteGroup = async () => {
    if (!editingGroup) return

    try {
      setSubmitting(true)
      await groupsService.delete(editingGroup.id)
      const updatedGroups = groups.filter((g) => g.id !== editingGroup.id)
      setGroups(updatedGroups)

      if (selectedGroupId === editingGroup.id) {
        setSelectedGroupId(updatedGroups[0]?.id || null)
      }
      closeDeleteModal()
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Guruhni o'chirishda xatolik yuz berdi",
      )
    } finally {
      setSubmitting(false)
    }
  }

  // Helper functions
  const validateForm = () => {
    const errors: { name?: string; grade?: string } = {}

    if (!formData.name.trim()) {
      errors.name = "Guruh nomi kiritilishi shart"
    } else if (formData.name.trim().length < 2) {
      errors.name = "Guruh nomi kamida 2 ta belgidan iborat bo'lishi kerak"
    }

    if (formData.grade < 1 || formData.grade > 6) {
      errors.grade = "Daraja 1 dan 6 gacha bo'lishi kerak"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const getLevelLabel = (grade: number | undefined): string => {
    if (!grade || grade < 1 || grade > 6) return "Noma'lum"
    const labels: Record<number, string> = {
      1: "1-kurs",
      2: "2-kurs",
      3: "3-kurs",
      4: "4-kurs",
      5: "1-kurs Magistr",
      6: "2-kurs Magistr",
    }
    return labels[grade]
  }

  const getLevelBadgeColor = (grade: number): string => {
    if (grade <= 2) return "bg-green-100 text-green-700 border-green-200"
    if (grade <= 4) return "bg-blue-100 text-blue-700 border-blue-200"
    return "bg-purple-100 text-purple-700 border-purple-200"
  }

  const openCreateModal = () => {
    setFormData({ name: "", grade: 1 })
    setFormErrors({})
    setShowCreateModal(true)
  }

  const closeCreateModal = () => {
    setShowCreateModal(false)
    setFormData({ name: "", grade: 1 })
    setFormErrors({})
  }

  const openEditModal = (group: StudentGroup) => {
    setEditingGroup(group)
    setFormData({ name: group.name, grade: group.grade })
    setFormErrors({})
    setShowEditModal(true)
  }

  const closeEditModal = () => {
    setShowEditModal(false)
    setEditingGroup(null)
    setFormData({ name: "", grade: 1 })
    setFormErrors({})
  }

  const openDeleteModal = (group: StudentGroup) => {
    setEditingGroup(group)
    setShowDeleteModal(true)
  }

  const closeDeleteModal = () => {
    setShowDeleteModal(false)
    setEditingGroup(null)
  }

  const filteredStudents = (students || []).filter((student) =>
    student.full_name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const selectedGroup = groups.find((g) => g.id === selectedGroupId)

  // Loading state
  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="ml-72 flex flex-1 flex-col">
          <Header />
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
              <p className="mt-4 font-medium text-gray-600">Yuklanmoqda...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />

      <div className="ml-72 flex flex-1 flex-col overflow-hidden">
        <Header />

        <div className="flex-1 overflow-y-auto p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Guruhlar</h1>
                <p className="mt-1 text-gray-600">
                  Talabalar guruhlarini boshqaring
                </p>
              </div>
              <button
                onClick={openCreateModal}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Yangi Guruh
              </button>
            </div>

            {/* Stats Cards */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Jami Guruhlar
                    </p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">
                      {groups.length}
                    </p>
                  </div>
                  <div className="rounded-full bg-blue-100 p-3">
                    <svg
                      className="h-8 w-8 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Jami Talabalar
                    </p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">
                      {groups.reduce((sum, g) => sum + g.students_count, 0)}
                    </p>
                  </div>
                  <div className="rounded-full bg-green-100 p-3">
                    <svg
                      className="h-8 w-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Faol Talabalar
                    </p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">
                      {statistics?.active_students ?? 0}
                    </p>
                  </div>
                  <div className="rounded-full bg-purple-100 p-3">
                    <svg
                      className="h-8 w-8 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 rounded-lg border-l-4 border-red-500 bg-red-50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg
                    className="h-5 w-5 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="font-medium text-red-800">{error}</p>
                </div>
                <button
                  onClick={() => setError(null)}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {groups.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white p-12">
              <div className="rounded-full bg-gray-100 p-6">
                <svg
                  className="h-16 w-16 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                Guruhlar yo'q
              </h3>
              <p className="mt-2 text-gray-600">
                Birinchi guruhingizni yarating
              </p>
              <button
                onClick={openCreateModal}
                className="mt-6 flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-all hover:bg-blue-700"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Guruh Yaratish
              </button>
            </div>
          ) : (
            /* Main Content */
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Groups List */}
              <div className="lg:col-span-1">
                <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                  <div className="border-b border-gray-200 p-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Guruhlar ro'yxati
                    </h2>

                    {/* Grade Filter */}
                    <div className="mt-3">
                      <select
                        value={gradeFilter || ""}
                        onChange={(e) =>
                          setGradeFilter(
                            e.target.value ? Number(e.target.value) : null,
                          )
                        }
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                      >
                        <option value="">Barcha darajalar</option>
                        {[1, 2, 3, 4, 5, 6].map((grade) => (
                          <option key={grade} value={grade}>
                            {getLevelLabel(grade)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="max-h-[calc(100vh-400px)] overflow-y-auto">
                    {groups.map((group) => (
                      <div
                        key={group.id}
                        onClick={() => setSelectedGroupId(group.id)}
                        className={`cursor-pointer border-b border-gray-200 p-4 transition-colors ${
                          selectedGroupId === group.id
                            ? "border-l-4 border-l-blue-600 bg-blue-50"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">
                              {group.name}
                            </h3>
                            <div className="mt-2 flex flex-wrap gap-2">
                              <span
                                className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${getLevelBadgeColor(group.grade)}`}
                              >
                                <svg
                                  className="h-3 w-3"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
                                </svg>
                                {getLevelLabel(group.grade)}
                              </span>
                              <span className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                                <svg
                                  className="h-3 w-3"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                </svg>
                                {group.students_count}
                              </span>
                            </div>
                          </div>
                          {selectedGroupId === group.id && (
                            <svg
                              className="h-5 w-5 text-blue-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Students Details */}
              <div className="lg:col-span-2">
                {selectedGroup ? (
                  <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                    {/* Group Header */}
                    <div className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h2 className="text-2xl font-bold text-gray-900">
                            {selectedGroup.name}
                          </h2>
                          <div className="mt-3 flex flex-wrap gap-3">
                            <span
                              className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-semibold ${getLevelBadgeColor(selectedGroup.grade)}`}
                            >
                              <svg
                                className="h-4 w-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
                              </svg>
                              {getLevelLabel(selectedGroup.grade)}
                            </span>
                            <span className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-semibold text-gray-700">
                              <svg
                                className="h-4 w-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                              </svg>
                              {studentsLoading
                                ? "..."
                                : `${students?.length ?? 0} ta talaba`}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditModal(selectedGroup)}
                            className="rounded-lg border border-gray-300 bg-white p-2 text-gray-700 transition-colors hover:bg-gray-50"
                            title="Tahrirlash"
                          >
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => openDeleteModal(selectedGroup)}
                            className="rounded-lg border border-red-300 bg-white p-2 text-red-600 transition-colors hover:bg-red-50"
                            title="O'chirish"
                          >
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Search Bar */}
                      <div className="mt-4">
                        <div className="relative">
                          <svg
                            className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                          <input
                            type="text"
                            placeholder="Talaba qidirish..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Students List */}
                    <div className="p-6">
                      {studentsLoading ? (
                        <div className="flex items-center justify-center py-12">
                          <div className="text-center">
                            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
                            <p className="mt-3 text-gray-600">
                              Talabalar yuklanmoqda...
                            </p>
                          </div>
                        </div>
                      ) : filteredStudents.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12">
                          <div className="rounded-full bg-gray-100 p-4">
                            <svg
                              className="h-12 w-12 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                          </div>
                          <h3 className="mt-3 text-lg font-semibold text-gray-900">
                            {searchTerm
                              ? "Talaba topilmadi"
                              : "Bu guruhda talabalar yo'q"}
                          </h3>
                          <p className="mt-1 text-gray-600">
                            {searchTerm
                              ? "Boshqa kalit so'z bilan qidiring"
                              : "Talabalarni qo'shish uchun 'Talaba' tugmasini bosing"}
                          </p>
                        </div>
                      ) : (
                        <div className="overflow-hidden rounded-lg border border-gray-200">
                          <table className="w-full">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                  №
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                  Talaba
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                  Telefon
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                  Holat
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                  Amallar
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                              {filteredStudents.map((student, index) => (
                                <tr
                                  key={student.id}
                                  className="transition-colors hover:bg-gray-50"
                                >
                                  <td className="px-4 py-4">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                                      {index + 1}
                                    </span>
                                  </td>
                                  <td className="px-4 py-4">
                                    <div className="flex items-center gap-3">
                                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 font-semibold text-white">
                                        {student.full_name.charAt(0)}
                                      </div>
                                      <div>
                                        <div className="font-semibold text-gray-900">
                                          {student.full_name}
                                        </div>
                                        {student.date_of_birth && (
                                          <div className="text-sm text-gray-500">
                                            {new Date(
                                              student.date_of_birth,
                                            ).toLocaleDateString("uz-UZ", {
                                              day: "2-digit",
                                              month: "long",
                                              year: "numeric",
                                            })}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-4 py-4">
                                    <div className="flex items-center gap-2 text-gray-700">
                                      <svg
                                        className="h-4 w-4 text-gray-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                      >
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                      </svg>
                                      <span className="text-sm">
                                        {student.user.phone_number}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="px-4 py-4">
                                    {student.user.is_active ? (
                                      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                        <span className="h-2 w-2 rounded-full bg-green-600"></span>
                                        Faol
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                                        <span className="h-2 w-2 rounded-full bg-gray-600"></span>
                                        Nofaol
                                      </span>
                                    )}
                                  </td>
                                  <td className="px-4 py-4">
                                    <button className="rounded-lg bg-blue-50 p-2 text-blue-600 transition-colors hover:bg-blue-100">
                                      <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        />
                                      </svg>
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center rounded-lg border border-gray-200 bg-white p-12">
                    <div className="text-center">
                      <div className="inline-block rounded-full bg-gray-100 p-6">
                        <svg
                          className="h-12 w-12 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-gray-900">
                        Guruh tanlanmagan
                      </h3>
                      <p className="mt-2 text-gray-600">
                        Chap tarafdan guruhni tanlang
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
          <div className="w-full max-w-md rounded-lg bg-white shadow-xl">
            <div className="border-b border-gray-200 px-6 py-4">
              <h3 className="text-xl font-bold text-gray-900">
                Yangi Guruh Yaratish
              </h3>
            </div>
            <form onSubmit={handleCreateGroup} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Guruh nomi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Masalan: KI-101"
                    className={`mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none ${
                      formErrors.name
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                    }`}
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Daraja (Kurs) <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.grade}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        grade: Number(e.target.value),
                      })
                    }
                    className={`mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none ${
                      formErrors.grade
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                    }`}
                  >
                    {[1, 2, 3, 4, 5, 6].map((grade) => (
                      <option key={grade} value={grade}>
                        {getLevelLabel(grade)}
                      </option>
                    ))}
                  </select>
                  {formErrors.grade && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.grade}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={closeCreateModal}
                  disabled={submitting}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                >
                  {submitting ? "Yaratilmoqda..." : "Yaratish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingGroup && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
          <div className="w-full max-w-md rounded-lg bg-white shadow-xl">
            <div className="border-b border-gray-200 px-6 py-4">
              <h3 className="text-xl font-bold text-gray-900">
                Guruhni Tahrirlash
              </h3>
            </div>
            <form onSubmit={handleUpdateGroup} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Guruh nomi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={`mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none ${
                      formErrors.name
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                    }`}
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Daraja (Kurs) <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.grade}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        grade: Number(e.target.value),
                      })
                    }
                    className={`mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none ${
                      formErrors.grade
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                    }`}
                  >
                    {[1, 2, 3, 4, 5, 6].map((grade) => (
                      <option key={grade} value={grade}>
                        {getLevelLabel(grade)}
                      </option>
                    ))}
                  </select>
                  {formErrors.grade && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.grade}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={closeEditModal}
                  disabled={submitting}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                >
                  {submitting ? "Saqlanmoqda..." : "Saqlash"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && editingGroup && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
          <div className="w-full max-w-md rounded-lg bg-white shadow-xl">
            <div className="border-b border-gray-200 px-6 py-4">
              <h3 className="text-xl font-bold text-gray-900">
                Guruhni O'chirish
              </h3>
            </div>
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-red-100 p-3">
                  <svg
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    <span className="font-bold text-red-600">
                      {editingGroup.name}
                    </span>{" "}
                    guruhini o'chirmoqchimisiz?
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    Bu amalni ortga qaytarib bo'lmaydi. Guruh va unga bog'liq
                    barcha ma'lumotlar o'chiriladi.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={closeDeleteModal}
                  disabled={submitting}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
                >
                  Bekor qilish
                </button>
                <button
                  onClick={handleDeleteGroup}
                  disabled={submitting}
                  className="flex-1 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
                >
                  {submitting ? "O'chirilmoqda..." : "O'chirish"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
