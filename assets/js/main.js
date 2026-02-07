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
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);
    
    const progressElement = document.querySelector('.scroll-progress');
    if (progressElement) {
        progressElement.textContent = scrollPercent + '%';
    }
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
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
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
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
    
    // Scroll events
    window.addEventListener('scroll', () => {
        updateScrollProgress();
        
        // Navbar shadow
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.style.boxShadow = window.scrollY > 50 
                ? '0 1px 0 rgba(0,0,0,0.05)' 
                : 'none';
        }
        
        // Parallax effect for hero
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
});
