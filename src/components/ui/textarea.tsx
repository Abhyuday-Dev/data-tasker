import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hasError?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, hasError, ...props }, ref) => {
    return (
      <div className="flex flex-col">
        {label && (
          <label className="mb-1 text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <textarea
          className={cn(
            "flex min-h-[60px] w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            hasError ? "border-red-500" : "border-input",
            className
          )}
          ref={ref}
          {...props}
        />
        {hasError && (
          <span className="mt-1 text-sm text-red-500">Invalid input</span>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
