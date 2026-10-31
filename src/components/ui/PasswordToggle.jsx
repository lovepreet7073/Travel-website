import { EyeIcon, EyeOffIcon } from "./icons";

/**
 * PasswordToggle — a bare icon button (no border/circle chrome) meant for
 * Input's `trailing` slot on a password field. Not in DESIGN.md section 7;
 * extracted from the identical local copies in Login.jsx and SignUp.jsx
 * (design-consistent cleanup).
 */
export default function PasswordToggle({ visible, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={visible ? "Hide password" : "Show password"}
      className="text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none"
    >
      {visible ? <EyeOffIcon /> : <EyeIcon />}
    </button>
  );
}
