import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const pixelFeaturesVariants = cva(
  "relative w-full",
  {
    variants: {
      variant: {
        default: "bg-[#f5f5dc] dark:bg-[#1a1a1a]",
        primary: "bg-[#ff8c00] text-white",
        secondary: "bg-[#ffd700] text-black",
        dark: "bg-black text-white",
      },
      columns: {
        1: "grid-cols-1",
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
      },
      gap: {
        none: "gap-0",
        sm: "gap-4",
        md: "gap-8",
        lg: "gap-12",
        xl: "gap-16",
      },
    },
    defaultVariants: {
      variant: "default",
      columns: 3,
      gap: "lg",
    },
  }
);

export interface PixelFeaturesProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pixelFeaturesVariants> {
  children?: React.ReactNode;
}

const PixelFeatures = React.forwardRef<HTMLDivElement, PixelFeaturesProps>(
  ({ className, variant, columns, gap, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(pixelFeaturesVariants({ variant }), "py-16 md:py-24", className)}
        {...props}
      >
        <div className="container mx-auto px-4">
          <div className={cn("grid", pixelFeaturesVariants({ columns, gap }))}>
            {children}
          </div>
        </div>
      </section>
    );
  }
);
PixelFeatures.displayName = "PixelFeatures";

const pixelFeatureItemVariants = cva(
  "relative border-4 border-black p-6 transition-none",
  {
    variants: {
      variant: {
        default: "bg-white dark:bg-[#2a2a2a] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
        primary: "bg-[#ff8c00] text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
        secondary: "bg-[#ffd700] text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
        dark: "bg-black text-white border-[#ff8c00] shadow-[6px_6px_0px_0px_rgba(255,140,0,0.5)]",
        gradient: "bg-gradient-to-br from-[#ff8c00] to-[#ffd700] text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
        ghost: "bg-transparent border-dashed border-black/30 dark:border-white/30 shadow-none",
      },
      hover: {
        none: "",
        lift: "hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
        glow: "hover:shadow-[0_0_20px_rgba(255,140,0,0.6)]",
      },
    },
    defaultVariants: {
      variant: "default",
      hover: "lift",
    },
  }
);

export interface PixelFeatureItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pixelFeatureItemVariants> {}

const PixelFeatureItem = React.forwardRef<HTMLDivElement, PixelFeatureItemProps>(
  ({ className, variant, hover, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(pixelFeatureItemVariants({ variant, hover }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
PixelFeatureItem.displayName = "PixelFeatureItem";

const PixelFeatureIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center text-4xl mb-4",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
PixelFeatureIcon.displayName = "PixelFeatureIcon";

const PixelFeatureTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl md:text-2xl font-bold uppercase tracking-wide mb-3 font-[family-name:var(--font-pixel)]",
      className
    )}
    {...props}
  >
    {children}
  </h3>
));
PixelFeatureTitle.displayName = "PixelFeatureTitle";

const PixelFeatureDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm md:text-base leading-relaxed opacity-90", className)}
    {...props}
  >
    {children}
  </p>
));
PixelFeatureDescription.displayName = "PixelFeatureDescription";

const PixelFeatureHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-center mb-12", className)}
    {...props}
  >
    {children}
  </div>
));
PixelFeatureHeader.displayName = "PixelFeatureHeader";

const PixelFeatureSectionTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "text-3xl md:text-5xl font-bold uppercase tracking-wider mb-4 font-[family-name:var(--font-pixel)]",
      className
    )}
    {...props}
  >
    {children}
  </h2>
));
PixelFeatureSectionTitle.displayName = "PixelFeatureSectionTitle";

const PixelFeatureSectionDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-base md:text-xl opacity-80 max-w-3xl mx-auto", className)}
    {...props}
  >
    {children}
  </p>
));
PixelFeatureSectionDescription.displayName = "PixelFeatureSectionDescription";

export {
  PixelFeatures,
  PixelFeatureItem,
  PixelFeatureIcon,
  PixelFeatureTitle,
  PixelFeatureDescription,
  PixelFeatureHeader,
  PixelFeatureSectionTitle,
  PixelFeatureSectionDescription,
  pixelFeaturesVariants,
  pixelFeatureItemVariants,
};
