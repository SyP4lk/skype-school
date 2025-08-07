"use client"
import { useState, useEffect } from "react";
import Link from "next/link";

export default function SubjectsAdminPage() {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/subjects").then(res => res.json()).then(setSubjects);
    fetch("/api/categories").then(res => res.json()).then(setCategories);
  }, []);

  const addSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/subjects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, categoryId }),
    });
    const subj = await res.json();
    setSubjects(prev => [...prev, subj]);
    setName("");
    setCategoryId("");
    setLoading(false);
  };

  const deleteSubject = async (id: string) => {
    setLoading(true);
    await fetch(`/api/subjects/${id}`, { method: "DELETE" });
    setSubjects(prev => prev.filter((c: any) => c.id !== id));
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto py-10">
      <Link href="/admin" className="inline-block mb-4 text-blue-700 hover:underline">
        ← Назад в админ‑панель
      </Link>
      <h1 className="text-2xl font-bold mb-6">Предметы</h1>
      <form onSubmit={addSubject} className="flex gap-2 mb-6">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Название предмета"
          className="border rounded px-2 py-1 flex-1"
          required
        />
        <select
          value={categoryId}
          onChange={e => setCategoryId(e.target.value)}
          className="border rounded px-2 py-1 flex-1"
          required
        >
          <option value="">Выберите категорию</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        <button className="bg-blue-600 text-white px-4 py-1 rounded" disabled={loading}>
          Добавить
        </button>
      </form>
      <ul>
        {subjects.map(subj => (
          <li key={subj.id} className="flex justify-between items-center border-b py-2">
            <span>
              {subj.name}{" "}
              <span className="text-gray-500 text-xs">
                ({categories.find(cat => cat.id === subj.categoryId)?.name ?? "—"})
              </span>
            </span>
            <button
              onClick={() => deleteSubject(subj.id)}
              className="text-red-500 hover:underline"
              disabled={loading}
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
