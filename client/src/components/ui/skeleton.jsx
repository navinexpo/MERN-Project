import { cn } from "@/lib/utils"

function Skeleton({
  // eslint-disable-next-line react/prop-types
  className,
  ...props
}) {
  return (<div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />);
}

export { Skeleton }
