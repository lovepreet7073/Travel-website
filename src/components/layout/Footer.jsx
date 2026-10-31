import { Link } from "react-router-dom";
import { cn } from "../ui/cn";
import PageContainer from "./PageContainer";

/**
 * Footer — closes every page. Not itemized with its own spec table in
 * DESIGN.md, so it reuses the panel background and existing text/link
 * tokens only. `columns` is [{ title, links: [{ label, href }] }],
 * `socialLinks` is [{ label, href, icon }] where `icon` is a symbol id
 * from /icons.svg.
 */
export default function Footer({
  logo,
  tagline,
  columns = [],
  socialLinks = [],
  copyright,
  className,
}) {
  return (
    <footer className={cn("bg-panel", className)}>
      <PageContainer className="flex flex-col gap-12 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3">
            <Link to="/" className="flex items-center gap-2 text-title font-medium text-foreground">
              {logo ?? (
                <>
                  <span className="size-3 rounded-full bg-accent" aria-hidden="true" />
                  Logo
                </>
              )}
            </Link>
            {tagline && <p className="max-w-xs text-sm text-body">{tagline}</p>}
          </div>

          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <p className="text-sm font-medium text-foreground">{col.title}</p>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-body transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-border pt-8 sm:flex-row">
          {copyright && <p className="text-xs text-muted-foreground">{copyright}</p>}
          {socialLinks.length > 0 && (
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.icon}
                  href={social.href}
                  aria-label={social.label}
                  className={cn(
                    "flex size-11 items-center justify-center rounded-full border border-border text-foreground",
                    "transition-colors hover:bg-white active:bg-white focus-visible:outline-none",
                    "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  )}
                >
                  <svg className="size-4" aria-hidden="true">
                    <use href={`/icons.svg#${social.icon}`} />
                  </svg>
                </a>
              ))}
            </div>
          )}
        </div>
      </PageContainer>
    </footer>
  );
}
