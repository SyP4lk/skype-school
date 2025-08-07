"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"

type Subject = { id: string; name: string; categoryId: string }
type TeacherSubject = {
  id: string
  teacherId: string
  subjectId: string
  price: number
  duration: number
  subject?: Subject
}
type Teacher = {
  id: string
  firstName: string
  lastName: string
  photo?: string | null
  aboutShort?: string
  aboutFull?: string
  education?: string
  experience?: string
  isActive?: boolean
  sortOrder?: number
  teacherSubjects?: TeacherSubject[]
}

export default function TeacherProfilePage() {
  const params = useParams()
console.log(params); // для дебага

// Определи по факту, какой ключ нужен:
const teacherId = params.teacherId || params.id

  const [teacher, setTeacher] = useState<Teacher | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/teachers/${teacherId}`)
      .then(async r => {
        if (!r.ok) return null
        return r.json()
      })
      .then(setTeacher)
      .finally(() => setLoading(false))
  }, [teacherId])

  if (loading) return <div>Загрузка...</div>
  if (!teacher) return <div>Преподаватель не найден</div>

  return (
    <div className="max-w-xl mx-auto py-10">
      <Link href="/" className="inline-block mb-4 text-blue-700 hover:underline">
        ← На главную
      </Link>
      <div className="flex items-center gap-6 mb-6">
        {teacher.photo ? (
          <img src={teacher.photo} alt="Фото преподавателя" className="rounded-full w-24 h-24 object-cover" />
        ) : (
          <div className="rounded-full w-24 h-24 bg-gray-200"></div>
        )}
        <div>
          <div className="text-2xl font-bold">{teacher.firstName} {teacher.lastName}</div>
          {teacher.aboutShort && <div className="text-gray-500">{teacher.aboutShort}</div>}
          {teacher.education && <div className="text-gray-500 mt-2">Образование: {teacher.education}</div>}
          {teacher.experience && <div className="text-gray-500 mt-2">Опыт: {teacher.experience}</div>}
        </div>
      </div>
      <div>
        <h2 className="text-lg font-bold mb-2">Предметы и цены:</h2>
        {teacher.teacherSubjects && teacher.teacherSubjects.length > 0 ? (
          <ul className="mb-6">
            {teacher.teacherSubjects.map(ts => (
              <li key={ts.id}>
                {ts.subject?.name ?? "—"}: от {ts.price} ₽ / {ts.duration} мин
              </li>
            ))}
          </ul>
        ) : (
          <div className="mb-6 text-gray-500">Нет привязанных предметов</div>
        )}
        {teacher.aboutFull && (
          <>
            <h2 className="text-lg font-bold mb-2">О преподавателе:</h2>
            <p>{teacher.aboutFull}</p>
          </>
        )}
      </div>
    </div>
  )
}
