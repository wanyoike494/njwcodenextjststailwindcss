import { ArrowRight, Tag } from "lucide-react";
import type { Project } from "@/lib/projects";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const TAG_COLORS: Record<string, string> = {
  JavaScript: "bg-yellow-100 text-yellow-700 border-yellow-200",
  CSS: "bg-blue-100 text-blue-700 border-blue-200",
  Canvas: "bg-orange-100 text-orange-700 border-orange-200",
  API: "bg-green-100 text-green-700 border-green-200",
  Promise: "bg-purple-100 text-purple-700 border-purple-200",
  Animation: "bg-pink-100 text-pink-700 border-pink-200",
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl card-hover border border-gray-100 flex flex-col animate-fade-in-up"
      style={{ animationDelay: `${index * 60}ms`, opacity: 0 }}
    >
      {/* Preview area */}
      <Link
        href={project.href}
        className="block relative overflow-hidden"
        aria-label={`Open ${project.title}`}
      >
        <div
          className={`${project.previewBg} h-48 flex items-center justify-center relative`}
        >
          <div
            className={`bg-gradient-to-br ${project.gradient} w-full h-full absolute inset-0 opacity-60`}
          />
          <span
            className="relative z-10 text-7xl animate-float select-none"
            role="img"
            aria-hidden="true"
          >
            {project.emoji}
          </span>
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center z-20">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 text-gray-800 text-sm font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 shadow-lg">
              <ArrowRight size={14} />
              Open project
            </span>
          </div>
        </div>
      </Link>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-lg mb-1.5 leading-tight">
          <Link
            href={project.href}
            className="hover:text-indigo-600 transition-colors duration-200"
          >
            {project.title}
          </Link>
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${TAG_COLORS[tag] ?? "bg-gray-100 text-gray-600"}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
