import { cn } from "../ui/cn";

/**
 * Panel — full-width beige block, radius-xl, inset from the page edge.
 * Inner padding 64px (mobile 24px). Always contains an image-plus-text
 * layout. DESIGN.md sections 4 and 6.
 */
export default function Panel({ as: Tag = "div", className, children, ...props }) {
  return (
    <Tag className={cn("rounded-xl bg-panel p-6 sm:p-16", className)} {...props}>
      {children}
    </Tag>
  );
}
