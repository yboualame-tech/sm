"use client";

import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

interface Student {
  id: number;
  name: string;
  email: string;
  enrolled: string;
}

export default function Home() {
  const { data: session } = useSession();
  const [students, setStudents] = useState<Student[]>([]);
  const [form, setForm] = useState({ name: "", email: "" });

  useEffect(() => {
    if (session) {
      fetch("/api/students")
        .then((res) => res.json())
        .then(setStudents);
    }
  }, [session]);

  const createStudent = async () => {
    const res = await fetch("/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const newStudent = await res.json();
    setStudents((prev) => [...prev, newStudent]);
  };

  const deleteStudent = async (id: number) => {
    await fetch(`/api/students?id=${id}`, { method: "DELETE" });
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  if (!session) {
    return (
      <main className="p-8">
        <h1>Please sign in</h1>
        <button onClick={() => signIn()}>Sign in</button>
      </main>
    );
  }

  return (
    <main className="p-8">
      <div className="mb-4">
        <span>Signed in as {session.user?.email}</span>
        <button className="ml-2" onClick={() => signOut()}>
          Sign out
        </button>
      </div>
      <h2 className="text-xl font-semibold">Students</h2>
      <ul className="mt-2">
        {students.map((s) => (
          <li key={s.id} className="flex items-center gap-2">
            {s.name} ({s.email})
            <button
              className="ml-2 text-red-500"
              onClick={() => deleteStudent(s.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex gap-2">
        <input
          className="border p-1"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border p-1"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <button
          className="bg-blue-500 text-white px-2"
          onClick={createStudent}
        >
          Add Student
        </button>
      </div>
    </main>
  );
}
