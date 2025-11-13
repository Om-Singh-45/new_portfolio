// Navbar scroll effect
// Navbar scroll effect with progress indicator
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update navbar scroll progress
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        navbar.style.setProperty('--scroll-progress', `${scrollPercentage}%`);
    }
});

// Mobile navigation toggle - simplified approach
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('nav-open');
            
            // Prevent body scroll when menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close mobile menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('nav-open');
                document.body.style.overflow = '';
            });
        });
        
        // Close mobile menu when resizing to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('nav-open');
                document.body.style.overflow = '';
            }
        });
    }
});

// Theme toggle logic
const THEME_STORAGE_KEY = 'preferred-theme';
let themeToggleButtons = [];

const updateThemeToggleButtons = (theme) => {
    themeToggleButtons.forEach((btn) => {
        const icon = btn.querySelector('i');
        if (!icon) return;
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
            btn.setAttribute('aria-label', 'Switch to light mode');
            btn.setAttribute('title', 'Switch to light mode');
        } else {
            icon.className = 'fas fa-moon';
            btn.setAttribute('aria-label', 'Switch to dark mode');
            btn.setAttribute('title', 'Switch to dark mode');
        }
    });
};

const applyThemePreference = (theme, shouldPersist = true) => {
    const normalizedTheme = theme === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', normalizedTheme);
    updateThemeToggleButtons(normalizedTheme);
    if (shouldPersist) {
        try {
            localStorage.setItem(THEME_STORAGE_KEY, normalizedTheme);
        } catch (error) {
            console.warn('Unable to persist theme preference', error);
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    themeToggleButtons = Array.from(document.querySelectorAll('.theme-toggle'));
    if (!themeToggleButtons.length) {
        return;
    }

    const htmlTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    updateThemeToggleButtons(htmlTheme);

    try {
        if (!localStorage.getItem(THEME_STORAGE_KEY)) {
            localStorage.setItem(THEME_STORAGE_KEY, htmlTheme);
        }
    } catch (error) {
        console.warn('Local storage unavailable for theme persistence', error);
    }

    themeToggleButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyThemePreference(nextTheme);
        });
    });
});

// Enhanced Navigation - Active Link Tracking
document.addEventListener('DOMContentLoaded', () => {
    const navLinksArray = document.querySelectorAll('.nav-links a');
    const navSections = document.querySelectorAll('section[id]');
    
    if (navLinksArray.length > 0 && navSections.length > 0) {
        function setActiveLink() {
            const scrollY = window.pageYOffset;
            
            navSections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');
                
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinksArray.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }
        
        window.addEventListener('scroll', setActiveLink);
    }
});

// Logo click - smooth scroll to top
document.addEventListener('DOMContentLoaded', () => {
    const navBrand = document.querySelector('.nav-brand');
    if (navBrand) {
        navBrand.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// ========================================
// ADVANCED NAVIGATION: Search Functionality
// ========================================
const searchIcon = document.getElementById('searchIcon');
const searchContainer = document.querySelector('.search-container');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

if (searchIcon && searchContainer && searchInput) {
    // Toggle search dropdown
    searchIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        searchContainer.classList.toggle('active');
        if (searchContainer.classList.contains('active')) {
            setTimeout(() => searchInput.focus(), 100);
        }
    });

    // Prevent dropdown from closing when clicking inside
    searchContainer.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Close search when clicking outside
    document.addEventListener('click', () => {
        searchContainer.classList.remove('active');
    });

    // Search functionality
    if (searchInput && searchResults) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const searchItems = searchResults.querySelectorAll('.search-item');

            searchItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });

        // Navigate on search item click
        const searchItems = searchResults.querySelectorAll('.search-item');
        searchItems.forEach(item => {
            item.addEventListener('click', () => {
                const link = item.getAttribute('data-link');
                if (link) {
                    window.location.href = link;
                }
            });
        });
    }

    // Close search on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchContainer.classList.remove('active');
        }
    });
}

// Smooth scrolling for navigation links (only for home page)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        
        // Only handle anchor links (starting with #)
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Carousel functionality
const carousels = document.querySelectorAll('.carousel');

carousels.forEach(carousel => {
    const container = carousel.querySelector('.carousel-container');
    const leftBtn = carousel.querySelector('.carousel-btn.left');
    const rightBtn = carousel.querySelector('.carousel-btn.right');
    
    if (leftBtn && rightBtn) {
        leftBtn.addEventListener('click', () => {
            container.scrollBy({
                left: -340,
                behavior: 'smooth'
            });
        });

        rightBtn.addEventListener('click', () => {
            container.scrollBy({
                left: 340,
                behavior: 'smooth'
            });
        });
    }

    // Drag / swipe to scroll
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let hasMoved = false;

    if (container) {
        container.addEventListener('pointerdown', (e) => {
            isDown = true;
            hasMoved = false;
            container.classList.add('dragging');
            startX = e.clientX;
            scrollLeft = container.scrollLeft;
            container.setPointerCapture(e.pointerId);
        });
        container.addEventListener('pointermove', (e) => {
            if (!isDown) return;
            const dx = e.clientX - startX;
            if (Math.abs(dx) > 3) hasMoved = true;
            container.scrollLeft = scrollLeft - dx;
        });
        const endDrag = (e) => {
            isDown = false;
            container.classList.remove('dragging');
        };
        container.addEventListener('pointerup', endDrag);
        container.addEventListener('pointerleave', endDrag);

        // Prevent clicks while dragging
        container.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('click', (e) => {
                if (hasMoved) e.preventDefault();
            }, true);
        });

        // Touch inertia (simple)
        let lastX = 0;
        let lastTime = 0;
        container.addEventListener('touchmove', (e) => {
            const x = e.touches[0].clientX;
            const t = performance.now();
            lastX = x;
            lastTime = t;
        }, { passive: true });
    }
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections with stagger effect
const animatedElements = document.querySelectorAll('.card, .experience-card, .overview-card');
animatedElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    observer.observe(el);
});

// Hero button functionality// Card hover effect enhancement
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// Add parallax effect to hero section (only if hero exists)
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
 const scrolled = window.pageYOffset;
        // Limit parallax effect to prevent layout issues
        if (scrolled < hero.offsetHeight) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
}

// Dynamic greeting based on time
const updateGreeting = () => {
    const hour = new Date().getHours();
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    let greeting = 'Full Stack Developer';
    
    if (hour >= 5 && hour < 12) {
        greeting = 'Good Morning! ' + greeting;
    } else if (hour >= 12 && hour < 17) {
        greeting = 'Good Afternoon! ' + greeting;
    } else if (hour >= 17 && hour < 22) {
        greeting = 'Good Evening! ' + greeting;
    } else {
        greeting = 'Good Night! ' + greeting;
    }
    
    // heroSubtitle.textContent = greeting;
};

updateGreeting();

// Social links click handler
const socialLinks = {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    email: 'mailto:omsingh@example.com'
};

// Contact Form Handling with better validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();
        
        // Validation
        if (name.length < 2) {
            alert('Please enter a valid name (at least 2 characters)');
            nameInput.focus();
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            emailInput.focus();
            return;
        }
        
        if (message.length < 10) {
            alert('Please enter a message (at least 10 characters)');
            messageInput.focus();
            return;
        }
        
        // Show success message
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.disabled = true;
        submitBtn.style.background = '#10b981';
        
        setTimeout(() => {
            alert(`Thank you ${name}! Your message has been sent. I'll get back to you soon!`);
            contactForm.reset();
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
        }, 1000);
        
        // Log for backend integration
        console.log('Form submitted:', { name, email, message });
    });
}

console.log('Portfolio loaded successfully! 🚀');

// ========================================
// ADVANCED FEATURE 1: Typing Animation
// ========================================
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const roles = [
        'Software Developer & Data Analyst',
        'AI & Machine Learning Engineer',
        'Full-Stack Web Developer',
        'Python Flask Expert'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before next word
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

// ========================================
// ADVANCED FEATURE 2: Particle Background
// ========================================
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width || this.x < 0) {
                this.speedX = -this.speedX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.speedY = -this.speedY;
            }
        }

        draw() {
            ctx.fillStyle = `rgba(26, 152, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        particlesArray = [];
        const numberOfParticles = (canvas.width * canvas.height) / 15000;
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function connect() {
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                const dx = particlesArray[a].x - particlesArray[b].x;
                const dy = particlesArray[a].y - particlesArray[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.strokeStyle = `rgba(26, 152, 255, ${0.2 - distance / 500})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        connect();
        requestAnimationFrame(animate);
    }

    init();
    animate();
}

// ========================================
// ADVANCED FEATURE 3: Animated Counter
// ========================================
const counters = document.querySelectorAll('.counter');
const speed = 200;

const animateCounter = (counter) => {
    const target = +counter.parentElement.parentElement.getAttribute('data-count');
    const increment = target / speed;
    
    const updateCount = () => {
        const count = +counter.innerText;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 10);
        } else {
            counter.innerText = target;
        }
    };
    
    updateCount();
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target.querySelector('.counter');
            if (counter && counter.innerText === '0') {
                animateCounter(counter);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.overview-card').forEach(card => {
    counterObserver.observe(card);
});

// ========================================
// ADVANCED FEATURE 4: Scroll Progress Bar
// ========================================
const scrollProgress = document.querySelector('.scroll-progress-bar');
if (scrollProgress) {
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        scrollProgress.style.width = scrollPercentage + '%';
    });
}

// ========================================
// ADVANCED FEATURE 5: Custom Cursor Trail
// ========================================
let cursorTrail = [];
const trailLength = 8;

for (let i = 0; i < trailLength; i++) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    document.body.appendChild(trail);
    cursorTrail.push(trail);
}

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursorTrail() {
    const distX = mouseX - currentX;
    const distY = mouseY - currentY;
    
    currentX += distX * 0.1;
    currentY += distY * 0.1;
    
    cursorTrail.forEach((trail, index) => {
        const nextTrail = cursorTrail[index - 1] || { offsetLeft: currentX, offsetTop: currentY };
        
        const x = nextTrail.offsetLeft || currentX;
        const y = nextTrail.offsetTop || currentY;
        
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        trail.style.transform = `scale(${(trailLength - index) / trailLength})`;
    });
    
    requestAnimationFrame(animateCursorTrail);
}

animateCursorTrail();

// ========================================
// ADVANCED FEATURE 6: Scroll to Top Button
// ========================================
const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// ADVANCED FEATURE 7: Card 3D Tilt Effect
// ========================================
const cards = document.querySelectorAll('.card, .overview-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    });
});

// Preload critical images
const preloadImages = () => {
    const images = [
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
};

window.addEventListener('load', preloadImages);

// Smooth scrolling performance optimization
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Scroll-based animations here
            ticking = false;
        });
        ticking = true;
    }
});

// Smooth scroll to projects when clicking View Projects button (home page only)
const viewProjectsBtn = document.querySelector('.btn-primary');
if (viewProjectsBtn && !viewProjectsBtn.hasAttribute('onclick')) {
    viewProjectsBtn.addEventListener('click', (e) => {
        const projectsSection = document.querySelector('#projects');
        if (projectsSection) {
            e.preventDefault();
            projectsSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// Download Resume button
const downloadResumeBtn = document.querySelector('.btn-secondary');
if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', () => {
        window.open('https://drive.google.com/file/d/1yJ2KRfrNw9es5D9rd9l4ryZUdvmLLXS4/view?usp=drive_link', '_blank');
    });
}

// ========================================
// ADVANCED FEATURE 8: Section Reveal on Scroll
// ========================================
const sections = document.querySelectorAll('.content-section');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Lazy loading for background images
function lazyLoadBackgroundImages() {
    const lazyBackgrounds = document.querySelectorAll('[data-bg]');
    
    if ('IntersectionObserver' in window) {
        const backgroundObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const backgroundElement = entry.target;
                    const backgroundImage = backgroundElement.dataset.bg;
                    
                    // Create image to preload
                    const img = new Image();
                    img.onload = () => {
                        backgroundElement.style.backgroundImage = `url(${backgroundImage})`;
                        backgroundElement.classList.add('loaded');
                    };
                    img.src = backgroundImage;
                    
                    backgroundObserver.unobserve(backgroundElement);
                }
            });
        }, {
            rootMargin: '50px' // Load images 50px before they come into view
        });
        
        lazyBackgrounds.forEach(background => {
            backgroundObserver.observe(background);
        });
    } else {
        // Fallback for browsers that don't support Intersection Observer
        lazyBackgrounds.forEach(background => {
            const backgroundImage = background.dataset.bg;
            background.style.backgroundImage = `url(${backgroundImage})`;
            background.classList.add('loaded');
        });
    }
}

// Call lazy loading for background images when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    lazyLoadBackgroundImages();
});

// Enhanced lazy loading for carousel images
function lazyLoadCarouselImages() {
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    
    if ('IntersectionObserver' in window) {
        const carouselObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const slide = entry.target;
                    
                    // If background image is already set, skip
                    if (slide.style.backgroundImage && slide.style.backgroundImage !== 'none') {
                        carouselObserver.unobserve(slide);
                        return;
                    }
                    
                    // Get the data-bg attribute
                    const backgroundImageUrl = slide.dataset.bg;
                    
                    if (backgroundImageUrl) {
                        // Preload the image
                        const img = new Image();
                        img.onload = () => {
                            slide.style.backgroundImage = `url(${backgroundImageUrl})`;
                            slide.classList.add('loaded');
                        };
                        img.src = backgroundImageUrl;
                        
                        carouselObserver.unobserve(slide);
                    }
                }
            });
        }, {
            rootMargin: '100px' // Load images 100px before they come into view for smoother experience
        });
        
        carouselSlides.forEach(slide => {
            carouselObserver.observe(slide);
        });
    }
}

// Call lazy loading for carousel images
document.addEventListener('DOMContentLoaded', () => {
    lazyLoadCarouselImages();
});

// ----------------------------------------
// Persona-based welcome modal
// ----------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('welcomeModal');
    if (!modal) return;

    try {
        const picked = sessionStorage.getItem('viewerPicked');
        const role = sessionStorage.getItem('viewerRole') || 'Adventurer';
        const alreadyShown = sessionStorage.getItem('welcomeShown');

        if (picked !== '1' || alreadyShown === '1') {
            return;
        }

        const titleEl = modal.querySelector('#welcomeTitle');
        const bodyEl = modal.querySelector('#welcomeDescription');
        const ctaBtn = modal.querySelector('.welcome-modal__cta');
        const closeBtn = modal.querySelector('.welcome-modal__close');
        const panel = modal.querySelector('.welcome-modal__panel');

        const welcomeMessages = {
            Recruiter: {
                title: '💼 Welcome Recruiter',
                body: `
                    <p>I’m Om Singh, an AI &amp; Full-Stack Developer passionate about building intelligent, user-centric solutions that balance technology with creativity.</p>
                    <p>From conversational chatbots to data-driven Power BI dashboards, this space curates the projects, results, and growth stories that matter to decision-makers.</p>
                    <p>Take a guided tour of my flagship work or browse freely—either way, I’m excited to show you what’s possible.</p>
                `,
                cta: 'Let’s go!',
                action: () => {
                    const heroSection = document.querySelector('#home');
                    if (heroSection) {
                        heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    } else {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                }
            },
            Adventurer: {
                title: '🚀 Hey there, tech traveler! 👋',
                body: `
                    <p>Welcome to OmVerse, my digital playground where AI experiments meet creative code.</p>
                    <p>I’m Om—a curious developer who turns late-night caffeine into clean builds and playful prototypes.</p>
                    <p>Wander through living dashboards, storytelling algorithms, and projects with plenty of heart (and the occasional Easter egg). Ready to explore?</p>
                `,
                cta: 'Let’s go!',
                action: () => {
                    const heroSection = document.querySelector('#home');
                    if (heroSection) {
                        heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    } else {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                }
            }
        };

        const copy = welcomeMessages[role] || welcomeMessages.Adventurer;
        titleEl.textContent = copy.title;
        bodyEl.innerHTML = copy.body;
        ctaBtn.textContent = copy.cta;

        const dismiss = () => {
            modal.setAttribute('aria-hidden', 'true');
            modal.hidden = true;
            document.body.classList.remove('modal-open');
            sessionStorage.setItem('welcomeShown', '1');
            document.removeEventListener('keydown', handleKeydown);
        };

        const handleKeydown = (event) => {
            if (event.key === 'Escape') {
                dismiss();
            }
        };

        closeBtn.addEventListener('click', dismiss, { once: true });
        modal.addEventListener('click', (event) => {
            if (event.target.classList.contains('welcome-modal__backdrop')) {
                dismiss();
            }
        });

        ctaBtn.addEventListener('click', () => {
            dismiss();
            if (typeof copy.action === 'function') {
                setTimeout(copy.action, 150);
            }
        }, { once: true });

        modal.hidden = false;
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        document.addEventListener('keydown', handleKeydown);
        panel.focus();

    } catch (error) {
        console.warn('Welcome modal could not be displayed:', error);
    }
});

// ----------------------------------------
// Swipe support for hero carousels
// ----------------------------------------
document.querySelectorAll('.hero-carousel').forEach(hero => {
    const slides = hero.querySelector('.carousel-slides');
    const prevBtn = hero.querySelector('.carousel-nav.prev');
    const nextBtn = hero.querySelector('.carousel-nav.next');
    if (!slides || !prevBtn || !nextBtn) return;

    let touchStartX = 0;
    let touchActive = false;

    slides.addEventListener('touchstart', (e) => {
        touchActive = true;
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    slides.addEventListener('touchmove', (e) => {
        if (!touchActive) return;
        const dx = e.touches[0].clientX - touchStartX;
        if (Math.abs(dx) > 50) {
            if (dx > 0) {
                prevBtn.click();
            } else {
                nextBtn.click();
            }
            touchActive = false;
        }
    }, { passive: true });

    slides.addEventListener('touchend', () => {
        touchActive = false;
    });
});
// Check if device is mobile
function isMobile() {
    return window.innerWidth <= 768;
}

// Disable heavy animations on mobile for performance
function optimizeForMobile() {
    if (isMobile()) {
        // Disable particles on mobile
        const particlesCanvas = document.getElementById('particles-canvas');
        if (particlesCanvas) {
            particlesCanvas.style.display = 'none';
        }
        
        // Reduce animation intensity
        document.body.classList.add('mobile-optimized');
    }
}

// Run mobile optimization on load and resize
window.addEventListener('load', optimizeForMobile);
window.addEventListener('resize', optimizeForMobile);
