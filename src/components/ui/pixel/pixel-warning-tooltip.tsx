"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertTriangle } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

const warningTooltipVariants = cva(
  "pixel-borders border-4 p-3 text-sm font-medium shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50 overflow-hidden font-[family-name:var(--font-press-start)] animate-in fade-in-0 zoom-in-95 duration-0",
  {
    variants: {
      severity: {
        warning:
          "border-[#ffa500] bg-[#fff4e6] text-[#ff8c00] dark:bg-[#332200] dark:text-[#ffa500]",
        error:
          "border-[#ff0000] bg-[#ffe6e6] text-[#cc0000] dark:bg-[#330000] dark:text-[#ff4444]",
        info: "border-[#0099ff] bg-[#e6f7ff] text-[#0077cc] dark:bg-[#001a33] dark:text-[#66ccff]",
        critical:
          "border-[#ff00ff] bg-[#ffe6ff] text-[#cc00cc] dark:bg-[#330033] dark:text-[#ff66ff]",
      },
      size: {
        sm: "text-[8px] leading-tight max-w-[150px]",
        md: "text-[10px] leading-tight max-w-[200px]",
        lg: "text-[12px] leading-tight max-w-[300px]",
      },
    },
    defaultVariants: {
      severity: "warning",
      size: "md",
    },
  },
);

const PixelWarningTooltipProvider = TooltipPrimitive.Provider;

const PixelWarningTooltip = TooltipPrimitive.Root;

const PixelWarningTooltipTrigger = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger> & {
    showIcon?: boolean;
    iconSize?: number;
    severity?: "warning" | "error" | "info" | "critical";
  }
>(
  (
    {
      className,
      children,
      showIcon = true,
      iconSize = 16,
      severity = "warning",
      ...props
    },
    ref,
  ) => {
    const iconColors = {
      warning: "text-[#ffa500]",
      error: "text-[#ff0000]",
      info: "text-[#0099ff]",
      critical: "text-[#ff00ff]",
    };

    return (
      <TooltipPrimitive.Trigger
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1 cursor-help transition-none duration-0",
          className,
        )}
        {...props}
      >
        {showIcon && (
          <AlertTriangle
            className={cn("animate-pulse", iconColors[severity])}
            size={iconSize}
          />
        )}
        {children}
      </TooltipPrimitive.Trigger>
    );
  },
);
PixelWarningTooltipTrigger.displayName = TooltipPrimitive.Trigger.displayName;

interface PixelWarningTooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
    VariantProps<typeof warningTooltipVariants> {
  showWarningIcon?: boolean;
}

const PixelWarningTooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  PixelWarningTooltipContentProps
>(
  (
    {
      className,
      sideOffset = 4,
      severity,
      size,
      showWarningIcon = true,
      children,
      ...props
    },
    ref,
  ) => (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(warningTooltipVariants({ severity, size }), className)}
      {...props}
    >
      <div className="flex items-start gap-2">
        {showWarningIcon && (
          <AlertTriangle className="shrink-0 mt-0.5" size={12} />
        )}
        <div className="flex-1">{children}</div>
      </div>
    </TooltipPrimitive.Content>
  ),
);
PixelWarningTooltipContent.displayName = TooltipPrimitive.Content.displayName;

export {
  PixelWarningTooltip,
  PixelWarningTooltipTrigger,
  PixelWarningTooltipContent,
  PixelWarningTooltipProvider,
};
