/* ============================================
   DAMIAN VIDEOGRAFIE - JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // --- NAVBAR SCROLL ---
    const navbar = document.getElementById('navbar');

    const handleScroll = () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // --- MOBIEL MENU ---
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
            document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
        });

        // Sluit menu bij klik op link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // --- SMOOTH SCROLL VOOR ANKER LINKS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // --- VIDEO LIGHTBOX ---
    const lightbox = document.getElementById('lightbox');
    const lightboxVideo = document.getElementById('lightbox-video');
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');

    videoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', () => {
            const videoSrc = placeholder.dataset.video;
            if (videoSrc && lightboxVideo) {
                lightboxVideo.querySelector('source').src = videoSrc;
                lightboxVideo.load();
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
                lightboxVideo.play();
            }
        });
    });

    // --- FOTO LIGHTBOX ---
    const photoLightbox = document.getElementById('photo-lightbox');
    const lightboxPhoto = document.getElementById('lightbox-photo');
    const photoItems = document.querySelectorAll('.photo-item');

    photoItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img && lightboxPhoto) {
                lightboxPhoto.src = img.src;
                lightboxPhoto.alt = img.alt;
                photoLightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Sluit lightboxen
    document.querySelectorAll('.lightbox-close').forEach(btn => {
        btn.addEventListener('click', () => {
            closeLightboxes();
        });
    });

    document.querySelectorAll('.lightbox').forEach(lb => {
        lb.addEventListener('click', (e) => {
            if (e.target === lb) {
                closeLightboxes();
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightboxes();
        }
    });

    function closeLightboxes() {
        document.querySelectorAll('.lightbox').forEach(lb => {
            lb.classList.remove('active');
        });
        if (lightboxVideo) {
            lightboxVideo.pause();
            lightboxVideo.currentTime = 0;
        }
        document.body.style.overflow = '';
    }

    // --- FADE-IN ANIMATIES ---
    const fadeElements = document.querySelectorAll(
        '.service-card, .video-item, .photo-item, .about-grid, .contact-grid, .section-header'
    );

    fadeElements.forEach(el => el.classList.add('fade-in'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));

    // --- CONTACT FORMULIER ---
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Verzamel form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // Hier kun je een fetch naar je backend/API doen.
            // Voor nu tonen we een success state:
            console.log('Formulier verzonden:', data);

            form.innerHTML = `
                <div class="form-success">
                    <h3>Bericht verzonden</h3>
                    <p>Bedankt voor je bericht. Ik neem zo snel mogelijk contact met je op.</p>
                </div>
            `;
        });
    }

    // --- ACTIEVE NAV LINK HIGHLIGHT ---
    const sections = document.querySelectorAll('section[id]');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.style.opacity = '';
                    if (link.getAttribute('href') === `#${id}`) {
                        link.style.opacity = '1';
                    }
                });
            }
        });
    }, {
        threshold: 0.3
    });

    sections.forEach(section => navObserver.observe(section));
});
