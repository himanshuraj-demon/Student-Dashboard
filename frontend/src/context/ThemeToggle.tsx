import { useTheme } from "./ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="flex items-center gap-2">
      <span className="font-semibold text-lg">
        Theme: {isDark ? "Light" : "Dark"}
      </span>

      <button
        onClick={toggleTheme}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        style={{
          background: "var(--accent)",
          color: "var(--text-primary)",
          borderRadius: "9999px",
          cursor: "pointer",
        }}
        className="p-3 flex justify-center items-center"
      >
        {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
      </button>
    </div>
  );
}