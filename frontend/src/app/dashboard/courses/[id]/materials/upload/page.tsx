"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { materialService } from "@/services/material.service";
import { toast } from "react-toastify";

export default function UploadMaterialPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Check if user is a lecturer
  if (user?.role === "student") {
    router.push("/dashboard");
    return null;
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...(prev || {}), [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!file) {
      setError("Please select a file to upload.");
      setLoading(false);
      return;
    }

    try {
      const data = {
        title: formData.title,
        courseId: id,
        file: file,
        uploadedBy: user?._id,
        uploadedAt: Date(),
      };

      // Call the uploadMaterial service
      const response = await materialService.uploadMaterial(id, data);
      console.log(response);

      // Redirect to the course materials page after successful upload
      router.push(`/dashboard/courses/${id}`);
      toast.success("Material has been successfully uploaded!");
    } catch (err) {
      setError("Failed to upload material. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-2">Upload Course Material</h1>
        <p className="text-lg text-purple-700 font-medium">Add a new learning resource for this course</p>
      </div>
      <div className="bg-white rounded-2xl shadow-2xl border-4 border-transparent bg-clip-padding p-10 max-w-2xl mx-auto" style={{ borderImage: 'linear-gradient(90deg, #3b82f6, #a21caf, #ec4899) 1' }}>
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg font-semibold text-center border border-red-300 mb-6">
              {error}
            </div>
          )}
          <div className="mb-8">
            <label htmlFor="title" className="form-label">
              Material Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              className="form-input mt-2"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Week 1 Lecture Notes"
            />
          </div>
          <div className="mb-10">
            <label htmlFor="file" className="form-label">
              Upload File
            </label>
            <div className="mt-2 flex justify-center px-6 pt-8 pb-8 border-2 border-dashed border-blue-300 rounded-2xl bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
              <div className="space-y-2 text-center w-full">
                <svg
                  className="mx-auto h-14 w-14 text-blue-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-base text-blue-700 justify-center items-center gap-2">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-lg font-bold text-blue-700 hover:text-pink-600 focus-within:outline-none"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                  </label>
                  <span>or drag and drop</span>
                </div>
                <p className="text-xs text-blue-400">
                  PDF, PPT, DOC, ZIP up to 10MB
                </p>
                {file && (
                  <p className="text-base text-green-600 mt-2 font-semibold">
                    Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <Link
              href={`/dashboard/courses/${id}`}
              className="btn-secondary px-6 py-3 rounded-xl text-lg shadow-lg"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary px-8 py-4 rounded-xl text-lg shadow-lg"
            >
              {loading ? "Uploading..." : "Upload Material"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
