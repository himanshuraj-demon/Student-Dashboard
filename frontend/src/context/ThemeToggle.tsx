import { useTheme } from "./ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      style={{
        background: "var(--accent)",
        color: "var(--text-primary)",
        borderRadius: "9999px",
        cursor: "pointer",
        fontWeight: 600,
        fontSize: "0.875rem",
        transition: "background 0.2s",
      }}
      className="w-10  h-10 fixed top-2 right-2 z-50 text-center p-2"
    >
      {isDark ? <FiSun size={18} />: <FiMoon size={18} />}
    </button>
  );
}