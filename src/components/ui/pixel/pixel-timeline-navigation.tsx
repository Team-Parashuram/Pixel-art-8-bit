"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { Check, Circle } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

const timelineNavigationVariants = cva(
  "relative flex items-center justify-between w-full",
  {
    variants: {
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col items-start",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  },
);

const timelineStepVariants = cva(
  "relative flex items-center transition-none duration-0",
  {
    variants: {
      orientation: {
        horizontal: "flex-col",
        vertical: "flex-row",
      },
      status: {
        completed: "",
        current: "",
        upcoming: "",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      status: "upcoming",
    },
  },
);

const timelineIconVariants = cva(
  "flex items-center justify-center border-4 border-black dark:border-white font-bold transition-none duration-0",
  {
    variants: {
      status: {
        completed: "bg-green-500 text-white shadow-pixel",
        current:
          "bg-pixel-light-primary dark:bg-pixel-dark-primary text-black dark:text-white shadow-pixel animate-pulse",
        upcoming:
          "bg-white dark:bg-pixel-dark-surface text-black dark:text-white shadow-pixel-sm",
      },
      size: {
        sm: "w-8 h-8 text-xs",
        md: "w-12 h-12 text-sm",
        lg: "w-16 h-16 text-base",
      },
    },
    defaultVariants: {
      status: "upcoming",
      size: "md",
    },
  },
);

const timelineConnectorVariants = cva(
  "border-4 border-dashed border-black dark:border-white transition-none duration-0",
  {
    variants: {
      orientation: {
        horizontal: "flex-1 border-t-4 border-l-0 border-r-0 border-b-0 mx-2",
        vertical: "h-8 border-l-4 border-t-0 border-r-0 border-b-0 my-2 ml-6",
      },
      status: {
        completed: "border-solid border-green-500",
        current: "border-dashed",
        upcoming: "border-dashed opacity-50",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      status: "upcoming",
    },
  },
);

interface TimelineNavigationContextValue {
  currentStep: number;
  orientation: "horizontal" | "vertical";
  size: "sm" | "md" | "lg";
  onStepClick?: (step: number) => void;
}

const TimelineNavigationContext = React.createContext<
  TimelineNavigationContextValue | undefined
>(undefined);

function useTimelineNavigation() {
  const context = React.useContext(TimelineNavigationContext);
  if (!context) {
    throw new Error(
      "Timeline components must be used within a PixelTimelineNavigation",
    );
  }
  return context;
}

interface PixelTimelineNavigationProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineNavigationVariants> {
  currentStep: number;
  onStepClick?: (step: number) => void;
  size?: "sm" | "md" | "lg";
}

const PixelTimelineNavigation = React.forwardRef<
  HTMLDivElement,
  PixelTimelineNavigationProps
>(
  (
    {
      className,
      orientation = "horizontal",
      currentStep,
      onStepClick,
      size = "md",
      children,
      ...props
    },
    ref,
  ) => {
    const contextOrientation = orientation ?? "horizontal";

    return (
      <TimelineNavigationContext.Provider
        value={{
          currentStep,
          orientation: contextOrientation,
          size,
          onStepClick,
        }}
      >
        <div
          ref={ref}
          className={cn(
            timelineNavigationVariants({ orientation: contextOrientation }),
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </TimelineNavigationContext.Provider>
    );
  },
);
PixelTimelineNavigation.displayName = "PixelTimelineNavigation";

interface PixelTimelineStepProps extends React.HTMLAttributes<HTMLDivElement> {
  step: number;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

const PixelTimelineStep = React.forwardRef<
  HTMLDivElement,
  PixelTimelineStepProps
>(({ className, step, label, description, icon, ...props }, ref) => {
  const { currentStep, orientation, size, onStepClick } =
    useTimelineNavigation();

  const status =
    step < currentStep
      ? "completed"
      : step === currentStep
        ? "current"
        : "upcoming";

  const isClickable = onStepClick && step <= currentStep;

  return (
    <>
      <div
        ref={ref}
        className={cn(timelineStepVariants({ orientation, status }), className)}
        {...props}
      >
        <button
          onClick={() => isClickable && onStepClick(step)}
          className={cn(
            timelineIconVariants({ status, size }),
            isClickable && "cursor-pointer hover:scale-110",
            !isClickable && "cursor-default",
          )}
          disabled={!isClickable}
          type="button"
          aria-label={`Step ${step}: ${label}`}
          title={label}
        >
          {status === "completed" ? (
            <Check
              className={
                size === "sm"
                  ? "h-4 w-4"
                  : size === "lg"
                    ? "h-8 w-8"
                    : "h-6 w-6"
              }
            />
          ) : icon ? (
            icon
          ) : status === "current" ? (
            <Circle
              className={cn(
                size === "sm"
                  ? "h-3 w-3"
                  : size === "lg"
                    ? "h-5 w-5"
                    : "h-4 w-4",
                "fill-current",
              )}
            />
          ) : (
            step
          )}
        </button>
        <div
          className={cn(
            "flex flex-col",
            orientation === "horizontal" ? "mt-2 text-center" : "ml-4",
          )}
        >
          <span
            className={cn(
              "font-bold uppercase tracking-wide",
              size === "sm"
                ? "text-xs"
                : size === "lg"
                  ? "text-base"
                  : "text-sm",
              status === "current" &&
                "text-pixel-light-primary dark:text-pixel-dark-primary",
              status === "completed" && "text-green-600 dark:text-green-400",
              status === "upcoming" && "text-gray-500 dark:text-gray-400",
            )}
          >
            {label}
          </span>
          {description && (
            <span
              className={cn(
                "text-xs text-gray-600 dark:text-gray-400 mt-1",
                orientation === "horizontal" ? "max-w-[120px]" : "",
              )}
            >
              {description}
            </span>
          )}
        </div>
      </div>
    </>
  );
});
PixelTimelineStep.displayName = "PixelTimelineStep";

const PixelTimelineConnector = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { currentStep, orientation } = useTimelineNavigation();
  const stepIndex = React.useContext(StepIndexContext);

  const status =
    stepIndex < currentStep - 1
      ? "completed"
      : stepIndex === currentStep - 1
        ? "current"
        : "upcoming";

  return (
    <div
      ref={ref}
      className={cn(
        timelineConnectorVariants({ orientation, status }),
        className,
      )}
      {...props}
    />
  );
});
PixelTimelineConnector.displayName = "PixelTimelineConnector";

// Helper context to track step index for connectors
const StepIndexContext = React.createContext<number>(0);

// Helper component to automatically add connectors between steps
interface PixelTimelineStepsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const PixelTimelineSteps = React.forwardRef<
  HTMLDivElement,
  PixelTimelineStepsProps
>(({ className, children, ...props }, ref) => {
  const { orientation } = useTimelineNavigation();
  const childArray = React.Children.toArray(children);

  return (
    <div ref={ref} className={className} {...props}>
      {childArray.map((child, index) => (
        <React.Fragment key={index}>
          <StepIndexContext.Provider value={index}>
            {child}
            {index < childArray.length - 1 && <PixelTimelineConnector />}
          </StepIndexContext.Provider>
        </React.Fragment>
      ))}
    </div>
  );
});
PixelTimelineSteps.displayName = "PixelTimelineSteps";

export {
  PixelTimelineNavigation,
  PixelTimelineStep,
  PixelTimelineSteps,
  PixelTimelineConnector,
};
