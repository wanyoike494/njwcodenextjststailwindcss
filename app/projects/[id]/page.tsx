import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PROJECTS } from "@/lib/projects";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Import components
import DigitalClock from "@/app/components/projects/DigitalClock";
import PaperRockScissors from "@/app/components/projects/PaperRockScissors";
import Calculator from "@/app/components/projects/Calculator";
import DiceRoller from "@/app/components/projects/DiceRoller";
import TemperatureConverter from "@/app/components/projects/TemperatureConverter";
import SnakeGame from "@/app/components/projects/SnakeGame";
import AnalogWatch from "@/app/components/projects/AnalogWatch";
import InternetSpeedTest from "@/app/components/projects/InternetSpeedTest";

// Component mapping
const COMPONENT_MAP: Record<string, React.ComponentType> = {
  "digital-clock": DigitalClock,
  "paper-rock-scissors": PaperRockScissors,
  "calculator": Calculator,
  "dice-roller": DiceRoller,
  "temperature-converter": TemperatureConverter,
  "snake-game": SnakeGame,
  "analog-watch": AnalogWatch,
  "internet-speed-test": InternetSpeedTest,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === id);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} — NJW Code`,
    description: project.longDescription || project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  const ActiveComponent = COMPONENT_MAP[id];

  if (!ActiveComponent) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-50 via-indigo-50 to-pink-50">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center">
        {/* Navigation & Info */}
        <div className="w-full max-w-3xl mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Link
            id="back-dashboard-btn"
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors group self-start"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>

          <div className="flex flex-col sm:text-right">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              {project.title}
            </h1>
            <p className="text-gray-500 text-sm mt-1 max-w-md">
              {project.description}
            </p>
          </div>
        </div>

        {/* Dynamic Project Container */}
        <div className="w-full max-w-3xl bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden p-6 sm:p-8">
          <ActiveComponent />
        </div>
      </main>

      <Footer />
    </div>
  );
}
