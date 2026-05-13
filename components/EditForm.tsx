"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { editProjectInVault } from "@/lib/actions/project.action";

interface EditFormProps {
  project: {
    $id: string;
    githubUrl: string;
    demoUrl?: string;
  };
}

export default function EditForm({ project }: EditFormProps) {
  const router = useRouter();
  const [repoUrl, setRepoUrl] = useState(project.githubUrl);
  const [demoUrl, setDemoUrl] = useState(project.demoUrl || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!repoUrl.includes("github.com")) {
      toast.error("Please enter a valid GitHub URL.");
      return;
    }

    setIsSubmitting(true);
    const loadingToastId = toast.loading(
      "Syncing with GitHub and updating Vault...",
    );

    try {
      const result = await editProjectInVault(project.$id, {
        githubUrl: repoUrl,
        demoUrl: demoUrl || undefined,
      });

      if (result.success) {
        toast.success(`Project updated successfully!`, { id: loadingToastId });
        router.push("/dashboard");
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong.", {
        id: loadingToastId,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-transparent sm:space-y-8">
      <div className="form-control w-full">
        <label className="label px-0">
          <span className="label-text font-black text-base-content/80 uppercase tracking-wider text-xs sm:text-sm">
            GitHub Repository URL <span className="text-error">*</span>
          </span>
        </label>
        <input
          type="url"
          required
          placeholder="https://github.com/username/project-name"
          className="input input-primary input-lg w-full"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
        />
        <label className="label px-0">
          <span className="label-text-alt text-sm mt-2 text-base-content/60 whitespace-normal leading-relaxed">
            If changed, project title and tech stack will be auto-updated.
          </span>
        </label>
      </div>

      <div className="form-control w-full">
        <label className="label px-0">
          <span className="label-text font-black text-base-content/80 uppercase tracking-wider text-xs sm:text-sm">
            Live Demo URL{" "}
            <span className="text-base-content/40 font-normal">(Optional)</span>
          </span>
        </label>
        <input
          type="url"
          placeholder="https://my-project.vercel.app"
          className="input input-primary input-lg w-full"
          value={demoUrl}
          onChange={(e) => setDemoUrl(e.target.value)}
        />
      </div>

      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-6 border-t border-base-content/10 mt-2">
        <Link
          href="/dashboard"
          className="btn btn-ghost"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isSubmitting || !repoUrl}
          className="btn btn-primary"
        >
          {isSubmitting ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>{" "}
              Updating...
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </form>
  );
}
