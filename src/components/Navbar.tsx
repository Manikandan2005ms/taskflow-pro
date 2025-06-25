import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-background border-b border-border h-16 flex items-center px-4 justify-between">
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <div className="p-6">
              <Link href="/" className="text-2xl font-bold block mb-6">
                EDU_PORT
              </Link>
              <ul className="space-y-4">
                {user ? (
                  <>
                    <li><Link href="/dashboard">Dashboard</Link></li>
                    {user.role === "admin" && <li><Link href="/dashboard/users">Users</Link></li>}
                    {user.role !== "admin" && <li><Link href="/dashboard/courses">Courses</Link></li>}
                    <li><Link href="/dashboard/profile">Profile</Link></li>
                    {user.role === "lecturer" && <li><Link href="/dashboard/courses/new">Create Course</Link></li>}
                    <li><Button variant="outline" onClick={logout} className="w-full">Logout</Button></li>
                  </>
                ) : (
                  <>
                    <li><Link href="/login">Login</Link></li>
                    <li><Link href="/register">Register</Link></li>
                  </>
                )}
              </ul>
            </div>
          </SheetContent>
        </Sheet>
        <Link href="/" className="text-2xl font-bold hidden md:block">
          EDU_PORT
        </Link>
      </div>
      <ul className="hidden md:flex gap-6 items-center">
        {user ? (
          <>
            <li><Link href="/dashboard" className="hover:underline">Dashboard</Link></li>
            {user.role === "admin" && <li><Link href="/dashboard/users" className="hover:underline">Users</Link></li>}
            {user.role !== "admin" && <li><Link href="/dashboard/courses" className="hover:underline">Courses</Link></li>}
            <li><Link href="/dashboard/profile" className="hover:underline">Profile</Link></li>
            {user.role === "lecturer" && <li><Link href="/dashboard/courses/new" className="hover:underline">Create Course</Link></li>}
            <li><Button variant="outline" onClick={logout}>Logout</Button></li>
          </>
        ) : (
          <>
            <li><Link href="/login" className="hover:underline">Login</Link></li>
            <li><Link href="/register" className="hover:underline">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
} 