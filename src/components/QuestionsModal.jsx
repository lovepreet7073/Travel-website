import { useState } from "react";

export default function QuestionsModal({
  open,
  onClose,
  image,
  packageName,
  duration,
  tourType,
}) {
  const [accepted, setAccepted] = useState(true);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="relative grid w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl sm:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-ink/50 hover:bg-black/5 hover:text-ink"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        <img
          src={image}
          alt={packageName}
          className="hidden h-full w-full object-cover sm:block"
        />

        <div className="flex flex-col gap-5 p-7 sm:p-8">
          <div className="pr-8">
            <h2 className="text-lg font-bold text-ink sm:text-xl">
              Have Questions About This Package?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Get answers about package inclusions, pricing, offers &
              customization options from our travel experts.
            </p>
          </div>

          <div className="border-t border-border pt-5">
            <p className="text-sm font-semibold text-primary">{packageName}</p>
            <div className="mt-3 flex items-center gap-2">
              <span className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-ink/70">
                {duration}
              </span>
              <span className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-ink/70">
                {tourType}
              </span>
            </div>
          </div>

          <form
            className="flex flex-col gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              onClose();
            }}
          >
            <input
              type="text"
              required
              placeholder="Enter Name"
              className="rounded-lg border border-border px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-primary focus:outline-none"
            />

            <div className="flex items-center rounded-lg border border-border focus-within:border-primary">
              <button
                type="button"
                className="flex items-center gap-1 border-r border-border px-3 py-3 text-sm text-ink/70"
              >
                +91
                <svg width="10" height="7" viewBox="0 0 12 8" fill="none">
                  <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <input
                type="tel"
                required
                placeholder="Mobile No."
                className="w-full bg-transparent px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-border px-4 py-3 focus-within:border-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 text-ink/40">
                <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
                <path d="m3 7 9 6 9-6" stroke="currentColor" strokeWidth="1.6" />
              </svg>
              <input
                type="email"
                required
                placeholder="Enter Mail ID"
                className="w-full bg-transparent text-sm text-ink placeholder:text-ink/40 focus:outline-none"
              />
            </div>

            <label className="flex items-start gap-2 text-xs leading-relaxed text-ink/60">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-primary"
              />
              I accept the{" "}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>{" "}
              and authorize Thomas Cook and Group of Companies to contact me
              with details.
            </label>

            <button
              type="submit"
              className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-primary py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Request a Callback
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M7 17 17 7M7 7h10v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
