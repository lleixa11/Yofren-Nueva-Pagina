/* ============================================
   YOFREN MASTER PET GROOMING — Shared JS
   Shared between index.html and all subpages
   ============================================ */

document.addEventListener("DOMContentLoaded", function () {

    /* -----------------------------------------
   1. Mobile Menu Toggle (Hamburger ↔ X)
----------------------------------------- */
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu    = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
    const iconHamburger = mobileMenuBtn.querySelector('.icon-hamburger');
    const iconClose     = mobileMenuBtn.querySelector('.icon-close');

    function setMenuOpen(isOpen) {
        // Toggle visibility of the menu
        mobileMenu.classList.toggle('hidden', !isOpen);

        // Swap icons
        if (iconHamburger && iconClose) {
            iconHamburger.classList.toggle('hidden', isOpen);
            iconClose.classList.toggle('hidden', !isOpen);
        }

        // Update ARIA for accessibility
        mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        mobileMenuBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    }

    // Toggle menu on button click
    mobileMenuBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        const isOpen = !mobileMenu.classList.contains('hidden');
        setMenuOpen(!isOpen);
    });

    // Close menu when a link inside it is tapped
    mobileMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            setMenuOpen(false);
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (mobileMenu.classList.contains('hidden')) return;
        if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            setMenuOpen(false);
        }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
            setMenuOpen(false);
        }
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
