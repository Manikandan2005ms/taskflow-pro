import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EDU_PORT - Learning Management System",
  description:
    "EDU_PORT: A platform for students and lecturers to connect and share course materials",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-background text-foreground min-h-screen flex flex-col"}>
        <AuthProvider>
          <Navbar />
          <main className="flex-1 flex flex-col bg-muted/50">
            {children}
          </main>
          <Footer />
        </AuthProvider>
        <ToastContainer />
      </body>
    </html>
  );
} 