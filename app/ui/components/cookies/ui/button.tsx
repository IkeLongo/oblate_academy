"use client";

import * as React from "react";
import { cn } from "@/app/lib/utils";

type Variant = "solid" | "bordered";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export function Button({
  variant = "solid",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold " +
    "transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
    "disabled:opacity-60 disabled:cursor-not-allowed";

  const solid =
    "bg-blue-300 text-white hover:opacity-95 focus-visible:ring-blue-300 ring-offset-slate-950";

  const bordered =
    "border border-white/40 text-white hover:bg-white/10 focus-visible:ring-white ring-offset-slate-950";

  return (
    <button
      type={type}
      className={cn(base, variant === "solid" ? solid : bordered, className)}
      {...props}
    />
  );
}