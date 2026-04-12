import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  status?: "online" | "offline" | "busy" | "away";
}

const sizeMap = {
  xs: "size-6 text-[10px]",
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
  xl: "size-16 text-lg",
};

const statusMap = {
  online:  "bg-emerald-500",
  offline: "bg-muted-foreground",
  busy:    "bg-red-500",
  away:    "bg-amber-500",
};

export function Avatar({ src, alt, fallback, size = "md", status, className, ...props }: AvatarProps) {
  return (
    <div className={cn("relative inline-flex shrink-0", className)} {...props}>
      <div
        className={cn(
          "rounded-full overflow-hidden flex items-center justify-center bg-muted border border-border font-semibold text-muted-foreground",
          sizeMap[size]
        )}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt ?? ""} className="size-full object-cover" />
        ) : (
          <span>{fallback ?? alt?.slice(0, 2).toUpperCase() ?? "?"}</span>
        )}
      </div>
      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full border-2 border-background",
            statusMap[status],
            size === "xs" || size === "sm" ? "size-2" : "size-2.5"
          )}
        />
      )}
    </div>
  );
}

interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  avatars: Pick<AvatarProps, "src" | "alt" | "fallback">[];
  max?: number;
  size?: AvatarProps["size"];
}

export function AvatarGroup({ avatars, max = 4, size = "sm", className, ...props }: AvatarGroupProps) {
  const shown = avatars.slice(0, max);
  const extra = avatars.length - max;
  return (
    <div className={cn("flex -space-x-2", className)} {...props}>
      {shown.map((a, i) => (
        <Avatar key={i} {...a} size={size} className="ring-2 ring-background" />
      ))}
      {extra > 0 && (
        <div
          className={cn(
            "rounded-full flex items-center justify-center bg-muted border border-border text-muted-foreground font-semibold ring-2 ring-background",
            sizeMap[size]
          )}
        >
          +{extra}
        </div>
      )}
    </div>
  );
}
