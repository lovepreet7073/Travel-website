import { useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "./cn";
import IconButton from "./IconButton";
import { CloseIcon } from "./icons";

/**
 * Modal — centered overlay dialog. Not itemized in DESIGN.md section 7, so
 * it reuses only documented tokens: surface, radius-lg, shadow-float, and
 * foreground at 50% opacity for the backdrop (the same alpha-token pattern
 * used by IconButton's on-image variant).
 */
export default function Modal({ open, onClose, title, children, className }) {
  useEffect(() => {
    if (!open) return undefined;
    function onKeyDown(event) {
      if (event.key === "Escape") onClose?.();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn("relative w-full max-w-lg rounded-lg bg-surface p-8 shadow-float", className)}
        onClick={(event) => event.stopPropagation()}
      >
        <IconButton
          variant="outline"
          label="Close"
          onClick={onClose}
          className="absolute right-4 top-4"
        >
          <CloseIcon />
        </IconButton>
        {title && <h2 className="pr-12 text-h3 font-bold text-foreground">{title}</h2>}
        <div className={title ? "mt-4" : undefined}>{children}</div>
      </div>
    </div>,
    document.body
  );
}
