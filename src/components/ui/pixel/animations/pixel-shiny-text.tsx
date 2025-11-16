"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const pixelShinyTextVariants = cva(
  "font-bold uppercase tracking-wider pixel-font inline-block bg-clip-text text-transparent",
  {
    variants: {
      variant: {
        gold: "bg-gradient-to-r from-[#ffd700] via-[#ffffff] to-[#ffd700]",
        silver: "bg-gradient-to-r from-[#c0c0c0] via-[#ffffff] to-[#c0c0c0]",
        rainbow: "bg-gradient-to-r from-[#ff0000] via-[#00ff00] to-[#0000ff]",
        fire: "bg-gradient-to-r from-[#ff8c00] via-[#ffff00] to-[#ff8c00]",
      },
      size: {
        sm: "text-sm",
        md: "text-2xl",
        lg: "text-4xl",
        xl: "text-6xl",
      },
    },
    defaultVariants: {
      variant: "gold",
      size: "md",
    },
  },
);

export interface PixelShinyTextProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pixelShinyTextVariants> {
  text: string;
  speed?: number;
  disabled?: boolean;
}

const PixelShinyText = React.forwardRef<HTMLDivElement, PixelShinyTextProps>(
  (
    { text, speed = 5, disabled = false, variant, size, className, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          pixelShinyTextVariants({ variant, size }),
          disabled && "opacity-50",
          className,
        )}
        style={{
          backgroundSize: "200% 100%",
          backgroundPosition: disabled ? "0% center" : undefined,
          animation: !disabled
            ? `pixel-shine ${speed}s linear infinite`
            : "none",
        }}
        {...props}
      >
        {text}
      </div>
    );
  },
);

PixelShinyText.displayName = "PixelShinyText";

export { PixelShinyText, pixelShinyTextVariants };
