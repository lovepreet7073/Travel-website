import { cn } from "../ui/cn";

/**
 * PageContainer — max-width 1200px, horizontal padding 24px
 * (mobile 16px). DESIGN.md section 4.
 */
export default function PageContainer({ as: Tag = "div", className, children, ...props }) {
  return (
    <Tag className={cn("mx-auto w-full max-w-page px-4 sm:px-6", className)} {...props}>
      {children}
    </Tag>
  );
}
