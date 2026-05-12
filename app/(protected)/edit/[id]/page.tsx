import { redirect } from "next/navigation";
import EditForm from "@/components/EditForm";
import { createSessionClient } from "@/lib/appwrite.server";

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let project: { $id: string; githubUrl: string; demoUrl?: string } | null =
    null;

  try {
    const { databases } = await createSessionClient();
    const response = await databases.getRow({
      databaseId: process.env.APPWRITE_DB_ID!,
      tableId: process.env.STUDENT_PROJECT_COLLECTION_ID!,
      rowId: id,
    });

    project = {
      $id: response.$id,
      githubUrl: response.githubUrl ?? "",
      demoUrl: response.demoUrl,
    };
  } catch (error) {
    console.error("Failed to fetch project for editing", error);
    redirect("/dashboard");
  }

  return (
    <div className="max-w-3xl mx-auto py-8 sm:py-12 px-4 sm:px-6 overflow-hidden">
      <div className="mb-8 sm:mb-10 text-center">
        <h1 className="text-2xl sm:text-3xl font-black text-base-content tracking-tight flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8 text-info shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
          <span>Edit Project</span>
        </h1>
        <p className="text-base-content/60 mt-2 text-sm sm:text-base">
          Update your project details in the Vault.
        </p>
      </div>

      <div className="bg-base-100 w-full">
        <EditForm project={project} />
      </div>
    </div>
  );
}
