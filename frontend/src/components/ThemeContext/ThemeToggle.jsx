import "./ThemeToggle.css";
import { useTheme } from "./ThemeContext";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={`Bytt til ${isDark ? "dag" : "natt"}-tema`}
      aria-pressed={isDark}
    >
      {isDark ? "☀️ Dagtema" : "🌙 Natt-tema"}
    </button>
  );
}

export default ThemeToggle;
