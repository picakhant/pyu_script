"use client";

// 🌟 React ထဲက useEffect, useState နဲ့ createPortal ကို Import လုပ်ပါမယ်
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface DeleteModalProps {
  isOpen: boolean;
  projectName: string;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteModal({
  isOpen,
  projectName,
  isDeleting,
  onClose,
  onConfirm,
}: DeleteModalProps) {
  // To Avoid Next.js (SSR) Issue, show on Client-side by State
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <dialog className="modal modal-open z-100">
      <div className="modal-box border border-error/20 bg-base-100 pb-8 sm:pb-6">
        <h3 className="font-black text-xl text-error flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          Destructive Action
        </h3>
        <p className="py-4 text-base-content/80 text-sm leading-relaxed wrap-break-word">
          Are you absolutely sure you want to delete{" "}
          <strong className="text-base-content">"{projectName}"</strong>? This
          action cannot be undone and will permanently erase this record from
          The Vault.
        </p>
        <div className="modal-action flex flex-col-reverse sm:flex-row gap-3 sm:gap-2 mt-2">
          <button
            className="btn btn-ghost rounded-xl w-full sm:w-auto"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            className="btn btn-error text-white rounded-xl shadow-lg shadow-error/20 w-full sm:w-auto"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Yes, Delete Project"
            )}
          </button>
        </div>
      </div>

      <form
        method="dialog"
        className="modal-backdrop bg-base-300/80 backdrop-blur-sm"
        onClick={() => !isDeleting && onClose()}
      >
        <button>close</button>
      </form>
    </dialog>,
    document.body,
  );
}
