import Link from "next/link";
import Image from "next/image";
import UniOfIbadan from "@/assets/images/university-of-ibadan.png";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-accent text-white py-24">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 max-w-3xl drop-shadow-lg">
              Welcome to <span className="text-accent-foreground">EDU_PORT</span>
            </h1>
            <p className="text-xl mb-8 max-w-xl">
              Connect, learn, and grow with EDU_PORT - the ultimate
              platform for students and lecturers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link href="/register">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <Image
              src={UniOfIbadan}
              alt="EDU_PORT Platform"
              width={500}
              height={350}
              className="rounded-xl shadow-2xl border-4 border-white"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose EDU_PORT?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardHeader>
                <CardTitle>Comprehensive Course Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Easily access and manage course materials for all your classes in one place.
                </p>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardHeader>
                <CardTitle>Role-Based Access</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Specifically designed interfaces for both students and lecturers, ensuring optimal experience.
                </p>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardHeader>
                <CardTitle>Seamless File Sharing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Upload and access course materials in any format with our flexible file management system.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to enhance your educational journey?
          </h2>
          <p className="text-xl mb-14 max-w-2xl mx-auto">
            Join thousands of students and lecturers already using EDU_PORT to streamline their educational experience.
          </p>
          <Button asChild size="lg" className="text-primary bg-white hover:bg-muted">
            <Link href="/register">Get Started Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
} 