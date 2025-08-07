"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

type Category = { id: string; name: string }

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([])
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch("/api/categories")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCategories(data)
        } else {
          console.error("Ожидался массив, но получено:", data)
          setError(true)
        }
      })
      .catch(err => {
        console.error("Ошибка при загрузке категорий:", err)
        setError(true)
      })
  }, [])

  const icons = ["🌎", "📚", "📝", "🧪", "🎓", "♟️", "🗣️", "🎨", "🇨🇳", "🇸🇪", "💻"]

  if (error) {
    return (
      <div className="text-center py-10 text-red-600">
        Не удалось загрузить категории. Пожалуйста, попробуйте позже.
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Выберите направление</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat, i) => (
          <Link
            href={`/categories/${cat.id}`}
            key={cat.id}
            className="flex flex-col items-center justify-center p-6 border rounded-xl bg-white shadow hover:bg-blue-50 transition"
          >
            <span className="text-4xl mb-3">{icons[i % icons.length]}</span>
            <div className="text-lg font-semibold text-center">{cat.name}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
