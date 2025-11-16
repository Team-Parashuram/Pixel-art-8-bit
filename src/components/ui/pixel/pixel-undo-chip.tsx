"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { CheckCircle2, Undo2, X } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

const undoChipVariants = cva(
  "pixel-borders border-4 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-[family-name:var(--font-press-start)] text-xs flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-0",
  {
    variants: {
      variant: {
        default:
          "bg-[#4ade80] text-black dark:bg-[#15803d] dark:text-white dark:border-[#22c55e]",
        info: "bg-[#60a5fa] text-black dark:bg-[#1e40af] dark:text-white dark:border-[#3b82f6]",
        warning:
          "bg-[#fbbf24] text-black dark:bg-[#92400e] dark:text-white dark:border-[#f59e0b]",
        error:
          "bg-[#f87171] text-black dark:bg-[#991b1b] dark:text-white dark:border-[#ef4444]",
      },
      size: {
        sm: "text-[8px] py-2 px-3 gap-2",
        md: "text-[10px] py-3 px-4 gap-3",
        lg: "text-[12px] py-4 px-5 gap-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface UndoChipProps extends VariantProps<typeof undoChipVariants> {
  message: string;
  onUndo?: () => void;
  onClose?: () => void;
  duration?: number;
  showIcon?: boolean;
  showUndoIcon?: boolean;
  className?: string;
}

export function PixelUndoChip({
  message,
  onUndo,
  onClose,
  duration = 5000,
  showIcon = true,
  showUndoIcon = true,
  variant = "default",
  size = "md",
  className,
}: UndoChipProps) {
  const [isVisible, setIsVisible] = React.useState(true);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (duration > 0) {
      timerRef.current = setTimeout(() => {
        handleClose();
      }, duration);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const handleUndo = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    onUndo?.();
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <div className={cn(undoChipVariants({ variant, size }), className)}>
      {showIcon && (
        <CheckCircle2
          className="shrink-0"
          size={size === "sm" ? 12 : size === "lg" ? 18 : 14}
        />
      )}

      <span className="flex-1">{message}</span>

      {onUndo && (
        <button
          onClick={handleUndo}
          className="pixel-borders border-2 border-black px-2 py-1 hover:bg-black/10 dark:border-white dark:hover:bg-white/10 transition-none duration-0 flex items-center gap-1 font-bold uppercase"
          aria-label="Undo action"
        >
          {showUndoIcon && (
            <Undo2 size={size === "sm" ? 8 : size === "lg" ? 12 : 10} />
          )}
          Undo
        </button>
      )}

      <button
        onClick={handleClose}
        className="pixel-borders border-2 border-black p-1 hover:bg-black/10 dark:border-white dark:hover:bg-white/10 transition-none duration-0"
        aria-label="Close notification"
      >
        <X size={size === "sm" ? 8 : size === "lg" ? 12 : 10} />
      </button>
    </div>
  );
}

interface UndoChipContextValue {
  showUndoChip: (
    message: string,
    options?: {
      onUndo?: () => void;
      duration?: number;
      variant?: "default" | "info" | "warning" | "error";
      size?: "sm" | "md" | "lg";
    },
  ) => void;
}

const UndoChipContext = React.createContext<UndoChipContextValue | undefined>(
  undefined,
);

export function PixelUndoChipProvider({
  children,
  position = "bottom-center",
}: {
  children: React.ReactNode;
  position?:
    | "bottom-center"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "top-left"
    | "top-right";
}) {
  const [chips, setChips] = React.useState<
    Array<{
      id: string;
      message: string;
      onUndo?: () => void;
      duration?: number;
      variant?: "default" | "info" | "warning" | "error";
      size?: "sm" | "md" | "lg";
    }>
  >([]);

  const showUndoChip = React.useCallback(
    (
      message: string,
      options?: {
        onUndo?: () => void;
        duration?: number;
        variant?: "default" | "info" | "warning" | "error";
        size?: "sm" | "md" | "lg";
      },
    ) => {
      const id = `chip-${Date.now()}-${Math.random()}`;
      setChips((prev) => [...prev, { id, message, ...options }]);
    },
    [],
  );

  const removeChip = React.useCallback((id: string) => {
    setChips((prev) => prev.filter((chip) => chip.id !== id));
  }, []);

  const positionClasses = {
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
  };

  return (
    <UndoChipContext.Provider value={{ showUndoChip }}>
      {children}
      <div
        className={cn(
          "fixed z-50 flex flex-col gap-2",
          positionClasses[position],
        )}
      >
        {chips.map((chip) => (
          <PixelUndoChip
            key={chip.id}
            message={chip.message}
            onUndo={chip.onUndo}
            onClose={() => removeChip(chip.id)}
            duration={chip.duration}
            variant={chip.variant}
            size={chip.size}
          />
        ))}
      </div>
    </UndoChipContext.Provider>
  );
}

export function usePixelUndoChip() {
  const context = React.useContext(UndoChipContext);
  if (!context) {
    throw new Error(
      "usePixelUndoChip must be used within PixelUndoChipProvider",
    );
  }
  return context;
}
