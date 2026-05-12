"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import ProjectCard from "./ProjectCard";
import ProjectActionsDropdown from "./ProjectActionsDropdown";
import DeleteModal from "./DeleteModal";
import { deleteProjectFromVault } from "@/lib/actions/project.action";

interface ProfileProjectGridProps {
  initialProjects: any[];
  currentUserId: string;
}

export default function ProfileProjectGrid({
  initialProjects,
  currentUserId,
}: ProfileProjectGridProps) {
  const [projects, setProjects] = useState<any[]>(initialProjects);

  // Modal State
  const [projectToDelete, setProjectToDelete] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteConfirm = async () => {
    if (!projectToDelete) return;

    setIsDeleting(true);
    const loadingToast = toast.loading("Encrypting and burning project...");

    const res = await deleteProjectFromVault(projectToDelete.$id);

    if (res.success) {
      toast.success("Project permanently deleted.", { id: loadingToast });
      setProjects((prev) => prev.filter((p) => p.$id !== projectToDelete.$id));
      setProjectToDelete(null);
    } else {
      toast.error(res.error || "Failed to delete", { id: loadingToast });
    }

    setIsDeleting(false);
  };

  return (
    <div className="w-full flex flex-col">
      {/* The Clean Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {projects.map((project: any) => (
          <ProjectCard
            key={project.$id}
            project={project}
            actionMenu={
              <ProjectActionsDropdown
                projectId={project.$id}
                onDeleteClick={() => setProjectToDelete(project)}
              />
            }
          />
        ))}
      </div>

      {projects.length === 0 && (
        <div className="py-12 text-center text-base-content/40 font-mono text-sm border border-dashed border-base-content/10 rounded-2xl mt-4">
          No projects remaining.
        </div>
      )}

      {/* The Modal */}
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
