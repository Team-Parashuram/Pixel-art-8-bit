"use client";

import { BoxSelect, Gem, Shield, Sword } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

type Rarity = "common" | "rare" | "epic" | "legendary";

export type PixelInventoryItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  quantity?: number;
  rarity?: Rarity;
  description?: string;
  disabled?: boolean;
};

type PixelInventoryPickerProps = {
  items: PixelInventoryItem[];
  selectedIds?: string[];
  defaultSelectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  maxSelections?: number;
  columns?: number;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  hasError?: boolean;
  emptyState?: React.ReactNode;
  className?: string;
  gridClassName?: string;
  slotClassName?: string;
  renderItem?: (
    item: PixelInventoryItem,
    state: { isSelected: boolean },
  ) => React.ReactNode;
};

type PixelInventorySlotProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  item: PixelInventoryItem;
  isSelected?: boolean;
};

const rarityAccent: Record<Rarity, string> = {
  common: "",
  rare: "border-primary",
  epic: "border-secondary",
  legendary: "border-(--color-pixel-light-primary)",
};

function DefaultIcon({ rarity }: { rarity?: Rarity }) {
  if (rarity === "legendary") {
    return <Gem className="h-6 w-6" aria-hidden="true" />;
  }
  if (rarity === "epic") {
    return <Sword className="h-6 w-6" aria-hidden="true" />;
  }
  if (rarity === "rare") {
    return <Shield className="h-6 w-6" aria-hidden="true" />;
  }
  return <BoxSelect className="h-6 w-6" aria-hidden="true" />;
}

const PixelInventorySlot = React.forwardRef<
  HTMLButtonElement,
  PixelInventorySlotProps
>(({ item, isSelected, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "relative flex h-28 w-full items-center justify-center overflow-visible border-4 border-black bg-pixel-light-surface p-3 text-center shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black focus-visible:ring-offset-4 focus-visible:ring-offset-white dark:border-[#ff8c00] dark:bg-pixel-dark-surface dark:focus-visible:ring-white dark:focus-visible:ring-offset-pixel-dark-surface",
        isSelected &&
          "border-(--color-pixel-light-primary) bg-pixel-light-bg text-black dark:border-[#ff8c00] dark:bg-pixel-dark-bg",
        item.disabled && "cursor-not-allowed opacity-50",
        item.rarity ? rarityAccent[item.rarity] : null,
        className,
      )}
      aria-pressed={isSelected}
      disabled={item.disabled || props.disabled}
      {...props}
    >
      {isSelected ? (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-1 z-0 animate-[pixel-pulse_1.4s_steps(2)_infinite] border-4 border-[#ff8c00] bg-linear-to-br from-[#fff1c1]/70 via-transparent to-transparent shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:from-[#351b00]/60"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.55),transparent)] opacity-40 mix-blend-screen"
          />
          <span className="pointer-events-none absolute -top-3 right-2 z-10 rounded border-2 border-black bg-white px-2 py-px text-[9px] font-black uppercase tracking-wide text-black shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:border-[#ff8c00] dark:bg-pixel-dark-surface dark:text-white">
            Selected
          </span>
        </>
      ) : null}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-2">
        <span className="text-black dark:text-white">
          {item.icon ?? <DefaultIcon rarity={item.rarity} />}
        </span>
        <span className="pixel-font text-[11px] uppercase text-black dark:text-white">
          {item.label}
        </span>
        {typeof item.quantity === "number" ? (
          <span className="text-[10px] font-bold text-black/70 dark:text-white/70">
            x{item.quantity}
          </span>
        ) : null}
        {item.rarity ? (
          <span className="pointer-events-none absolute left-2 top-2 rounded border-2 border-black bg-white px-2 py-px text-[9px] font-bold uppercase tracking-wide text-black shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:border-[#ff8c00] dark:bg-pixel-dark-surface dark:text-white">
            {item.rarity}
          </span>
        ) : null}
      </div>
    </button>
  );
});

PixelInventorySlot.displayName = "PixelInventorySlot";

export const PixelInventoryPicker = React.forwardRef<
  HTMLDivElement,
  PixelInventoryPickerProps
>(
  (
    {
      items,
      selectedIds,
      defaultSelectedIds,
      onSelectionChange,
      maxSelections,
      columns = 4,
      label,
      helperText,
      hasError = false,
      emptyState,
      className,
      gridClassName,
      slotClassName,
      renderItem,
    },
    ref,
  ) => {
    const isControlled = Array.isArray(selectedIds);
    const [internalSelected, setInternalSelected] = React.useState<string[]>(
      defaultSelectedIds ?? [],
    );
    const selection = isControlled ? (selectedIds ?? []) : internalSelected;

    const updateSelection = React.useCallback(
      (next: string[]) => {
        if (!isControlled) {
          setInternalSelected(next);
        }
        onSelectionChange?.(next);
      },
      [isControlled, onSelectionChange],
    );

    const toggleItem = React.useCallback(
      (item: PixelInventoryItem) => {
        if (item.disabled) return;
        const isSelected = selection.includes(item.id);
        if (isSelected) {
          updateSelection(selection.filter((id) => id !== item.id));
          return;
        }
        if (maxSelections && selection.length >= maxSelections) {
          return;
        }
        updateSelection([...selection, item.id]);
      },
      [maxSelections, selection, updateSelection],
    );

    const gridStyle = React.useMemo(
      () => ({
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }),
      [columns],
    );

    return (
      <div ref={ref} className={cn("space-y-3", className)}>
        {label ? (
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wide">
            <span className="text-black dark:text-white">{label}</span>
            {maxSelections ? (
              <span className="text-black/60 dark:text-white/60">
                {selection.length}/{maxSelections}
              </span>
            ) : (
              <span className="text-black/60 dark:text-white/60">
                {selection.length} selected
              </span>
            )}
          </div>
        ) : null}

        {items.length ? (
          <div className={cn("grid gap-3", gridClassName)} style={gridStyle}>
            {items.map((item) => {
              const isSelected = selection.includes(item.id);
              if (renderItem) {
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => toggleItem(item)}
                    className="block w-full outline-none focus-visible:ring-4 focus-visible:ring-black focus-visible:ring-offset-4 focus-visible:ring-offset-white dark:focus-visible:ring-white dark:focus-visible:ring-offset-pixel-dark-surface"
                  >
                    {renderItem(item, { isSelected })}
                  </button>
                );
              }

              return (
                <PixelInventorySlot
                  key={item.id}
                  item={item}
                  isSelected={isSelected}
                  className={slotClassName}
                  onClick={() => toggleItem(item)}
                />
              );
            })}
          </div>
        ) : (
          (emptyState ?? (
            <div className="flex min-h-[120px] flex-col items-center justify-center gap-2 border-4 border-dashed border-black bg-pixel-light-surface text-center shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:border-[#ff8c00] dark:bg-pixel-dark-surface">
              <p className="pixel-font text-xs uppercase text-black dark:text-white">
                No items
              </p>
              <p className="text-xs text-black/60 dark:text-white/60">
                Add items to start selecting
              </p>
            </div>
          ))
        )}

        {helperText ? (
          <p
            className={cn(
              "text-xs",
              hasError
                ? "text-destructive"
                : "text-black/60 dark:text-white/60",
            )}
          >
            {helperText}
          </p>
        ) : null}
      </div>
    );
  },
);

PixelInventoryPicker.displayName = "PixelInventoryPicker";

export { PixelInventorySlot };
