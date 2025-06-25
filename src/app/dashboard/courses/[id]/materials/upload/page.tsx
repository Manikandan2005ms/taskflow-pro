import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { materialService } from "@/services/material.service";
import { toast } from "react-toastify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

      const response = await materialService.uploadMaterial(id, data);
      console.log(response);

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
    <div className="max-w-2xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Upload Course Material</CardTitle>
          <p className="text-muted-foreground">Add a new learning resource for your course</p>
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
                Material Title
              </label>
              <Input
                id="title"
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Week 1 Lecture Notes"
              />
            </div>

            <div>
              <label htmlFor="file" className="block text-sm font-medium mb-1">
                Upload File
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-muted-foreground/25 rounded-md hover:border-primary/50 transition-colors">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-muted-foreground"
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
                  <div className="flex text-sm text-muted-foreground">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-background rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none"
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
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    PDF, PPT, DOC, ZIP up to 10MB
                  </p>
                  {file && (
                    <p className="text-sm text-green-600 mt-2">
                      Selected: {file.name} (
                      {(file.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button asChild variant="outline">
                <Link href={`/dashboard/courses/${id}`}>Cancel</Link>
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Uploading..." : "Upload Material"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 