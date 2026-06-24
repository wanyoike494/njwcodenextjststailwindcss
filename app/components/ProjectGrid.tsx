"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { PROJECTS } from "@/lib/projects";
import type { Tag } from "@/lib/projects";
import ProjectCard from "./ProjectCard";

const ALL_TAGS: Tag[] = ["JavaScript", "CSS", "Canvas", "API", "Promise", "Animation"];

export default function ProjectGrid() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<Tag | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return PROJECTS.filter((p) => {
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      const matchesTag = !activeTag || p.tags.includes(activeTag);
      return matchesQuery && matchesTag;
    });
  }, [query, activeTag]);

  return (
    <div>
      {/* Search bar */}
      <div className="relative max-w-xl mx-auto mb-8">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={18}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects…"
              aria-label="Search projects"
              className="w-full pl-11 pr-10 py-3.5 rounded-xl border-2 border-gray-200 focus:border-indigo-400 focus:outline-none text-gray-800 placeholder-gray-400 bg-white text-sm transition-colors duration-200 shadow-sm"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <button
            onClick={() => {}}
            className="px-6 py-3.5 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white font-semibold rounded-xl transition-colors duration-200 shadow-sm text-sm flex items-center gap-2"
          >
            <Search size={16} />
            Search
          </button>
        </div>
      </div>

      {/* Tag filters */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        <button
          onClick={() => setActiveTag(null)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
            activeTag === null
              ? "bg-indigo-500 text-white border-indigo-500 shadow-sm"
              : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:text-indigo-500"
          }`}
        >
          All
        </button>
        {ALL_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
              activeTag === tag
                ? "bg-indigo-500 text-white border-indigo-500 shadow-sm"
                : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:text-indigo-500"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <span className="text-5xl mb-4 block">🔍</span>
          <p className="text-gray-500 text-lg font-medium">No projects found.</p>
          <p className="text-gray-400 text-sm mt-1">Try a different search or filter.</p>
          <button
            onClick={() => { setQuery(""); setActiveTag(null); }}
            className="mt-4 text-indigo-500 hover:text-indigo-600 text-sm font-medium underline underline-offset-2"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Result count */}
      {(query || activeTag) && filtered.length > 0 && (
        <p className="text-center text-sm text-gray-400 mt-8">
          Showing {filtered.length} of {PROJECTS.length} projects
        </p>
      )}
    </div>
  );
}
