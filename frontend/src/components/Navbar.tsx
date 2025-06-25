"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { 
  LayoutDashboard, 
  Users, 
  FolderKanban, 
  UserCircle, 
  PlusCircle, 
  LogOut,
  LogIn,
  UserPlus,
  Workflow
} from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-slate-800 via-purple-800 to-slate-800 text-white h-16 mx-auto flex justify-between items-center w-full px-8 shadow-2xl border-b border-purple-600/30">
      <Link href="/" className="flex items-center space-x-3 text-2xl font-bold tracking-tight">
        <div className="inline-block w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
          <Workflow className="w-6 h-6 text-white" />
        </div>
        <span className="ml-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          TaskFlow Pro
        </span>
      </Link>
      
      <ul className="flex space-x-8 text-sm font-medium">
        {user ? (
          <>
            <li>
              <Link href="/dashboard" className="flex items-center space-x-2 hover:text-purple-300 transition-colors duration-200 group">
                <LayoutDashboard className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Dashboard</span>
              </Link>
            </li>
            {user.role === "admin" && (
              <li>
                <Link href="/dashboard/users" className="flex items-center space-x-2 hover:text-purple-300 transition-colors duration-200 group">
                  <Users className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Team</span>
                </Link>
              </li>
            )}
            {user.role !== "admin" && (
              <li>
                <Link href="/dashboard/courses" className="flex items-center space-x-2 hover:text-purple-300 transition-colors duration-200 group">
                  <FolderKanban className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Projects</span>
                </Link>
              </li>
            )}
            <li>
              <Link href="/dashboard/profile" className="flex items-center space-x-2 hover:text-purple-300 transition-colors duration-200 group">
                <UserCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Profile</span>
              </Link>
            </li>
            {user.role === "lecturer" && (
              <li>
                <Link href="/dashboard/courses/new" className="flex items-center space-x-2 hover:text-purple-300 transition-colors duration-200 group">
                  <PlusCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>New Project</span>
                </Link>
              </li>
            )}
            <li>
              <button 
                onClick={logout} 
                className="flex items-center space-x-2 hover:text-red-300 transition-colors duration-200 group"
              >
                <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Logout</span>
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login" className="flex items-center space-x-2 hover:text-purple-300 transition-colors duration-200 group">
                <LogIn className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Login</span>
              </Link>
            </li>
            <li>
              <Link href="/register" className="flex items-center space-x-2 hover:text-purple-300 transition-colors duration-200 group">
                <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Register</span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
