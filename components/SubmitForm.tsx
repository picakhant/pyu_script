"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { submitProjectToVault } from "@/lib/actions/project.action";

export default function SubmitForm() {
  const router = useRouter();
  const [repoUrl, setRepoUrl] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!repoUrl.includes("github.com")) {
      toast.error("Please enter a valid GitHub URL.");
      return;
    }

    setIsSubmitting(true);
    const loadingToastId = toast.loading(
      "Decrypting repo and deploying to Vault...",
    );

    try {
      // 🌟 Server Action ဆီကို URL ပဲ လှမ်းပို့လိုက်တော့မယ်
      const result = await submitProjectToVault({
        githubUrl: repoUrl,
        demoUrl: demoUrl || undefined,
      });

      if (result.success) {
        toast.success(`Success! Project deployed.`, { id: loadingToastId });
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
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Input: GitHub URL */}
      <div className="form-control w-full">
        <label className="label px-0">
          <span className="label-text font-black text-base-content/80 uppercase tracking-wider text-sm">
            GitHub Repository URL <span className="text-error">*</span>
          </span>
        </label>
        <input
          type="url"
          required
          placeholder="https://github.com/username/project-name"
          className="input input-lg input-bordered w-full bg-base-100/50 focus:bg-base-100 focus:border-primary transition-all font-mono text-sm shadow-sm rounded-2xl"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
        />
      </div>

      {/* Input: Demo URL */}
      <div className="form-control w-full">
        <label className="label px-0">
          <span className="label-text font-black text-base-content/80 uppercase tracking-wider text-sm">
            Live Demo URL{" "}
            <span className="text-base-content/40 font-normal">(Optional)</span>
          </span>
        </label>
        <input
          type="url"
          placeholder="https://my-project.vercel.app"
          className="input input-lg input-bordered w-full bg-base-100/50 focus:bg-base-100 focus:border-primary transition-all font-mono text-sm shadow-sm rounded-2xl"
          value={demoUrl}
          onChange={(e) => setDemoUrl(e.target.value)}
        />
      </div>

      {/* Submit Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-4 border-t border-base-content/10">
        <Link href="/dashboard" className="btn btn-ghost">
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isSubmitting || !repoUrl}
          className="btn btn-primary hover:scale-[1.02] transition-all w-full sm:w-auto rounded-full px-8"
        >
          {isSubmitting ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Deploying...
            </>
          ) : (
            "Deploy to Vault"
          )}
        </button>
      </div>
    </form>
  );
}
