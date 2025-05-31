// ThemeToggle.jsx
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "gardenGlowLight");

  useEffect(() => {
    // Set initial theme
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "gardenGlowLight" ? "gardenGlowDark" : "gardenGlowLight";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button 
      onClick={toggleTheme} 
      className="btn btn-sm btn-outline"
      title={theme === "gardenGlowLight" ? "Switch to Dark Mode" : "Switch to Light Mode"}
    >
      {theme === "gardenGlowLight" ? "🌙" : "☀️"}
    </button>
  );
}
