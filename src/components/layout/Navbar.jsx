import { Link, NavLink } from "react-router-dom";
import { cn } from "../ui/cn";
import PageContainer from "./PageContainer";
import IconButton from "../ui/IconButton";
import Badge from "../ui/Badge";
import { MenuIcon, CartIcon } from "../ui/icons";

/**
 * Navbar — white, 80px tall. Logo on the left, links centered. Same on
 * every page. DESIGN.md section 6.
 *
 * (A floating rounded-pill treatment was tried per a reference screenshot,
 * then undone — back to the plain edge-to-edge bar DESIGN.md describes.)
 *
 * Right side defaults to the documented menu pill + cart icon. Pass
 * `actions` (a node) to replace that block entirely — e.g. Login/Sign up
 * buttons for sites with no cart. Added as a variant, not in DESIGN.md's
 * literal spec; see COMPONENTS.md.
 */
export default function Navbar({
  logo,
  links = [],
  onMenuClick,
  cartCount = 0,
  onCartClick,
  actions,
  className,
}) {
  return (
    <header className={cn("sticky top-0 z-40 h-20 w-full border-b border-border bg-white", className)}>
      <PageContainer className="flex h-full items-center justify-between gap-6">
        <Link to="/" className="flex shrink-0 items-center gap-2 text-title font-medium text-foreground">
          {logo ?? (
            <>
              <span className="size-3 rounded-full bg-accent" aria-hidden="true" />
              Logo
            </>
          )}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.label}
              to={link.href}
              className={({ isActive }) =>
                cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive ? "text-primary" : "text-foreground"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          {actions ?? (
            <>
              <button
                type="button"
                onClick={onMenuClick}
                className={cn(
                  "flex h-11 items-center gap-2 rounded-full border border-border px-4 text-sm font-medium text-foreground",
                  "transition-colors hover:bg-panel active:bg-panel focus-visible:outline-none focus-visible:ring-2",
                  "focus-visible:ring-primary focus-visible:ring-offset-2"
                )}
              >
                <MenuIcon />
                <span className="hidden sm:inline">Menu</span>
              </button>
              <div className="relative">
                <IconButton variant="outline" label="Cart" onClick={onCartClick}>
                  <CartIcon />
                </IconButton>
                {cartCount > 0 && (
                  <Badge variant="primary" className="absolute -right-1 -top-1 h-4 min-w-4 px-1">
                    {cartCount}
                  </Badge>
                )}
              </div>
            </>
          )}
        </div>
      </PageContainer>
    </header>
  );
}
