"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const pixelCircularTextVariants = cva(
  "font-bold uppercase tracking-wider pixel-font inline-block relative",
  {
    variants: {
      variant: {
        default: "text-black dark:text-[#ffd700]",
        primary: "text-[#ff8c00] dark:text-[#ff8c00]",
        secondary: "text-[#ffd700] dark:text-[#ffd700]",
        accent: "text-[#5227FF] dark:text-[#B19EEF]",
      },
      size: {
        sm: "text-xs w-16 h-16",
        md: "text-sm w-24 h-24",
        lg: "text-base w-32 h-32",
        xl: "text-lg w-40 h-40",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface PixelCircularTextProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pixelCircularTextVariants> {
  text: string;
  spinDuration?: number;
  onHover?: "slowDown" | "speedUp" | "pause" | "reverse";
}

const PixelCircularText = React.forwardRef<
  HTMLDivElement,
  PixelCircularTextProps
>(
  (
    {
      text,
      spinDuration = 20,
      onHover = "speedUp",
      variant,
      size,
      className,
      ...props
    },
    ref,
  ) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const letters = Array.from(text);

    const getAnimationDuration = () => {
      if (!isHovered) return spinDuration;

      switch (onHover) {
        case "slowDown":
          return spinDuration * 2;
        case "speedUp":
          return spinDuration / 2;
        case "pause":
          return 0;
        case "reverse":
          return -spinDuration;
        default:
          return spinDuration;
      }
    };

    const duration = getAnimationDuration();

    return (
      <div
        ref={ref}
        className={cn(
          pixelCircularTextVariants({ variant, size }),
          "flex items-center justify-center",
          className,
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            animation:
              duration !== 0
                ? `pixel-rotate ${Math.abs(duration)}s linear infinite ${duration < 0 ? "reverse" : ""}`
                : "none",
          }}
        >
          {letters.map((letter, index) => {
            const angle = (360 / letters.length) * index;
            return (
              <span
                key={index}
                className="absolute"
                style={{
                  transform: `rotate(${angle}deg) translateY(-200%)`,
                  transformOrigin: "0 100%",
                }}
              >
                {letter}
              </span>
            );
          })}
        </div>
      </div>
    );
  },
);

PixelCircularText.displayName = "PixelCircularText";

export { PixelCircularText, pixelCircularTextVariants };
