"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import ProjectCard from "./ProjectCard";
import ProjectActionsDropdown from "./ProjectActionsDropdown";
import DeleteModal from "./DeleteModal";
import {
  getProjects,
  deleteProjectFromVault,
} from "@/lib/actions/project.action";

interface ProjectFeedProps {
  initialProjects: any[];
  currentUserId?: string;
}

export default function ProjectFeed({
  initialProjects,
  currentUserId,
}: ProjectFeedProps) {
  const [projects, setProjects] = useState<any[]>(initialProjects);
  const [offset, setOffset] = useState(12);
  const [hasMore, setHasMore] = useState(initialProjects.length === 12);
  const [isLoading, setIsLoading] = useState(false);

  //  Modal control state
  const [projectToDelete, setProjectToDelete] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadMoreProjects = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    try {
      const newProjects = await getProjects(12, offset);
      if (newProjects.length < 12) setHasMore(false);

      setProjects((prev) => [...prev, ...newProjects]);
      setOffset((prev) => prev + 12);
    } catch (error) {
      console.error("Failed to load more projects", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!projectToDelete) return;

    setIsDeleting(true);
    const loadingToast = toast.loading("Encrypting and burning project...");

    const res = await deleteProjectFromVault(projectToDelete.$id);

    if (res.success) {
      toast.success("Project permanently deleted.", { id: loadingToast });

      setProjects((prev) => prev.filter((p) => p.$id !== projectToDelete.$id));
      setProjectToDelete(null); // Modal ပိတ်မယ်
    } else {
      toast.error(res.error || "Failed to delete", { id: loadingToast });
    }

    setIsDeleting(false);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/*  The Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {projects.map((project: any) => {
          const isOwner =
            currentUserId &&
            project.user_id &&
            currentUserId === project.user_id;

          return (
            <ProjectCard
              key={project.$id}
              project={project}
              actionMenu={
                isOwner ? (
                  <ProjectActionsDropdown
                    projectId={project.$id}
                    onDeleteClick={() => setProjectToDelete(project)}
                  />
                ) : null
              }
            />
          );
        })}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="mt-12 flex justify-center w-full">
          <button
            onClick={loadMoreProjects}
            disabled={isLoading}
            className="btn btn-outline btn-primary rounded-full px-8 shadow-sm transition-all hover:shadow-md font-mono text-sm"
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>{" "}
                Decrypting Vault...
              </>
            ) : (
              "Load More Projects"
            )}
          </button>
        </div>
      )}

      {/* End of Feed */}
      {!hasMore && projects.length > 0 && (
        <div className="mt-16 mb-8 flex items-center justify-center gap-4 w-full opacity-40">
          <div className="h-px grow max-w-25 bg-base-content"></div>
          <span className="text-xs font-mono text-base-content uppercase tracking-widest">
            End of the Vault
          </span>
          <div className="h-px grow max-w-25 bg-base-content"></div>
        </div>
      )}

      {/*  The ONLY ONE Modal for all cards */}
      <DeleteModal
        isOpen={!!projectToDelete}
        projectName={projectToDelete?.title || ""}
        isDeleting={isDeleting}
        onClose={() => setProjectToDelete(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
