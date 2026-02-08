// Menu Toggle
function toggleMenu() {
    const menuOverlay = document.getElementById('menuOverlay');
    menuOverlay.classList.toggle('active');
    document.body.style.overflow = menuOverlay.classList.contains('active') ? 'hidden' : '';
}

// FAQ Toggle
function toggleFaq(element) {
    const faqItem = element.closest('.faq-item');
    const isActive = faqItem.classList.contains('active');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Toggle current item
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Scroll Progress
function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const rawPercent = (scrollTop / docHeight) * 100;
    const scrollPercent = Math.min(100, Math.max(0, Math.round(rawPercent)));
    
    const progressElement = document.querySelector('.scroll-progress');
    if (progressElement) {
        progressElement.textContent = scrollPercent + '%';
    }
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const updateNavOffset = () => {
        const navHeight = navbar ? navbar.offsetHeight : 0;
        // Keep CSS and JS anchor offsets aligned with the actual fixed navbar height.
        document.documentElement.style.setProperty('--nav-offset', `${Math.round(navHeight + 16)}px`);
    };

    updateNavOffset();

    // Menu toggle
    const menuBtn = document.getElementById('menuBtn');
    const menuClose = document.getElementById('menuClose');
    
    if (menuBtn) menuBtn.addEventListener('click', toggleMenu);
    if (menuClose) menuClose.addEventListener('click', toggleMenu);
    
    // Close menu on nav link click
    document.querySelectorAll('.menu-nav a').forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
    
    // FAQ toggle
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', (e) => toggleFaq(e.currentTarget));
    });
    
    // Smooth scroll for in-page hash links (supports "#works" and "/#works").
    const normalizePath = (path) => path.replace(/\/+$/, '') || '/';
    const currentPath = normalizePath(window.location.pathname);

    document.querySelectorAll('a[href*="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;

            let url;
            try {
                url = new URL(href, window.location.origin);
            } catch {
                return;
            }

            if (!url.hash || normalizePath(url.pathname) !== currentPath) return;

            const target = document.querySelector(url.hash);
            if (!target) return;

            e.preventDefault();

            const navHeight = navbar ? navbar.offsetHeight : 0;
            const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;

            window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}${url.hash}`);
            window.scrollTo({
                top: Math.max(0, offsetTop),
                behavior: 'smooth'
            });
        });
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.about-header, .about-content, .section-header, .project-card, .post-card, .faq-item, .cta');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
    
    // Stagger project cards
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 100}ms`;
    });

    // Stagger post cards
    document.querySelectorAll('.post-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 100}ms`;
    });
    
    // Stagger FAQ items
    document.querySelectorAll('.faq-item').forEach((item, index) => {
        item.style.transitionDelay = `${index * 100}ms`;
    });

    const hero = document.querySelector('.hero');
    const heroParallaxTarget = hero ? hero.querySelector('.hero-main') : null;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Scroll events
    window.addEventListener('scroll', () => {
        updateScrollProgress();
        
        // Navbar shadow
        if (navbar) {
            navbar.style.boxShadow = window.scrollY > 50 
                ? '0 1px 0 rgba(0,0,0,0.05)' 
                : 'none';
        }

        // Parallax effect for hero content only (keeps section in document flow)
        if (hero && heroParallaxTarget && !prefersReducedMotion) {
            const scrolled = window.pageYOffset;
            const maxOffset = hero.offsetHeight * 0.25;
            const parallaxOffset = Math.min(scrolled * 0.2, maxOffset);
            hero.style.setProperty('--hero-parallax', `${parallaxOffset}px`);
        }
    }, { passive: true });

    window.addEventListener('resize', () => {
        updateScrollProgress();
        updateNavOffset();
    }, { passive: true });
    updateNavOffset();
    updateScrollProgress();
});
