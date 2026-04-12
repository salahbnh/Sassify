import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Info, XCircle, X } from "lucide-react";
import { HTMLAttributes, ReactNode, useState } from "react";

type AlertVariant = "info" | "success" | "warning" | "error";

const variantMap: Record<AlertVariant, { icon: ReactNode; classes: string }> = {
  info:    { icon: <Info size={16} />,         classes: "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400" },
  success: { icon: <CheckCircle2 size={16} />, classes: "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400" },
  warning: { icon: <AlertCircle size={16} />,  classes: "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400" },
  error:   { icon: <XCircle size={16} />,      classes: "bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400" },
};

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  dismissible?: boolean;
}

export function Alert({ variant = "info", title, dismissible, className, children, ...props }: AlertProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  const { icon, classes } = variantMap[variant];
  return (
    <div
      role="alert"
      className={cn("flex gap-3 rounded-xl border p-4", classes, className)}
      {...props}
    >
      <span className="mt-0.5 shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        {title && <p className="font-medium text-sm mb-0.5">{title}</p>}
        {children && <div className="text-sm opacity-90">{children}</div>}
      </div>
      {dismissible && (
        <button
          onClick={() => setDismissed(true)}
          className="shrink-0 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
          aria-label="Dismiss"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
