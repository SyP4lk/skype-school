"use client"
import { useState, useEffect } from "react"

type Subject = { id: string; name: string }
type Teacher = { id?: string; firstName: string; lastName: string }
type TeacherSubject = { subjectId: string; price: string; duration: string }

export default function TeacherForm({ teacher, onSave }: { teacher?: Teacher, onSave?: () => void }) {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [form, setForm] = useState<Teacher>({ firstName: "", lastName: "", ...teacher })
  const [teacherSubjects, setTeacherSubjects] = useState<TeacherSubject[]>([])

  useEffect(() => {
    fetch("/api/subjects").then(res => res.json()).then(setSubjects)
  }, [])

  // Выбор предмета (мультиселект)
  const handleSubjectChange = (subjectId: string, checked: boolean) => {
    setTeacherSubjects(ts => {
      if (checked) return [...ts, { subjectId, price: "", duration: "" }]
      else return ts.filter(s => s.subjectId !== subjectId)
    })
  }

  // Изменение цены/длительности по предмету
  const updateTS = (subjectId: string, field: "price" | "duration", value: string) => {
    setTeacherSubjects(ts =>
      ts.map(s => s.subjectId === subjectId ? { ...s, [field]: value } : s)
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // 1. Сохраняем преподавателя
    const res = await fetch("/api/teachers", {
      method: teacher?.id ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
    const data = await res.json()
    const teacherId = data.id

    // 2. Сохраняем все TeacherSubject (можно добавить PATCH/DELETE)
    await Promise.all(teacherSubjects.map(ts =>
      fetch("/api/teacher-subjects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teacherId, ...ts, price: Number(ts.price), duration: Number(ts.duration) })
      })
    ))
    onSave?.()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <div>
        <input
          type="text"
          value={form.firstName}
          onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
          placeholder="Имя"
          required className="input"
        />
      </div>
      <div>
        <input
          type="text"
          value={form.lastName}
          onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
          placeholder="Фамилия"
          className="input"
        />
      </div>
      <div>
        <label className="font-medium">Предметы:</label>
        <div className="flex flex-wrap gap-2">
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
      <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
        {teacher?.id ? "Сохранить" : "Добавить"}
      </button>
    </form>
  )
}
