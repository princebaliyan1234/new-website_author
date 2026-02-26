document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initScrollReveal();
    initParallax();
    initFilterButtons();
    initLightbox();
    initContactForm();
});

function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

function initScrollReveal() {
    const reveals = document.querySelectorAll('.scroll-reveal');

    function checkScroll() {
        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll();
}

function initParallax() {
    const parallaxImage = document.querySelector('.parallax-image');

    if (parallaxImage) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;

            if (scrolled < 1000) {
                parallaxImage.style.transform = `translateY(${rate}px)`;
            }
        });
    }
}

function initFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');

                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                const items = document.querySelectorAll('.book-card, .cover-item');

                items.forEach(item => {
                    if (filter === 'all') {
                        item.classList.remove('hidden');
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        const genre = item.getAttribute('data-genre');
                        const category = item.getAttribute('data-category');

                        if (genre === filter || category === filter) {
                            item.classList.remove('hidden');
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'scale(1)';
                            }, 10);
                        } else {
                            item.style.opacity = '0';
                            item.style.transform = 'scale(0.8)';
                            setTimeout(() => {
                                item.classList.add('hidden');
                            }, 300);
                        }
                    }
                });
            });
        });
    }
}

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const coverItems = document.querySelectorAll('.cover-item');

    if (coverItems.length > 0 && lightbox) {
        coverItems.forEach(item => {
            item.addEventListener('click', function() {
                const img = this.querySelector('img');
                const title = this.querySelector('h3').textContent;
                const tag = this.querySelector('.cover-tag').textContent;

                lightboxImage.src = img.src;
                lightboxCaption.textContent = `${title} - ${tag}`;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }

        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
}

function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            setTimeout(() => {
                alert('Thank you for your message! I\'ll get back to you soon.');
                contactForm.reset();
                submitButton.textContent = 'Send Message';
                submitButton.disabled = false;
            }, 1500);
        });
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
