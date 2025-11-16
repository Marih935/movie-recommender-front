"use client";

import { type ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export function Button({
  children,
  loading,
  disabled,
  className,
  ...props
}: ButtonProps) {
  const combinedClassName = `
    flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-lg
    font-semibold text-white shadow-md transition-all duration-200 ease-in-out
    bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    dark:focus:ring-offset-gray-900

    ${
      disabled || loading
        ? "cursor-not-allowed bg-blue-200 dark:bg-blue-200 text-blue-100 dark:text-blue-300 shadow-none"
        : ""
    }
    ${className}
  `;

  return (
    <button
      disabled={disabled || loading}
      className={combinedClassName}
      {...props}
    >
      {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
      {children}
    </button>
  );
}
