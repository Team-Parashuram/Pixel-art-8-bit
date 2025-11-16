"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const pixelGlareCardVariants = cva(
  "relative overflow-hidden pixel-borders transition-all duration-300",
  {
    variants: {
      variant: {
        default:
          "bg-white dark:bg-black border-2 border-black dark:border-white",
        primary: "bg-[#ff8c00] border-2 border-black dark:border-[#ff8c00]",
        secondary: "bg-[#ffd700] border-2 border-black dark:border-[#ffd700]",
        glass:
          "bg-white/10 dark:bg-black/10 backdrop-blur-sm border-2 border-white/20",
      },
      size: {
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface PixelGlareCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pixelGlareCardVariants> {
  glareColor?: string;
  glareOpacity?: number;
  glareSize?: number;
  playOnce?: boolean;
}

const PixelGlareCard = React.forwardRef<HTMLDivElement, PixelGlareCardProps>(
  (
    {
      glareColor = "#ffffff",
      glareOpacity = 0.5,
      glareSize = 250,
      playOnce = false,
      variant,
      size,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [hasPlayed, setHasPlayed] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);

    const handleMouseEnter = () => {
      if (playOnce && hasPlayed) return;
      setIsHovered(true);
      if (playOnce) setHasPlayed(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    // Convert hex to rgba
    const hex = glareColor.replace("#", "");
    let rgba = glareColor;
    if (hex.length === 3 || hex.length === 6) {
      const r = parseInt(hex.substring(0, hex.length / 3), 16);
      const g = parseInt(
        hex.substring(hex.length / 3, (2 * hex.length) / 3),
        16,
      );
      const b = parseInt(hex.substring((2 * hex.length) / 3), 16);
      rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
    }

    return (
      <div
        ref={ref}
        className={cn(
          pixelGlareCardVariants({ variant, size }),
          "group",
          className,
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <div
          className={cn(
            "pointer-events-none absolute inset-0 transition-opacity duration-500",
            isHovered ? "opacity-100" : "opacity-0",
          )}
          style={{
            background: `linear-gradient(135deg, ${rgba} 0%, transparent ${glareSize}px)`,
          }}
        />
        <div className="relative z-10">{children}</div>
      </div>
    );
  },
);

PixelGlareCard.displayName = "PixelGlareCard";

export { PixelGlareCard, pixelGlareCardVariants };
