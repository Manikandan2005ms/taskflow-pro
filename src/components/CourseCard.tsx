import Link from "next/link";
import { Course } from "@/types/course";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CourseCardProps {
  course: Course;
  actionButton?: {
    label: string;
    action?: string;
    onClick?: () => void;
  };
}

export default function CourseCard({ course, actionButton }: CourseCardProps) {
  const lecturerName =
    typeof course.lecturer === "object" && course.lecturer
      ? course.lecturer.name
      : "Unknown Lecturer";

  const handleAction = () => {
    if (actionButton?.onClick) {
      actionButton.onClick();
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg font-semibold mb-2">{course.title}</CardTitle>
        <div className="text-sm text-muted-foreground space-y-1">
          <p>Code: {course.courseCode}</p>
          <p>Lecturer: {lecturerName}</p>
          <p>Students: {course.students?.length || 0}</p>
          <p>Materials: {course.materials?.length || 0}</p>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-end">
        {actionButton && (
          <div className="mt-4">
            {actionButton.action ? (
              <Button asChild className="w-full">
                <Link href={actionButton.action}>{actionButton.label}</Link>
              </Button>
            ) : (
              <Button onClick={handleAction} className="w-full">
                {actionButton.label}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 