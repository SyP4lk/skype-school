// client/src/app/admin/page.tsx
"use client"

import Link from "next/link"

const sections = [
  { href: "/admin/categories", title: "Категории", desc: "Управление категориями курсов" },
  { href: "/admin/subjects", title: "Предметы", desc: "Добавление и изменение предметов" },
  { href: "/admin/teachers", title: "Преподаватели", desc: "Управление преподавателями" },
  // { href: "/admin/students", title: "Ученики", desc: "Список и добавление учеников" },
  // { href: "/admin/reviews", title: "Отзывы", desc: "Модерация отзывов" },
  // Добавишь ещё что нужно!
]

export default function AdminHome() {
  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Админ‑панель</h1>
      <div className="grid gap-6">
        {sections.map(sec => (
          <Link
            href={sec.href}
            key={sec.href}
            className="block border rounded-xl px-6 py-6 shadow hover:bg-gray-50 transition"
          >
            <div className="text-xl font-semibold mb-1">{sec.title}</div>
            <div className="text-gray-500">{sec.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
