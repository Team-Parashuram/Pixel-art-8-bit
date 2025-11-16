"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const pixelSpotlightCardVariants = cva(
  "relative overflow-hidden pixel-borders transition-all duration-200",
  {
    variants: {
      variant: {
        default:
          "bg-white dark:bg-black border-2 border-black dark:border-white",
        primary:
          "bg-[#ff8c00]/10 dark:bg-[#ff8c00]/5 border-2 border-[#ff8c00]",
        secondary:
          "bg-[#ffd700]/10 dark:bg-[#ffd700]/5 border-2 border-[#ffd700]",
        accent: "bg-[#5227FF]/10 dark:bg-[#5227FF]/5 border-2 border-[#5227FF]",
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

export interface PixelSpotlightCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pixelSpotlightCardVariants> {
  spotlightColor?: string;
  spotlightSize?: number;
}

const PixelSpotlightCard = React.forwardRef<
  HTMLDivElement,
  PixelSpotlightCardProps
>(
  (
    {
      spotlightColor = "rgba(255, 215, 0, 0.3)",
      spotlightSize = 200,
      variant,
      size,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const divRef = React.useRef<HTMLDivElement>(null);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = React.useState(0);
    const [isFocused, setIsFocused] = React.useState(false);

    const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
      if (!divRef.current) return;

      const rect = divRef.current.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const handleFocus = () => {
      setIsFocused(true);
      setOpacity(1);
    };

    const handleBlur = () => {
      setIsFocused(false);
      setOpacity(0);
    };

    return (
      <div
        ref={divRef}
        className={cn(pixelSpotlightCardVariants({ variant, size }), className)}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleFocus}
        onMouseLeave={handleBlur}
        {...props}
      >
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            opacity,
            background: `radial-gradient(${spotlightSize}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
          }}
        />
        <div className="relative z-10">{children}</div>
      </div>
    );
  },
);

PixelSpotlightCard.displayName = "PixelSpotlightCard";

export { PixelSpotlightCard, pixelSpotlightCardVariants };
