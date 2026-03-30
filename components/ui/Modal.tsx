"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const maxWidthStyles = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
} as const;

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  maxWidth?: keyof typeof maxWidthStyles;
  children: React.ReactNode;
}

export function Modal({
  open,
  onClose,
  title,
  maxWidth = "md",
  children,
}: ModalProps) {
  React.useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-text-primary/35 p-4 backdrop-blur-md">
      <div
        className={cn(
          "animate-modal-in relative w-full rounded-[1.75rem] bg-white p-6 shadow-soft transition duration-200",
          maxWidthStyles[maxWidth],
        )}
      >
        <button
          type="button"
          aria-label="Close modal"
          className="absolute right-4 top-4 rounded-full p-2 text-text-secondary transition hover:bg-surface hover:text-text-primary"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>
        {title ? (
          <div className="mb-4 pr-10">
            <h2 className="font-heading text-h3 text-text-primary">{title}</h2>
          </div>
        ) : null}
        {children}
      </div>
    </div>
  );
}
