"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function Header() {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith("/admin")

  return (
    <header className="w-full border-b py-4 px-6 flex justify-between items-center bg-white">
      <h1 className="font-bold text-lg">Skype School</h1>
      {isAdmin ? (
        <Link href="/" className="text-blue-600 hover:underline">На сайт</Link>
      ) : (
        <Link href="/admin" className="text-blue-600 hover:underline">В админку</Link>
      )}
    </header>
  )
}
