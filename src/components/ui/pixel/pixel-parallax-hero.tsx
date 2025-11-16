"use client";

import Link from "next/link";
import * as React from "react";
import { PixelButton } from "@/components/ui/pixel/pixel-button";
import { cn } from "@/lib/utils";

export type PixelParallaxHeroShape = "square" | "circle" | "diamond" | "pill";

export interface PixelParallaxLayer {
  /** Size of the decorative layer in pixels */
  size?: number;
  /** Hex or rgba color */
  color?: string;
  /** Tailwind blur utility (e.g. blur-sm) */
  blurClassName?: string;
  /** 0-1 opacity */
  opacity?: number;
  /** Movement multiplier, higher = faster parallax */
  speed?: number;
  /** Extra class names for gradients/shadows */
  className?: string;
  /** Positioning within the hero canvas */
  position?: React.CSSProperties;
  /** Pixel-perfect shape */
  shape?: PixelParallaxHeroShape;
  /** Border color override */
  borderColor?: string;
}

export interface PixelParallaxHeroStat {
  label: string;
  value: string;
  hint?: string;
}

export interface PixelParallaxHeroAction {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  variant?: "default" | "secondary" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

export interface PixelParallaxHeroProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  badge?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  primaryAction?: PixelParallaxHeroAction;
  secondaryAction?: PixelParallaxHeroAction;
  stats?: PixelParallaxHeroStat[];
  layers?: PixelParallaxLayer[];
  contentAlign?: "left" | "center";
}

const defaultLayers: PixelParallaxLayer[] = [
  {
    size: 220,
    color: "#ff8c00",
    opacity: 0.75,
    speed: 0.15,
    shape: "diamond",
    className: "shadow-[8px_8px_0px_rgba(0,0,0,0.4)]",
    position: { top: "6%", left: "6%" },
  },
  {
    size: 140,
    color: "#ffd700",
    opacity: 0.8,
    speed: 0.2,
    shape: "square",
    className: "pixel-borders border-2 border-black dark:border-[#ff8c00]",
    position: { top: "22%", right: "12%" },
  },
  {
    size: 260,
    color: "rgba(82,39,255,0.7)",
    opacity: 0.5,
    speed: 0.08,
    shape: "circle",
    blurClassName: "blur-sm",
    position: { bottom: "4%", left: "20%" },
  },
  {
    size: 90,
    color: "#00f0ff",
    opacity: 0.9,
    speed: 0.32,
    shape: "pill",
    className: "pixel-borders border-2 border-black dark:border-white",
    position: { bottom: "18%", right: "18%" },
  },
];

const defaultStats: PixelParallaxHeroStat[] = [
  { label: "Components", value: "50+" },
  { label: "Patterns", value: "12" },
  { label: "FPS", value: "60" },
];

const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) =>
      setPrefersReducedMotion(event.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return prefersReducedMotion;
};

const getShapeClassName = (shape: PixelParallaxHeroShape | undefined) => {
  switch (shape) {
    case "circle":
      return "rounded-full";
    case "diamond":
      return "rotate-45";
    case "pill":
      return "rounded-full aspect-[2/1]";
    case "square":
    default:
      return "";
  }
};

function renderAction(
  action?: PixelParallaxHeroAction,
  fallbackVariant: PixelParallaxHeroAction["variant"] = "default",
) {
  if (!action) return null;

  const { href, label, icon, onClick, variant, size } = action;

  if (href) {
    return (
      <PixelButton
        variant={variant ?? fallbackVariant}
        size={size ?? "lg"}
        asChild
      >
        <Link href={href} className="inline-flex items-center gap-2">
          {icon}
          {label}
        </Link>
      </PixelButton>
    );
  }

  return (
    <PixelButton
      variant={variant ?? fallbackVariant}
      size={size ?? "lg"}
      onClick={onClick}
    >
      <span className="inline-flex items-center gap-2">
        {icon}
        {label}
      </span>
    </PixelButton>
  );
}

const PixelParallaxHero = React.forwardRef<
  HTMLDivElement,
  PixelParallaxHeroProps
>(
  (
    {
      badge,
      title,
      subtitle,
      description,
      primaryAction,
      secondaryAction,
      stats = defaultStats,
      layers = defaultLayers,
      contentAlign = "left",
      className,
      ...props
    },
    ref,
  ) => {
    const prefersReducedMotion = usePrefersReducedMotion();
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [offset, setOffset] = React.useState({ x: 0, y: 0 });
    const frameRef = React.useRef<number | null>(null);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const percentX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const percentY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() =>
        setOffset({ x: percentX, y: percentY }),
      );
    };

    const resetOffset = () => setOffset({ x: 0, y: 0 });

    React.useEffect(
      () => () => {
        if (frameRef.current) cancelAnimationFrame(frameRef.current);
      },
      [],
    );

    return (
      <section
        ref={(node: HTMLDivElement | null) => {
          containerRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current =
              node;
          }
        }}
        className={cn(
          "relative overflow-hidden pixel-borders border-4 border-black bg-[#fff6e5] dark:bg-[#050505] dark:border-[#ff8c00] shadow-[8px_8px_0px_rgba(0,0,0,1)]",
          "px-6 py-12 md:px-10 md:py-16 lg:px-16 lg:py-20",
          className,
        )}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetOffset}
        {...props}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(0deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="relative grid gap-10 lg:grid-cols-2">
          <div
            className={cn(
              "space-y-6",
              contentAlign === "center" && "text-center",
            )}
          >
            {badge ? (
              <div className="inline-flex items-center gap-2 rounded-none border-2 border-black bg-[#ff8c00] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white dark:border-[#ff8c00]">
                {badge}
              </div>
            ) : null}

            <div className="space-y-4">
              {subtitle ? (
                <p className="text-sm uppercase tracking-[0.3em] text-black/60 dark:text-white/60">
                  {subtitle}
                </p>
              ) : null}
              <div className="text-4xl font-black uppercase leading-tight tracking-tight text-black dark:text-pixel-dark-secondary md:text-5xl lg:text-6xl">
                {title}
              </div>
              {description ? (
                <p className="text-base text-black/70 dark:text-white/70 md:text-lg">
                  {description}
                </p>
              ) : null}
            </div>

            {(primaryAction || secondaryAction) && (
              <div
                className={cn(
                  "flex flex-wrap gap-4",
                  contentAlign === "center" && "justify-center",
                )}
              >
                {renderAction(primaryAction)}
                {renderAction(secondaryAction, "ghost")}
              </div>
            )}

            {stats?.length ? (
              <dl className="grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="pixel-borders border-2 border-black bg-white/70 px-4 py-3 text-left dark:border-[#ff8c00] dark:bg-[#0e0e0e]/80"
                  >
                    <dd className="text-2xl font-bold uppercase tracking-wide text-black dark:text-pixel-dark-secondary">
                      {stat.value}
                    </dd>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-black/70 dark:text-white/70">
                      {stat.label}
                    </dt>
                    {stat.hint ? (
                      <p className="mt-1 text-[11px] text-black/60 dark:text-white/60">
                        {stat.hint}
                      </p>
                    ) : null}
                  </div>
                ))}
              </dl>
            ) : null}
          </div>

          <div className="relative h-80 rounded-none border-4 border-black bg-linear-to-br from-[#330a00] via-[#12002a] to-[#001a2a] dark:border-[#ff8c00] md:h-[420px]">
            <div
              className="absolute inset-0 opacity-40"
              aria-hidden="true"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, rgba(255,140,0,0.25) 0%, rgba(255,215,0,0.05) 50%, transparent 80%)",
              }}
            />

            {layers.map((layer, index) => (
              <span
                key={index}
                className={cn(
                  "absolute block pixel-borders border-2 border-black/40 dark:border-white/30",
                  getShapeClassName(layer.shape ?? "square"),
                  layer.blurClassName,
                  layer.className,
                )}
                style={{
                  width:
                    layer.shape === "pill"
                      ? (layer.size ?? 120) * 1.8
                      : (layer.size ?? 160),
                  height: layer.size ?? 160,
                  opacity: layer.opacity ?? 0.8,
                  backgroundColor: layer.color ?? "#ff8c00",
                  borderColor: layer.borderColor,
                  transform:
                    `translate3d(${offset.x * 20 * (layer.speed ?? 0.15)}px, ${offset.y * 20 * (layer.speed ?? 0.15)}px, 0)` +
                    (layer.shape === "diamond" ? " rotate(45deg)" : ""),
                  ...layer.position,
                }}
              />
            ))}

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center">
              <div className="pixel-borders border-4 border-white/80 bg-black/70 px-6 py-4 text-white shadow-[8px_8px_0px_rgba(0,0,0,0.6)]">
                <p className="text-sm uppercase tracking-[0.4em] text-white/60">
                  Retro Mode
                </p>
                <p className="text-3xl font-black tracking-wide text-[#00f0ff]">
                  Parallax
                </p>
                <p className="text-xs text-white/70">
                  Move your cursor to explore depth
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  },
);

PixelParallaxHero.displayName = "PixelParallaxHero";

export { PixelParallaxHero };
