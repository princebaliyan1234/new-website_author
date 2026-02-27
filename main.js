// ===== SILENCE OF SCRIBES — main.js =====
// Self-contained, no external imports. Works in VS Code Live Preview + browsers.

// ── Loader (index.html only) ──────────────────────────────────────────────
(function() {
    const loader = document.getElementById('loader');
    if (!loader) return; // not on this page, skip

    document.body.classList.add('loading');

    function dismissLoader() {
        loader.classList.add('fade-out');
        document.body.classList.remove('loading');
        setTimeout(() => loader.style.display = 'none', 1500);
    }

    const minTime   = new Promise(resolve => setTimeout(resolve, 4200));
    const pageReady = new Promise(resolve => {
        if (document.readyState === 'complete') resolve();
        else window.addEventListener('load', resolve);
    });

    Promise.all([minTime, pageReady]).then(dismissLoader);
})();

document.addEventListener('DOMContentLoaded', () => {

    // Mark that JS is running — enables CSS scroll-reveal animations
    document.documentElement.classList.add('js-ready');

    // ── Navbar scroll effect ──────────────────────────────────────────────
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // ── Hamburger / mobile menu ───────────────────────────────────────────
    const hamburger = document.getElementById('hamburger');
    const navMenu   = document.getElementById('navMenu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        // Close when a link is clicked
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ── Scroll-reveal (IntersectionObserver) ─────────────────────────────
    const reveals = document.querySelectorAll('.scroll-reveal');
    if (reveals.length) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active', 'revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        reveals.forEach(el => revealObserver.observe(el));
    }

    // ── Animated stars ────────────────────────────────────────────────────
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        const size = Math.random() * 3 + 1;
        star.style.cssText = `
            width:${size}px; height:${size}px;
            left:${Math.random()*100}%;
            top:${Math.random()*100}%;
            animation-delay:${Math.random()*3}s;
            animation-duration:${Math.random()*3+2}s;
        `;
    });

    // ── Floating pointers stagger ─────────────────────────────────────────
    document.querySelectorAll('.floating-pointer').forEach((el, i) => {
        el.style.animationDelay = `${i * 0.5}s`;
    });

    // ── Parallax on hero image ────────────────────────────────────────────
    const parallaxImg = document.querySelector('.parallax-image');
    if (parallaxImg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            parallaxImg.style.transform = `translateY(${scrolled * 0.08}px)`;
        });
    }

    // ── Filter buttons (covers page) ──────────────────────────────────────
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            document.querySelectorAll('.cover-item').forEach(item => {
                item.classList.toggle('hidden',
                    filter !== 'all' && !item.dataset.category?.includes(filter)
                );
            });
        });
    });

});
