document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.querySelector('.theme-icon');
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeIcon.textContent = '☀️';
    themeToggle.checked = true;
  } else {
    document.body.classList.remove('light-mode');
    themeIcon.textContent = '🌙';
    themeToggle.checked = false;
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    themeIcon.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    themeIcon.style.transform = 'rotate(360deg)';
    setTimeout(() => {
      themeIcon.style.transform = 'rotate(0deg)';
    }, 500);
  });

  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const mobileOverlay = document.querySelector('.mobile-overlay');

  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('active');
    navLinks.style.visibility = navLinks.classList.contains('active') ? 'visible' : 'hidden';
    menuToggle.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', () => {
      navLinks.classList.remove('active');
      navLinks.style.visibility = 'hidden';
      menuToggle.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  }

  navLinks.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-link') && e.target.getAttribute('href')?.startsWith('#')) {
      navLinks.classList.remove('active');
      navLinks.style.visibility = 'hidden';
      menuToggle.classList.remove('active');
      document.body.classList.remove('menu-open');
      const sectionId = e.target.getAttribute('href');
      const section = document.querySelector(sectionId);
      if (section) {
        e.preventDefault();
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
    e.stopPropagation();
  });

  document.addEventListener('click', () => {
    navLinks.classList.remove('active');
    navLinks.style.visibility = 'hidden';
    menuToggle.classList.remove('active');
    document.body.classList.remove('menu-open');
  });

  const dropdownTrigger = document.querySelector('.dropdown-trigger');
  const dropdownMenu = document.querySelector('.dropdown-menu');
  dropdownTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropdownMenu.classList.toggle('active');
    dropdownTrigger.classList.toggle('active');
  });

  dropdownTrigger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      dropdownMenu.classList.toggle('active');
      dropdownTrigger.classList.toggle('active');
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      navLinks.classList.remove('active');
      navLinks.style.visibility = 'hidden';
      menuToggle.classList.remove('active');
      document.body.classList.remove('menu-open');
      dropdownMenu.classList.remove('active');
      dropdownTrigger.classList.remove('active');
    }
  });

  if (dropdownMenu) {
    dropdownMenu.addEventListener('click', (e) => {
      if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
        navLinks.classList.remove('active');
        navLinks.style.visibility = 'hidden';
        menuToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
        dropdownMenu.classList.remove('active');
        dropdownTrigger.classList.remove('active');
        const sectionId = e.target.getAttribute('href');
        const section = document.querySelector(sectionId);
        if (section) {
          e.preventDefault();
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }
});
