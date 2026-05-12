// app/(protected)/dashboard/page.tsx
import { getProjects } from "@/lib/actions/project.action";
import Link from "next/link";
import ProjectFeed from "@/components/ProjectFeed";
import { createSessionClient } from "@/lib/appwrite.server";
import RefreshButton from "@/components/RefreshButton";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  let initialProjects = [];
  let fetchError = false;

  // 🌟 (Hybrid Step A): initial 12 project on server (SEO Optimized, 0 Loading time)
  try {
    initialProjects = await getProjects(12, 0);
  } catch (error) {
    console.error("Network Error: Could not fetch projects:", error);
    fetchError = true;
  }

  let currentUserId = undefined;
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    currentUserId = user.$id;
  } catch (error) {
    console.error("User not authenticated", error);
  }

  return (
    <div className="w-full mx-auto animate-fade-in-up pb-12 px-4 md:px-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 mt-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-black text-base-content tracking-tight">
            The Vault
          </h1>
          <p className="text-base-content/60 mt-2 max-w-xl">
            Discover projects built by the students of UCS Pyay. Explore the
            tech stack, get inspired, and contribute.
          </p>
        </div>
        <Link
          href="/submit"
          className="btn btn-primary rounded-full shadow-lg hover:scale-105 transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Submit Project
        </Link>
      </div>

      {/* Network Error  UI */}
      {fetchError ? (
        <div className="bg-error/10 text-error p-8 rounded-3xl text-center mt-10 border border-error/20 backdrop-blur-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto mb-4 opacity-80"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-xl font-bold tracking-tight">
            Connection Failed
          </h3>
          <p className="mt-2 text-sm opacity-80 mb-6">
            We couldn't reach The Vault right now. Please check your connection
            and try again.
          </p>
          <RefreshButton />
        </div>
      ) : initialProjects.length === 0 ? (
        /* O prj in Db */
        <div className="bg-base-200/50 rounded-3xl p-12 text-center border border-base-content/5 mt-10">
          <div className="text-4xl mb-4">🚀</div>
          <h3 className="text-xl font-bold text-base-content">
            The Vault is empty!
          </h3>
          <p className="text-base-content/60 mt-2 mb-6">
            Be the first student to showcase your work.
          </p>
          <Link
            href="/submit"
            className="btn btn-outline btn-primary rounded-full"
          >
            Submit Your First Project
          </Link>
        </div>
      ) : (
        <ProjectFeed
          currentUserId={currentUserId}
          initialProjects={initialProjects}
        />
      )}
    </div>
  );
}
