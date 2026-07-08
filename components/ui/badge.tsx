import * as React from "react"
import { cn } from "@/lib/utils"

const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "bestseller" | "new" | "unavailable" | "outline" }
>(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-neutral-100 text-neutral-700",
    bestseller: "bg-brand-500 text-white",
    new: "bg-blue-500 text-white",
    unavailable: "bg-neutral-200 text-neutral-500",
    outline: "border border-neutral-200 text-neutral-600",
  }
  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  )
})
Badge.displayName = "Badge"

export { Badge }
