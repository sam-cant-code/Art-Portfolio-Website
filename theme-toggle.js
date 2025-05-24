document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    const savedTheme = localStorage.getItem('theme');

    // Only enable light mode if user previously selected it
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

    // Hamburger menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking overlay
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    }

    // Close menu when clicking a nav link (for better UX)
    navLinks.addEventListener('click', (e) => {
        // Only handle anchor links that go to a section
        if (e.target.classList.contains('nav-link') && e.target.getAttribute('href')?.startsWith('#')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
            // Smooth scroll to section
            const sectionId = e.target.getAttribute('href');
            const section = document.querySelector(sectionId);
            if (section) {
                e.preventDefault();
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }
        e.stopPropagation();
    });

    // Close menu when clicking outside
    document.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
    });

    // Dropdown menu (mobile & desktop)
    const dropdownTrigger = document.querySelector('.dropdown-trigger');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    dropdownTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropdownMenu.classList.toggle('active');
        dropdownTrigger.classList.toggle('active');
    });

    // Keyboard accessibility for dropdown
    dropdownTrigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            dropdownMenu.classList.toggle('active');
            dropdownTrigger.classList.toggle('active');
        }
    });

    // Responsive: close menu on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 900) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
            dropdownMenu.classList.remove('active');
            dropdownTrigger.classList.remove('active');
        }
    });

    // Also close menu when clicking a dropdown menu link (for mobile)
    if (dropdownMenu) {
        dropdownMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
                dropdownMenu.classList.remove('active');
                dropdownTrigger.classList.remove('active');
                // Smooth scroll to section
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
