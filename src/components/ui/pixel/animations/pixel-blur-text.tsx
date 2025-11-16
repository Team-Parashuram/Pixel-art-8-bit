"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const pixelBlurTextVariants = cva(
  "font-bold uppercase tracking-wider pixel-font inline-block",
  {
    variants: {
      variant: {
        default: "text-black dark:text-[#ffd700]",
        primary: "text-[#ff8c00] dark:text-[#ff8c00]",
        secondary: "text-[#ffd700] dark:text-[#ffd700]",
        accent: "text-[#5227FF] dark:text-[#B19EEF]",
      },
      size: {
        sm: "text-sm",
        md: "text-2xl",
        lg: "text-4xl",
        xl: "text-6xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface PixelBlurTextProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pixelBlurTextVariants> {
  text: string;
  duration?: number;
  animateOnHover?: boolean;
}

const PixelBlurText = React.forwardRef<HTMLDivElement, PixelBlurTextProps>(
  (
    {
      text,
      duration = 1,
      animateOnHover = false,
      variant,
      size,
      className,
      ...props
    },
    ref,
  ) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !animateOnHover) {
            setIsVisible(true);
          }
        },
        { threshold: 0.1 },
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => {
        if (containerRef.current) {
          observer.unobserve(containerRef.current);
        }
      };
    }, [animateOnHover]);

    const shouldAnimate = animateOnHover ? isHovered : isVisible;

    return (
      <div
        ref={containerRef}
        className={cn(
          pixelBlurTextVariants({ variant, size }),
          "relative overflow-hidden",
          className,
        )}
        onMouseEnter={() => animateOnHover && setIsHovered(true)}
        onMouseLeave={() => animateOnHover && setIsHovered(false)}
        {...props}
      >
        {text.split("").map((char, index) => (
          <span
            key={index}
            className="inline-block transition-all"
            style={{
              filter: shouldAnimate ? "blur(0px)" : "blur(8px)",
              opacity: shouldAnimate ? 1 : 0,
              transform: shouldAnimate ? "translateY(0)" : "translateY(10px)",
              transitionDelay: `${index * (duration / text.length)}s`,
              transitionDuration: `${duration}s`,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
    );
  },
);

PixelBlurText.displayName = "PixelBlurText";

export { PixelBlurText, pixelBlurTextVariants };
