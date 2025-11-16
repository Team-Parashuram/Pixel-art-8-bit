"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const pixelCountUpVariants = cva(
  "font-bold uppercase tracking-wider pixel-font tabular-nums",
  {
    variants: {
      variant: {
        default: "text-black dark:text-[#ffd700]",
        primary: "text-[#ff8c00] dark:text-[#ff8c00]",
        secondary: "text-[#ffd700] dark:text-[#ffd700]",
        success: "text-[#00ff00] dark:text-[#00ff00]",
      },
      size: {
        sm: "text-xl",
        md: "text-4xl",
        lg: "text-6xl",
        xl: "text-8xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface PixelCountUpProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof pixelCountUpVariants> {
  to: number;
  from?: number;
  duration?: number;
  delay?: number;
  separator?: string;
  prefix?: string;
  suffix?: string;
  startWhen?: boolean;
  onStart?: () => void;
  onEnd?: () => void;
}

const PixelCountUp = React.forwardRef<HTMLSpanElement, PixelCountUpProps>(
  (
    {
      to,
      from = 0,
      duration = 2,
      delay = 0,
      separator = "",
      prefix = "",
      suffix = "",
      startWhen = true,
      onStart,
      onEnd,
      variant,
      size,
      className,
      ...props
    },
    ref,
  ) => {
    const [count, setCount] = React.useState(from);
    const [isInView, setIsInView] = React.useState(false);
    const containerRef = React.useRef<HTMLSpanElement>(null);
    const hasStarted = React.useRef(false);

    React.useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
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
    }, []);

    React.useEffect(() => {
      if (!isInView || !startWhen || hasStarted.current) return;

      hasStarted.current = true;
      onStart?.();

      const timeout = setTimeout(() => {
        const startTime = Date.now();
        const difference = to - from;

        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / (duration * 1000), 1);

          // Ease out cubic
          const easeProgress = 1 - (1 - progress) ** 3;
          const current = from + difference * easeProgress;

          setCount(Math.floor(current));

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setCount(to);
            onEnd?.();
          }
        };

        requestAnimationFrame(animate);
      }, delay * 1000);

      return () => clearTimeout(timeout);
    }, [isInView, startWhen, from, to, duration, delay, onStart, onEnd]);

    const formatNumber = (num: number) => {
      const str = num.toString();
      if (!separator) return str;
      return str.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    };

    return (
      <span
        ref={containerRef}
        className={cn(pixelCountUpVariants({ variant, size }), className)}
        {...props}
      >
        {prefix}
        {formatNumber(count)}
        {suffix}
      </span>
    );
  },
);

PixelCountUp.displayName = "PixelCountUp";

export { PixelCountUp, pixelCountUpVariants };
