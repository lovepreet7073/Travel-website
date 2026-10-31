import { cn } from "./cn";
import Card from "./Card";

/**
 * StatCard — white, radius-md, shadow-card, centered. Icon 24px primary,
 * number text-h3 700, label text-xs. Meant to float over panel images.
 * DESIGN.md section 7.
 */
export default function StatCard({ icon, value, label, className, ...props }) {
  return (
    <Card className={cn("flex flex-col items-center gap-2 p-4 text-center", className)} {...props}>
      <span className="flex size-6 items-center justify-center text-primary">{icon}</span>
      <span className="text-h3 font-bold text-foreground">{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </Card>
  );
}
