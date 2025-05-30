document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Set initial state
    if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
        document.body.classList.add('light-mode');
        if (themeToggle) themeToggle.checked = true;
        if (themeIcon) themeIcon.textContent = '☀️';
    } else {
        document.body.classList.remove('light-mode');
        if (themeToggle) themeToggle.checked = false;
        if (themeIcon) themeIcon.textContent = '🌙';
    }

    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            if (themeToggle.checked) {
                document.body.classList.add('light-mode');
                if (themeIcon) themeIcon.textContent = '☀️';
                localStorage.setItem('theme', 'light');
            } else {
                document.body.classList.remove('light-mode');
                if (themeIcon) themeIcon.textContent = '🌙';
                localStorage.setItem('theme', 'dark');
            }
            if (themeIcon) {
                themeIcon.style.transform = 'rotate(360deg)';
                setTimeout(() => {
                    themeIcon.style.transform = 'rotate(0deg)';
                }, 500);
            }
        });
    }

    // Hamburger menu and overlay
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.querySelector('.nav-overlay');

    function openMenu() {
        navLinks.classList.add('active');
        menuToggle.classList.add('active');
        document.body.classList.add('menu-open');
    }
    function closeMenu() {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
    }

    if (menuToggle && navLinks && navOverlay) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (navLinks.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        navOverlay.addEventListener('click', () => {
            closeMenu();
        });

        // Prevent nav menu from closing when clicking inside
        navLinks.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Close menu when clicking outside (on document)
        document.addEventListener('click', () => {
            closeMenu();
        });
    }

    // Always close menu and smooth scroll when clicking a section link (desktop & mobile)
    if (navLinks) {
        navLinks.querySelectorAll(
            'a[href="#digital-art"],a[href="#paintings"],a[href="#crafts"],a[href="#character-designs"],a[href="#animations"],a[href="#awards"]'
        ).forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                closeMenu();
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    setTimeout(() => {
                        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
                    }, 200);
                }
            });
        });
    }

    // Dropdown menu (mobile & desktop)
    const dropdownTrigger = document.querySelector('.dropdown-trigger');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    if (dropdownTrigger && dropdownMenu) {
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
    }

    // Responsive: close menu on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 900 && navLinks && menuToggle && dropdownMenu && dropdownTrigger) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
            dropdownMenu.classList.remove('active');
            dropdownTrigger.classList.remove('active');
        }
    });

    // Disable right-click everywhere
    document.addEventListener('contextmenu', e => e.preventDefault());

    // --- LAZY LOADING FOR CANVAS ART ---
    const canvasArts = document.querySelectorAll('.canvas-art');
    const loadCanvasArt = (div) => {
        // Prevent double-loading
        if (div.dataset.loaded) return;
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = div.dataset.src;
        img.alt = div.dataset.alt || "";
        img.onload = function() {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            canvas.style.width = "100%";
            canvas.style.height = "auto";
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            // Only add watermark if data-watermark is present
            if (div.dataset.watermark) {
                const watermark = div.dataset.watermark;
                ctx.font = `bold ${Math.floor(canvas.width/15)}px Montserrat, Arial, sans-serif`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.globalAlpha = 0.7;
                ctx.fillStyle = "#fff";
                ctx.shadowColor = "#000";
                ctx.shadowBlur = 8;
                ctx.fillText(watermark, canvas.width/2, canvas.height/2);
                ctx.globalAlpha = 1;
                ctx.shadowBlur = 0;
            }
            // Save the description element if it exists
            const desc = div.querySelector('.canvas-desc');
            div.innerHTML = "";
            div.appendChild(canvas);
            if (desc) div.appendChild(desc); // Re-append the description
            div.dataset.loaded = "true";
        };
        img.onerror = function() {
            div.innerHTML = "<span style='color:red'>Image failed to load</span>";
            div.dataset.loaded = "true";
        };
    };

    // Use Intersection Observer for lazy loading
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadCanvasArt(entry.target);
                    obs.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: "200px 0px", // start loading a bit before in view
            threshold: 0.01
        });
        canvasArts.forEach(div => observer.observe(div));
    } else {
        // Fallback: load all at once
        canvasArts.forEach(div => loadCanvasArt(div));
    }
});
