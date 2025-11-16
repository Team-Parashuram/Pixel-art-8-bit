"use client";

import { cva, type VariantProps } from "class-variance-authority";
import {
  AlertCircle,
  Bot,
  CheckCircle2,
  Loader2,
  Sparkles,
} from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

const aiBubbleVariants = cva(
  "pixel-borders border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-[family-name:var(--font-press-start)] inline-flex items-center gap-3 animate-in fade-in-0 zoom-in-95 duration-0",
  {
    variants: {
      variant: {
        thinking:
          "bg-[#e0e7ff] text-[#4338ca] dark:bg-[#1e1b4b] dark:text-[#818cf8] dark:border-[#6366f1]",
        ready:
          "bg-[#d1fae5] text-[#065f46] dark:bg-[#064e3b] dark:text-[#6ee7b7] dark:border-[#10b981]",
        processing:
          "bg-[#fef3c7] text-[#92400e] dark:bg-[#451a03] dark:text-[#fcd34d] dark:border-[#f59e0b]",
        error:
          "bg-[#fee2e2] text-[#991b1b] dark:bg-[#450a0a] dark:text-[#fca5a5] dark:border-[#ef4444]",
        typing:
          "bg-[#ddd6fe] text-[#5b21b6] dark:bg-[#2e1065] dark:text-[#c4b5fd] dark:border-[#8b5cf6]",
      },
      size: {
        sm: "text-[8px] py-2 px-3",
        md: "text-[10px] py-3 px-4",
        lg: "text-[12px] py-4 px-5",
      },
    },
    defaultVariants: {
      variant: "thinking",
      size: "md",
    },
  },
);

export interface PixelAIBubbleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof aiBubbleVariants> {
  message?: string;
  showIcon?: boolean;
  animate?: boolean;
}

const PixelAIBubble = React.forwardRef<HTMLDivElement, PixelAIBubbleProps>(
  (
    {
      className,
      variant = "thinking",
      size = "md",
      message,
      showIcon = true,
      animate = true,
      ...props
    },
    ref,
  ) => {
    const getIcon = () => {
      const iconSize = size === "sm" ? 12 : size === "lg" ? 18 : 14;

      switch (variant) {
        case "thinking":
          return animate ? (
            <Loader2 className="animate-spin shrink-0" size={iconSize} />
          ) : (
            <Bot className="shrink-0" size={iconSize} />
          );
        case "ready":
          return <CheckCircle2 className="shrink-0" size={iconSize} />;
        case "processing":
          return (
            <Sparkles
              className={cn("shrink-0", animate && "animate-pulse")}
              size={iconSize}
            />
          );
        case "error":
          return <AlertCircle className="shrink-0" size={iconSize} />;
        case "typing":
          return (
            <Bot
              className={cn("shrink-0", animate && "animate-pulse")}
              size={iconSize}
            />
          );
        default:
          return <Bot className="shrink-0" size={iconSize} />;
      }
    };

    const getDefaultMessage = () => {
      switch (variant) {
        case "thinking":
          return "I'm thinking...";
        case "ready":
          return "Answer ready!";
        case "processing":
          return "Processing...";
        case "error":
          return "Something went wrong";
        case "typing":
          return "Typing...";
        default:
          return "";
      }
    };

    return (
      <div
        ref={ref}
        className={cn(aiBubbleVariants({ variant, size }), className)}
        {...props}
      >
        {showIcon && getIcon()}
        <span className="font-bold">{message || getDefaultMessage()}</span>
        {variant === "typing" && animate && (
          <div className="flex gap-1">
            <span className="w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:0ms]" />
            <span className="w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:150ms]" />
            <span className="w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:300ms]" />
          </div>
        )}
      </div>
    );
  },
);
PixelAIBubble.displayName = "PixelAIBubble";

export { PixelAIBubble };
