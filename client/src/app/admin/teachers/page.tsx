"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

type Teacher = {
  id: string
  firstName: string
  lastName: string
  aboutShort?: string
  education?: string
}

type Subject = { id: string; name: string }
type TeacherSubject = { id?: string; subjectId: string; price: string; duration: string }

export default function TeachersAdminPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [editing, setEditing] = useState<Teacher | null>(null)
  const [form, setForm] = useState<Partial<Teacher>>({
    firstName: "",
    lastName: "",
    aboutShort: "",
    education: "",
  })
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [teacherSubjects, setTeacherSubjects] = useState<TeacherSubject[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch("/api/teachers").then(r => r.json()).then(setTeachers)
    fetch("/api/subjects").then(r => r.json()).then(setSubjects)
  }, [])

  const startEdit = async (teacher: Teacher) => {
    setEditing(teacher)
    setForm(teacher)
    const resp = await fetch(`/api/teacher-subjects?teacherId=${teacher.id}`)
    const ts = await resp.json()
    setTeacherSubjects(ts.map((t: any) => ({
      id: t.id,
      subjectId: t.subjectId,
      price: t.price?.toString() ?? "",
      duration: t.duration?.toString() ?? "",
    })))
  }

  const startNew = () => {
    setEditing(null)
    setForm({ firstName: "", lastName: "", aboutShort: "", education: "" })
    setTeacherSubjects([])
  }

  const handleSubjectChange = (subjectId: string, checked: boolean) => {
    setTeacherSubjects(ts =>
      checked ? [...ts, { subjectId, price: "", duration: "" }] : ts.filter(s => s.subjectId !== subjectId)
    )
  }

  const updateTS = (subjectId: string, field: "price" | "duration", value: string) => {
    setTeacherSubjects(ts =>
      ts.map(s => s.subjectId === subjectId ? { ...s, [field]: value } : s)
    )
  }

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setLoading(true)

  const method = editing ? "PATCH" : "POST"
  const url = editing ? `/api/teachers/${editing.id}` : "/api/teachers"

  const { id, ...safeForm } = form

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(safeForm),
  })

  const data = await res.json()

  if (!res.ok || !data?.id) {
    console.error("Ошибка при обновлении преподавателя:", data)
    alert("Ошибка при сохранении преподавателя")
    setLoading(false)
    return
  }

  const teacherId = data.id
  // и так далее...


    if (editing) {
      const prev = await fetch(`/api/teacher-subjects?teacherId=${teacherId}`).then(r => r.json())
      for (const ts of prev) {
        await fetch(`/api/teacher-subjects/${ts.id}`, { method: "DELETE" })
      }
    }

    await Promise.all(teacherSubjects.map(ts => {
      const payload = {
        teacherId,
        subjectId: ts.subjectId,
        price: Number(ts.price),
        duration: Number(ts.duration),
      }
      return fetch("/api/teacher-subjects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
    }))

    setTeachers(await fetch("/api/teachers").then(r => r.json()))
    startNew()
    setLoading(false)
  }

  const deleteTeacher = async (id: string) => {
    setLoading(true)
    await fetch(`/api/teachers/${id}`, { method: "DELETE" })
    setTeachers(prev => prev.filter(t => t.id !== id))
    setLoading(false)
    if (editing && editing.id === id) startNew()
  }

  return (
    <div className="max-w-2xl mx-auto py-10">
      <Link href="/admin" className="inline-block mb-4 text-blue-700 hover:underline">
        ← Назад в админ‑панель
      </Link>
      <h1 className="text-2xl font-bold mb-6">Преподаватели</h1>
      <form onSubmit={handleSubmit} className="space-y-3 border p-4 rounded-xl mb-10">
        <div className="flex gap-2">
          <input
            type="text"
            value={form.firstName ?? ""}
            onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
            placeholder="Имя"
            required className="input flex-1"
          />
          <input
            type="text"
            value={form.lastName ?? ""}
            onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
            placeholder="Фамилия"
            className="input flex-1"
          />
        </div>
        <input
          type="text"
          value={form.aboutShort ?? ""}
          onChange={e => setForm(f => ({ ...f, aboutShort: e.target.value }))}
          placeholder="Описание (коротко)"
          className="input w-full"
        />
        <input
          type="text"
          value={form.education ?? ""}
          onChange={e => setForm(f => ({ ...f, education: e.target.value }))}
          placeholder="Образование"
          className="input w-full"
        />
        <div>
          <label className="font-medium">Предметы:</label>
          <div className="flex flex-wrap gap-3">
            {subjects.map(subject => {
              const checked = teacherSubjects.some(ts => ts.subjectId === subject.id)
              return (
                <label key={subject.id} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={e => handleSubjectChange(subject.id, e.target.checked)}
                  />
                  {subject.name}
                  {checked && (
                    <>
                      <input
                        type="number"
                        value={teacherSubjects.find(ts => ts.subjectId === subject.id)?.price ?? ""}
                        onChange={e => updateTS(subject.id, "price", e.target.value)}
                        placeholder="Цена"
                        className="input w-16 ml-2"
                      />
                      <input
                        type="number"
                        value={teacherSubjects.find(ts => ts.subjectId === subject.id)?.duration ?? ""}
                        onChange={e => updateTS(subject.id, "duration", e.target.value)}
                        placeholder="Мин"
                        className="input w-12 ml-1"
                      />
                    </>
                  )}
                </label>
              )
            })}
          </div>
        </div>
        <button className="bg-blue-600 text-white px-4 py-1 rounded" disabled={loading}>
          {editing ? "Сохранить изменения" : "Добавить"}
        </button>
        {editing && (
          <button type="button" className="ml-4 underline" onClick={startNew}>
            Отмена
          </button>
        )}
      </form>
      <h2 className="text-lg font-bold mb-3">Список преподавателей</h2>
      <ul>
        {teachers.map(teacher => (
          <li key={teacher.id} className="flex justify-between items-center border-b py-2">
            <span>
              <b>{teacher.firstName} {teacher.lastName}</b>
              {teacher.aboutShort ? ` — ${teacher.aboutShort}` : ""}
              {teacher.education ? ` / ${teacher.education}` : ""}
            </span>
            <span>
              <button
                className="text-blue-600 mr-2 hover:underline"
                onClick={() => startEdit(teacher)}
                disabled={loading}
              >
                Редактировать
              </button>
              <button
                className="text-red-500 hover:underline"
                onClick={() => deleteTeacher(teacher.id)}
                disabled={loading}
              >
                Удалить
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
