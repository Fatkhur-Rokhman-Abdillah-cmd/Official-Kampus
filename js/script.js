(function () {
  "use strict";

  const THEME_KEY = "pnc-theme";
  const body = document.body;
  const themeButton = document.getElementById("tombolTema");
  const prefersDark = window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem(THEME_KEY);

  function applyTheme(isDark) {
    body.classList.toggle("dark", isDark);
    if (themeButton) {
      themeButton.textContent = isDark ? "☀️" : "🌙";
      themeButton.setAttribute(
        "aria-label",
        isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap"
      );
    }
  }

  applyTheme(savedTheme ? savedTheme === "dark" : prefersDark);

  if (themeButton) {
    themeButton.addEventListener("click", function () {
      const isDark = !body.classList.contains("dark");
      applyTheme(isDark);
      localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
    });
  }
})();
