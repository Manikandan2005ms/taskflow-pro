import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Course } from "@/types/course";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { courseService } from "@/services/course.service";
import { useApiError } from "@/hooks/useApiError";
import { toast } from "react-toastify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EditCoursePage() {
  const { user } = useAuth();
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    courseCode: "",
    description: "",
    lecturer: user!._id,
  });
  const { error, handleError, clearError } = useApiError();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await courseService.getCourseById(id as string);
        const courseData = response.data;

        setCourse(courseData);
        setFormData((prevData) => ({
          ...prevData,
          title: courseData?.title,
          courseCode: courseData?.courseCode,
          description: courseData?.description,
        }));
      } catch (err) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, handleError]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setLoading(true);

    try {
      const response = await courseService.updateCourse(id as string, formData);
      console.log("Updated Course Data:", response);
      router.push(`/dashboard/courses/${id}`);
      toast.success("Course has been successfully edited!");
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <Card className="p-8 text-center">
        <CardContent>
          <p className="text-lg text-muted-foreground">Course not found.</p>
          <Button asChild className="mt-4">
            <Link href="/dashboard/courses">Back to Courses</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Edit Course Information</CardTitle>
          <p className="text-muted-foreground">Update your course details</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-destructive/10 text-destructive p-3 rounded-md text-center">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Course Title
              </label>
              <Input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="courseCode" className="block text-sm font-medium mb-1">
                Course Code
              </label>
              <Input
                id="courseCode"
                name="courseCode"
                type="text"
                value={formData.courseCode}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                className="w-full border border-input rounded-md p-2 resize-none"
                required
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button asChild variant="outline">
                <Link href={`/dashboard/courses/${id}`}>Cancel</Link>
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 