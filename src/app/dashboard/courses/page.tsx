import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { courseService } from "@/services/course.service";
import { useApiError } from "@/hooks/useApiError";
import { useEffect } from "react";
import { Course } from "@/types/course";
import CourseCard from "@/components/CourseCard";

export default function CoursesPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const { error, handleError } = useApiError();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await courseService.getAllCourses();
        setCourses(response.data || []);
      } catch (err) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [handleError]);

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.lecturer?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">All Courses</h1>
          <p className="text-muted-foreground">Browse and enroll in available courses</p>
        </div>
        {user?.role === "lecturer" && (
          <Button asChild>
            <Link href="/dashboard/courses/new">Create New Course</Link>
          </Button>
        )}
      </div>
      <Card className="mb-6">
        <CardContent className="p-4">
          <Input
            type="text"
            placeholder="Search courses by title, code, or lecturer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </CardContent>
      </Card>
      {loading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
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
            <p className="text-lg text-muted-foreground mb-8">
              No courses found.
            </p>
            {user?.role === "lecturer" && (
              <Button asChild>
                <Link href="/dashboard/courses/new">Create New Course</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
} 