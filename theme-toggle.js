const toggleBtn = document.getElementById('theme-toggle');
const icon = document.getElementById('theme-icon');

function setIcon(mode) {
  icon.innerHTML =
    mode === 'dark'
      ? `<path d="M21.64 13.34A9 9 0 0110.66 2.36a1 1 0 00-1.2 1.2 9 9 0 0010.98 10.98 1 1 0 00-1.2-1.2z"/>`
      : `<circle cx="12" cy="12" r="5"/><g><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></g>`;
}

let theme = localStorage.getItem('theme');
if (!theme) {
  theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

document.body.classList.toggle('dark-mode', theme === 'dark');
setIcon(theme);

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const newTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('theme', newTheme);
  setIcon(newTheme);
});
