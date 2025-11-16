"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  if (!theme) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="absolute right-6 top-6 flex items-center justify-center rounded-full bg-gray-200 p-2
                 text-gray-700 shadow-md transition-all duration-200 ease-in-out
                 hover:bg-gray-300 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500
                 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
      aria-label="Alternar tema"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}
