import { cn } from "./cn";
import IconButton from "./IconButton";
import { SearchIcon } from "./icons";

function SearchField({ label, value, placeholder, icon, onClick, className }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex min-w-0 flex-1 flex-col items-start gap-1 rounded-md px-2 py-1 text-left transition-colors",
        "hover:bg-panel focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        className
      )}
    >
      <span className="text-sm font-medium text-foreground">{label}</span>
      <span className="flex items-center gap-2 text-body text-muted-foreground">
        {icon}
        <span className="truncate">{value || placeholder}</span>
      </span>
    </button>
  );
}

/**
 * SearchBar — white, radius-lg, shadow-float, with divider-accent dividers
 * between fields and a round primary search button. DESIGN.md section 7.
 *
 * `fields` is an array of { label, value, placeholder, icon, onClick }.
 */
export default function SearchBar({ fields = [], onSearch, className }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-lg bg-surface p-4 shadow-float sm:flex-row sm:items-center sm:gap-0 sm:p-3",
        className
      )}
    >
      {fields.map((field, i) => (
        <div key={field.label} className="flex flex-1 items-center">
          <SearchField {...field} className="flex-1" />
          {i < fields.length - 1 && (
            <span aria-hidden="true" className="mx-2 hidden h-8 w-px shrink-0 bg-divider-accent sm:block" />
          )}
        </div>
      ))}
      <IconButton
        variant="filled"
        label="Search"
        onClick={onSearch}
        className="shrink-0 self-end sm:ml-4 sm:self-auto"
      >
        <SearchIcon />
      </IconButton>
    </div>
  );
}
