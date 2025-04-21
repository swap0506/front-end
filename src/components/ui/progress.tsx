
import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const progressVariants = cva("relative w-full overflow-hidden rounded-full", {
  variants: {
    variant: {
      default: "bg-neutral-200 dark:bg-neutral-800",
      primary: "bg-primary-100 dark:bg-primary-900/30",
      secondary: "bg-secondary-100 dark:bg-secondary-900/30",
      tertiary: "bg-tertiary-100 dark:bg-tertiary-900/30",
      success: "bg-success-100 dark:bg-success-900/30",
      info: "bg-info-100 dark:bg-info-900/30",
      warning: "bg-warning-100 dark:bg-warning-900/30",
      error: "bg-error-100 dark:bg-error-900/30"
    },
    size: {
      sm: "h-1",
      default: "h-2",
      md: "h-2.5",
      lg: "h-3",
      xl: "h-4"
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  },
});

const indicatorVariants = cva("h-full w-full flex-1 transition-all", {
  variants: {
    variant: {
      default: "bg-primary-600 dark:bg-primary-500",
      primary: "bg-primary-600 dark:bg-primary-500",
      secondary: "bg-secondary-600 dark:bg-secondary-500",
      tertiary: "bg-tertiary-600 dark:bg-tertiary-500",
      success: "bg-success-600 dark:bg-success-500",
      info: "bg-info-600 dark:bg-info-500",
      warning: "bg-warning-600 dark:bg-warning-500",
      error: "bg-error-600 dark:bg-error-500"
    },
    striped: {
      true: "bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:20px_100%]",
      false: ""
    },
    animated: {
      true: "animate-pulse",
      false: ""
    },
  },
  defaultVariants: {
    variant: "default",
    striped: false,
    animated: false
  }
});

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
  value?: number;
  indeterminate?: boolean;
  striped?: boolean;
  animated?: boolean;
  labelText?: React.ReactNode;
  labelPosition?: "top" | "inside" | "bottom";
  showValueLabel?: boolean;
  valueFormatter?: (value: number) => string;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({
  className,
  variant,
  size,
  striped = false,
  animated = false,
  value = 0,
  indeterminate = false,
  labelText,
  labelPosition = "top",
  showValueLabel = false,
  valueFormatter = (val) => `${Math.round(val)}%`,
  ...props
}, ref) => {
  const showLabel = !!labelText;
  const topLabel = showLabel && labelPosition === "top";
  const insideLabel = showLabel && labelPosition === "inside";
  const bottomLabel = showLabel && labelPosition === "bottom";
  const valueLabel = showValueLabel && !indeterminate;

  return (
    <div className="w-full">
      {topLabel && (
        <div className="flex items-center justify-between mb-1">
          <div className="text-sm font-medium text-foreground">
            {labelText}
          </div>
          {valueLabel && (
            <div className="text-sm text-muted-foreground">
              {valueFormatter(value)}
            </div>
          )}
        </div>
      )}

      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          progressVariants({ variant, size }),
          className
        )}
        value={indeterminate ? undefined : value}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            indicatorVariants({
              variant,
              striped,
              animated,
            }),
            indeterminate && "w-[50%] animate-progress-indeterminate"
          )}
          style={{
            transform: indeterminate ? "none" : `translateX(-${100 - (value || 0)}%)`,
          }}
        >
          {insideLabel && (value > 15 || indeterminate) && (
            <div className="px-2 flex items-center justify-between h-full">
              <span className="text-xs font-medium text-primary-foreground truncate">
                {labelText}
              </span>
              {valueLabel && !indeterminate && (
                <span className="text-xs font-medium text-primary-foreground ml-auto">
                  {valueFormatter(value)}
                </span>
              )}
            </div>
          )}
        </ProgressPrimitive.Indicator>
      </ProgressPrimitive.Root>

      {bottomLabel && (
        <div className="flex items-center justify-between mt-1">
          <div className="text-sm font-medium text-foreground">
            {labelText}
          </div>
          {valueLabel && (
            <div className="text-sm text-muted-foreground">
              {valueFormatter(value)}
            </div>
          )}
        </div>
      )}
    </div>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress, progressVariants, indicatorVariants };
