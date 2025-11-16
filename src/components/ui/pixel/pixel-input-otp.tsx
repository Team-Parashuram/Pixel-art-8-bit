"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { cn } from "@/lib/utils";

type PixelInputOTPProps = React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
  hasError?: boolean;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
};

function PixelInputOTP({
  className,
  containerClassName,
  hasError = false,
  label,
  helperText,
  ...props
}: PixelInputOTPProps) {
  return (
    <div className="space-y-2">
      {label ? (
        <label className="text-xs font-bold uppercase tracking-wide text-black dark:text-white">
          {label}
        </label>
      ) : null}
      <OTPInput
        containerClassName={cn(
          "flex items-center gap-2 has-disabled:opacity-50",
          hasError && "animate-shake",
          containerClassName
        )}
        className={cn("disabled:cursor-not-allowed", className)}
        {...props}
      />
      {helperText ? (
        <p
          className={cn(
            "text-xs font-mono",
            hasError ? "text-[#ff4d4f]" : "text-black/60 dark:text-white/60"
          )}
        >
          {helperText}
        </p>
      ) : null}
    </div>
  );
}

function PixelInputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex items-center", className)}
      {...props}
    />
  );
}

function PixelInputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      className={cn(
  "relative flex h-12 w-12 select-none items-center justify-center border-4 border-black bg-pixel-light-surface pixel-font text-lg uppercase text-black shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-none dark:bg-pixel-dark-surface dark:text-white",
        isActive && "z-10 border-[#ff8c00] dark:border-[#ff8c00]",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-black dark:bg-white" />
        </div>
      ) : null}
    </div>
  );
}

function PixelInputOTPSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="separator"
  className={cn("px-2 text-lg pixel-font", className)}
      {...props}
    >
      -
    </div>
  );
}

export { PixelInputOTP, PixelInputOTPGroup, PixelInputOTPSlot, PixelInputOTPSeparator };
