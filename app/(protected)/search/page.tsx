// app/(protected)/search/page.tsx

import { searchProjects } from "@/lib/actions/project.action";
import { createSessionClient } from "@/lib/appwrite.server";
import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";
import { redirect } from "next/navigation";

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";
  const type = resolvedParams.type || "title";

  let projects: any[] = [];
  let currentUserId = undefined;

  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    currentUserId = user.$id;
  } catch (error) {
    redirect("/");
  }

  if (query) {
    projects = await searchProjects(query, type);
  }

  return (
    <div className="w-full mx-auto animate-fade-in-up pb-12 px-4 md:px-8">
      <div className="mb-10 mt-6">
        <Link
          href="/dashboard"
          className="btn btn-ghost btn-sm px-0 mb-4 hover:bg-transparent text-base-content/50 hover:text-primary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Back to Vault
        </Link>
        <h1 className="text-3xl md:text-4xl font-black text-base-content tracking-tight">
          Search Results
        </h1>
        <p className="text-base-content/60 mt-2 text-lg">
          Found{" "}
          <span className="font-bold text-primary">{projects.length}</span>{" "}
          projects matching{" "}
          <span className="text-base-content font-bold">"{query}"</span> in{" "}
          <span className="italic">
            {type === "title" ? "titles" : "technologies"}
          </span>
          .
        </p>
      </div>

      {/* Data Rendering (Results or Empty State) */}
      {projects.length === 0 ? (
        <div className="w-full bg-base-100/30 border border-base-content/10 border-dashed rounded-3xl p-16 flex flex-col items-center justify-center text-center mt-8">
          <div className="w-16 h-16 bg-base-200/80 rounded-full flex items-center justify-center mb-4 text-base-content/40 border border-base-content/5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
          <h3 className="font-black text-xl mb-2 text-base-content">
            No projects found
          </h3>
          <p className="text-base-content/50 max-w-md mb-8">
            We couldn't find anything matching "{query}". Try adjusting your
            keywords or searching by a different criteria.
          </p>
          <Link href="/dashboard" className="btn btn-outline rounded-full px-8">
            Clear Search
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {projects.map((project: any) => (
            <ProjectCard key={project.$id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
