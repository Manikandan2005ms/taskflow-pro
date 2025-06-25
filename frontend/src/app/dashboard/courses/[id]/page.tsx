"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { courseService } from "@/services/course.service";
import { materialService } from "@/services/material.service";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { formatDate } from "../../../../../utils/formatDate";
import { toast } from "react-toastify";
import { CourseWithDetails } from "@/types/course";
import { Material } from "@/types/material";
import { User } from "@/types/user";
import { useApiError } from "@/hooks/useApiError";

interface Params {
  id: string;
}

export default function CourseDetailsPage() {
  const { id } = useParams() as unknown as Params;
  const { user } = useAuth();
  const [course, setCourse] = useState<CourseWithDetails | null>(null);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [activeTab, setActiveTab] = useState("materials");
  const [students, setStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { error, handleError } = useApiError();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const courseResponse = await courseService.getCourseById(id);
        setCourse(courseResponse.data);

        const materialsResponse = await materialService.getMaterialsByCourse(
          id
        );
        setMaterials(materialsResponse.data);

        const studentsResponse = await courseService.getStudentsByCourse(id);
        setStudents(studentsResponse.data);
      } catch (err) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id, handleError]);

  const handleDeleteMaterial = async (materialId: string) => {
    try {
      await materialService.deleteMaterial(materialId);
      toast.info("Material has been successfully deleted!");
      setMaterials((prev) => prev.filter((m) => m._id !== materialId));
    } catch (err) {
      handleError(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  if (!course) {
    return (
      <div className="bg-white p-8 rounded-lg shadow text-center">
        <p className="text-lg text-gray-600">Course not found.</p>
        <Link
          href="/dashboard/courses"
          className="btn-primary mt-4 inline-block"
        >
          Back to Courses
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Course Header */}
      <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-8 rounded-2xl shadow-xl mb-8">
        <div className="flex flex-col items-start lg:flex-row gap-4 lg:gap-0 justify-between">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-4">{course?.title}</h1>

          {user?.role === "lecturer" && (
            <div className="mb-4">
              <Link
                href={`/dashboard/courses/${course._id}/edit`}
                className="btn-secondary mr-4 px-6 py-3 rounded-xl text-lg shadow-lg"
              >
                Edit Course
              </Link>
              <Link
                href={`/dashboard/courses/${course._id}/materials/upload`}
                className="btn-primary px-6 py-3 rounded-xl text-lg shadow-lg"
              >
                Upload New Material
              </Link>
            </div>
          )}
        </div>
        <div className="flex items-center text-purple-700 mb-4 text-lg font-medium">
          <span className="mr-8">Course Code: {course?.courseCode}</span>
        </div>
        <p className="text-gray-700 mb-4 text-lg">{course?.description}</p>
        <div className="flex items-center text-base text-pink-700 font-semibold">
          <span className="mr-8">
            No of Enrolled Students: {course?.students?.length || 0}
          </span>
          <span>No of Materials: {course?.materials?.length || 0}</span>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-xl">
        {/* Tabs */}
        <div className="flex border-b rounded-t-2xl overflow-hidden">
          <button
            className={`px-8 py-4 text-lg font-bold transition-colors duration-200 ${
              activeTab === "materials"
                ? "bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 text-white"
                : "text-blue-700 hover:bg-blue-50"
            }`}
            onClick={() => setActiveTab("materials")}
          >
            Course Materials
          </button>
          <button
            className={`px-8 py-4 text-lg font-bold transition-colors duration-200 ${
              activeTab === "students"
                ? "bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 text-white"
                : "text-blue-700 hover:bg-blue-50"
            }`}
            onClick={() => setActiveTab("students")}
          >
            Enrolled Students
          </button>
        </div>
        <div className="p-8">
          {/* Materials Tab */}
          {activeTab === "materials" && (
            <div>
              {materials?.length > 0 ? (
                <div className="overflow-x-auto rounded-2xl shadow-lg">
                  <table className="min-w-full divide-y divide-blue-200 rounded-2xl overflow-hidden">
                    <thead className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
                      <tr>
                        <th className="px-8 py-4 text-left text-base font-bold text-blue-700 uppercase tracking-wider">Title</th>
                        <th className="px-8 py-4 text-left text-base font-bold text-blue-700 uppercase tracking-wider">Uploaded</th>
                        <th className="px-8 py-4 text-right text-base font-bold text-blue-700 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-blue-100">
                      {materials.map((material) => (
                        <tr key={material._id}>
                          <td className="px-8 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">
                              {material.title}
                            </div>
                          </td>
                          <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">
                            {material.updatedAt &&
                              formatDate(material.updatedAt)}
                          </td>
                          <td className="px-8 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a
                              href={material.fileUrl}
                              download
                              className="text-blue-600 hover:text-blue-900 mr-4"
                            >
                              Download
                            </a>
                            {user?.role === "lecturer" && (
                              <button
                                onClick={() =>
                                  handleDeleteMaterial(material._id)
                                }
                                className="text-red-600 hover:text-red-900"
                              >
                                Delete
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center text-lg text-purple-700 font-medium py-8">
                  No materials uploaded yet.
                </div>
              )}
            </div>
          )}

          {/* Students Tab */}
          {activeTab === "students" && (
            <div>
              <h2 className="text-lg font-semibold mb-4">
                Enrolled Students ({students?.length || 0})
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {students?.length > 0 ? (
                      students.map((student) => (
                        <tr key={student._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">
                              {student.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {student.email}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <p>No Students Found</p>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
