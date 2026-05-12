// app/(protected)/project/[id]/page.tsx
import { getProjectById } from "@/lib/actions/project.action";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SeasonalBanner from "@/components/SeasonalBanner";

// Form GitHub API Get README Function (With Next.js Caching)
async function getReadmeContent(githubUrl: string) {
  const match = githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return null;

  const owner = match[1];
  const repo = match[2].replace(".git", "");

  try {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/readme`,
      {
        headers: {
          Accept: "application/vnd.github.v3.raw", // Raw Markdown
        },
        next: { revalidate: 3600 }, // (Rate Limit After 1hr request to Github)
      },
    );

    if (!res.ok) return null; // 404 (README) null
    return await res.text();
  } catch (error) {
    return null;
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>; 
}) {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) notFound(); 

  // 2. Get README from github
  const readmeContent = await getReadmeContent(project.githubUrl);

  const match = project.githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
  const owner = match ? match[1] : "github";
  const avatarUrl = `https://github.com/${owner}.png`;
  const techArray = project.technologies
    .split(",")
    .map((t: string) => t.trim())
    .filter(Boolean);

  return (
    <div className="w-full animate-fade-in-up pb-24">
      {/* 1. Interactive Hero Banner Section (Seasonal) */}
      <div className="w-full h-64 md:h-80 relative overflow-hidden bg-base-200">
        <SeasonalBanner />

        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-linear-to-t from-base-100 via-base-100/40 to-transparent z-10" />

        {/* Hero Content */}
        <div className="absolute inset-0 z-20 max-w-5xl mx-auto px-6 md:px-12 flex flex-col justify-end pb-10">
          <Link
            href="/dashboard"
            className="group flex items-center gap-2 mb-6 text-xs font-mono text-base-content/40 hover:text-primary transition-colors uppercase tracking-[0.2em]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-3 h-3 group-hover:-translate-x-1 transition-transform"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Back_to_Vault
          </Link>

          <h1 className="text-4xl md:text-6xl font-black text-base-content tracking-tighter mb-4 leading-none">
            {project.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 bg-base-100/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-base-content/5">
              <img
                src={avatarUrl}
                alt={owner}
                className="w-5 h-5 rounded-full"
              />
              <span className="text-xs font-mono font-bold text-base-content/70">
                @{owner}
              </span>
            </div>
            <div className="h-4 w-px bg-base-content/10 hidden md:block" />
            <div className="flex gap-2">
              {techArray.map((tech: string) => (
                <span
                  key={tech}
                  className="text-[10px] font-mono font-bold px-2 py-0.5 bg-primary/10 text-primary rounded border border-primary/10"
                >
                  {tech.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Sticky/Action Floating Bar */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 -mt-6 relative z-30">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-base-100/80 backdrop-blur-xl border border-base-content/10 rounded-3xl shadow-2xl shadow-black/20">
          <p className="text-lg text-base-content/80 font-medium leading-snug">
            {project.description}
          </p>
          <div className="flex gap-3 w-full md:w-auto">
            <Link
              href={project.githubUrl}
              target="_blank"
              className="btn btn-ghost border-base-content/10 md:px-8 rounded-2xl"
            >
              Source Code
            </Link>
            {project.demoUrl && (
              <Link
                href={project.demoUrl}
                target="_blank"
                className="btn btn-primary shadow-lg shadow-primary/20 md:px-8 rounded-2xl"
              >
                Demo
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* 3. Documentation Section (Clean & Focused) */}
      <main className="max-w-5xl mx-auto px-6 md:px-12 mt-16">
        {readmeContent ? (
          <article
            className="prose max-w-none prose-base-content 
            prose-headings:font-black prose-headings:tracking-tight
            prose-headings:border-b prose-headings:border-base-content/5 prose-headings:pb-4 prose-headings:mt-12
            prose-p:leading-relaxed prose-p:text-base-content/80
            prose-a:text-primary prose-a:font-bold prose-a:no-underline hover:prose-a:underline
            prose-pre:bg-base-200/50 prose-pre:rounded-3xl prose-pre:p-8 prose-pre:border prose-pre:border-base-content/5
            prose-img:rounded-3xl prose-img:shadow-2xl
            prose-code:text-primary prose-code:bg-primary/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none prose-code:font-mono prose-code:text-[0.9em]"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {readmeContent}
            </ReactMarkdown>
          </article>
        ) : (
          <div className="py-32 text-center border-2 border-dashed border-base-content/5 rounded-[40px] opacity-30">
            <div className="text-6xl mb-4">📖</div>
            <p className="font-mono text-sm tracking-[0.3em] uppercase">
              No_ReadMe_Found
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
