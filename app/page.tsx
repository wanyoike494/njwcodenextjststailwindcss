import Header from "./components/Header";
import Footer from "./components/Footer";
import ProjectGrid from "./components/ProjectGrid";
import { PROJECTS } from "@/lib/projects";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-50 via-indigo-50 to-pink-50">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            {PROJECTS.length} projects and counting
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Built with code,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500">
              shared for free
            </span>
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
            A growing collection of interactive web projects — clocks, games, tools and more. Click any project to open it live.
          </p>
        </div>

        <ProjectGrid />
      </main>

      <Footer />
    </div>
  );
}
