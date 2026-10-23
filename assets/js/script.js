/* ============================================
   YOFREN MASTER PET GROOMING — Shared JS
   Shared between index.html and all subpages
   ============================================ */

document.addEventListener("DOMContentLoaded", function () {

    /* -----------------------------------------
       1. Mobile Menu Toggle
    ----------------------------------------- */
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu    = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');

            // Swap hamburger ↔ X icon
            const icon = mobileMenuBtn.querySelector('svg');
            if (icon) {
                const isOpen = !mobileMenu.classList.contains('hidden');
                icon.innerHTML = isOpen
                    ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>'
                    : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
            }
        });

        // Close menu when a link inside it is tapped
        mobileMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                mobileMenu.classList.add('hidden');
                // Reset icon back to hamburger
                const icon = mobileMenuBtn.querySelector('svg');
                if (icon) {
                    icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
                }
            });
        });
    }

    /* -----------------------------------------
       2. Smooth Scroll for Anchor Links
    ----------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* -----------------------------------------
       3. Navbar Transparent → Solid on Scroll
    ----------------------------------------- */
    var navbar = document.getElementById('mainNav');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 80) {
                navbar.classList.add('nav-scrolled');
            } else {
                navbar.classList.remove('nav-scrolled');
            }
        });
    }

    /* -----------------------------------------
       4. Active Nav Link Highlight
       Adds 'text-primary font-bold' to the
       nav link matching the current page.
    ----------------------------------------- */
    (function highlightActiveLink() {
        var currentPage = window.location.pathname.split('/').pop() || 'index.html';

        document.querySelectorAll('nav a[href]').forEach(function (link) {
            var href = link.getAttribute('href').split('/').pop();
            if (href === currentPage) {
                link.classList.add('text-primary', 'font-bold');
            }
        });
    })();

    /* -----------------------------------------
       5. Scroll-to-Top Button (if present)
       Add a button with id="scrollTopBtn" in
       any page and it will work automatically.
    ----------------------------------------- */
    var scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 600) {
                scrollTopBtn.classList.remove('opacity-0', 'pointer-events-none');
                scrollTopBtn.classList.add('opacity-100');
            } else {
                scrollTopBtn.classList.add('opacity-0', 'pointer-events-none');
                scrollTopBtn.classList.remove('opacity-100');
            }
        });

        scrollTopBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* -----------------------------------------
       6. Intersection Observer — Fade-in on
       Scroll for elements with class "reveal"
    ----------------------------------------- */
    if ('IntersectionObserver' in window) {
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        document.querySelectorAll('.reveal').forEach(function (el) {
            revealObserver.observe(el);
        });
    }

});
