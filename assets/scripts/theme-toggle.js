// assets/scripts/theme-toggle.js
// Manejo del tema oscuro (predeterminado) y tema claro con almacenamiento en localStorage

(function () {
  const THEME_KEY = "mayday-theme-preference";

  // Inicializar estado del tema tan pronto como se cargue el DOM
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initThemeToggle);
  } else {
    initThemeToggle();
  }

  function initThemeToggle() {
    const savedTheme = localStorage.getItem(THEME_KEY) || "dark";
    applyTheme(savedTheme);
    renderThemeToggleBtn(savedTheme);
  }

  function applyTheme(theme) {
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    updateToggleIcon(theme);
  }

  function renderThemeToggleBtn(currentTheme) {
    if (document.querySelector("#theme-toggle-btn")) return;

    const logoContainer = document.querySelector(".logo");
    if (!logoContainer) return;

    const toggleBtn = document.createElement("button");
    toggleBtn.id = "theme-toggle-btn";
    toggleBtn.className = "theme-toggle-btn";
    toggleBtn.type = "button";
    toggleBtn.setAttribute("aria-label", "Cambiar entre modo claro y oscuro");
    toggleBtn.setAttribute("title", currentTheme === "light" ? "Cambiar a modo oscuro" : "Cambiar a modo claro");

    toggleBtn.innerHTML = getIconMarkup(currentTheme);

    toggleBtn.addEventListener("click", () => {
      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      const newTheme = isLight ? "dark" : "light";
      localStorage.setItem(THEME_KEY, newTheme);
      applyTheme(newTheme);
    });

    logoContainer.appendChild(toggleBtn);
  }

  function updateToggleIcon(theme) {
    const btn = document.querySelector("#theme-toggle-btn");
    if (btn) {
      btn.innerHTML = getIconMarkup(theme);
      btn.setAttribute("title", theme === "light" ? "Cambiar a modo oscuro" : "Cambiar a modo claro");
    }
  }

  function getIconMarkup(theme) {
    if (theme === "light") {
      // Icono de Sol (estética minimalista)
      return `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
        <span class="theme-label">Claro</span>
      `;
    } else {
      // Icono de Luna (estética minimalista)
      return `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
        <span class="theme-label">Oscuro</span>
      `;
    }
  }
})();
