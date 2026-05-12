// app/(protected)/profile/page.tsx
import { createSessionClient } from "@/lib/appwrite.server";
import { getProjectsByUser } from "@/lib/actions/project.action"; // ထပ်တိုး
import { redirect } from "next/navigation";
import SeasonalBanner from "@/components/SeasonalBanner";
import ProfileAvatar from "@/components/ProfileAvatar";
import ProfileProjectGrid from "@/components/ProfileProjectGrid";
import { Metadata } from "next";

export const dynamic = "force-dynamic"; 

export const metadata: Metadata = {
  title: "My Profile | PyuScript Vault",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ProfilePage() {
  let user;
  let projects: any[] = [];

  try {
    const { account } = await createSessionClient();
    user = await account.get();
    projects = await getProjectsByUser(user.$id);
  } catch (error) {
    redirect("/");
  }

  // GitHub Username Hack
  let githubUsername = user.prefs?.github_username || user.name;
  if (projects.length > 0) {
    const match = projects[0].githubUrl.match(/github\.com\/([^/]+)/);
    if (match) githubUsername = match[1];
  }

  const rowNumber = user.prefs?.row_number || "Not Assigned";
  const avatarUrl = `https://github.com/${githubUsername}.png`;
  const email = user.email;

  const joinedDate = new Date(user.$createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  // Top Tech Stack Claculation
  const techCounts: Record<string, number> = {};
  projects.forEach((p) => {
    const techs = p.technologies
      .split(",")
      .map((t: string) => t.trim())
      .filter(Boolean);
    techs.forEach((t: string) => {
      techCounts[t] = (techCounts[t] || 0) + 1;
    });
  });

  const topTechs = Object.entries(techCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map((t) => t[0]);

  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in-up pb-12">
      <div className="w-full h-40 md:h-56 bg-linear-to-r from-base-200 to-base-100 rounded-3xl border border-base-content/5 relative overflow-hidden shadow-sm">
        <SeasonalBanner />
      </div>

      {/* Profile Header (Avatar & Top Actions) */}
      <div className="px-4 md:px-8 flex flex-col md:flex-row md:items-end justify-between gap-4 -mt-16 md:-mt-20 relative z-10">
        {/* Avatar & Desktop Name */}
        <div className="flex items-end gap-6">
          <div className="avatar">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full ring-4 ring-base-300 bg-base-200 border border-base-content/10">
              <ProfileAvatar src={avatarUrl} alt={githubUsername} />
            </div>
          </div>

          <div className="hidden md:block pb-2">
            <h1 className="text-4xl font-black text-base-content tracking-tight">
              {githubUsername}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="badge badge-primary font-mono badge-sm text-xs border-none">
                Row: {rowNumber}
              </span>
              <span className="badge badge-neutral font-mono badge-sm text-xs border-none">
                UCSP Student
              </span>
            </div>
          </div>
        </div>

        {/* GitHub Button */}
        <div className="flex items-center pb-2">
          <a
            href={`https://github.com/${githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline border-base-content/20 hover:bg-base-content hover:text-base-100 hover:border-transparent font-bold gap-2 rounded-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View GitHub
          </a>
        </div>
      </div>

      {/* Mobile Name */}
      <div className="md:hidden px-4 mt-4">
        <h1 className="text-3xl font-black text-base-content tracking-tight">
          {githubUsername}
        </h1>
        <div className="flex items-center gap-2 mt-2">
          <span className="badge badge-primary font-mono badge-sm text-xs border-none">
            Row: {rowNumber}
          </span>
          <span className="badge badge-neutral font-mono badge-sm text-xs border-none">
            UCSP Student
          </span>
        </div>
      </div>

      <div className="divider my-8 px-4 md:px-0 opacity-30"></div>

      {/* Page Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 md:px-0">
        {/* Left Column (Identity & Details) */}
        <div className="lg:col-span-1 space-y-6">
          <div>
            <h3 className="text-lg font-bold mb-4 text-base-content/80">
              Identity Details
            </h3>
            <div className="space-y-3">
              <div className="bg-base-200/50 p-4 rounded-2xl border border-base-content/5 backdrop-blur-sm">
                <p className="text-[10px] font-black text-base-content/40 uppercase tracking-widest mb-1">
                  Email Address
                </p>
                <p className="font-mono text-sm text-base-content/80 break-all">
                  {email}
                </p>
              </div>
              <div className="bg-base-200/50 p-4 rounded-2xl border border-base-content/5 backdrop-blur-sm">
                <p className="text-[10px] font-black text-base-content/40 uppercase tracking-widest mb-1">
                  Joined Vault
                </p>
                <p className="text-sm text-base-content/80 font-medium">
                  {joinedDate}
                </p>
              </div>

              {/* Top Stack  */}
              <div className="bg-base-200/50 p-4 rounded-2xl border border-base-content/5 backdrop-blur-sm">
                <p className="text-[10px] font-black text-base-content/40 uppercase tracking-widest mb-1">
                  Top Tech Stack
                </p>
                {topTechs.length > 0 ? (
                  <p className="text-sm text-primary font-bold">
                    {topTechs.join(" • ")}
                  </p>
                ) : (
                  <p className="text-sm text-base-content/50 italic">
                    No Tech Yet
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Projects & Submissions) */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-base-content/80">
              Your Vault Contributions
            </h3>
            <span className="text-xs font-mono font-bold text-base-content/40 uppercase">
              {projects.length} {projects.length <= 1 ? "Project" : "Projects"}
            </span>
          </div>

          {projects.length === 0 ? (
            <div className="w-full bg-base-100/30 border border-base-content/10 border-dashed rounded-3xl p-10 md:p-16 flex flex-col items-center justify-center text-center transition-all hover:bg-base-100/50">
              {/* Empty State */}
            </div>
          ) : (
            <div className="-mx-4 md:mx-0">
              <ProfileProjectGrid
                currentUserId={user.$id}
                initialProjects={projects}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
