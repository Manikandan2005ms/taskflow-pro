import Link from "next/link";
import { 
  Workflow, 
  Users, 
  BarChart3, 
  CheckCircle, 
  ArrowRight,
  Zap
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30px_30px,rgba(156,146,172,0.1)_2px,transparent_0)] bg-[length:60px_60px]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 rounded-full text-purple-300 text-sm font-medium mb-6">
                <Zap className="w-4 h-4 mr-2" />
                Streamline Your Workflow
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-8 max-w-3xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Project Management Made Simple
              </h1>
              <p className="text-xl mb-10 max-w-xl font-medium text-slate-300">
                TaskFlow Pro combines powerful project management tools with real-time collaboration to help your team deliver exceptional results.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link
                  href="/register"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-lg font-semibold shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center px-8 py-4 border-2 border-purple-500 text-purple-300 rounded-xl text-lg font-semibold hover:bg-purple-500 hover:text-white transition-all duration-200"
                >
                  Sign In
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="w-96 h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-500/30 backdrop-blur-sm flex items-center justify-center">
                  <Workflow className="w-32 h-32 text-purple-400" />
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Users className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Why Choose <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">TaskFlow Pro</span>?
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Everything you need to manage projects, collaborate with your team, and deliver results on time.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-700 p-8 rounded-2xl border border-slate-600 hover:border-purple-500 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Workflow className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Smart Project Management</h3>
              <p className="text-slate-300 leading-relaxed">
                Create, organize, and track projects with our intuitive Kanban boards and advanced task management system.
              </p>
            </div>
            <div className="bg-slate-700 p-8 rounded-2xl border border-slate-600 hover:border-purple-500 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Team Collaboration</h3>
              <p className="text-slate-300 leading-relaxed">
                Real-time messaging, file sharing, and seamless team coordination to keep everyone on the same page.
              </p>
            </div>
            <div className="bg-slate-700 p-8 rounded-2xl border border-slate-600 hover:border-purple-500 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Advanced Analytics</h3>
              <p className="text-slate-300 leading-relaxed">
                Track progress, measure performance, and gain insights with comprehensive analytics and reporting tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-purple-900 to-pink-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">10K+</div>
              <div className="text-purple-300">Active Teams</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">50K+</div>
              <div className="text-purple-300">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">99.9%</div>
              <div className="text-purple-300">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-purple-300">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8 text-white">
            Ready to transform your project management?
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto text-slate-400">
            Join thousands of teams already using TaskFlow Pro to streamline their workflows and boost productivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-xl font-semibold shadow-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-6 h-6" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center px-10 py-5 border-2 border-purple-500 text-purple-300 rounded-xl text-xl font-semibold hover:bg-purple-500 hover:text-white transition-all duration-200"
            >
              Sign In Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
