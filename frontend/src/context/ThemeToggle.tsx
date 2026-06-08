import { useTheme } from "./ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="w-auto text-center  bottom-7 h-10 absolute md:bottom-25 md:left-10 z-5  p-2 flex flex-row items-center justify-center">
      <div className="flex text-center mr-2 font-semibold text-2xl">Theme : {isDark?"Light":"Dark"}</div>
      
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
      className="z-50 text-center p-3 flex justify-center items-center"
    >
     {isDark ? <FiSun size={18} />: <FiMoon size={18} />}
    </button>
    </div>
  );
}