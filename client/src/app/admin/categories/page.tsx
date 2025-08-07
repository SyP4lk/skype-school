"use client"
import { useEffect, useState } from "react"
import Link from "next/link"

type Category = {
  id: string
  name: string
}

export default function CategoriesAdminPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  // Получение списка категорий через прокси
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then(setCategories)
  }, [])

  // Добавление категории
  const addCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    })
    const cat = await res.json()
    setCategories((prev) => [...prev, cat])
    setName("")
    setLoading(false)
  }

  // Удаление категории
  const deleteCategory = async (id: string) => {
    setLoading(true)
    await fetch(`/api/categories/${id}`, { method: "DELETE" })
    setCategories((prev) => prev.filter((c) => c.id !== id))
    setLoading(false)
  }

  return (
    <div className="max-w-lg mx-auto py-10">
      <Link href="/admin" className="inline-block mb-4 text-blue-700 hover:underline">
        ← Назад в админ‑панель
      </Link>
      <h1 className="text-2xl font-bold mb-6">Категории</h1>
      <form onSubmit={addCategory} className="flex gap-2 mb-6">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Новая категория"
          className="border rounded px-2 py-1 flex-1"
          required
        />
        <button className="bg-blue-600 text-white px-4 py-1 rounded" disabled={loading}>
          Добавить
        </button>
      </form>
      <ul>
        {categories.map(cat => (
          <li key={cat.id} className="flex justify-between items-center border-b py-2">
            <span>{cat.name}</span>
            <button
              onClick={() => deleteCategory(cat.id)}
              className="text-red-500 hover:underline"
              disabled={loading}
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
