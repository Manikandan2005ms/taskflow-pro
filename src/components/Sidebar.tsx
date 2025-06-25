import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Book, User, Home, PlusCircle } from "lucide-react";

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <aside className="bg-card border-r border-border w-64 min-h-screen p-6 hidden md:block">
      <nav>
        <ul className="space-y-4">
          <li>
            <Link href="/dashboard" className="flex items-center gap-2 hover:text-primary">
              <Home className="w-5 h-5" /> Dashboard
            </Link>
          </li>
          {user?.role !== "lecturer" && (
            <li>
              <Link href="/dashboard/courses" className="flex items-center gap-2 hover:text-primary">
                <Book className="w-5 h-5" /> Courses
              </Link>
            </li>
          )}
          <li>
            <Link href="/dashboard/profile" className="flex items-center gap-2 hover:text-primary">
              <User className="w-5 h-5" /> Profile
            </Link>
          </li>
          {user?.role === "lecturer" && (
            <li>
              <Link href="/dashboard/courses/new" className="flex items-center gap-2 hover:text-primary">
                <PlusCircle className="w-5 h-5" /> Create Course
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
} 