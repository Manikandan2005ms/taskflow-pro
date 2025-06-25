"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <aside className="bg-gradient-to-b from-blue-700 via-purple-600 to-pink-500 text-white w-60 h-[calc(100vh-8rem)] p-6 rounded-2xl shadow-xl mt-4 ml-4 flex flex-col">
      <ul className="space-y-4 text-lg font-semibold">
        <li>
          <Link href="/dashboard" className="hover:text-yellow-300 transition-colors duration-200">
            Dashboard
          </Link>
        </li>
        {user!.role !== "lecturer" && (
          <li>
            <Link href="/dashboard/courses" className="hover:text-yellow-300 transition-colors duration-200">
              Courses
            </Link>
          </li>
        )}
        <li>
          <Link href="/dashboard/profile" className="hover:text-yellow-300 transition-colors duration-200">
            Profile
          </Link>
        </li>
        {user?.role === "lecturer" && (
          <li>
            <Link href="/dashboard/courses/new" className="hover:text-yellow-300 transition-colors duration-200">
              Create Course
            </Link>
          </li>
        )}
      </ul>
    </aside>
  );
}
