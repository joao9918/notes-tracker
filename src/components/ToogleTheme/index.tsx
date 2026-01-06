// src/components/ThemeToggle.tsx
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ToggleTheme() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Esse useEffect é importante para evitar erros de hidratação (SSR/Vite)
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      <span className="rounded-md">DarkMode</span>

      <div
        className={`w-14 h-7 rounded-full p-1 cursor-pointer transition-colors duration-300 ${
          theme === "dark" ? "bg-amber-600" : "bg-amber-200"
        }
        `}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <div
          className={`bg-orange-950 w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
            theme === "dark" ? "translate-x-7" : "translate-x-0"
          }`}
        ></div>
      </div>
    </>
  );
}
