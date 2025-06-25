import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import CourseCard from "@/components/CourseCard";
import { Course } from "@/types/course";
import { courseService } from "../../services/course.service";
import Link from "next/link";
import { useApiError } from "@/hooks/useApiError";
import { toast } from "react-toastify";

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

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Welcome, {user?.name}</h1>
          <p className="text-muted-foreground">Here's an overview of your courses</p>
        </div>
        {user?.role === "lecturer" && (
          <Button asChild>
            <Link href="/dashboard/courses/new">Create New Course</Link>
          </Button>
        )}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold">{courses.length}</span>
          </CardContent>
        </Card>
        {/* Add more stat cards here if needed */}
      </div>

      <h2 className="text-2xl font-semibold mb-4">My Courses</h2>

      {loading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
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
                label: "View Course",
                action: `/dashboard/courses/${course._id}`,
              }}
            />
          ))}
        </div>
      ) : (
        <Card className="p-8 text-center">
          <CardContent>
            {user?.role === "student" ? (
              <>
                <p className="text-lg text-muted-foreground mb-8">
                  You haven't been assigned to any courses yet.
                </p>
                <Button asChild>
                  <Link href="/dashboard/courses/">Browse Available Courses</Link>
                </Button>
              </>
            ) : user?.role === "lecturer" ? (
              <p className="text-lg text-muted-foreground mb-8">
                You haven't created any courses yet.
              </p>
            ) : user?.role === "admin" ? (
              <p className="text-lg text-muted-foreground mb-8">
                There are no courses created yet.
              </p>
            ) : null}
          </CardContent>
        </Card>
      )}
    </div>
  );
} 