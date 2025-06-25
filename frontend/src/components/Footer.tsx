"use client";

import { Workflow, Github, Twitter, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white border-t border-slate-700">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Workflow className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                TaskFlow Pro
              </span>
            </div>
            <p className="text-slate-300 mb-6 max-w-md">
              Streamline your project management with our powerful collaboration platform. 
              Built for modern teams who want to deliver exceptional results.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-slate-400 hover:text-purple-400 transition-colors">
                <Github className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-purple-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-purple-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-purple-400 transition-colors">
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Product</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-slate-300 hover:text-purple-400 transition-colors">Features</Link></li>
              <li><Link href="#" className="text-slate-300 hover:text-purple-400 transition-colors">Pricing</Link></li>
              <li><Link href="#" className="text-slate-300 hover:text-purple-400 transition-colors">Integrations</Link></li>
              <li><Link href="#" className="text-slate-300 hover:text-purple-400 transition-colors">API</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-slate-300 hover:text-purple-400 transition-colors">About</Link></li>
              <li><Link href="#" className="text-slate-300 hover:text-purple-400 transition-colors">Blog</Link></li>
              <li><Link href="#" className="text-slate-300 hover:text-purple-400 transition-colors">Careers</Link></li>
              <li><Link href="#" className="text-slate-300 hover:text-purple-400 transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} TaskFlow Pro. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-slate-400 hover:text-purple-400 transition-colors text-sm">Privacy Policy</Link>
            <Link href="#" className="text-slate-400 hover:text-purple-400 transition-colors text-sm">Terms of Service</Link>
            <Link href="#" className="text-slate-400 hover:text-purple-400 transition-colors text-sm">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
