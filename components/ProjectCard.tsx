import { LANGUAGE_COLORS } from "@/utils/languageColor";
import Link from "next/link";
import { ReactNode } from "react";

interface ProjectCardProps {
  project: {
    $id: string;
    title: string;
    description: string;
    technologies: string;
    githubUrl: string;
    demoUrl?: string;
    $createdAt: string;
    user_id?: string;
  };
  actionMenu?: ReactNode; //  Component  Slot
}

export default function ProjectCard({ project, actionMenu }: ProjectCardProps) {
  const match = project.githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
  const owner = match ? match[1] : "github";
  const repo = match ? match[2].replace(".git", "") : "unknown";

  const ogImageUrl = `https://opengraph.githubassets.com/1/${owner}/${repo}`;
  const avatarUrl = `https://github.com/${owner}.png`;

  const techArray = project.technologies
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const topTechs = techArray.slice(0, 3);
  const extraTechs = techArray.length > 3 ? `+${techArray.length - 3}` : "";

  return (
    <div className="group relative flex flex-col bg-base-100/40 backdrop-blur-sm border border-base-content/10 rounded-2xl overflow-hidden transition-colors duration-500 hover:border-primary/40 hover:bg-base-100/60 h-full">
      <Link
        href={`/project/${project.$id}`}
        className="absolute inset-0 z-20"
        aria-label={`View ${project.title} details`}
      />

      <div className="relative h-44 w-full overflow-hidden border-b border-base-content/10 bg-base-300 shrink-0">
        <div className="absolute inset-0 bg-linear-to-t from-base-100/80 to-transparent z-10" />

        <img
          src={ogImageUrl}
          alt={project.title}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
          loading="lazy"
        />

        <div className="absolute bottom-3 left-4 z-20 flex items-center gap-2">
          <img
            src={avatarUrl}
            alt={owner}
            className="w-7 h-7 rounded-full ring-2 ring-base-100 bg-base-300"
          />
          <span className="text-xs font-mono text-base-content/90 drop-shadow-md bg-base-100/50 px-2 py-0.5 rounded-full backdrop-blur-md">
            {owner}
          </span>
        </div>

        {/*  SLOT PATTERN */}
        {actionMenu && (
          <div className="absolute top-3 right-3 z-30">{actionMenu}</div>
        )}
      </div>

      <div className="p-5 flex flex-col grow relative z-30 pointer-events-none">
        <h3 className="text-base font-bold text-base-content tracking-tight line-clamp-1 mb-1">
          {project.title}
        </h3>
        <p className="text-sm text-base-content/60 line-clamp-2 leading-relaxed grow">
          {project.description}
        </p>

        <div className="mt-auto pt-4 border-t border-base-content/10 flex items-center justify-between gap-2 pointer-events-auto">
          <div className="flex items-center gap-3 overflow-hidden mr-2">
            {topTechs.map((tech) => (
              <div key={tech} className="flex items-center gap-1.5 shrink-0">
                <span
                  className="w-2 h-2 rounded-full shadow-sm"
                  style={{
                    backgroundColor: LANGUAGE_COLORS[tech] || "#8b949e",
                  }}
                />
                <span className="text-[11px] font-mono text-base-content/70 whitespace-nowrap">
                  {tech}
                </span>
              </div>
            ))}
            {extraTechs && (
              <span className="text-[11px] font-mono text-base-content/40 shrink-0 whitespace-nowrap">
                {extraTechs}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href={project.githubUrl}
              target="_blank"
              className="text-base-content/40 hover:text-base-content transition-colors"
              title="GitHub Source"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </Link>
            {project.demoUrl && (
              <Link
                href={project.demoUrl}
                target="_blank"
                className="text-primary/70 hover:text-primary transition-colors"
                title="Live Demo"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
