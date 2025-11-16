"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const pixelGradientTextVariants = cva(
  "font-bold uppercase tracking-wider pixel-font inline-block bg-clip-text text-transparent",
  {
    variants: {
      variant: {
        sunset: "bg-gradient-to-r from-[#ff8c00] via-[#ff0080] to-[#ff8c00]",
        ocean: "bg-gradient-to-r from-[#00d4ff] via-[#5227FF] to-[#00d4ff]",
        forest: "bg-gradient-to-r from-[#00ff00] via-[#ffff00] to-[#00ff00]",
        cyber: "bg-gradient-to-r from-[#ff00ff] via-[#00ffff] to-[#ff00ff]",
        gold: "bg-gradient-to-r from-[#ffd700] via-[#ff8c00] to-[#ffd700]",
      },
      size: {
        sm: "text-sm",
        md: "text-2xl",
        lg: "text-4xl",
        xl: "text-6xl",
      },
    },
    defaultVariants: {
      variant: "sunset",
      size: "md",
    },
  },
);

export interface PixelGradientTextProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pixelGradientTextVariants> {
  text: string;
  animationSpeed?: number;
  showBorder?: boolean;
}

const PixelGradientText = React.forwardRef<
  HTMLDivElement,
  PixelGradientTextProps
>(
  (
    {
      text,
      animationSpeed = 8,
      showBorder = false,
      variant,
      size,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          pixelGradientTextVariants({ variant, size }),
          showBorder &&
            "pixel-borders border-2 border-black dark:border-white p-4",
          className,
        )}
        style={{
          backgroundSize: "200% 200%",
          animation: `pixel-gradient ${animationSpeed}s linear infinite`,
        }}
        {...props}
      >
        {text}
      </div>
    );
  },
);

PixelGradientText.displayName = "PixelGradientText";

export { PixelGradientText, pixelGradientTextVariants };
