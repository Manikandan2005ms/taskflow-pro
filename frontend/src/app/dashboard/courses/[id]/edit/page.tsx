"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Course } from "@/types/course";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { courseService } from "@/services/course.service";
import { useApiError } from "@/hooks/useApiError";
import { toast } from "react-toastify";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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
      // Redirect to the course details page after saving
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-12 rounded-2xl shadow-xl text-center">
        <p className="text-xl text-purple-700 font-medium">Course not found.</p>
        <Link
          href="/dashboard/courses"
          className="btn-primary mt-6 inline-block px-8 py-4 rounded-xl text-lg shadow-lg"
        >
          Back to Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white p-10 rounded-2xl shadow-2xl border-4 border-transparent bg-clip-padding max-w-2xl mx-auto" style={{ borderImage: 'linear-gradient(90deg, #3b82f6, #a21caf, #ec4899) 1' }}>
      <h1 className="text-4xl font-extrabold text-blue-700 mb-8">Edit Course Information</h1>
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg font-semibold text-center border border-red-300 mb-6">
            {error}
          </div>
        )}
        <div className="mb-6">
          <label className="form-label" htmlFor="title">
            Course Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-input mt-2"
            required
          />
        </div>
        <div className="mb-6">
          <label className="form-label" htmlFor="courseCode">
            Course Code
          </label>
          <input
            type="text"
            id="courseCode"
            name="courseCode"
            value={formData.courseCode}
            onChange={handleChange}
            className="form-input mt-2"
            required
          />
        </div>
        <div className="mb-8">
          <label className="form-label" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-input mt-2 min-h-[120px]"
            required
          />
        </div>
        <button
          type="submit"
          className="btn-primary px-8 py-4 rounded-xl text-lg shadow-lg mt-4"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
