/* ============================================================
   Theme toggle — light / dark mode
   ------------------------------------------------------------
   - Reads the saved theme from localStorage on load
   - Falls back to the OS-level preference if nothing saved
   - Toggles data-theme="dark" on <html> and saves the choice
   ============================================================ */

(function () {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const STORAGE_KEY = 'braq-theme';

  // 1. Determine initial theme
  const savedTheme = localStorage.getItem(STORAGE_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    root.setAttribute('data-theme', 'dark');
  } else {
    root.setAttribute('data-theme', 'light');
  }

  // 2. Toggle on click
  toggle.addEventListener('click', function () {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';

    root.setAttribute('data-theme', next);
    localStorage.setItem(STORAGE_KEY, next);
  });
})();