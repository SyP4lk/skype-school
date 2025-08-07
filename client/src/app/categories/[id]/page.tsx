"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"

type Subject = { id: string; name: string }
type TeacherSubject = {
  id: string
  subjectId: string
  price: number
  duration: number
  subject?: { name: string; categoryId: string }
}
type Teacher = {
  id: string
  firstName: string
  lastName: string
  aboutShort?: string
  teacherSubjects?: TeacherSubject[]
}

export default function CategoryPage() {
  const params = useParams<{ id: string }>()
  const categoryId = params.id
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [subjectId, setSubjectId] = useState("")
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(false)
  const [categoryName, setCategoryName] = useState("")

  useEffect(() => {
    fetch(`/api/categories/${categoryId}`)
      .then(r => r.ok ? r.json() : null)
      .then(cat => {
        setCategoryName(cat?.name || "")
        setSubjects(Array.isArray(cat?.subjects) ? cat.subjects : [])
      })
  }, [categoryId])

  useEffect(() => {
    setLoading(true)
    let url = `/api/teachers?categoryId=${categoryId}`
    if (subjectId) url += `&subjectId=${subjectId}`
    fetch(url)
      .then(r => r.ok ? r.json() : [])
      .then(data => setTeachers(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false))
  }, [categoryId, subjectId])

  const filteredTeachers = Array.isArray(teachers) ? teachers.filter(teacher =>
    Array.isArray(teacher.teacherSubjects) &&
    teacher.teacherSubjects.some(ts =>
      ts?.subject?.categoryId === categoryId &&
      (!subjectId || ts.subjectId === subjectId)
    )
  ) : []

  return (
    <div className="max-w-6xl mx-auto py-8">
      <Link href="/" className="inline-block mb-4 text-blue-700 hover:underline">
        ← На главную
      </Link>
      <h1 className="text-2xl font-bold mb-6">
        Преподаватели по категории:&nbsp;
        {categoryName
          ? categoryName
          : <span className="text-gray-400">Загрузка...</span>
        }
      </h1>

      {/* Фильтр по предмету */}
      <div className="mb-6 flex gap-4">
        <select
          value={subjectId}
          onChange={e => setSubjectId(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">Все предметы</option>
          {Array.isArray(subjects) && subjects.map(subj => (
            <option key={subj.id} value={subj.id}>{subj.name}</option>
          ))}
        </select>
      </div>

      {/* Список преподавателей */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div>Загрузка...</div>
        ) : filteredTeachers.length === 0 ? (
          <div>Нет преподавателей по выбранным параметрам.</div>
        ) : (
          filteredTeachers.map(teacher => (
            <div key={teacher.id} className="border rounded-xl p-6 bg-white shadow">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-gray-200 w-16 h-16"></div>
                <div>
                  <div className="text-lg font-semibold">{teacher.firstName} {teacher.lastName}</div>
                  <div className="text-gray-500 text-sm">{teacher.aboutShort}</div>
                  <div className="mt-2 text-sm text-blue-800">
                    {Array.isArray(teacher.teacherSubjects) && teacher.teacherSubjects
                      .filter(ts =>
                        ts?.subject?.categoryId === categoryId &&
                        (!subjectId || ts.subjectId === subjectId)
                      )
                      .map(ts => (
                        <span key={ts.id}>
                          {ts.subject?.name ?? "—"}: от {ts.price} ₽ / {ts.duration} мин{" "}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Link href={`/teachers/${teacher.id}`} className="bg-blue-500 text-white px-4 py-2 rounded">
                  Перейти в профиль преподавателя
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
