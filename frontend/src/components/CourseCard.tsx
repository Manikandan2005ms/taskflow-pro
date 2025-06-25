"use client";
import { useAuth } from "@/context/AuthContext";
import { Course } from "@/types/course";
import Link from "next/link";
import { 
  Users, 
  FileText, 
  Calendar, 
  ArrowRight,
  Clock,
  CheckCircle,
  Target
} from "lucide-react";

interface ActionButton {
  label: string;
  action?: string;
  onClick?: () => void;
}

interface CourseCardProps {
  course: Course;
  actionButton: ActionButton;
}

export default function CourseCard({ course, actionButton }: CourseCardProps) {
  const { user } = useAuth();

  // Mock data for project management features
  const projectStats = {
    progress: Math.floor(Math.random() * 100),
    tasks: Math.floor(Math.random() * 20) + 5,
    completedTasks: Math.floor(Math.random() * 15) + 2,
    dueDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 hover:border-purple-500 transition-all duration-300 p-6 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">
            {course.title}
          </h3>
          <p className="text-slate-400 text-sm font-medium">
            Project ID: {course.courseCode}
          </p>
        </div>
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowRight className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* Description */}
      <p className="text-slate-300 text-sm mb-6 line-clamp-2">
        {course.description}
      </p>

      {/* Project Manager Info */}
      {user?.role !== "lecturer" && (
        <div className="mb-4 p-3 bg-slate-700/50 rounded-xl">
          <p className="text-slate-400 text-xs font-medium mb-1">Project Manager</p>
          <p className="text-white text-sm font-medium">
            {course.lecturer
              ? typeof course.lecturer === "string"
                ? "N/A"
                : course.lecturer.name
              : "N/A"}
          </p>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-slate-400" />
          <div>
            <p className="text-white text-sm font-semibold">
              {Array.isArray(course.students) ? course.students.length : 0}
            </p>
            <p className="text-slate-400 text-xs">Team Members</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <FileText className="w-4 h-4 text-slate-400" />
          <div>
            <p className="text-white text-sm font-semibold">
              {Array.isArray(course.materials) ? course.materials.length : 0}
            </p>
            <p className="text-slate-400 text-xs">Documents</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Target className="w-4 h-4 text-slate-400" />
          <div>
            <p className="text-white text-sm font-semibold">{projectStats.tasks}</p>
            <p className="text-slate-400 text-xs">Total Tasks</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-slate-400" />
          <div>
            <p className="text-white text-sm font-semibold">{projectStats.completedTasks}</p>
            <p className="text-slate-400 text-xs">Completed</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-400 text-xs font-medium">Progress</span>
          <span className="text-white text-xs font-semibold">{projectStats.progress}%</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${projectStats.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Due Date */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span className="text-slate-400 text-xs">Due: {projectStats.dueDate}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-slate-400" />
          <span className="text-slate-400 text-xs">
            {Math.ceil((new Date(projectStats.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days left
          </span>
        </div>
      </div>

      {/* Action Button */}
      {actionButton.action ? (
        <Link
          href={actionButton.action}
          className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-sm font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105"
        >
          {actionButton.label}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      ) : (
        user?.role === "student" && (
          <button
            onClick={actionButton.onClick}
            className={`w-full flex items-center justify-center px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 transform hover:scale-105 ${
              actionButton.label === "Enroll" 
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700" 
                : "bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-700 hover:to-pink-700"
            }`}
          >
            {actionButton.label}
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        )
      )}
    </div>
  );
}
