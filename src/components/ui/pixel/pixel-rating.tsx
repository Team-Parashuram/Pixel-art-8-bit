"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const pixelRatingVariants = cva(
  "inline-flex gap-1 pixel-borders items-center",
  {
    variants: {
      variant: {
        default: "text-[#ff8c00]",
        gold: "text-[#ffd700]",
        red: "text-[#ff0000]",
      },
      size: {
        sm: "text-base",
        md: "text-2xl",
        lg: "text-4xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface PixelRatingProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pixelRatingVariants> {
  value?: number;
  maxStars?: number;
  onRatingChange?: (rating: number) => void;
  readOnly?: boolean;
}

const PixelRating = React.forwardRef<HTMLDivElement, PixelRatingProps>(
  (
    {
      className,
      variant,
      size,
      value = 0,
      maxStars = 5,
      onRatingChange,
      readOnly = false,
      ...props
    },
    ref,
  ) => {
    const [hoverValue, setHoverValue] = React.useState<number | null>(null);
    const [currentValue, setCurrentValue] = React.useState(value);

    const handleClick = (rating: number) => {
      if (!readOnly) {
        setCurrentValue(rating);
        onRatingChange?.(rating);
      }
    };

    return (
      <div
        ref={ref}
        className={cn(pixelRatingVariants({ variant, size, className }))}
        {...props}
      >
        {Array.from({ length: maxStars }, (_, i) => i + 1).map((star) => {
          const isFilled = (hoverValue ?? currentValue) >= star;
          return (
            <button
              key={star}
              type="button"
              onClick={() => handleClick(star)}
              onMouseEnter={() => !readOnly && setHoverValue(star)}
              onMouseLeave={() => !readOnly && setHoverValue(null)}
              disabled={readOnly}
              className={cn(
                "transition-none duration-0 pixel-borders p-1",
                !readOnly && "cursor-pointer hover:scale-110",
                readOnly && "cursor-default",
              )}
              aria-label={`Rate ${star} out of ${maxStars}`}
            >
              <span className={isFilled ? "opacity-100" : "opacity-30"}>★</span>
            </button>
          );
        })}
      </div>
    );
  },
);

PixelRating.displayName = "PixelRating";

export { PixelRating, pixelRatingVariants };
