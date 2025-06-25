"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 text-purple-400 animate-spin" />
          <p className="text-slate-300 text-lg font-medium">Loading TaskFlow Pro...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen">
      {/* <Sidebar /> */}
      <div className="flex-1 p-6 md:p-8 overflow-y-auto">{children}</div>
    </div>
  );
}
