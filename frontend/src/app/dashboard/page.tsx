"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import CourseCard from "@/components/CourseCard";
import { Course } from "@/types/course";
import { courseService } from "../../services/course.service";
import Link from "next/link";
import { useApiError } from "@/hooks/useApiError";
import { toast } from "react-toastify";
import { 
  Workflow, 
  Users, 
  CheckCircle, 
  PlusCircle,
  Target
} from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const { error, handleError } = useApiError();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        let response;
        if (user?.role === "lecturer") {
          response = await courseService.getLecturerCourses(user._id);
        } else if (user?.role === "student") {
          response = await courseService.getEnrolledCourses();
        } else if (user?.role === "admin") {
          response = await courseService.getAllCourses();
        }
        console.log("response.data", response);

        setCourses(response?.data || []);
      } catch (err) {
        handleError(err);
        toast.info(error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchCourses();
    }
  }, [user, handleError, error]);

  // Mock data for new features
  const stats = {
    totalProjects: courses.length,
    activeTasks: 24,
    completedTasks: 156,
    teamMembers: 8
  };

  const recentActivity = [
    { id: 1, action: "Project 'Website Redesign' completed", time: "2 hours ago", type: "success" },
    { id: 2, action: "New task assigned to you", time: "4 hours ago", type: "info" },
    { id: 3, action: "Team meeting scheduled", time: "1 day ago", type: "warning" },
    { id: 4, action: "Document uploaded to 'Marketing Campaign'", time: "2 days ago", type: "info" }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {user?.name} 👋
          </h1>
          <p className="text-slate-400 text-lg">
            Here&apos;s what&apos;s happening with your projects today
          </p>
        </div>

        {user?.role === "lecturer" && (
          <Link
            href="/dashboard/courses/new"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-lg font-semibold shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            New Project
          </Link>
        )}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700 hover:border-purple-500 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Total Projects</p>
              <p className="text-3xl font-bold text-white mt-1">{stats.totalProjects}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Workflow className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700 hover:border-blue-500 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Active Tasks</p>
              <p className="text-3xl font-bold text-white mt-1">{stats.activeTasks}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700 hover:border-green-500 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Completed</p>
              <p className="text-3xl font-bold text-white mt-1">{stats.completedTasks}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700 hover:border-orange-500 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Team Members</p>
              <p className="text-3xl font-bold text-white mt-1">{stats.teamMembers}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity & Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Projects Section */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">My Projects</h2>
            <Link href="/dashboard/courses" className="text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium">
              View all
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center p-16">
              <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.slice(0, 4).map((course) => (
                <CourseCard
                  key={course._id}
                  course={{
                    ...course,
                    _id: course._id,
                    courseCode: course.courseCode,
                    students: course.students,
                    materials: course.materials,
                    lecturer: course.lecturer,
                  }}
                  actionButton={{
                    label: "View Project",
                    action: `/dashboard/courses/${course._id}`,
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="bg-slate-800/50 backdrop-blur-sm p-12 rounded-2xl border border-slate-700 text-center">
              {user?.role === "student" ? (
                <div>
                  <Workflow className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <p className="text-xl text-slate-300 mb-4 font-medium">
                    No projects assigned yet
                  </p>
                  <p className="text-slate-400 mb-6">
                    You haven&apos;t been assigned to any projects yet. Check back later or contact your project manager.
                  </p>
                </div>
              ) : user?.role === "lecturer" ? (
                <div>
                  <Workflow className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <p className="text-xl text-slate-300 mb-4 font-medium">
                    No projects created yet
                  </p>
                  <p className="text-slate-400 mb-6">
                    Start by creating your first project to organize your team and tasks.
                  </p>
                  <Link
                    href="/dashboard/courses/new"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
                  >
                    <PlusCircle className="w-5 h-5 mr-2" />
                    Create First Project
                  </Link>
                </div>
              ) : (
                <div>
                  <Workflow className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <p className="text-xl text-slate-300 mb-4 font-medium">
                    No projects in the system
                  </p>
                  <p className="text-slate-400">
                    There are no projects created in the system yet.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'success' ? 'bg-green-500' :
                    activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-slate-300 text-sm">{activity.action}</p>
                    <p className="text-slate-500 text-xs mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-slate-700">
              <Link href="#" className="text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium">
                View all activity
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
