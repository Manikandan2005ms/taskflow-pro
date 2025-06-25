import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { courseService } from "@/services/course.service";
import { useApiError } from "@/hooks/useApiError";
import { toast } from "react-toastify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CreateCoursePage() {
  const router = useRouter();
  const { user } = useAuth();
  const { error, handleError, clearError } = useApiError();
  const [formData, setFormData] = useState({
    title: "",
    courseCode: "",
    description: "",
    lecturer: user!._id,
  });
  const [loading, setLoading] = useState(false);

  // Check if user is a lecturer
  if (user?.role !== "lecturer") {
    router.push("/dashboard");
    return null;
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setLoading(true);

    try {
      const response = await courseService.createCourse(formData);
      console.log("response", response);
      toast.success("Course created successfully!");
      router.push("/dashboard");
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Course</CardTitle>
          <p className="text-muted-foreground">Set up a new course for students to enroll</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-destructive/10 text-destructive p-3 rounded-md text-center">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                  Course Title
                </label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Introduction to Computer Science"
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
                  required
                  value={formData.courseCode}
                  onChange={handleChange}
                  placeholder="e.g., CS101"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Course Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={5}
                className="w-full border border-input rounded-md p-2 resize-none"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide a detailed description of the course content and objectives"
              ></textarea>
            </div>

            <div className="flex justify-end gap-2">
              <Button asChild variant="outline">
                <Link href="/dashboard/courses">Cancel</Link>
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create Course"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 