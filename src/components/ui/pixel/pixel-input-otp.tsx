"use client";

import { OTPInput, OTPInputContext } from "input-otp";
import * as React from "react";
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
  const generatedId = React.useId();
  const otpId = props.id ?? `pixel-otp-${generatedId}`;
  return (
    <div className="space-y-2">
      {label ? (
        <label
          className="text-xs font-bold uppercase tracking-wide text-black dark:text-white"
          htmlFor={otpId}
        >
          {label}
        </label>
      ) : null}
      <OTPInput
        id={otpId}
        containerClassName={cn(
          "flex items-center gap-2 has-disabled:opacity-50",
          hasError && "animate-shake",
          containerClassName,
        )}
        className={cn("disabled:cursor-not-allowed", className)}
        {...props}
      />
      {helperText ? (
        <p
          className={cn(
            "text-xs font-mono",
            hasError ? "text-[#ff4d4f]" : "text-black/60 dark:text-white/60",
          )}
        >
          {helperText}
        </p>
      ) : null}
    </div>
  );
}

function PixelInputOTPGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("flex items-center", className)} {...props} />;
}

function PixelInputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const slot = inputOTPContext?.slots?.[index];
  const char = slot?.char ?? null;
  const hasFakeCaret = slot?.hasFakeCaret ?? false;
  const isActive = slot?.isActive ?? false;
  const hasValue = typeof char === "string" && char.length > 0;
  const displayChar = hasValue ? char : "\u00A0";

  return (
    <div
      className={cn(
        "relative flex h-12 w-12 select-none items-center justify-center border-4 border-black bg-pixel-light-surface pixel-font text-2xl font-black leading-none text-black shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-none dark:bg-pixel-dark-surface dark:text-white",
        isActive &&
          "z-10 border-[#ff8c00] ring-4 ring-[#ff8c00]/30 ring-offset-2 ring-offset-pixel-light-surface dark:border-[#ff8c00] dark:ring-[#ff8c00]/40 dark:ring-offset-pixel-dark-surface",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden={!hasValue}
        className={cn(
          "pointer-events-none select-none text-[1.65rem] tabular-nums",
          hasValue
            ? "text-black drop-shadow-[1px_1px_0_rgba(255,255,255,0.6)] dark:text-white dark:drop-shadow-[1px_1px_0_rgba(0,0,0,0.6)]"
            : "text-black/40 dark:text-white/40",
        )}
      >
        {displayChar}
      </span>
      {hasFakeCaret ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-black dark:bg-white" />
        </div>
      ) : null}
    </div>
  );
}

function PixelInputOTPSeparator({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn("px-2 text-lg pixel-font", className)}
      aria-hidden="true"
      {...props}
    >
      -
    </span>
  );
}

export {
  PixelInputOTP,
  PixelInputOTPGroup,
  PixelInputOTPSlot,
  PixelInputOTPSeparator,
};
