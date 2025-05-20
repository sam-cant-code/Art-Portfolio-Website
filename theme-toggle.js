// Get elements
const toggleSwitch = document.getElementById('theme-toggle');

// Load theme preference from localStorage or system
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
  document.body.classList.add('dark-mode');
  toggleSwitch.checked = true;
} else if (currentTheme === 'light') {
  document.body.classList.remove('dark-mode');
  toggleSwitch.checked = false;
} else {
  // If no preference saved, check system preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-mode');
    toggleSwitch.checked = true;
    localStorage.setItem('theme', 'dark');
  }
}

// Listen for toggle change
toggleSwitch.addEventListener('change', () => {
  if (toggleSwitch.checked) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  }
});
