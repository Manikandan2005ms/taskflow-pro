/* eslint-disable @next/next/no-sync-scripts */

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins"
});

export const metadata: Metadata = {
  title: "TaskFlow Pro - Modern Project Management Platform",
  description:
    "TaskFlow Pro: A powerful project management and team collaboration platform designed to streamline workflows and enhance productivity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
      </head>
      <body className={`${poppins.variable} font-poppins`}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <Navbar />
            <main className="flex-grow bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 justify-center items-center p-6">
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
        <ToastContainer 
          position="top-right"
          theme="dark"
          toastStyle={{
            backgroundColor: '#1e293b',
            color: '#f1f5f9'
          }}
        />
      </body>
    </html>
  );
}
